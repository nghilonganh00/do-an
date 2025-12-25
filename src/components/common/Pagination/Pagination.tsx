import { memo } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
}

const Pagination = ({ page, totalPages, onChange, className }: PaginationProps) => {
  const prev = () => page > 1 && onChange(page - 1);
  const next = () => page < totalPages && onChange(page + 1);

  const generatePages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (page > 3) pages.push("...");

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (page < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <button
        onClick={prev}
        disabled={page === 1}
        className="w-9 h-9 p-2 rounded-sm  hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeft size={18} />
      </button>

      <div className="flex items-center gap-1">
        {generatePages().map((p, index) =>
          p === "..." ? (
            <span key={index} className="px-3 py-1 text-sm text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onChange(p as number)}
              className={`w-9 h-9 text-sm rounded-sm  
                ${page === p ? "bg-blue-600 text-white border-blue-600" : "hover:bg-gray-100"}`}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        onClick={next}
        disabled={page === totalPages}
        className="w-9 h-9 p-2 rounded-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default memo(Pagination);
