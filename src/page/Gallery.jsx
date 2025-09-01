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
    <div className="min-h-screen w-full">
      <div className="max-w-full mx-auto">
        <div className="absolute inset-0 z-[-1] h-full overflow-hidden">
          <img
            src="https://res.cloudinary.com/dbk50pszr/image/upload/v1755506294/anirudh-ib3d1uX1LLc-unsplash_n4y4gy.jpg"
            className="absolute z-[-10] w-full top-0 h-full object-cover"
          />
        </div>
        <div className="z-0 absolute inset-0 bg-gradient-to-b from-black/1 via-black/40 to-black" />
        {/* Header */}
        <div className="z-100 w-full text-center h-screen mt-10 flex flex-col items-center justify-center ">
          <header className="text-center mb-10 flex flex-col items-center justify-center">
            <h1
              ref={headingRef}
              className="text-5xl md:text-8xl font-light tracking-tight"
            >
              Gallery
            </h1>
            <p ref={subRef} className="mt-3 text-white text-xl font-figtree">
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
          </section>

          {/* Scroll indicator */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/40 animate-bounce">
            <div className="w-50 h-8 flex justify-center items-center flex-col">
              <div className="text-center text-sm text-white/70 animate-pulse">
                Showing {filtered.length}{" "}
                {categoryParam === "All"
                  ? "works"
                  : `${categoryParam.toLowerCase()} works`}
              </div>
              <i className="ri-arrow-down-s-line text-white/70 text-xl mt-1 animate-pulse"></i>
            </div>
          </div>
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
