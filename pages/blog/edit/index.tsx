import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import PostEditPage from '../../../components/PostEditPage';

export default withPageAuthRequired(function NewBlogPost() {
  return <PostEditPage post={{}} />;
});
