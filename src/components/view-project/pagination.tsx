import {
  Pagination as PaginationNav,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
} from "../ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ShadcnPagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const handleClick = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const getPages = (): (number | "...")[] => {
    const pages: (number | "...")[] = [];
    const maxVisible = 5;
    const half = Math.floor(maxVisible / 2);

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= half + 1) {
        for (let i = 1; i <= maxVisible - 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - half) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - (maxVisible - 2); i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <PaginationNav className="my-4">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={currentPage === 1}
            onClick={(e) => {
                if(currentPage === 1) {
                    e.preventDefault();
                    return;
                }
                onPageChange(currentPage - 1);
            }}
            className={currentPage === 1 ? "text-white bg-violet-700/20 hover:text-white hover:bg-violet-700/20" :  "text-white bg-violet-700 hover:text-white hover:bg-violet-500"}
          />
        </PaginationItem>

        {getPages().map((page, idx) =>
          page === "..." ? (
            <PaginationItem key={`elipsis-${idx}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={handleClick(page)}
              className={page === currentPage
                ? "text-white bg-violet-400 hover:bg-violet-300 hover:text-white" 
                : "bg-white text-gray-700 hover:bg-violet-100"
            }
            >
              {page}
            </PaginationLink>
          </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={currentPage === totalPages}
            onClick={(e) => {
                if(currentPage === totalPages) {
                    e.preventDefault();
                    return;
                }
                onPageChange(currentPage + 1);
              }}
            className={currentPage === totalPages ? "text-white bg-violet-700/20 hover:text-white hover:bg-violet-700/20" :  "text-white bg-violet-700 hover:text-white hover:bg-violet-500"}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationNav>
  );
};

export default ShadcnPagination;
