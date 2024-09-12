import React from 'react';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

type PaginationComponentProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

const PaginationComponent: React.FC<PaginationComponentProps> = ({ currentPage, totalPages, onPageChange }) => {
	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	};

	const range = 2; // Number of pages to show before and after the current page
	const startPage = Math.max(1, currentPage - range);
	const endPage = Math.min(totalPages, currentPage + range);

	const pagesToShow = [];
	if (startPage > 1) {
		pagesToShow.push(1);
		if (startPage > 2) pagesToShow.push('...');
	}

	for (let i = startPage; i <= endPage; i++) {
		pagesToShow.push(i);
	}

	if (endPage < totalPages) {
		if (endPage < totalPages - 1) pagesToShow.push('...');
		pagesToShow.push(totalPages);
	}

	return (
		<Pagination className='w-full py-4 sm:py-10'>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href='#'
						onClick={() => handlePageChange(currentPage - 1)}
						aria-disabled={currentPage === 1}
					/>
				</PaginationItem>

				{pagesToShow.map((page, index) => (
					<PaginationItem key={index}>
						{page === '...' ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink href='#' onClick={() => handlePageChange(page as number)} isActive={currentPage === page}>
								{page}
							</PaginationLink>
						)}
					</PaginationItem>
				))}

				<PaginationItem>
					<PaginationNext
						href='#'
						onClick={() => handlePageChange(currentPage + 1)}
						aria-disabled={currentPage === totalPages}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};

export default PaginationComponent;
