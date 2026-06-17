import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import PageHeader from '../../components/PageHeader';
import PostsDataTable from '../../components/PostsDataTable';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';
import EmptyState from '../../components/EmptyState';

import { getPosts, deletePost } from '../../api/postsService';
import { getUsers } from '../../api/usersService';
import { queryKeys } from '../../api/queryKeys';

export default function PostsPage() {
  const queryClient = useQueryClient();

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

  const [search, setSearch] = useState('');
  const [postToDelete, setPostToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState('');

  const deleteMutation = useMutation({
    mutationFn: deletePost,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.posts,
      });

      toast.success('Post deleted successfully');
      setPostToDelete(null);
      setDeleteError('');
    },

    onError: (error) => {
      setDeleteError(error.message || 'Failed to delete post');
      toast.error(error.message || 'Failed to delete post');
    },
  });

  const isDeleting = deleteMutation.isPending;

  const pageLoading = postsLoading || usersLoading;
  const pageError = postsIsError || usersIsError;
  const pageErrorMessage =
    postsError?.message || usersError?.message || 'Failed to load data';

  const filteredPosts = posts.filter((post) => {
    const title = post.title || '';

    return title.toLowerCase().includes(search.toLowerCase());
  });

  const getAuthorName = (userId) => {
    const user = users.find((user) => String(user.id) === String(userId));

    return user?.name || `User ${userId}`;
  };

  const handleOpenDeleteModal = (post) => {
    setPostToDelete(post);
    setDeleteError('');
  };

  const handleCloseDeleteModal = () => {
    if (isDeleting) return;

    setPostToDelete(null);
    setDeleteError('');
  };

  const handleConfirmDelete = () => {
    if (!postToDelete || isDeleting) return;

    setDeleteError('');
    deleteMutation.mutate(postToDelete.id);
  };

  if (pageLoading) {
    return <LoadingState message="Loading posts..." />;
  }

  if (pageError) {
    return <ErrorState message={pageErrorMessage} />;
  }

  const hasPosts = posts.length > 0;
  const hasFilteredPosts = filteredPosts.length > 0;

  return (
    <div>
      <PageHeader
        title="Posts"
        description="Browse posts from API using DataTable."
      />

      <div className="page-actions">
        <Link to="/admin/posts/create" className="primary-btn">
          Create Post
        </Link>
      </div>

      <div className="table-section">
        <div className="table-toolbar">
          <div>
            <h2>Posts List</h2>
            <p>
              Showing {filteredPosts.length} of {posts.length} posts
            </p>
          </div>

          <input
            className="table-search"
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={!hasPosts}
          />
        </div>

        {!hasPosts ? (
          <EmptyState message="No posts found. Create your first post." />
        ) : !hasFilteredPosts ? (
          <EmptyState message="No posts match your search." />
        ) : (
          <PostsDataTable
            posts={filteredPosts}
            onDeletePost={handleOpenDeleteModal}
            getAuthorName={getAuthorName}
          />
        )}
      </div>

      {postToDelete && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <h3>Delete Post</h3>

            <p>Are you sure you want to delete this post?</p>

            <strong className="delete-post-title">
              {postToDelete.title}
            </strong>

            {deleteError && <p className="field-error">{deleteError}</p>}

            <div className="modal-actions">
              <button
                type="button"
                className="form-cancel-btn"
                onClick={handleCloseDeleteModal}
                disabled={isDeleting}
              >
                Cancel
              </button>

              <button
                type="button"
                className="modal-delete-btn"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}