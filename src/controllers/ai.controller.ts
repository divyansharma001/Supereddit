import { Request, Response } from 'express';
import OpenAI from 'openai';

/**
 * Controller for AI-related endpoints
 */
export class AIController {
  private static openai: OpenAI;

  /**
   * Initialize OpenAI client
   */
  static initializeOpenAI(): void {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is required');
    }

    AIController.openai = new OpenAI({
      apiKey
    });
  }

  /**
   * Generate a Reddit post draft using AI
   */
  static async generateDraft(req: Request, res: Response): Promise<void> {
    try {
      const { keywords, tone } = req.body;

      // Validate input
      if (!keywords || !tone) {
        res.status(400).json({ error: 'Keywords and tone are required' });
        return;
      }

      const validTones = ['story', 'question', 'experience'];
      if (!validTones.includes(tone)) {
        res.status(400).json({ error: 'Tone must be one of: story, question, experience' });
        return;
      }

      if (!AIController.openai) {
        AIController.initializeOpenAI();
      }

      // Construct prompt based on tone
      let prompt: string;
      switch (tone) {
        case 'story':
          prompt = `Generate a Reddit post about "${keywords}". Write it as a personal story or anecdote. The post should be engaging, relatable, and encourage discussion. Format the response as JSON with "title" and "body" fields. Keep the title under 300 characters and the body between 200-2000 characters.`;
          break;
        case 'question':
          prompt = `Generate a Reddit post about "${keywords}". Write it as an engaging question that encourages community discussion. The post should be thought-provoking and invite responses. Format the response as JSON with "title" and "body" fields. Keep the title under 300 characters and the body between 200-2000 characters.`;
          break;
        case 'experience':
          prompt = `Generate a Reddit post about "${keywords}". Write it as a personal experience or observation that others can relate to. The post should be authentic and encourage sharing of similar experiences. Format the response as JSON with "title" and "body" fields. Keep the title under 300 characters and the body between 200-2000 characters.`;
          break;
        default:
          prompt = `Generate a Reddit post about "${keywords}". Write it in a conversational tone that encourages engagement. Format the response as JSON with "title" and "body" fields. Keep the title under 300 characters and the body between 200-2000 characters.`;
      }

      // Call OpenAI API
      const completion = await AIController.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that generates Reddit posts. Always respond with valid JSON containing "title" and "body" fields. Make the content engaging and appropriate for Reddit communities.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      const responseText = completion.choices[0]?.message?.content;
      if (!responseText) {
        res.status(500).json({ error: 'Failed to generate content' });
        return;
      }

      // Parse JSON response
      let parsedResponse;
      try {
        // Extract JSON from the response (in case there's extra text)
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No JSON found in response');
        }
        parsedResponse = JSON.parse(jsonMatch[0]);
      } catch (error) {
        console.error('Failed to parse AI response:', error);
        res.status(500).json({ error: 'Failed to parse AI response' });
        return;
      }

      // Validate response structure
      if (!parsedResponse.title || !parsedResponse.body) {
        res.status(500).json({ error: 'Invalid response structure from AI' });
        return;
      }

      // Clean and validate content
      const title = parsedResponse.title.trim();
      const body = parsedResponse.body.trim();

      if (title.length > 300) {
        res.status(500).json({ error: 'Generated title is too long' });
        return;
      }

      if (body.length < 50 || body.length > 2000) {
        res.status(500).json({ error: 'Generated body is not within acceptable length' });
        return;
      }

      res.json({
        title,
        body,
        keywords,
        tone
      });
    } catch (error) {
      console.error('AI draft generation error:', error);
      
      if (error instanceof Error && error.message.includes('API key')) {
        res.status(500).json({ error: 'OpenAI API not configured properly' });
      } else {
        res.status(500).json({ error: 'Failed to generate draft' });
      }
    }
  }

  /**
   * Get available tones for AI generation
   */
  static async getTones(req: Request, res: Response): Promise<void> {
    try {
      const tones = [
        {
          value: 'story',
          label: 'Personal Story',
          description: 'Share a personal anecdote or experience'
        },
        {
          value: 'question',
          label: 'Discussion Question',
          description: 'Ask an engaging question to the community'
        },
        {
          value: 'experience',
          label: 'Experience Share',
          description: 'Share an observation or experience for others to relate to'
        }
      ];

      res.json({ tones });
    } catch (error) {
      console.error('Get tones error:', error);
      res.status(500).json({ error: 'Failed to fetch tones' });
    }
  }
} 