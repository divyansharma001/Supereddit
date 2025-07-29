// server/src/controllers/subscription.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import DodoPayments from 'dodopayments';
import { Webhook } from "standardwebhooks";
import { Plan } from '@prisma/client';
import { CountryCode } from 'dodopayments/resources/misc';

export class SubscriptionController {
  
  static async createCheckoutSession(req: Request, res: Response) {
    try {
      const { productId } = req.body;
      const user = req.user!;

      if (!process.env.DODO_PAYMENT_API_KEY || !process.env.FRONTEND_URL || !process.env.DODO_PRO_PLAN_ID || !process.env.DODO_LIFETIME_PLAN_ID) {
        return res.status(500).json({ error: 'Server configuration missing.' });
      }

      const dbUser = await prisma.user.findUnique({
        where: { id: user.userId },
        include: { client: true }
      });
      if (!dbUser) return res.status(404).json({ error: 'User not found.' });

      const dodo = new DodoPayments({
        bearerToken: process.env.DODO_PAYMENT_API_KEY,
        environment: 'live_mode'
      });

      let dodoCustomerId = dbUser.dodoCustomerId;
      if (!dodoCustomerId) {
        const customer = await dodo.customers.create({ email: dbUser.email, name: dbUser.client.name });
        dodoCustomerId = customer.customer_id;
        await prisma.user.update({ where: { id: dbUser.id }, data: { dodoCustomerId } });
      }

      let checkoutUrl: string | undefined;

     
      if (productId === process.env.DODO_PRO_PLAN_ID) {
        console.log("Creating a SUBSCRIPTION checkout for the PRO plan...");

        const subscription = await dodo.subscriptions.create({
          product_id: productId,
          quantity: 1,
          customer: { customer_id: dodoCustomerId },
          billing: {
              street: "123 App Street", city: "SaaSville", state: "CA",
              zipcode: "90210", country: "US" as any
          },
          payment_link: true,          
          return_url: `${process.env.FRONTEND_URL}/dashboard?payment=success`,
        });
        
        console.log("Dodo Payments SUBSCRIPTION response:", JSON.stringify(subscription, null, 2));
        
        checkoutUrl = subscription.payment_link ?? undefined;
        
      } else if (productId === process.env.DODO_LIFETIME_PLAN_ID) {
        console.log("Creating a one-time PAYMENT checkout for the LIFETIME plan...");
        
        const payment = await dodo.payments.create({
          customer: { customer_id: dodoCustomerId },
          product_cart: [{ product_id: productId, quantity: 1 }],
          payment_link: true,
          return_url: `${process.env.FRONTEND_URL}/dashboard?payment=success`,
          billing: {
              street: "123 App Street", city: "SaaSville", state: "CA",
              zipcode: "90210", country: "US" as any
          },
        });        
        console.log("Dodo Payments PAYMENT response:", JSON.stringify(payment, null, 2))                
        checkoutUrl = payment.payment_link ?? undefined;      
      } 
        
        
      else {
        return res.status(400).json({ error: 'Invalid product ID provided.' });
      }
      
      if (!checkoutUrl) {
        console.error('Failed to get a checkout URL from Dodo Payments.');
        return res.status(500).json({ error: 'Could not generate payment link.' });
      }

      return res.json({ url: checkoutUrl });

    } catch (error) {
      if (error instanceof DodoPayments.APIError) {
        console.error(`Dodo Payments API Error: ${error.status} ${error.name}`, error.error); 
        return res.status(error.status || 500).json({ error: 'Payment provider error.' });
      }
      console.error('Checkout error:', error);
      return res.status(500).json({ error: 'Failed to create checkout session.' });
    }
  }

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
          
          if (process.env.NODE_ENV === 'development') {
            console.log('Development mode: Proceeding with webhook despite signature verification failure');          
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

      const successfulPaymentEvents = [
        "subscription.payment_succeeded",
        "subscription.renewed",
        "payment.succeeded"
      ];

      if (successfulPaymentEvents.includes(payload.type)) {
        
        const eventData = payload.data; 
        const customerId = eventData.customer.customer_id;


        let productId: string | undefined;

        if (payload.type === 'payment.succeeded') {
          if (eventData.product_cart && eventData.product_cart.length > 0) {
            productId = eventData.product_cart[0].product_id;
          }
        } else {
          productId = eventData.product_id;
        }
        
        if (!productId) {
          console.log(`❌ Could not determine product ID from webhook type: ${payload.type}`);
          return res.status(200).json({ received: true, message: 'Webhook processed, but no product ID found.' });
        }


        console.log(`💰 Processing payment success for customer: ${customerId}, product: ${productId}`);

        const user = await prisma.user.findFirst({ where: { dodoCustomerId: customerId } });
        
        if (user) {
          let newPlan: Plan = Plan.FREE;
          
          if (productId === process.env.DODO_PRO_PLAN_ID) {
            newPlan = Plan.PRO;
          } else if (productId === process.env.DODO_LIFETIME_PLAN_ID) {
            newPlan = Plan.LIFETIME;
          }

          if (newPlan !== Plan.FREE) {
            await prisma.user.update({
              where: { id: user.id },
              data: { plan: newPlan },
            });
            console.log(`🎉 User ${user.email} successfully upgraded/renewed to ${newPlan}`);
          } else {
            console.log(`⚠️ Unknown product ID in webhook: ${productId}`);
          }
        } else {
          console.log(`❌ No user found for customer ID: ${customerId}`);
        }
      } else {
        console.log(`🤷 Unhandled webhook event type: ${payload.type}`);
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