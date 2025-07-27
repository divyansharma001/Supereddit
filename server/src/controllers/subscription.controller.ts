// server/src/controllers/subscription.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import DodoPayments from 'dodopayments';
import { Webhook } from "standardwebhooks";
import { Plan } from '@prisma/client';

export class SubscriptionController {
  
  // Method to create the checkout session (payment link)
  static async createCheckoutSession(req: Request, res: Response) {
    try {
      const { productId } = req.body;
      const user = req.user!;

      if (!process.env.DODO_PAYMENT_API_KEY || !process.env.FRONTEND_URL) {
        return res.status(500).json({ error: 'Server configuration missing.' });
      }

      const dbUser = await prisma.user.findUnique({
        where: { id: user.userId },
        include: { client: true }
      });
      if (!dbUser) return res.status(404).json({ error: 'User not found.' });

      const dodo = new DodoPayments({
        bearerToken: process.env.DODO_PAYMENT_API_KEY,
        environment: 'test_mode', // Use 'test_mode' for development
      });

      let dodoCustomerId = dbUser.dodoCustomerId;
      if (!dodoCustomerId) {
        const customer = await dodo.customers.create({ email: dbUser.email, name: dbUser.client.name });
        dodoCustomerId = customer.customer_id;
        await prisma.user.update({ where: { id: dbUser.id }, data: { dodoCustomerId } });
      }

      const payment = await dodo.payments.create({
        customer: { customer_id: dodoCustomerId },
        product_cart: [{ product_id: productId, quantity: 1 }],
        payment_link: true,
        return_url: `${process.env.FRONTEND_URL}/dashboard?payment=success`,
        billing: {
            street: "123 App Street", city: "SaaSville", state: "CA",
            zipcode: "90210", country: "US"
        },
      });
      
      return res.json({ url: payment.payment_link });

    } catch (error) {
      if (error instanceof DodoPayments.APIError) {
        console.error(`Dodo Payments API Error: ${error.status} ${error.name}`, error);
        return res.status(error.status || 500).json({ error: 'Payment provider error.' });
      }
      console.error('Checkout error:', error);
      return res.status(500).json({ error: 'Failed to create checkout session.' });
    }
  }

