import cron, { ScheduledTask } from 'node-cron';
import axios from 'axios';
import { prisma } from '../utils/prisma';

// This service will fetch up-to-date analytics for posted content.
export class AnalyticsService {
  private static task: ScheduledTask;

  static initialize() {
    // Run the job every hour.
    this.task = cron.schedule('0 * * * *', this.fetchAnalytics, {
      timezone: "UTC"
    });
    console.log('📈 Analytics service initialized. Will run hourly.');
  }

  static stop() {
    if (this.task) this.task.stop();
    console.log('📈 Analytics service stopped.');
  }

  static async fetchAnalytics() {
    console.log('Fetching post analytics...');
    const postsToUpdate = await prisma.post.findMany({
      where: {
        status: 'Posted',
        reddit_post_id: { not: null },
      },
      select: { id: true, reddit_post_id: true }
    });

    if (postsToUpdate.length === 0) {
        console.log('No posts to update analytics for.');
        return;
    }
    
    // Reddit's info endpoint can take a comma-separated list of fullnames (e.g., t3_xyz)
    const postIds = postsToUpdate.map(p => p.reddit_post_id).join(',');

    try {
      // Using the public .json endpoint doesn't require auth for basic info.
      const response = await axios.get(`https://www.reddit.com/api/info.json?id=${postIds}`);
      const postsData = response.data.data.children;

      for (const postData of postsData) {
        const { name, score, num_comments } = postData.data;
        const postToUpdate = postsToUpdate.find(p => p.reddit_post_id === name);
        if (!postToUpdate?.id) continue; // skip if id is undefined
        await prisma.post.update({
          where: { id: postToUpdate.id },
          data: {
            current_upvotes: score,
            current_comments: num_comments,
            analytics_last_updated: new Date(),
          },
        });
      }
      console.log(`Successfully updated analytics for ${postsData.length} posts.`);
    } catch (error) {
      console.error('Failed to fetch analytics from Reddit:', error);
    }
  }
}