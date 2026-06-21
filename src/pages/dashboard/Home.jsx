import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  FaFileAlt,
  FaUsers,
  FaCheckCircle,
  FaPlus,
  FaList,
  FaCog,
  FaInfoCircle,
  FaEnvelope,
  FaExternalLinkAlt,
} from "react-icons/fa";

import { getPosts } from "../../api/postsService";
import { getUsers } from "../../api/usersService";
import { queryKeys } from "../../api/queryKeys";

import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import SectionHeader from "../../components/SectionHeader";
import LoadingState from "../../components/LoadingState";
import ErrorState from "../../components/ErrorState";

export default function Home() {
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

  const loading = postsLoading || usersLoading;
  const isError = postsIsError || usersIsError;
  const errorMessage = postsError?.message || usersError?.message;

  if (loading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  if (isError) {
    return (
      <ErrorState message={errorMessage || "Failed to load dashboard data"} />
    );
  }

  const blogPosts = posts.filter((post) => post.type !== "page");

  const totalPosts = blogPosts.length;
  const totalUsers = users.length;

  const latestPosts = [...blogPosts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const getAuthorName = (userId) => {
    const user = users.find((user) => String(user.id) === String(userId));

    return user?.name || `User ${userId}`;
  };

  return (
    <div>
      <PageHeader
        title="Dashboard Overview"
        description="Welcome back! Here is a quick overview of your dashboard data."
      />

      <div className="cards-grid">
        <div className="card stat-card">
          <div className="stat-icon">
            <FaFileAlt />
          </div>
          <p className="stat-number">{totalPosts}</p>
          <p className="stat-text">Total Posts</p>
        </div>

        <div className="card stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <p className="stat-number">{totalUsers}</p>
          <p className="stat-text">Total Users</p>
        </div>

        <div className="card stat-card">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <p className="stat-number">Active</p>
          <p className="stat-text">Status</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <SectionHeader
            title="Latest Posts"
            action={<Link to="/admin/posts">View All</Link>}
          />

          <div className="latest-list">
            {latestPosts.length > 0 ? (
              latestPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/admin/posts/${post.id}`}
                  className="latest-item"
                >
                  <span>{post.title}</span>
                  <small>By {getAuthorName(post.userId)}</small>
                </Link>
              ))
            ) : (
              <div className="empty-state compact">
                <h3>No posts yet</h3>
                <p>Create your first post to see it here.</p>
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <SectionHeader title="Quick Actions" />

          <div className="quick-actions">
            <Link to="/admin/posts/create">
              <button type="button">
                <FaPlus />
                <span>Create Post</span>
              </button>
            </Link>

            <Link to="/admin/posts">
              <button type="button">
                <FaList />
                <span>Manage Posts</span>
              </button>
            </Link>

            <Link to="/admin/about-settings">
              <button type="button">
                <FaInfoCircle />
                <span>Edit About Page</span>
              </button>
            </Link>

            <Link to="/admin/contact-settings">
              <button type="button">
                <FaEnvelope />
                <span>Edit Contact Page</span>
              </button>
            </Link>

            <Link to="/admin/settings">
              <button type="button">
                <FaCog />
                <span>Open Settings</span>
              </button>
            </Link>

            <Link to="/" target="_blank" rel="noreferrer">
              <button type="button" className="secondary-btn">
                <FaExternalLinkAlt />
                <span>View Website</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}