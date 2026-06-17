import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import PageHeader from '../../components/PageHeader';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';
import PostCard from '../../components/PostCard';

import { getPosts } from '../../api/postsService';
import { getUsers } from '../../api/usersService';
import { queryKeys } from '../../api/queryKeys';

function BlogPage() {
  const {
    data: posts = [],
    isLoading: postsLoading,
    isError: postsIsError,
    error: postsError,
  } = useQuery({
    queryKey: queryKeys.posts,
    queryFn: getPosts,
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

  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get('search') || '';
  const sortBy = searchParams.get('sort') || 'newest';
  const currentPage = Number(searchParams.get('page')) || 1;

  const postsPerPage = 6;

  const loading = postsLoading || usersLoading;
  const isError = postsIsError || usersIsError;
  const errorMessage = postsError?.message || usersError?.message;

  function updateSearchParams(newParams) {
    const params = {
      search: searchTerm,
      sort: sortBy,
      page: currentPage,
      ...newParams,
    };

    if (!params.search) {
      delete params.search;
    }

    if (params.sort === 'newest') {
      delete params.sort;
    }

    if (Number(params.page) === 1) {
      delete params.page;
    }

    setSearchParams(params);
  }

  const getAuthorName = (userId) => {
    const user = users.find((user) => String(user.id) === String(userId));

    return user?.name || `User ${userId}`;
  };

  const filteredPosts = posts.filter((post) => {
    const searchValue = searchTerm.toLowerCase();
    const title = post.title || '';
    const body = post.body || '';

    return (
      title.toLowerCase().includes(searchValue) ||
      body.toLowerCase().includes(searchValue)
    );
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    if (sortBy === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    if (sortBy === 'title-asc') {
      return (a.title || '').localeCompare(b.title || '');
    }

    if (sortBy === 'title-desc') {
      return (b.title || '').localeCompare(a.title || '');
    }

    return 0;
  });

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const safeCurrentPage = Math.min(currentPage, totalPages || 1);

  const startIndex = (safeCurrentPage - 1) * postsPerPage;
  const currentPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

  if (loading) {
    return <LoadingState message="Loading blog posts..." />;
  }

  if (isError) {
    return <ErrorState message={errorMessage || 'Failed to load blog posts'} />;
  }

  return (
    <div className="page">
      <PageHeader
        title="Blog"
        subtitle="Search and read latest posts"
      />

      <div className="blog-toolbar">
        <div className="search-row">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(event) => {
              updateSearchParams({
                search: event.target.value,
                page: 1,
              });
            }}
            className="search-input"
          />

          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => {
                updateSearchParams({
                  search: '',
                  page: 1,
                });
              }}
            >
              Clear
            </button>
          )}

          <select
            value={sortBy}
            onChange={(event) => {
              updateSearchParams({
                sort: event.target.value,
                page: 1,
              });
            }}
            className="sort-select"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
          </select>
        </div>

        <p className="blog-results-count">
          Showing {currentPosts.length} of {filteredPosts.length} posts
        </p>
      </div>

      {filteredPosts.length === 0 ? (
        <EmptyState message="No posts match your search." />
      ) : (
        <>
          <div className="posts-grid">
            {currentPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="post-card-link"
              >
                <PostCard
                  post={post}
                  getAuthorName={getAuthorName}
                />
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="blog-pagination">
              <button
                type="button"
                disabled={safeCurrentPage === 1}
                onClick={() => updateSearchParams({ page: safeCurrentPage - 1 })}
              >
                Previous
              </button>

              <span>
                Page {safeCurrentPage} of {totalPages}
              </span>

              <button
                type="button"
                disabled={safeCurrentPage === totalPages}
                onClick={() => updateSearchParams({ page: safeCurrentPage + 1 })}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BlogPage;