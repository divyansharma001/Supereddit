import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import axios from 'axios';

export class VoteController {
  // POST /api/votes/purchase
  static async purchaseVotes(req: Request, res: Response) {
    // WARNING: This action violates Reddit ToS and will likely result in account bans.
    // For sandboxed testing purposes only.
    const { postId, amount } = req.body;
    const { userId, clientId } = req.user!;

    if (!postId || !amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'A valid postId and a positive amount are required.' });
    }

    const post = await prisma.post.findFirst({
      where: { id: postId, clientId }, // Ensure user owns the post
    });

    if (!post || !post.source_url) {
      return res.status(404).json({ message: 'Post not found or has not been published yet.' });
    }

    const apiKey = process.env.UPVOTESHOP_API_KEY;
    if (!apiKey) {
      console.error("UPVOTESHOP_API_KEY is not set in .env");
      return res.status(500).json({ message: 'Vote service is not configured.' });
    }

    const UPVOTE_SHOP_API_URL = 'https://upvote.shop/api/v2'; // Their actual API URL

    try {
      const response = await axios.post(UPVOTE_SHOP_API_URL, {
        key: apiKey,
        action: 'add',
        service: 1, // Service ID for Reddit Upvotes (confirm from their docs)
        link: post.source_url,
        quantity: amount,
      });

      if (!response.data || response.data.error) {
        throw new Error(response.data.error || 'Unknown error from upvote service');
      }

      // Log the successful order.
      await prisma.voteOrderLog.create({
        data: {
          service: 'upvote.shop',
          amount,
          external_ref: String(response.data.order),
          postId: post.id,
          userId: userId,
          clientId: clientId,
        },
      });

      return res.status(200).json({ message: 'Order placed successfully.', orderId: response.data.order });

    } catch (error: any) {
      console.error("Upvote.shop API error:", error.message);
      return res.status(500).json({ message: 'Failed to place order with upvote service.' });
    }
  }

  // GET /api/posts/:id/vote-history
  static async getVoteHistory(req: Request, res: Response) {
    const { id } = req.params;
    const { clientId } = req.user!;

    if (!id) {
      return res.status(400).json({ message: 'Post ID is required.' });
    }

    const history = await prisma.voteOrderLog.findMany({
        where: {
            postId: id,
            clientId,
        },
        orderBy: {
            created_at: 'desc',
        },
        select: {
            created_at: true,
            amount: true,
            service: true,
        },
    });

    // Always return 200 with an array (empty if no history)
    return res.status(200).json(history);
  }
}