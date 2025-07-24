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
 * @route GET /api/auth/me
 * @desc Get current authenticated user info
 * @access Private
 */
router.get('/me', authenticateToken, AuthController.me);

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

/**
 * @route GET /api/reddit/accounts
 * @desc List all Reddit accounts for the authenticated user's client
 * @access Private
 */
router.get('/reddit/accounts', authenticateToken, AuthController.getRedditAccounts);

/**
 * @route POST /api/auth/reddit/oauth/login
 * @desc Get Reddit OAuth URL for login/signup (no JWT required)
 * @access Public
 */
router.post('/reddit/oauth/login', AuthController.redditLoginOAuthUrl);

/**
 * @route GET /api/auth/reddit/oauth/login/callback
 * @desc Handle Reddit OAuth callback for login/signup (no JWT required)
 * @access Public
 */
router.get('/reddit/oauth/login/callback', AuthController.redditLoginOAuthCallback);

export default router; 