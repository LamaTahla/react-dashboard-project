import { useAuth } from '../../context/AuthContext';
import PageHeader from '../../components/PageHeader';

function ProfilePage() {
  const { currentUser } = useAuth();

  return (
    <div>
      <PageHeader
        title="Admin Profile"
        subtitle="View the current logged-in admin information."
      />

      <div className="details-card">
        <div className="detail-item">
          <span>Name</span>
          <strong>{currentUser?.name || 'N/A'}</strong>
        </div>

        <div className="detail-item">
          <span>Email</span>
          <strong>{currentUser?.email || 'N/A'}</strong>
        </div>

        <div className="detail-item">
          <span>Role</span>
          <strong>{currentUser?.role || 'N/A'}</strong>
        </div>

        <div className="detail-item">
          <span>Status</span>
          <strong>Logged In</strong>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;