  // Method to handle incoming webhooks from Dodo Payments
  static async handleWebhook(req: Request, res: Response) {
    try {
      console.log('🎯 === WEBHOOK RECEIVED ===');
      console.log('📅 Timestamp:', new Date().toISOString());
      console.log('🌐 Method:', req.method);
      console.log('🔗 URL:', req.url);
      console.log('📋 Headers:', JSON.stringify(req.headers, null, 2));
      console.log('📦 Body Type:', typeof req.body);
      console.log('📦 Body Content:', JSON.stringify(req.body, null, 2));
      console.log('📏 Body Length:', req.body ? (typeof req.body === 'string' ? req.body.length : JSON.stringify(req.body).length) : 0);
      console.log('==============================');

      const webhookSecret = process.env.DODO_WEBHOOK_SECRET;
      
      if (!webhookSecret) {
        console.error('❌ DODO_WEBHOOK_SECRET environment variable is not set');
        return res.status(500).json({ error: 'Webhook secret not configured' });
      }

      let payload: any;
      
      // Skip signature verification in development for testing
      if (process.env.NODE_ENV === 'development' && !req.headers['x-dodo-signature']) {
        console.log('Development mode: Skipping webhook signature verification');
        // Parse the Buffer to JSON if needed
        if (Buffer.isBuffer(req.body)) {
          console.log('🔧 Converting Buffer to JSON...');
          payload = JSON.parse(req.body.toString());
          console.log('✅ Buffer converted successfully');
        } else if (typeof req.body === 'string') {
          console.log('🔧 Parsing string to JSON...');
          payload = JSON.parse(req.body);
        } else {
          console.log('🔧 Using body as-is (already parsed)');
          payload = req.body;
        }
      } else {
        try {
          const webhook = new Webhook(webhookSecret);
          
          // Log signature header for debugging
          const signatureHeader = req.headers['x-dodo-signature'];
          console.log('Signature header:', signatureHeader);
          
          if (!signatureHeader) {
            console.error('No signature header found in webhook request');
            return res.status(400).json({ error: 'Missing signature header' });
          }

          payload = await webhook.verify(req.body, req.headers as any) as any;
          console.log('Webhook signature verified successfully');
        } catch (verificationError: any) {
          console.error('Webhook signature verification failed:', {
            error: verificationError.message,
            stack: verificationError.stack,
            signatureHeader: req.headers['x-dodo-signature'],
            bodyType: typeof req.body,
            bodyLength: req.body ? (typeof req.body === 'string' ? req.body.length : JSON.stringify(req.body).length) : 0
          });
          
          // In development, allow the webhook to proceed even if signature verification fails
          if (process.env.NODE_ENV === 'development') {
            console.log('Development mode: Proceeding with webhook despite signature verification failure');
            // Parse the Buffer to JSON if needed
            if (Buffer.isBuffer(req.body)) {
              console.log('🔧 Converting Buffer to JSON in error fallback...');
              payload = JSON.parse(req.body.toString());
            } else if (typeof req.body === 'string') {
              payload = JSON.parse(req.body);
            } else {
              payload = req.body;
            }
          } else {
            return res.status(400).json({ error: `Webhook signature verification failed: ${verificationError.message}` });
          }
        }
      }

      console.log('🔍 Processing webhook payload:', JSON.stringify(payload, null, 2));

      if (payload.event_type === "subscription.payment_succeeded") {
        const customerId = payload.customer_id;
        const productId = payload.product_id;

        console.log(`💰 Processing payment success for customer: ${customerId}, product: ${productId}`);

        const user = await prisma.user.findFirst({ where: { dodoCustomerId: customerId } });
        console.log('👤 Found user:', user ? `${user.email} (ID: ${user.id})` : 'No user found');
        
        if (user) {
          let newPlan: Plan = Plan.FREE;
          console.log('🔧 Checking product ID against environment variables:');
          console.log('   Product ID from webhook:', productId);
          console.log('   DODO_PRO_PLAN_ID:', process.env.DODO_PRO_PLAN_ID);
          console.log('   DODO_LIFETIME_PLAN_ID:', process.env.DODO_LIFETIME_PLAN_ID);
          
          if (productId === process.env.DODO_PRO_PLAN_ID) {
            newPlan = Plan.PRO;
            console.log('✅ Matched PRO plan');
          } else if (productId === process.env.DODO_LIFETIME_PLAN_ID) {
            newPlan = Plan.LIFETIME;
            console.log('✅ Matched LIFETIME plan');
          } else {
            console.log('❌ No plan match found');
          }

          if (newPlan !== Plan.FREE) {
            const updatedUser = await prisma.user.update({
              where: { id: user.id },
              data: { plan: newPlan },
            });
            console.log(`🎉 User ${user.email} successfully upgraded from ${user.plan} to ${newPlan}`);
            console.log('📝 Updated user:', JSON.stringify(updatedUser, null, 2));
          } else {
            console.log(`⚠️ Unknown product ID: ${productId}, keeping user on current plan: ${user.plan}`);
          }
        } else {
          console.log(`❌ No user found for customer ID: ${customerId}`);
        }
      } else {
        console.log(`🤷 Unhandled webhook event type: ${payload.event_type}`);
        console.log('Available event types we handle: subscription.payment_succeeded');
      }

      console.log('✅ Webhook processing completed successfully');
      return res.status(200).json({ received: true, message: 'Webhook processed successfully' });
    } catch (err: any) {
      console.error(`❌ Webhook processing failed:`, {
        error: err.message,
        stack: err.stack,
        headers: req.headers,
        body: req.body
      });
      return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }
  }
}