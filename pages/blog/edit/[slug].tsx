import PostEditPage from '../../../components/PostEditPage';
import { ArticleDTO, getArticle } from '../../../database/Article';
import { connectDB } from '../../../database/connect';
import NotFoundPage from '../../404';

export default function EditBlogPost({ post }: { post: ArticleDTO | null }) {
  if (!post) {
    return <NotFoundPage />;
  }

  return <PostEditPage edit={true} post={post} />;
}

export async function getServerSideProps({ params }: any) {
  await connectDB();
  const article = await getArticle(params.slug);

  return {
    props: {
      post: JSON.parse(JSON.stringify(article)),
    },
  };
}
