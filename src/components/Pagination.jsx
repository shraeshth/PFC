import React from "react";

const Pagination = ({ current, total, onChange }) => {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="mt-8 mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={[
            "min-w-[32px] sm:min-w-[40px] px-2 py-1.5 sm:px-3 sm:py-2 rounded-full border text-sm sm:text-base transition-colors",
            p === current
              ? "bg-[#ea5eb4] text-white border-black/30 font-medium"
              : "bg-transparent text-white/90 border-black hover:border-[#ea5eb4]",
          ].join(" ")}
          aria-current={p === current ? "page" : undefined}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
