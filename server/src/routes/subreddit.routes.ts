import { Router } from 'express';
import { SubredditController } from '../controllers/subreddit.controller';

const router = Router();

// GET /api/subreddits/search?query=keyword
router.get('/search', SubredditController.searchSubreddits);

export default router; 