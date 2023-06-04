import { Request, Response, Router } from 'express';

import AiService from '../services/AiService';
import OpenAiService from '../services/OpenAiService';

import { logConsole } from '../utils/logUtil';

const aiRouter = Router();

aiRouter.get('/relatedToFromCSV', async (_req, res: Response) => {
  const aiService = new AiService();

  await aiService.isRelatedTo();

  logConsole('Done');
  return res.status(200).json({
    message: 'Done',
  });
});

aiRouter.get('/relatedTo', async (req: Request, res: Response) => {
  const { firstMessage, subject } = req.body;

  try {
    const openAiService = new OpenAiService();
    const completion = await openAiService.isRelatedTo({
      firstMessage,
      subject,
    });

    res
      .status(200)
      .json({ result: (completion.choices[0] as any).message });
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(
        `Error with OpenAI API request: ${error.message}`
      );
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
});

export default aiRouter;
