import React from "react";
import SpotlightCard from "./SpotlightCard";
import TextTiltCard from "./TextTiltCard"; // Ensure the path is correct
import members from "../JSON/Team.json"; // Import JSON data

const TeamSection = () => {
  const facultyCoordinator = {
    name: "Mrs. Shweta Sharma",
    role: "Faculty In-Charge",
    image:
      "https://res.cloudinary.com/dbk50pszr/image/upload/v1756680289/5_opyb0g.png",
    detail:
      "Mrs. Sharma provides guidance in visual storytelling, helping students blend traditional art with modern techniques while exploring their creative potential.",
  };

  const leadership = [
    {
      name: "Shreshth Sharma",
      role: "Secretary",
      department: "IT",
      image:
        "https://res.cloudinary.com/dbk50pszr/image/upload/v1756680639/ShresthProfile_wojm2u.png",
      detail:
        "Shreshth focuses on innovation in photography and filmmaking, merging technical precision with creativity in every project.",
    },
    {
      name: "Harsh Panchal",
      role: "Co-Secretary",
      department: "IT",
      image:
        "https://res.cloudinary.com/dbk50pszr/image/upload/v1756680443/6_oqo9os.png",
      detail:
        "Harsh builds collaboration within the team, creating an environment where new ideas thrive and creativity flourishes.",
    },
  ];

  return (
    <section className=" text-white py-24 px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-2">Leadership</h2>
          <p className="text-[#e95eb4] font-figtree text-lg">
            Meet our creative team
          </p>
        </div>

        {/* Leadership Row - Faculty + Students */}
        <div className="grid md:grid-cols-3 gap-6 h-auto">
          {/* Faculty */}
          <TextTiltCard>
            <SpotlightCard className="h-full flex flex-col justify-between items-center text-center p-3 border border-white/10 rounded-2xl transition-all duration-300 cursor-pointer">
              <div className="h-2/3 w-full ">
                <img
                  src={facultyCoordinator.image}
                  alt={facultyCoordinator.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-light mb-1">
                  {facultyCoordinator.name}
                </h3>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-2 border-b border-white/10 pb-2">
                  {facultyCoordinator.role}
                </p>
                <p className="text-gray-300 text-[15px] leading-relaxed font-figtree">
                  {facultyCoordinator.detail}
                </p>
              </div>
            </SpotlightCard>
          </TextTiltCard>

          {/* Student Leadership */}
          {leadership.map((member, index) => (
            <TextTiltCard key={index}>
              <SpotlightCard className="h-full flex flex-col justify-between items-center text-center p-3 border border-white/10 rounded-2xl transition-all duration-300 cursor-pointer">
                <div className="h-2/3 w-full border-white/10">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-center">
                  <h3 className="text-xl font-light mb-1">{member.name}</h3>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-2 border-b border-white/10 pb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-300 text-xs font-figtree text-[15px] leading-relaxed">
                    {member.detail}
                  </p>
                </div>
              </SpotlightCard>
            </TextTiltCard>
          ))}
        </div>

        {/* Team Structure */}
        <div>
          <h3 className="text-2xl font-light mb-6 text-center">
            Team <span className="text-[#e95eb4]">Structure</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {members
              .filter(
                (member) =>
                  member.position !== "Photographer" &&
                  member.position !== "Video Editor" &&
                  member.position !== "Secretary"
              )
              .map((member, index) => (
                <TextTiltCard key={index}>
                  <SpotlightCard className="rounded-xl border border-white/10 p-4 flex items-center gap-4 cursor-pointer transition-all duration-300">
                    {/* Left (Image) */}
                    <div className="w-1/3 flex-shrink-0">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full aspect-square object-cover rounded-lg"
                      />
                    </div>

                    {/* Right (Text Content) */}
                    <div className="w-2/3 flex flex-col">
                      {/* Name */}
                      <h4 className="text-base font-light">{member.name}</h4>

                      {/* Position */}
                      <p className="text-gray-400 text-[20px] uppercase tracking-wide mb-1 border-b border-white/10 pb-1">
                        {member.position}
                      </p>

                      {/* Description */}
                      <p className="text-gray-300 font-figtree text-sm leading-snug mb-2 line-clamp-3">
                        {member.description}
                      </p>

                      {/* Instagram Link */}
                      {member.instagram && (
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#e95eb4] text-xs hover:underline mt-auto"
                        >
                          Instagram
                        </a>
                      )}
                    </div>
                  </SpotlightCard>
                </TextTiltCard>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
