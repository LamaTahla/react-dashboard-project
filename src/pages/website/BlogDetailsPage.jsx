import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';

import { getPostById } from '../../api/postsService';
import { getUsers } from '../../api/usersService';
import { queryKeys } from '../../api/queryKeys';

function BlogDetailsPage() {
  const { id } = useParams();

  const {
    data: post,
    isLoading: postLoading,
    isError: postIsError,
    error: postError,
  } = useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => getPostById(id),
    enabled: Boolean(id),
  });

  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersIsError,
    error: usersError,
  } = useQuery({
    queryKey: queryKeys.users,
    queryFn: getUsers,
  });

  const loading = postLoading || usersLoading;
  const isError = postIsError || usersIsError;
  const errorMessage = postError?.message || usersError?.message;

  if (loading) {
    return <LoadingState message="Loading post..." />;
  }

  if (isError) {
    return <ErrorState message={errorMessage || 'Failed to load post.'} />;
  }

  if (!post || !post.id) {
    return <ErrorState message="Post not found." />;
  }

  const imageUrl =
    post.imageUrl || `https://picsum.photos/seed/post-${post.id}/900/400`;

  const author = users.find((user) => String(user.id) === String(post.userId));
  const authorName = author?.name || `User ${post.userId}`;

  return (
    <section className="blog-details-page">
      <div className="container">
        <Link to="/blog" className="back-link">
          ← Back to Blog
        </Link>

        <article className="blog-details-card">
          <img
            src={imageUrl}
            alt={post.title || 'Post image'}
            className="blog-details-image"
          />

          <div className="blog-details-content">
            <span className="blog-details-meta">
              By {authorName}
            </span>

            <h1>{post.title}</h1>

            <p>{post.body}</p>
          </div>
        </article>
      </div>
    </section>
  );
}

export default BlogDetailsPage;