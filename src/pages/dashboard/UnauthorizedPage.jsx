import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function UnauthorizedPage() {
  const { currentUser } = useAuth();

  const backPath = currentUser?.role === 'editor' ? '/admin/posts' : '/admin';

  return (
    <div className="unauthorized-page">
      <div className="unauthorized-card">
        <div className="unauthorized-icon">!</div>

        <span className="eyebrow">Access Denied</span>

        <h1>You do not have permission</h1>

        <p>
          Your current role does not allow you to access this page.
          Please go back to an allowed dashboard section.
        </p>

        <div className="unauthorized-info">
          <span>Current user</span>
          <strong>{currentUser?.email || 'Guest'}</strong>
        </div>

        <div className="unauthorized-info">
          <span>Role</span>
          <strong>{currentUser?.role || 'guest'}</strong>
        </div>

        <Link to={backPath} className="primary-btn">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default UnauthorizedPage;