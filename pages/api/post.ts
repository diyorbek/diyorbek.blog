// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import { Article } from '../../database/Article';
import { connectDB } from '../../database/connect';

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const blogs = await Article.find({});

      res.json({ data: blogs });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const blog = await Article.create(req.body);

      res.status(201).json({ data: blog });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400);
  }
};
