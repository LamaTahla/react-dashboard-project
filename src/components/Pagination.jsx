export default function Pagination({
	currentPage,
	totalPages,
	goToPage,
	nextPage,
	previousPage,
	hasNextPage,
	hasPreviousPage,
}) {
	if (totalPages <= 1) return null;

	return (
		<div className="pagination">
			<button onClick={previousPage} disabled={!hasPreviousPage}>
				Prev
			</button>

			{Array.from({ length: totalPages }, (_, index) => {
				const pageNumber = index + 1;

				return (
					<button
						key={pageNumber}
						onClick={() => goToPage(pageNumber)}
						className={currentPage === pageNumber ? 'active' : ''}
					>
						{pageNumber}
					</button>
				);
			})}

			<button onClick={nextPage} disabled={!hasNextPage}>
				Next
			</button>
		</div>
	);
}