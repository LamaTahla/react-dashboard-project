import { useEffect, useMemo, useState } from 'react';

export default function usePagination(items, itemsPerPage = 10, resetDependency) {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(items.length / itemsPerPage);

	const currentItems = useMemo(() => {
		const lastItemIndex = currentPage * itemsPerPage;
		const firstItemIndex = lastItemIndex - itemsPerPage;

		return items.slice(firstItemIndex, lastItemIndex);
	}, [items, currentPage, itemsPerPage]);

	useEffect(() => {
		setCurrentPage(1);
	}, [resetDependency]);

	const goToPage = (pageNumber) => {
		if (pageNumber < 1 || pageNumber > totalPages) return;

		setCurrentPage(pageNumber);
	};

	const nextPage = () => {
		goToPage(currentPage + 1);
	};

	const previousPage = () => {
		goToPage(currentPage - 1);
	};

	return {
		currentPage,
		currentItems,
		totalPages,
		goToPage,
		nextPage,
		previousPage,
		hasNextPage: currentPage < totalPages,
		hasPreviousPage: currentPage > 1,
	};
}