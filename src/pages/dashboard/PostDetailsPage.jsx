import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getPostById } from '/src/api/postsService.js';
import { getUsers } from '/src/api/usersService.js';
import { queryKeys } from '/src/api/queryKeys.js';

import PageHeader from '/src/components/PageHeader.jsx';
import DetailItem from '/src/components/DetailItem.jsx';
import LoadingState from '/src/components/LoadingState.jsx';
import ErrorState from '/src/components/ErrorState.jsx';

export default function PostDetailsPage() {
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
  const errorMessage =
    postError?.message || usersError?.message || 'Failed to load post details';

  if (loading) {
    return <LoadingState message="Loading post details..." />;
  }

  if (isError) {
    return <ErrorState message={errorMessage} />;
  }

  if (!post || !post.id) {
    return (
      <div>
        <PageHeader
          title="Post not found"
          description="The post you are looking for does not exist."
        />

        <div className="form-actions">
          <Link to="/admin/posts" className="form-cancel-btn">
            Back to Posts
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl =
    post.imageUrl || `https://picsum.photos/seed/post-${post.id}/900/400`;

  const author = users.find((user) => String(user.id) === String(post.userId));

  const authorName = author?.name || `User ${post.userId || 'Unknown'}`;

  return (
    <div>
      <PageHeader
        title="Post Details"
        description="View full information about this post."
      />

      <div className="card">
        <img
          src={imageUrl}
          alt={post.title || 'Post image'}
          className="post-details-image"
        />

        <div className="details-grid">
          <DetailItem label="Post ID" value={post.id} />
          <DetailItem label="Author" value={authorName} />
        </div>

        <h2>{post.title || 'Untitled Post'}</h2>

        <p className="post-details-body">
          {post.body || 'No content available.'}
        </p>

        <div className="form-actions">
          <Link to="/admin/posts" className="form-cancel-btn">
            Back to Posts
          </Link>

          <Link
            to={`/admin/posts/${post.id}/edit`}
            className="form-submit-btn"
          >
            Edit Post
          </Link>
        </div>
      </div>
    </div>
  );
}