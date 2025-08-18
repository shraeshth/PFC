import React from "react";
import MerchCard from "./MerchCard";

const products = [
  {
    name: "Oversized Hoodie",
    description: "Cinematic comfort",
    price: 65,
    image:
      "https://plus.unsplash.com/premium_photo-1673826949090-69103bd8056d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Graphic Tee",
    description: "Shutter design",
    price: 28,
    image:
      "https://images.unsplash.com/photo-1652561816306-0664c2a3cbf8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Vision Cap",
    description: "Embroidered logo",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1652561816306-0664c2a3cbf8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Vision Tote",
    description: "Carry your gear",
    price: 22,
    image:
      "https://images.unsplash.com/photo-1652561816306-0664c2a3cbf8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Creator Pack",
    description: "Sticker collection",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1652561816306-0664c2a3cbf8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Film Keychain",
    description: "Director's tool",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1652561816306-0664c2a3cbf8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Director Notes",
    description: "Film strip design",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1617643049724-58601e29eaa8?q=80&w=773&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Creative Fuel",
    description: "Premium ceramic",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1652561816306-0664c2a3cbf8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const MerchGrid = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">
          COLLECTION
        </h2>
      </div>

      {/* CSS Masonry: change column counts per breakpoint */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 [--card-gap:1rem]">
        {products.map((p, i) => (
          <div key={p.name} className="mb-[var(--card-gap)]">
            <MerchCard product={p} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MerchGrid;
