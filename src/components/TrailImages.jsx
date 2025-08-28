import React, { useMemo } from "react";
import imagesData from "../JSON/Images.json";

const TrailImages = () => {
  return useMemo(
    () =>
      imagesData.map((img, i) => (
        <div
          key={`trail-${i}`}
          className="content__img w-[140px] sm:w-[160px] md:w-[185px] lg:w-[210px] aspect-[1.3] sm:aspect-[1.25] md:aspect-[1.2] lg:aspect-[1.2] absolute top-0 left-0 opacity-0 pointer-events-none"
          style={{ willChange: "transform,filter", zIndex: 10 }}
        >
          <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/20 bg-black/40 backdrop-blur-sm">
            <div
              className="content__img-inner bg-center bg-cover w-[calc(100%+10px)] h-[calc(100%+10px)] absolute top-[-5px] left-[-5px]"
              style={{ backgroundImage: `url(${img.url})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-500/10"></div>
          </div>
        </div>
      )),
    []
  );
};

export default TrailImages;
