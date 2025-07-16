// server/src/routes/keyword.routes.ts

import { Router } from 'express';
import { createKeyword, getKeywords, deleteKeyword } from '../controllers/keyword.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

router.post('/', createKeyword);
router.get('/', getKeywords);
router.delete('/:id', deleteKeyword);

export default router;