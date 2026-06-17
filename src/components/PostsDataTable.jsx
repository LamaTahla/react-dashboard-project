import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

export default function PostsDataTable({
  posts,
  onDeletePost,
  getAuthorName,
}) {
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
      sortable: true,
      width: '90px',
    },
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
    },
    {
      name: 'Author',
      selector: (row) => getAuthorName(row.userId),
      sortable: true,
      width: '180px',
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="table-actions">
          <Link
            to={`/admin/posts/${row.id}`}
            className="table-view-btn"
          >
            View
          </Link>

          <Link
            to={`/admin/posts/${row.id}/edit`}
            className="table-edit-btn"
          >
            Edit
          </Link>

          <button
            type="button"
            className="table-delete-btn"
            onClick={() => onDeletePost(row)}
          >
            Delete
          </button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  const customStyles = {
    table: {
      style: {
        borderRadius: '12px',
      },
    },
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
        minHeight: '56px',
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
        data={posts}
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