import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useSearchParams } from "react-router-dom";
import gsap from "gsap";
import MasonryGrid from "../components/MasonryGrid";
import ImagePreview from "../components/ImagePreview";
import FiltersBar from "../components/FiltersBar";
import Pagination from "../components/Pagination";
import images from "../JSON/Images.json";
import {
  mapTagsToCategory,
  buildCategoryCounts,
} from "../components/Categorize";

const IMAGES_PER_PAGE = 10;

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  // Header animation
  const headingRef = useRef(null);
  const subRef = useRef(null);
  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(headingRef.current, {
      y: 60,
      opacity: 0,
      duration: 1.1,
      ease: "power3.out",
    }).from(
      subRef.current,
      { y: 30, opacity: 0, duration: 0.9, ease: "power3.out" },
      "-=0.6"
    );
    return () => tl.kill();
  }, []);

  // URL state
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const categoryParam = searchParams.get("category") || "All";

  const counts = useMemo(() => buildCategoryCounts(images), []);
  const filtered = useMemo(() => {
    if (categoryParam === "All") return images;
    return images.filter(
      (img) => mapTagsToCategory(img.tags) === categoryParam
    );
  }, [categoryParam]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / IMAGES_PER_PAGE));
  const currentPage = Math.min(Math.max(pageParam, 1), totalPages);

  // Slice only current page for grid
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * IMAGES_PER_PAGE;
    return filtered.slice(start, start + IMAGES_PER_PAGE);
  }, [filtered, currentPage]);

  // Handlers
  const setPage = (page) =>
    setSearchParams({ page: String(page), category: categoryParam });
  const setCategory = (category) => setSearchParams({ page: "1", category });

  const openPreview = useCallback((img) => {
    setSelected(img);
    setPreviewOpen(true);
  }, []);

  const closePreview = useCallback(() => {
    setPreviewOpen(false);
    setSelected(null);
  }, []);

  const navigatePreview = useCallback((nextImg) => {
    // nextImg is from filtered set or page slice; make sure object identity doesn't matter
    setSelected(nextImg);
  }, []);

  // For next/prev in preview, pass the whole filtered array
  return (
    <div className="min-h-screen w-full bg-">
      <div className="max-w-7xl mx-auto">
        <div className="absolute inset-0 z-[-1] h-[70%] overflow-hidden opacity-[0.8]">
          <img
            src="https://images.unsplash.com/photo-1755447277057-be3aaa75f063?q=80&w=1732&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="absolute z-[-10] w-full "
          />
        </div>
        {/* Header */}
        <div className="text-center h-[80vh] flex flex-col items-center justify-center ">
          <header className="text-center mb-10  flex flex-col items-center justify-center">
            <h1
              ref={headingRef}
              className="text-5xl md:text-6xl font-light tracking-tight"
            >
              Gallery
            </h1>
            <p ref={subRef} className="mt-3 text-white/70 text-lg">
              A curated selection of photographs — minimal, timeless, and bold.
            </p>
          </header>

          {/* Filters */}
          <section className="mb-8">
            <FiltersBar
              active={categoryParam}
              counts={counts}
              onSelect={setCategory}
            />
            <div className="mt-3 text-center text-sm text-white/60">
              Showing {filtered.length}{" "}
              {categoryParam === "All"
                ? "works"
                : `${categoryParam.toLowerCase()} works`}
            </div>
          </section>
        </div>

        {/* Grid */}
        <MasonryGrid items={pageItems} onImageClick={openPreview} />

        {/* Pagination */}
        <Pagination
          current={currentPage}
          total={totalPages}
          onChange={setPage}
        />
      </div>

      {/* Preview */}
      <ImagePreview
        image={selected}
        isOpen={previewOpen}
        onClose={closePreview}
        allImages={filtered}
        onNavigate={(img) => {
          // compute next/prev relative to filtered list
          const idx = filtered.findIndex(
            (i) => i.id === (selected?.id ?? img.id)
          );
          if (img?.id && filtered.some((f) => f.id === img.id)) {
            setSelected(img);
            return;
          }
          // fallback: when arrow keys used via ImagePreview
          setSelected(filtered[(idx + 1) % filtered.length]);
        }}
      />
    </div>
  );
};

export default Gallery;
