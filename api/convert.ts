import { VercelRequest, VercelResponse } from '@vercel/node';
import { convertImagesToVideo } from '../utils/convertImagesToVideo';

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Missing required body: token' });
  }

  try {
    const convertTaskResult = await convertImagesToVideo(token as string);

    return res.status(200).json({
      error: false,
      status_url: convertTaskResult.task_url,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message, url_download: false });
  }
};
