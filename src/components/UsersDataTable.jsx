import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

export default function UsersDataTable({ users }) {
  const columns = [
    {
      name: 'User',
      cell: (row) => (
        <div className="user-table-info">
          <img
            src={row.avatar || `https://i.pravatar.cc/80?u=${row.id}`}
            alt={row.name || 'User avatar'}
            className="user-table-avatar"
          />

          <div>
            <strong>{row.name || 'Unknown User'}</strong>
            <small>@{row.username || 'username'}</small>
          </div>
        </div>
      ),
      selector: (row) => row.name || '',
      sortable: true,
      wrap: true,
      minWidth: '230px',
    },
    {
      name: 'Email',
      selector: (row) => row.email || 'N/A',
      sortable: true,
      wrap: true,
      minWidth: '220px',
    },
    {
      name: 'Role',
      cell: (row) => (
        <span className="role-badge">
          {row.role || 'user'}
        </span>
      ),
      selector: (row) => row.role || 'user',
      sortable: true,
      width: '130px',
    },
    {
      name: 'City',
      selector: (row) => row.city || 'N/A',
      sortable: true,
      wrap: true,
      width: '150px',
    },
    {
      name: 'Company',
      selector: (row) => row.company || 'N/A',
      sortable: true,
      wrap: true,
      minWidth: '180px',
    },
    {
      name: 'Action',
      cell: (row) => (
        <Link
          to={`/admin/users/${row.id}`}
          className="table-view-btn"
        >
          View
        </Link>
      ),
      ignoreRowClick: true,
      width: '130px',
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f9fafb',
        borderBottom: '1px solid #e5e7eb',
        minHeight: '56px',
      },
    },
    headCells: {
      style: {
        fontWeight: '700',
        fontSize: '14px',
        color: '#111827',
      },
    },
    rows: {
      style: {
        minHeight: '70px',
        fontSize: '14px',
      },
    },
    cells: {
      style: {
        color: '#374151',
      },
    },
    pagination: {
      style: {
        borderTop: '1px solid #e5e7eb',
        padding: '12px',
      },
    },
  };

  return (
    <div className="table-card">
      <DataTable
        columns={columns}
        data={users}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 15, 20]}
        highlightOnHover
        pointerOnHover
        responsive
        customStyles={customStyles}
      />
    </div>
  );
}