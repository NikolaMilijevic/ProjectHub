import {
  Pagination as PaginationNav,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
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

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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

        {pages.map((page) => (
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
        ))}

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
