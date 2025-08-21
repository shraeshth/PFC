import React from "react";

const Pagination = ({ current, total, onChange }) => {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="mt-12 flex items-center justify-center gap-2 mb-10">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={[
            "min-w-[40px] px-3 py-2 rounded-4xl border transition-colors",
            p === current
              ? "bg-white text-black border-black/30 font-medium"
              : "bg-transparent text-white/90 border-black hover:border-white/40"
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
