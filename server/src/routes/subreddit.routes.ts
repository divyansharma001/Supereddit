import { Router } from 'express';
import { SubredditController } from '../controllers/subreddit.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// GET /api/subreddits/search?query=keyword
router.get('/search', SubredditController.searchSubreddits);

// GET /api/subreddits/:name/details
router.get('/:name/details', SubredditController.getSubredditDetails);

// GET /api/subreddits/:name/analytics
router.get('/:name/analytics', SubredditController.getSubredditAnalytics);

export default router; 