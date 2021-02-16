// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import { createArticle, getArticlesList } from '../../../database/Article';
import { connectDB } from '../../../database/connect';

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const blogs = await getArticlesList();

      res.json({ data: blogs });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400);
  }
};
