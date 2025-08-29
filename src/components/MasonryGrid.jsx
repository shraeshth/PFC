import React, { useRef, useState, useMemo, useCallback, useLayoutEffect } from "react";
import TiltCard from "./TiltCard";

// Responsive columns with better breakpoints
const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);
  React.useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
    return () => queries.forEach((q) => matchMedia(q).removeEventListener("change", handler));
  }, [queries]);
  return value;
};

// Measure container size
const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
};

// Lazy load visibility
const useLazy = () => {
  const [visible, setVisible] = useState(new Set());
  const iObs = useRef(null);

  const observe = useCallback((el, id) => {
    if (!iObs.current) {
      iObs.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((ent) => {
            const k = ent.target.dataset.itemId;
            if (ent.isIntersecting && k) {
              setVisible((prev) => new Set(prev).add(parseInt(k, 10)));
            }
          });
        },
        { rootMargin: "180px 0px", threshold: 0.01 }
      );
    }
    if (el) {
      el.dataset.itemId = id;
      iObs.current.observe(el);
    }
  }, []);

  React.useEffect(() => () => iObs.current?.disconnect(), []);
  return [visible, observe];
};

// Deterministic "organic" height if none provided
const seededHeight = (seed) => {
  const base = 280;
  const step = 40;
  const n = (seed % 6 + 6) % 6; // 0..5
  return base + n * step; // 280..480
};

const MasonryGrid = ({ items, onImageClick }) => {
  // Improved responsive breakpoints
  const columns = useMedia(
    [
      "(min-width: 1536px)", // 2xl
      "(min-width: 1280px)", // xl  
      "(min-width: 1024px)", // lg
      "(min-width: 768px)",  // md
      "(min-width: 640px)",  // sm
      "(min-width: 480px)"   // xs
    ],
    [5, 4, 3, 3, 2, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [visible, observe] = useLazy();
  const itemRefs = useRef(new Map());
  const animated = useRef(new Set());

  // Responsive gap system
  const getGaps = () => {
    if (width < 480) return { gapX: 12, gapY: 16 };      // xs
    if (width < 640) return { gapX: 16, gapY: 20 };      // sm
    if (width < 768) return { gapX: 20, gapY: 24 };      // md
    if (width < 1024) return { gapX: 24, gapY: 28 };     // lg
    if (width < 1280) return { gapX: 28, gapY: 32 };     // xl
    return { gapX: 32, gapY: 36 };                       // 2xl
  };

  const grid = useMemo(() => {
    if (!width) return [];
    const { gapX, gapY } = getGaps();
    const colHeights = new Array(columns).fill(0);
    const colWidth = (width - gapX * (columns - 1)) / columns;

    return items.map((item) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const w = colWidth;
      // Responsive height calculation
      const baseHeight = item.height || seededHeight(item.id);
      const aspectRatio = width < 480 ? 1.2 : width < 768 ? 1.1 : 1.0;
      const h = (baseHeight * w * aspectRatio) / 400;
      const x = col * (w + gapX);
      const y = colHeights[col];
      colHeights[col] += h + gapY;
      return { ...item, x, y, w, h };
    });
  }, [items, width, columns]);

  // Observe for lazy load
  useLayoutEffect(() => {
    grid.forEach((g) => {
      const el = itemRefs.current.get(g.id);
      if (el && !visible.has(g.id)) observe(el, g.id);
    });
  }, [grid, observe, visible]);

  // Animate in & reposition with responsive timing
  useLayoutEffect(() => {
    grid.forEach((g) => {
      const el = itemRefs.current.get(g.id);
      if (!el) return;

      const translate = `translate(${g.x}px, ${g.y}px)`;
      if (visible.has(g.id) && !animated.current.has(g.id)) {
        el.style.opacity = "0";
        el.style.transform = `translate(${g.x}px, ${g.y + 20}px) scale(0.98)`;
        requestAnimationFrame(() => {
          const duration = width < 768 ? 400 : 600; // Faster on mobile
          el.style.transition = `all ${duration}ms cubic-bezier(0.25,0.46,0.45,0.94)`;
          el.style.opacity = "1";
          el.style.transform = `${translate} scale(1)`;
        });
        animated.current.add(g.id);
      } else {
        const duration = width < 768 ? 300 : 500;
        el.style.transition = `transform ${duration}ms ease-out`;
        el.style.transform = translate;
      }
    });
  }, [grid, visible, width]);

  const setItemRef = useCallback((el, id) => {
    if (el) itemRefs.current.set(id, el);
    else itemRefs.current.delete(id);
  }, []);

  const totalHeight = Math.max(420, ...grid.map((g) => g.y + g.h));

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 mb-10"
      style={{ height: totalHeight }}
    >
      {grid.map((g) => (
        <div
          key={g.id}
          ref={(el) => setItemRef(el, g.id)}
          className="absolute will-change-transform cursor-pointer border-[0.1px] border-white/30 rounded-lg"
          style={{ 
            width: g.w, 
            height: g.h, 
            transform: `translate(${g.x}px, ${g.y}px)`,
            // Responsive touch targets
            minHeight: width < 480 ? "180px" : "200px"
          }}
        >
          <TiltCard
            image={g}
            width={g.w}
            height={g.h}
            isVisible={visible.has(g.id)}
            onClick={onImageClick}
          />
        </div>
      ))}
      
      {/* Loading state for empty grid */}
      {grid.length === 0 && width > 0 && (
        <div className="flex items-center justify-center h-64 text-white/60">
          <div className="text-center">
            <div className="text-lg sm:text-xl mb-2">No images found</div>
            <div className="text-sm opacity-70">Try adjusting your filters</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasonryGrid;