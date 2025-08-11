import { Button } from "../ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const buttonClass = "bg-violet-700 text-white hover:bg-violet-500 hover:text-white disabled:opacity-20";

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center space-x-2 my-4">
      <Button
        className={buttonClass}
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        return (
          <Button
            className={page === currentPage ? "bg-violet-700 text-white hover:bg-violet-900 hover:text-white" : "bg-violet-300 text-white hover:bg-violet-400 hover:text-white"}
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        );
      })}

      <Button
        className={buttonClass}
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
