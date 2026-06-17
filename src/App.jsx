import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoadingState from './components/LoadingState';
import DashboardLayout from './layouts/DashboardLayout';
import WebsiteLayout from './layouts/WebsiteLayout';
import ProtectedRoute from './components/ProtectedRoute';

const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const LoginPage = lazy(() => import('./pages/dashboard/LoginPage'));
const ProfilePage = lazy(() => import('./pages/dashboard/ProfilePage'));
const UnauthorizedPage = lazy(() => import('./pages/dashboard/UnauthorizedPage'));
const Home = lazy(() => import('./pages/dashboard/Home'));

const CreatePostPage = lazy(() => import('./pages/dashboard/CreatePostPage'));
const PostsPage = lazy(() => import('./pages/dashboard/PostsPage'));
const PostDetailsPage = lazy(() => import('./pages/dashboard/PostDetailsPage'));
const EditPostPage = lazy(() => import('./pages/dashboard/EditPostPage'));
const UsersPage = lazy(() => import('./pages/dashboard/UsersPage'));
const UserDetailsPage = lazy(() => import('./pages/dashboard/UserDetailsPage'));
const SettingsPage = lazy(() => import('./pages/dashboard/SettingsPage'));

const PublicHome = lazy(() => import('./pages/website/PublicHome'));
const AboutPage = lazy(() => import('./pages/website/AboutPage'));
const BlogPage = lazy(() => import('./pages/website/BlogPage'));
const BlogDetailsPage = lazy(() => import('./pages/website/BlogDetailsPage'));
const ContactPage = lazy(() => import('./pages/website/ContactPage'));

export default function App() {
	return (
		<>
			<Suspense fallback={<LoadingState message="Loading page..." />}>
				<Routes>
					<Route element={<WebsiteLayout />}>
						<Route path="/" element={<PublicHome />} />
						<Route path="/about" element={<AboutPage />} />
						<Route path="/blog" element={<BlogPage />} />
						<Route path="/blog/:id" element={<BlogDetailsPage />} />
						<Route path="/contact" element={<ContactPage />} />
					</Route>

					<Route path="/login" element={<LoginPage />} />

					<Route
						path="/admin"
						element={
							<ProtectedRoute allowedRoles={['admin', 'editor']}>
								<DashboardLayout />
							</ProtectedRoute>
						}
					>
						<Route path="unauthorized" element={<UnauthorizedPage />} />

						<Route
							index
							element={
								<ProtectedRoute allowedRoles={['admin']}>
									<Home />
								</ProtectedRoute>
							}
						/>

						<Route
							path="posts"
							element={
								<ProtectedRoute allowedRoles={['admin', 'editor']}>
									<PostsPage />
								</ProtectedRoute>
							}
						/>

						<Route
							path="posts/create"
							element={
								<ProtectedRoute allowedRoles={['admin', 'editor']}>
									<CreatePostPage />
								</ProtectedRoute>
							}
						/>

						<Route
							path="posts/:id/edit"
							element={
								<ProtectedRoute allowedRoles={['admin', 'editor']}>
									<EditPostPage />
								</ProtectedRoute>
							}
						/>

						<Route
							path="posts/:id"
							element={
								<ProtectedRoute allowedRoles={['admin', 'editor']}>
									<PostDetailsPage />
								</ProtectedRoute>
							}
						/>

						<Route
							path="users"
							element={
								<ProtectedRoute allowedRoles={['admin']}>
									<UsersPage />
								</ProtectedRoute>
							}
						/>

						<Route
							path="users/:id"
							element={
								<ProtectedRoute allowedRoles={['admin']}>
									<UserDetailsPage />
								</ProtectedRoute>
							}
						/>

						<Route
							path="settings"
							element={
								<ProtectedRoute allowedRoles={['admin']}>
									<SettingsPage />
								</ProtectedRoute>
							}
						/>

						<Route
							path="profile"
							element={
								<ProtectedRoute allowedRoles={['admin', 'editor']}>
									<ProfilePage />
								</ProtectedRoute>
							}
						/>
					</Route>

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Suspense>

			<ToastContainer position="top-right" autoClose={2500} />
		</>
	);
}