import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import '../styles/dashboard.css';
import ThemeToggle from "../components/ThemeToggle";
function DashboardLayout() {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();

    const isAdmin = currentUser?.role === 'admin';
    const isEditor = currentUser?.role === 'editor';

    function handleLogout() {
        logout();
        toast.success('Logged out successfully');
        navigate('/login', { replace: true });
    }

    return (
        <div className="dashboard-layout">
            <aside className="sidebar">
                <h2>Dashboard</h2>

                <nav className="sidebar-nav">
                    {isAdmin && (
                        <NavLink to="/admin" end>
                            Dashboard
                        </NavLink>
                    )}
                    {isAdmin && (
                        <NavLink to="/admin/about-settings" end>
                            About Setting
                        </NavLink>
                    )}
                   
                    {(isAdmin || isEditor) && (
                        <NavLink to="/admin/contact-settings">
                            Contact Setting
                        </NavLink>
                    )}

                    {(isAdmin || isEditor) && (
                        <NavLink to="/admin/posts">
                            Posts
                        </NavLink>
                    )}

                    {isAdmin && (
                        <>
                            <NavLink to="/admin/users">
                                Users
                            </NavLink>

                            <NavLink to="/admin/settings">
                                Settings
                            </NavLink>
                        </>
                    )}

                    {(isAdmin || isEditor) && (
                        <NavLink to="/admin/profile">
                            Profile
                        </NavLink>
                    )}
                </nav>

                <button
                    type="button"
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </aside>

            <div className="dashboard-main">
                <header className="topbar">
                    <div>
                        <h1>React Dashboard</h1>
                        <p>Welcome back, {currentUser?.name || 'User'}</p>
                    </div>
                    <div className="topbar-user">
                        <span>{currentUser?.email}</span>
                        <span className="user-role">{currentUser?.role}</span>
                        <ThemeToggle />
                    </div>
                    

                </header>

                <main className="dashboard-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;