import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { VoteController } from '../controllers/vote.controller';

const router = Router();

// All routes here are protected
router.use(authenticateToken);

router.post('/purchase', VoteController.purchaseVotes);

export default router;