// server/src/routes/keyword.routes.ts

import { Router } from 'express';
import { createKeyword, getKeywords, deleteKeyword } from '../controllers/keyword.controller';
import { authenticateToken, requireProPlan } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

// This will protect all keyword-related actions
router.use(requireProPlan);
router.post('/', createKeyword); // This line is now protected
router.get('/', getKeywords);
router.delete('/:id', deleteKeyword);

export default router;