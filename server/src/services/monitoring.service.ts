// server/src/services/monitoring.service.ts

import cron from 'node-cron';
import axios from 'axios';
import { prisma } from '../utils/prisma';
import { io } from '../index';

let isRunning = false;
let redditToken: string | null = null;
let redditTokenExpiry: number = 0;

const getRedditToken = async () => {
  const now = Date.now() / 1000;
  if (redditToken && redditTokenExpiry > now + 60) return redditToken;
  
  console.log('Refreshing Reddit API token...');
  const clientId = process.env.REDDIT_CLIENT_ID;
  const clientSecret = process.env.REDDIT_CLIENT_SECRET;
  
  if (!clientId || !clientSecret) {
    throw new Error('Reddit API credentials (REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET) are missing in .env file');
  }
  
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const resp = await axios.post(
    'https://www.reddit.com/api/v1/access_token',
    'grant_type=client_credentials',
    { headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  
  redditToken = resp.data.access_token;
  redditTokenExpiry = now + resp.data.expires_in;
  console.log('Reddit API token refreshed successfully.');
  return redditToken;
};

const analyzeSentiment = (text: string): 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'UNKNOWN' => {
  if (/good|great|awesome|love|amazing/i.test(text)) return 'POSITIVE';
  if (/bad|terrible|hate|awful|problem/i.test(text)) return 'NEGATIVE';
  if (text.trim() === '') return 'UNKNOWN';
  return 'NEUTRAL';
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const runMonitoringJob = async () => {
  if (isRunning) {
    console.log('Monitoring job already in progress. Skipping.');
    return;
  }
  isRunning = true;
  console.log(`[${new Date().toISOString()}] Starting monitoring job...`);
  try {
    const token = await getRedditToken();
    const keywords = await prisma.keyword.findMany({ where: { is_active: true } });
    
    if (keywords.length === 0) {
      console.log('No active keywords to monitor.');
    }

    for (const keyword of keywords) {
      await delay(1200); // Respect Reddit rate limits
      
      const q = `"${keyword.term}"`;

      // --- DYNAMIC TIME WINDOW LOGIC ---
      // If the keyword has never been scanned, do a broad search (last month).
      // If it has been scanned, do a narrow search for recent mentions (last day).
      const timeWindow = keyword.lastScannedAt ? 'day' : 'month';
      const url = `https://oauth.reddit.com/search.json?sort=new&limit=100&q=${encodeURIComponent(q)}&t=${timeWindow}`;
      
      console.log(`[${keyword.term}] Searching URL (window: ${timeWindow}): ${url}`);
      
      const resp = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
      const results = resp.data?.data?.children || [];
      
      if (results.length > 0) {
        console.log(`[${keyword.term}] Found ${results.length} results. Checking for new mentions...`);
      }

      let newMentionsFound = 0;
      for (const post of results) {
        const data = post.data;
        const source_url = `https://reddit.com${data.permalink}`;
        
        const exists = await prisma.mention.findUnique({ where: { source_url } });
        if (exists) continue;
        
        newMentionsFound++;
        const content = [data.title, data.selftext].filter(Boolean).join(' ');
        const sentiment = analyzeSentiment(content);
        
        const mention = await prisma.mention.create({
          data: {
            source_url,
            content_snippet: content.slice(0, 500),
            author: data.author,
            subreddit: data.subreddit,
            sentiment,
            found_at: new Date(data.created_utc * 1000),
            keywordId: keyword.id,
            clientId: keyword.clientId,
          },
        });
        
        console.log(`[${keyword.term}] New mention found and saved! Emitting to client ${mention.clientId}.`);
        io.to(mention.clientId).emit('new_mention', mention);
      }

      if (newMentionsFound > 0) {
        console.log(`[${keyword.term}] Finished processing. ${newMentionsFound} new mentions were saved.`);
      }
      
      // We always update lastScannedAt so the next run uses the narrow 'day' window.
      await prisma.keyword.update({ where: { id: keyword.id }, data: { lastScannedAt: new Date() } });
    }
  } catch (err: any) {
    console.error('--- MONITORING JOB FAILED ---');
    if (axios.isAxiosError(err)) {
        console.error('Axios Error:', {
            message: err.message,
            status: err.response?.status,
            statusText: err.response?.statusText,
            data: err.response?.data
        });
        if (err.response?.status === 401) {
            console.error('CRITICAL: Reddit API returned 401 Unauthorized. Check your credentials.');
        }
    } else {
        console.error('Non-Axios Error:', err.message, err.stack);
    }
    console.error('-----------------------------');
  } finally {
    isRunning = false;
    console.log(`[${new Date().toISOString()}] Monitoring job finished.`);
  }
};

cron.schedule('*/1 * * * *', runMonitoringJob);

export const triggerMonitoringJob = runMonitoringJob;