import { NextApiRequest, NextApiResponse } from 'next';
import { updateArticle } from '../../../database/Article';
import { connectDB } from '../../../database/connect';

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PATCH') {
    try {
      const article = await updateArticle(req.query.slug as string, req.body);

      if (article) {
        res.json({ data: article });
      } else {
        res.status(404).json({ error: 'Article not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400);
  }
};
