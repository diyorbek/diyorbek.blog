interface Article {
  title: string;
  content: string;
  contentPreview: string;
  slug: string;
  tags: string[];
  isListed: boolean;
  publishDate: string;
  description?: string;
}

export interface ArticleDTO extends Article {}

export type ListArticleDTO = Omit<ArticleDTO, 'content' | 'isListed'>;
