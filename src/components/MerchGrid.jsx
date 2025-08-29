import React from "react";
import MerchCard from "./MerchCard";
import StatsSection from "./StatsSection";

const products = [
  {
    name: "Oversized Tee",
    description: "Cinematic comfort",
    price: 399,
    image:
      "https://res.cloudinary.com/dbk50pszr/image/upload/v1755506522/T1_znwgs6.png",
    status: "Shop Now",
  },
  {
    name: "Graphic Tee",
    description: "Shutter design",
    price: 299,
    image:
      "https://res.cloudinary.com/dbk50pszr/image/upload/v1755506524/T2_skcikz.png",
    status: "Shop Now",
  },
  {
    name: "Polaroid",
    description: "Embroidered logo",
    price: 50,
    image:
      "https://images.unsplash.com/photo-1617643049077-7e2e755c8b8c?q=80&w=946&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "Coming Soon",
  },
  {
    name: "Vision Tote",
    description: "Carry your gear",
    price: 199,
    image:
      "https://res.cloudinary.com/dbk50pszr/image/upload/v1756483320/1_j2g7zd.png",
    status: "Coming Soon",
  },
  {
    name: "Film Keychain",
    description: "Director's tool",
    price: 149,
    image:
      "https://res.cloudinary.com/dbk50pszr/image/upload/v1756483319/2_q2lbff.png",
    status: "Coming Soon",
  },
  {
    name: "Director Notes",
    description: "Film strip design",
    price: 299,
    image:
      "https://res.cloudinary.com/dbk50pszr/image/upload/v1756483320/3_uqfgks.png",
    status: "Coming Soon",
  },
];

const MerchGrid = () => {
  // Split products into two rows
  const firstRow = products.slice(0, 3);
  const secondRow = products.slice(3);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-20">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-white">
          COLLECTION
        </h2>
      </div>

      {/* First row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-20">
        {firstRow.map((p, i) => (
          <MerchCard key={p.name} product={p} index={i} />
        ))}
      </div>

      {/* Stats Section in between */}
      <StatsSection />

      {/* Second row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mt-20">
        {secondRow.map((p, i) => (
          <MerchCard key={p.name} product={p} index={i + 3} />
        ))}
      </div>
    </div>
  );
};

export default MerchGrid;
