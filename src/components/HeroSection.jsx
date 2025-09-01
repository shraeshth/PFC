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

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex w-full max-w-7xl mt-8 py-5 text-white backdrop-blur-[5px] bg-white/20 border border-white/10 rounded-3xl"
        >
          {/* Item 1 */}
          <div className="flex-1 flex items-center justify-center flex-col px-6 border-r border-white/20">
            <div className="text-3xl font-thin text-[#e95eb4]">50+</div>
            <div className="text-sm uppercase font-figtree tracking-widest">
              Active Members
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex-1 flex items-center justify-center flex-col px-6 border-r border-white/20">
            <div className="text-3xl font-thin text-[#e95eb4]">20+</div>
            <div className="text-sm uppercase font-figtree tracking-widest">Events</div>
          </div>

          {/* Item 3 */}
          <div className="flex-1 flex items-center justify-center flex-col px-6">
            <div className="text-3xl font-thin text-[#e95eb4]">3</div>
            <div className="text-sm uppercase font-figtree tracking-widest">Years</div>
          </div>
        </motion.div>
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
