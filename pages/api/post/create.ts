// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { createArticle } from '../../../database/Article';
import { connectDB } from '../../../database/connect';

connectDB();

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
      try {
        const blog = await createArticle(req.body);

        res.status(201).json({ data: blog });
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
    } else {
      res.status(400);
    }
  }
);
