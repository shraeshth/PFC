import React from "react";
import { CATEGORY_LABELS } from "./Categorize";

const FiltersBar = ({ active, counts = {}, onSelect }) => {
  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {CATEGORY_LABELS.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={[
              "px-4 py-2 rounded-full border transition-colors flex items-center gap-1",
              isActive
                ? "bg-white text-black border-white"
                : " text-white/90 backdrop-blur-2xl bg-white/10 border-[0.1px] border-white/10",
            ].join(" ")}
          >
            <span className={isActive ? "font-semibold" : ""}>{cat}</span>
            <span
              className={[
                "ml-1 text-sm",
                isActive ? "text-black/70 font-medium" : "text-white/60",
              ].join(" ")}
            >
              ({counts?.[cat] ?? 0})
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FiltersBar;
