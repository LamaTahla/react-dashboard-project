import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { getPosts } from '../../api/postsService';
import { getUsers } from '../../api/usersService';
import { queryKeys } from '../../api/queryKeys';

import PageHeader from '../../components/PageHeader';
import StatCard from '../../components/StatCard';
import SectionHeader from '../../components/SectionHeader';
import LoadingState from '../../components/LoadingState';
import ErrorState from '../../components/ErrorState';

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
        return <ErrorState message={errorMessage || 'Failed to load dashboard data'} />;
    }

    const totalPosts = posts.length;
    const totalUsers = users.length;

    const latestPosts = [...posts]
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
                <StatCard title="Total Posts" value={totalPosts} />
                <StatCard title="Total Users" value={totalUsers} />
                <StatCard title="Status" value="Active" type="text" />
            </div>

            <div className="dashboard-grid">
                <div className="card">
                    <SectionHeader
                        title="Latest Posts"
                        action={<Link to="/admin/posts">View All</Link>}
                    />

                    <div className="latest-list">
                        {latestPosts.map((post) => (
                            <Link
                                key={post.id}
                                to={`/admin/posts/${post.id}`}
                                className="latest-item"
                            >
                                <span>{post.title}</span>
                                <small>By {getAuthorName(post.userId)}</small>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <SectionHeader title="Quick Actions" />

                    <div className="quick-actions">
                        <Link to="/admin/posts">
                            <button type="button">View Posts</button>
                        </Link>

                        <Link to="/admin/posts/create">
                            <button type="button">Create Post</button>
                        </Link>

                        <Link to="/admin/settings">
                            <button type="button">Open Settings</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}