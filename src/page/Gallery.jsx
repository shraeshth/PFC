import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import MasonryGrid from "../components/MasonryGrid";
import ImagePreview from "../components/ImagePreview";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Optimized image data with multiple sizes for responsive loading
const sampleImages = [
  {
    id: 1,
    img: "https://picsum.photos/400/600?random=1",
    thumb: "https://picsum.photos/200/300?random=1",
    title: "Urban Landscape",
    credits: "Photo by John Doe",
    height: 600,
  },
  {
    id: 2,
    img: "https://picsum.photos/400/800?random=2",
    thumb: "https://picsum.photos/200/400?random=2",
    title: "Mountain Vista",
    credits: "Photo by Jane Smith",
    height: 800,
  },
  {
    id: 3,
    img: "https://picsum.photos/400/500?random=3",
    thumb: "https://picsum.photos/200/250?random=3",
    title: "Ocean Waves",
    credits: "Photo by Mike Johnson",
    height: 500,
  },
  {
    id: 4,
    img: "https://picsum.photos/400/700?random=4",
    thumb: "https://picsum.photos/200/350?random=4",
    title: "City Lights",
    credits: "Photo by Sarah Wilson",
    height: 700,
  },
  {
    id: 5,
    img: "https://picsum.photos/400/900?random=5",
    thumb: "https://picsum.photos/200/450?random=5",
    title: "Forest Path",
    credits: "Photo by David Brown",
    height: 900,
  },
  {
    id: 6,
    img: "https://picsum.photos/400/550?random=6",
    thumb: "https://picsum.photos/200/275?random=6",
    title: "Desert Sunset",
    credits: "Photo by Emily Davis",
    height: 550,
  },
  {
    id: 7,
    img: "https://picsum.photos/400/650?random=7",
    thumb: "https://picsum.photos/200/325?random=7",
    title: "River Flow",
    credits: "Photo by Chris Miller",
    height: 650,
  },
  {
    id: 8,
    img: "https://picsum.photos/400/750?random=8",
    thumb: "https://picsum.photos/200/375?random=8",
    title: "Snowy Peak",
    credits: "Photo by Lisa Garcia",
    height: 750,
  },
  {
    id: 9,
    img: "https://picsum.photos/400/450?random=9",
    thumb: "https://picsum.photos/200/225?random=9",
    title: "Tropical Beach",
    credits: "Photo by Tom Anderson",
    height: 450,
  },
  {
    id: 10,
    img: "https://picsum.photos/400/850?random=10",
    thumb: "https://picsum.photos/200/425?random=10",
    title: "Starry Night",
    credits: "Photo by Anna Martinez",
    height: 850,
  },
  {
    id: 11,
    img: "https://picsum.photos/400/600?random=11",
    thumb: "https://picsum.photos/200/300?random=11",
    title: "Ancient Temple",
    credits: "Photo by Robert Taylor",
    height: 600,
  },
  {
    id: 12,
    img: "https://picsum.photos/400/700?random=12",
    thumb: "https://picsum.photos/200/350?random=12",
    title: "Garden Bloom",
    credits: "Photo by Helen White",
    height: 700,
  },
  {
    id: 13,
    img: "https://picsum.photos/400/500?random=13",
    thumb: "https://picsum.photos/200/250?random=13",
    title: "Rocky Cliff",
    credits: "Photo by Kevin Lee",
    height: 500,
  },
  {
    id: 14,
    img: "https://picsum.photos/400/800?random=14",
    thumb: "https://picsum.photos/200/400?random=14",
    title: "Misty Lake",
    credits: "Photo by Rachel Green",
    height: 800,
  },
  {
    id: 15,
    img: "https://picsum.photos/400/650?random=15",
    thumb: "https://picsum.photos/200/325?random=15",
    title: "Autumn Leaves",
    credits: "Photo by Mark Thompson",
    height: 650,
  },
  {
    id: 16,
    img: "https://picsum.photos/400/550?random=16",
    thumb: "https://picsum.photos/200/275?random=16",
    title: "Lightning Strike",
    credits: "Photo by Jennifer Clark",
    height: 550,
  },
  {
    id: 17,
    img: "https://picsum.photos/400/750?random=17",
    thumb: "https://picsum.photos/200/375?random=17",
    title: "Coral Reef",
    credits: "Photo by Steven Adams",
    height: 750,
  },
  {
    id: 18,
    img: "https://picsum.photos/400/600?random=18",
    thumb: "https://picsum.photos/200/300?random=18",
    title: "Ice Formation",
    credits: "Photo by Michelle Scott",
    height: 600,
  },
  {
    id: 19,
    img: "https://picsum.photos/400/700?random=19",
    thumb: "https://picsum.photos/200/350?random=19",
    title: "Butterfly Wing",
    credits: "Photo by Daniel Wright",
    height: 700,
  },
  {
    id: 20,
    img: "https://picsum.photos/400/800?random=20",
    thumb: "https://picsum.photos/200/400?random=20",
    title: "Northern Lights",
    credits: "Photo by Patricia Hill",
    height: 800,
  },
  {
    id: 21,
    img: "https://picsum.photos/400/500?random=21",
    thumb: "https://picsum.photos/200/250?random=21",
    title: "Cave Explorer",
    credits: "Photo by James King",
    height: 500,
  },
  {
    id: 22,
    img: "https://picsum.photos/400/650?random=22",
    thumb: "https://picsum.photos/200/325?random=22",
    title: "Sand Dunes",
    credits: "Photo by Barbara Lewis",
    height: 650,
  },
  {
    id: 23,
    img: "https://picsum.photos/400/750?random=23",
    thumb: "https://picsum.photos/200/375?random=23",
    title: "Rainbow Falls",
    credits: "Photo by William Hall",
    height: 750,
  },
  {
    id: 24,
    img: "https://picsum.photos/400/600?random=24",
    thumb: "https://picsum.photos/200/300?random=24",
    title: "Volcanic Ash",
    credits: "Photo by Nancy Young",
    height: 600,
  },
  {
    id: 25,
    img: "https://picsum.photos/400/850?random=25",
    thumb: "https://picsum.photos/200/425?random=25",
    title: "Eagle Flight",
    credits: "Photo by Richard Allen",
    height: 850,
  },
];
function Gallery() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const imagesPerPage = 20;

  const headerRef = useRef(null);
  const subTextRef = useRef(null);
  const infoTextRef = useRef(null);

  // Animate on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 100,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(subTextRef.current, {
        opacity: 0,
        y: 60,
        duration: 2,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: subTextRef.current,
          start: "top 85%",
        },
      });

      gsap.from(infoTextRef.current, {
        opacity: 0,
        y: 40,
        duration: 2,
        delay: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoTextRef.current,
          start: "top 90%",
        },
      });
    });

    return () => ctx.revert(); // cleanup GSAP
  }, []);

  // Pagination
  const totalPages = Math.ceil(sampleImages.length / imagesPerPage);
  const currentImages = useMemo(() => {
    const startIndex = (currentPage - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    return sampleImages.slice(startIndex, endIndex);
  }, [currentPage]);

  const handleImageClick = useCallback((image) => {
    setSelectedImage(image);
    setIsPreviewOpen(true);
  }, []);

  const handleClosePreview = useCallback(() => {
    setIsPreviewOpen(false);
    setSelectedImage(null);
  }, []);

  const handleLoadMore = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="max-w-7xl mx-auto mt-20 px-4">
      {/* Animated Header with GSAP */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h2
          ref={headerRef}
          className="text-6xl mb-5 tracking-tight text-white font-light"
        >
          Gallery
        </h2>

        <p
          ref={subTextRef}
          className="text-xl leading-relaxed font-light text-white/90 mb-4"
        >
          Explore our collection of stunning photographs and films.
        </p>

        <div ref={infoTextRef} className="text-white/70 text-sm">
          Showing {Math.min(currentPage * imagesPerPage, sampleImages.length)}{" "}
          of {sampleImages.length} images
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="min-h-[800px]">
        <MasonryGrid items={currentImages} onImageClick={handleImageClick} />
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-12">
        {currentPage > 1 && (
          <button
            onClick={handlePrevious}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            Previous
          </button>
        )}

        <span className="text-white/80 px-4">
          Page {currentPage} of {totalPages}
        </span>

        {currentPage < totalPages && (
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-105"
          >
            Show More
          </button>
        )}
      </div>

      {/* Image Preview Modal */}
      <ImagePreview
        image={selectedImage}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        allImages={sampleImages}
        onNavigate={setSelectedImage}
      />
    </div>
  );
}

export default Gallery;
