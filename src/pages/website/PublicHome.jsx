import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import PostCard from '../../components/PostCard';

import { getPosts } from '../../api/postsService';
import { queryKeys } from '../../api/queryKeys';

function PublicHome() {
  const {
    data: posts = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.posts,
    queryFn: getPosts,
  });

  const latestPosts = posts.slice(-4).reverse();

  return (
    <>
      <section className="hero-section">
        <h1>Welcome to My Website</h1>

        <p>
          Explore articles, learn more about us, and manage content from the
          admin dashboard.
        </p>

        <div className="form-actions website">
          <Link to="/blog" className="form-cancel-btn">
            View Blog
          </Link>
          <Link to="/about" className="form-submit-btn">
            About Us
          </Link>
        </div>
      </section>

      <section className="latest-posts-section">
        <div className="section-title-row">
          <div>
            <h2>Latest Posts</h2>
            <p>Read the newest articles from our blog.</p>
          </div>

          <Link to="/blog" className="view-all-link">
            View all posts
          </Link>
        </div>

        {isLoading && <LoadingState message="Loading latest posts..." />}

        {isError && (
          <ErrorState message={error?.message || 'Failed to load latest posts'} />
        )}

        {!isLoading && !isError && (
          <div className="posts-grid">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="post-card-link"
              >
                <PostCard post={post} />
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default PublicHome;