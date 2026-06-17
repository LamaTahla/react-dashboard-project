import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser, isLoading, hasRole } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!hasRole(allowedRoles)) {
    return <Navigate to="/admin/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;