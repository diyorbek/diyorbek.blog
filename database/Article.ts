import { Document, Model, model, models, Schema } from 'mongoose';

export interface ArticleDocument extends Document {
  title: string;
  content: string;
  tags: string[];
}

const ArticleSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Post should have a title'],
      trim: true,
      maxLength: [200, 'Title should be less than 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Post should have content'],
      trim: true,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

export const Article =
  (models.Article as Model<ArticleDocument>) ||
  model<ArticleDocument>('Article', ArticleSchema);
