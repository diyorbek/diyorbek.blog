import PostEditPage from '../../../components/PostEditPage';
import { ArticleDTO, getArticle } from '../../../database/Article';
import NotFoundPage from '../../404';

export default function EditBlogPost({ post }: { post: ArticleDTO | null }) {
  if (!post) {
    return <NotFoundPage />;
  }
  console.log(post);

  return <PostEditPage edit={true} post={post} />;
}

export async function getServerSideProps({ params }: any) {
  const article = await getArticle(params.slug);

  return {
    props: {
      post: JSON.parse(JSON.stringify(article)),
    },
  };
}
