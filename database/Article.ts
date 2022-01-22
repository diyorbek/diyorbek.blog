import { Document, Model, model, models, Schema } from 'mongoose';

interface Article {
  title: string;
  content: string;
  contentPreview: string;
  slug: string;
  tags: string[];
  isListed: boolean;
  publishDate: string;
}

export interface ArticleDTO extends Article {
  _id: string;
}

interface ArticleDocument extends Article, Document {}

const ArticleSchema = new Schema({
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
  publishDate: {
    type: String,
    required: [true, 'Publish date is required'],
    trim: true,
  },
});

const Article =
  (models.Article as Model<ArticleDocument>) ||
  model<ArticleDocument>('Article', ArticleSchema);

export async function getArticlesList() {
  const articles = await Article.find({}).sort({ createdAt: 'desc' }).lean();

  return articles
    .filter(({ isListed }) => isListed)
    .map(({ _id, slug, title, contentPreview, publishDate }) => ({
      _id,
      contentPreview,
      publishDate,
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

export async function updateArticle(slug: string, body: any) {
  const article = await getArticle(slug);

  if (article) {
    article.set(body);
    await article.save();

    return article;
  }

  return null;
}
