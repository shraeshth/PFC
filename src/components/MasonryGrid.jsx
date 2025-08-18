import React, { useEffect, useLayoutEffect, useMemo, useRef, useState, useCallback } from "react";
import TiltCard from './TiltCard';

const useMedia = (queries, values, defaultValue) => {
  const get = () =>
    values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
    return () =>
      queries.forEach((q) =>
        matchMedia(q).removeEventListener("change", handler)
      );
  }, [queries]);

  return value;
};

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

// Optimized lazy loading with intersection observer
const useLazyLoad = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const observerRef = useRef();

  const observeElement = useCallback((element, itemId) => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const itemId = entry.target.dataset.itemId;
            if (entry.isIntersecting && itemId) {
              setVisibleItems(prev => new Set([...prev, parseInt(itemId)]));
            }
          });
        },
        { 
          rootMargin: '100px', // Start loading 100px before element enters viewport
          threshold: 0.1 
        }
      );
    }
    
    if (element) {
      element.dataset.itemId = itemId;
      observerRef.current.observe(element);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return [visibleItems, observeElement];
};

const MasonryGrid = ({
  items,
  onImageClick,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.02, // Reduced stagger for faster initial load
}) => {
  const columns = useMedia(
    [
      "(min-width:1500px)",
      "(min-width:1000px)",
      "(min-width:600px)",
      "(min-width:400px)",
    ],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [visibleItems, observeElement] = useLazyLoad();
  const [animatedItems, setAnimatedItems] = useState(new Set());
  const itemRefs = useRef(new Map());

  const grid = useMemo(() => {
    if (!width) return [];
    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (width - totalGaps) / columns;

    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = (child.height * columnWidth) / 400; // Scale height proportionally
      const y = colHeights[col];

      colHeights[col] += height + gap;
      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  // Set up intersection observers for lazy loading
  useLayoutEffect(() => {
    grid.forEach((item) => {
      const element = itemRefs.current.get(item.id);
      if (element && !visibleItems.has(item.id)) {
        observeElement(element, item.id);
      }
    });
  }, [grid, observeElement, visibleItems]);

  // Handle animations for visible items
  useLayoutEffect(() => {
    grid.forEach((item, index) => {
      const element = itemRefs.current.get(item.id);
      if (!element) return;

      if (visibleItems.has(item.id) && !animatedItems.has(item.id)) {
        // Initial animation for newly visible items
        element.style.opacity = '0';
        element.style.transform = `translate(${item.x}px, ${item.y + 20}px) scale(0.95)`;
        
        setTimeout(() => {
          element.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
          element.style.opacity = '1';
          element.style.transform = `translate(${item.x}px, ${item.y}px) scale(1)`;
        }, index * stagger * 1000);

        setAnimatedItems(prev => new Set([...prev, item.id]));
      } else if (animatedItems.has(item.id)) {
        // Update position for existing animated items
        element.style.transition = `transform ${duration}s ${ease}`;
        element.style.transform = `translate(${item.x}px, ${item.y}px) scale(1)`;
      }
    });
  }, [grid, visibleItems, animatedItems, stagger, duration, ease]);

  const setItemRef = useCallback((element, itemId) => {
    if (element) {
      itemRefs.current.set(itemId, element);
    } else {
      itemRefs.current.delete(itemId);
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full"
      style={{ 
        height: Math.max(...grid.map(item => item.y + item.h), 400) + 'px'
      }}
    >
      {grid.map((item) => (
        <div
          key={item.id}
          ref={(el) => setItemRef(el, item.id)}
          className="absolute will-change-transform"
          style={{
            width: `${item.w}px`,
            height: `${item.h}px`,
            transform: `translate(${item.x}px, ${item.y}px)`,
          }}
        >
          <TiltCard
            image={item}
            onClick={onImageClick}
            width={item.w}
            height={item.h}
            isVisible={visibleItems.has(item.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default MasonryGrid;