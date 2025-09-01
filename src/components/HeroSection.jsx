import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-white px-6">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/dbk50pszr/image/upload/v1756541174/PXL_20230625_065243357_pm04on.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      {/* Overlay for better readability */}
      <div className="z-0 absolute inset-0 bg-gradient-to-b from-black/1 via-black/40 to-black" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl text-center space-y-6 mt-20"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-widest text-white"
        >
          About Us
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-white/70 font-figtree leading-relaxed"
        >
          We are a passionate community of creators, storytellers, and
          innovators who believe in the power of visual art.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
