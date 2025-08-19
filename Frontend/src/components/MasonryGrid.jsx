import React, { useRef, useState, useMemo, useCallback, useLayoutEffect } from "react";
import TiltCard from "./TiltCard";

// Responsive columns
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
  const columns = useMedia(
    ["(min-width:1500px)", "(min-width:1100px)", "(min-width:800px)", "(min-width:500px)"],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [visible, observe] = useLazy();
  const itemRefs = useRef(new Map());
  const animated = useRef(new Set());

  const grid = useMemo(() => {
    if (!width) return [];
    const gapX = 28; // horizontal gap
    const gapY = 36; // vertical gap
    const colHeights = new Array(columns).fill(0);
    const colWidth = (width - gapX * (columns - 1)) / columns;

    return items.map((item) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const w = colWidth;
      const h = ((item.height || seededHeight(item.id)) * w) / 400;
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

  // Animate in & reposition
  useLayoutEffect(() => {
    grid.forEach((g) => {
      const el = itemRefs.current.get(g.id);
      if (!el) return;

      const translate = `translate(${g.x}px, ${g.y}px)`;
      if (visible.has(g.id) && !animated.current.has(g.id)) {
        el.style.opacity = "0";
        el.style.transform = `translate(${g.x}px, ${g.y + 20}px) scale(0.98)`; // subtle offset
        requestAnimationFrame(() => {
          el.style.transition = "all 600ms cubic-bezier(0.25,0.46,0.45,0.94)";
          el.style.opacity = "1";
          el.style.transform = `${translate} scale(1)`;
        });
        animated.current.add(g.id);
      } else {
        el.style.transition = "transform 500ms ease-out";
        el.style.transform = translate;
      }
    });
  }, [grid, visible]);

  const setItemRef = useCallback((el, id) => {
    if (el) itemRefs.current.set(id, el);
    else itemRefs.current.delete(id);
  }, []);

  const totalHeight = Math.max(420, ...grid.map((g) => g.y + g.h));

  return (
    <div
      ref={containerRef}
      className="relative w-7xl px-6  md:px-8" // added padding
      style={{ height: totalHeight }}
    >
      {grid.map((g) => (
        <div
          key={g.id}
          ref={(el) => setItemRef(el, g.id)}
          className="absolute will-change-transform"
          style={{ width: g.w, height: g.h, transform: `translate(${g.x}px, ${g.y}px)` }}
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
    </div>
  );
};

export default MasonryGrid;
