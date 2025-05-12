import { readdir, readFile } from 'fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';
import path from 'path';
import { ArticleDTO, ListArticleDTO } from '../database/Article';

function correctImageLinks(content: string) {
  return content.replaceAll(/\]\(\/public\/images\//g, '](/images/');
}

export async function getMarkdownArticleFiles(): Promise<string[]> {
  const dirPath = path.join(process.cwd(), 'public/articles');
  const files = await readdir(dirPath);
  return files.filter((fileName) => fileName.endsWith('.md'));
}

export async function getMarkdownArticle(
  fileName: string
): Promise<ArticleDTO> {
  const dirPath = path.join(process.cwd(), 'public/articles');
  const content = await readFile(path.join(dirPath, fileName), {
    encoding: 'utf-8',
  });
  const slug = fileName.replace('.md', '');

  return {
    _id: slug,
    slug,
    content: correctImageLinks(content),
    ...readMetadata(content),
  };
}

export async function getMarkdownArticles(
  { listedOnly } = { listedOnly: true }
): Promise<ListArticleDTO[]> {
  const files = await getMarkdownArticleFiles();
  const articles = await Promise.all(
    files.map(async (fileName) => {
      const { content, ...listArticle } = await getMarkdownArticle(fileName);
      return listArticle;
    })
  );

  if (listedOnly) return articles.filter((article) => article.isListed);

  return articles;
}

type MarkdownMetadata = Pick<
  ArticleDTO,
  | 'title'
  | 'publishDate'
  | 'tags'
  | 'isListed'
  | 'contentPreview'
  | 'description'
>;

function readMetadata(markdownContent: string): MarkdownMetadata {
  const { data, content } = matter(markdownContent);
  const contentPreview =
    data.description ||
    marked
      .parse(content, { async: false })
      .replace(/<[^>]+>/g, '')
      .substring(0, 150);

  return {
    ...data,
    isListed: data.isListed ?? true,
    publishDate: new Date(data.publishDate).toISOString().split('T')[0],
    title: data.title,
    tags: data.tags?.split(/,\s+/)!,
    contentPreview,
  };
}
