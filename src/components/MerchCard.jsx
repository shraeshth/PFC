import React, { useState } from "react";

const MerchCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full h-[500px] break-inside-avoid rounded-xl overflow-hidden border border-white/30 bg-black text-white transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className={`w-full h-full object-cover transition-all duration-500 ${
          hovered ? "blur-sm scale-105 opacity-50" : "blur-0 opacity-100"
        }`}
      />

      {/* Details overlay (appears on hover) */}
      <div
        className={`absolute inset-0 flex flex-col justify-center items-center text-center px-6 transition-all duration-500 ${
          hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h3 className="font-medium text-lg tracking-wide">{product.name}</h3>
        <p className="text-gray-400 text-sm mt-1">{product.description}</p>
        <div className="mt-4 flex justify-between items-center w-full">
          <span className="font-bold text-xl">${product.price}</span>
          <span className="text-xs tracking-widest text-blue-300">LIMITED</span>
        </div>
        <button
          className="mt-4 w-full rounded-lg bg-white text-black py-2 text-sm font-medium tracking-wide 
             shadow-md transform transition-all duration-300 ease-out
             hover:bg-gray-200 hover:scale-105 hover:shadow-xl"
        >
          SHOP NOW
        </button>
      </div>
    </div>
  );
};

export default MerchCard;
