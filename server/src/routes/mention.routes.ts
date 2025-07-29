// server/src/routes/mention.routes.ts

import { Router } from 'express';
import { getMentions } from '../controllers/mention.controller';
import { authenticateToken, requireProPlan } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

// Mentions could be a PRO feature for advanced monitoring
router.get('/', requireProPlan, getMentions);

export default router;