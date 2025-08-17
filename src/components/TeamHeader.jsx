import React from "react";
import bgimg from "../assets/WE ARE PFC.png";

const TeamHeader = () => {
  return (
    <div className="w-full mx-auto text-center">
      <div className="mb-40">
        <h1 className="text-6xl font-light tracking-tight mb-4">
          Meet the Team
        </h1>

        <p className="text-xl font-light tracking-wide opacity-80">
          Photography & Filming Club
        </p>
      </div>

      <div className="flex justify-center w-full mt-12 relative">
        <p className="text-3xl font-bold text-white absolute bottom-8">
          WE ❤️ PFC
        </p>
        <div className="z-[-20] absolute bottom-100 backdrop-blur-2xl inset-0 bg-black"></div>
        <img
          src={bgimg}
          alt="We Are PFC"
          className="z-[-20] w-full opacity-90"
          onError={(e) =>
            (e.target.src =
              "https://via.placeholder.com/400x200/333/fff?text=WE+ARE+PFC")
          }
        />
      </div>
    </div>
  );
};

export default TeamHeader;
