import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user and client
 * @access Public
 */
router.post('/register', AuthController.register);

/**
 * @route POST /api/auth/login
 * @desc Login user
 * @access Public
 */
router.post('/login', AuthController.login);

/**
 * @route POST /api/auth/reddit/oauth/connect
 * @desc Get Reddit OAuth URL
 * @access Private
 */
router.post('/reddit/oauth/connect', authenticateToken, AuthController.getRedditOAuthUrl);

/**
 * @route GET /api/auth/reddit/oauth/callback
 * @desc Handle Reddit OAuth callback
 * @access Private
 */
router.get('/reddit/oauth/callback', authenticateToken, AuthController.handleRedditCallback);

export default router; 