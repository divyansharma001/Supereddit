import { Request, Response } from 'express';
import axios from 'axios';

export class SubredditController {
  /**
   * Search for subreddits by keyword using Reddit API
   */
  static async searchSubreddits(req: Request, res: Response): Promise<void> {
    try {
      const { query } = req.query;
      if (!query || typeof query !== 'string') {
        res.status(400).json({ error: 'Query parameter is required' });
        return;
      }

      // Use Reddit API to search for subreddits
      const redditClientId = process.env.REDDIT_CLIENT_ID;
      const redditSecret = process.env.REDDIT_CLIENT_SECRET;
      const redditUserAgent = process.env.REDDIT_USER_AGENT || 'Supereddit/1.0';

      if (!redditClientId || !redditSecret) {
        res.status(500).json({ error: 'Reddit API credentials not configured' });
        return;
      }

      // Get app-only OAuth token
      const tokenResponse = await axios.post(
        'https://www.reddit.com/api/v1/access_token',
        'grant_type=client_credentials',
        {
          auth: {
            username: redditClientId!,
            password: redditSecret!,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': redditUserAgent,
          },
        }
      );
      const accessToken = tokenResponse.data.access_token;

      // Search subreddits
      const searchResponse = await axios.get(
        `https://oauth.reddit.com/subreddits/search`,
        {
          params: { q: query, limit: 10 },
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'User-Agent': redditUserAgent,
          },
        }
      );

      const subreddits = searchResponse.data.data.children.map((child: any) => ({
        name: child.data.display_name,
        title: child.data.title,
        description: child.data.public_description,
        subscribers: child.data.subscribers,
        url: `https://reddit.com${child.data.url}`,
        over18: child.data.over18,
        icon_img: child.data.icon_img,
      }));

      // For each subreddit, fetch rules and (placeholder) best time
      const enrichedSubreddits = await Promise.all(subreddits.map(async (sub: any) => {
        let rules = [];
        let bestTime = 'Coming soon';
        try {
          // Fetch subreddit rules
          const rulesRes = await axios.get(`https://oauth.reddit.com/r/${sub.name}/about/rules`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'User-Agent': redditUserAgent,
            },
          });
          rules = rulesRes.data.rules?.map((r: any) => ({
            short_name: r.short_name,
            description: r.description,
          })) || [];
        } catch (e) {
          // If rules fetch fails, leave empty
        }
        // TODO: Implement real analytics for best time
        return { ...sub, rules, bestTime };
      }));

      res.json({ subreddits: enrichedSubreddits });
    } catch (error) {
      console.error('Subreddit search error:', error);
      res.status(500).json({ error: 'Failed to search subreddits' });
    }
  }
} 