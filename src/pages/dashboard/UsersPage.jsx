import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getUsers } from '/src/api/usersService.js';
import { queryKeys } from '/src/api/queryKeys.js';

import PageHeader from '/src/components/PageHeader.jsx';
import UsersDataTable from '/src/components/UsersDataTable.jsx';
import LoadingState from '/src/components/LoadingState.jsx';
import ErrorState from '/src/components/ErrorState.jsx';
import EmptyState from '/src/components/EmptyState.jsx';

export default function UsersPage() {
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.users,
    queryFn: getUsers,
  });

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filteredUsers = users.filter((user) => {
    const searchValue = search.toLowerCase();

    const name = user.name || '';
    const username = user.username || '';
    const email = user.email || '';
    const role = user.role || 'user';

    const matchesSearch =
      name.toLowerCase().includes(searchValue) ||
      username.toLowerCase().includes(searchValue) ||
      email.toLowerCase().includes(searchValue);

    const matchesRole =
      roleFilter === 'all' || role.toLowerCase() === roleFilter;

    return matchesSearch && matchesRole;
  });

  if (isLoading) {
    return <LoadingState message="Loading users..." />;
  }

  if (isError) {
    return <ErrorState message={error?.message || 'Failed to load users'} />;
  }

  const hasUsers = users.length > 0;
  const hasFilteredUsers = filteredUsers.length > 0;

  return (
    <div>
      <PageHeader
        title="Users"
        description="Browse and filter users from MockAPI."
      />

      <div className="table-section">
        <div className="table-toolbar">
          <div>
            <h2>Users List</h2>
            <p>
              Showing {filteredUsers.length} of {users.length} users
            </p>
          </div>

          <div className="toolbar-controls">
            <input
              className="table-search"
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              disabled={!hasUsers}
            />

            <select
              className="table-filter"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              disabled={!hasUsers}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>

        {!hasUsers ? (
          <EmptyState message="No users found." />
        ) : !hasFilteredUsers ? (
          <EmptyState message="No users match your filters." />
        ) : (
          <UsersDataTable users={filteredUsers} />
        )}
      </div>
    </div>
  );
}