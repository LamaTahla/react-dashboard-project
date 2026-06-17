import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import PageHeader from '/src/components/PageHeader.jsx';
import DetailItem from '/src/components/DetailItem.jsx';
import LoadingState from '/src/components/LoadingState.jsx';
import ErrorState from '/src/components/ErrorState.jsx';

import { getUserById } from '/src/api/usersService';
import { queryKeys } from '/src/api/queryKeys';

export default function UserDetailsPage() {
  const { id } = useParams();

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => getUserById(id),
    enabled: Boolean(id),
  });

  const errorMessage =
    error?.message || 'Failed to load user details.';

  if (isLoading) {
    return <LoadingState message="Loading user details..." />;
  }

  if (isError) {
    return <ErrorState message={errorMessage} />;
  }

  if (!user || !user.id) {
    return (
      <div>
        <PageHeader
          title="User not found"
          description="The user you are looking for does not exist."
        />

        <div className="form-actions">
          <Link to="/admin/users" className="form-cancel-btn">
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  const avatarUrl =
    user.avatar || `https://i.pravatar.cc/160?u=${user.id || id}`;

  const userRole = user.role || 'user';

  return (
    <div>
      <PageHeader
        title="User Details"
        description="View full information about this user."
      />

      <div className="card">
        <div className="user-details-header">
          <img
            src={avatarUrl}
            alt={user.name || 'User avatar'}
            className="user-details-avatar"
          />

          <div>
            <h2>{user.name || 'Unknown User'}</h2>
            <p>{user.email || 'No email available'}</p>

            <span className="role-badge">
              {userRole}
            </span>
          </div>
        </div>

        <h3 className="details-section-title">Basic Info</h3>

        <div className="details-grid">
          <DetailItem label="User ID" value={user.id} />
          <DetailItem label="Name" value={user.name || 'N/A'} />
          <DetailItem label="Username" value={user.username || 'N/A'} />
          <DetailItem label="Role" value={userRole} />
        </div>

        <h3 className="details-section-title">Contact Info</h3>

        <div className="details-grid">
          <DetailItem label="Email" value={user.email || 'N/A'} />
          <DetailItem label="Phone" value={user.phone || 'N/A'} />
          <DetailItem label="Website" value={user.website || 'N/A'} />
        </div>

        <h3 className="details-section-title">Location & Company</h3>

        <div className="details-grid">
          <DetailItem label="City" value={user.city || 'N/A'} />
          <DetailItem label="Company" value={user.company || 'N/A'} />
        </div>

        <div className="form-actions">
          <Link to="/admin/users" className="form-cancel-btn">
            Back to Users
          </Link>
        </div>
      </div>
    </div>
  );
}