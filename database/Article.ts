import { Document, Model, model, models, Schema } from 'mongoose';

interface Article {
  title: string;
  content: string;
  contentPreview: string;
  slug: string;
  tags: string[];
  isListed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleDTO extends Article {
  _id: string;
}

interface ArticleDocument extends Article, Document {}

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
    contentPreview: {
      type: String,
      maxLength: [150, 'Preview should be less than 150 characters'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Post should have a slug'],
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isListed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const Article =
  (models.Article as Model<ArticleDocument>) ||
  model<ArticleDocument>('Article', ArticleSchema);

export async function getArticlesList() {
  const articles = await Article.find({}).sort({ createdAt: 'desc' }).lean();

  return articles
    .filter(({ isListed }) => isListed)
    .map(({ _id, slug, title, contentPreview, createdAt }) => ({
      _id,
      contentPreview,
      createdAt,
      slug,
      title,
    }));
}

export async function getArticle(slug: string) {
  return await Article.findOne({ slug });
}

export async function createArticle(body: any) {
  return await Article.create(body);
}
