import { VercelRequest, VercelResponse } from '@vercel/node';
import { evalTranspiler } from '../utils/evalTranspiler';
import { getEvalCode } from '../utils/getEvalCode';
import { summarizeData } from '../utils/summarizeData';

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'GET') {
    return res
      .status(405)
      .json({ error: 'Method Not Allowed. Only GET requests are permitted.' });
  }

  const { url } = req.query;

  if (!url) {
    return res
      .status(400)
      .json({ error: 'Missing required query parameter: url' });
  }

  try {
    const evalCode = await getEvalCode(url as string);

    const transpiledEvalCode = evalTranspiler(evalCode);

    const result = summarizeData(transpiledEvalCode);

    res.status(200).json(result).end();
  } catch (error) {
    res.status(500).json({ error: error.message }).end();
  }
};
