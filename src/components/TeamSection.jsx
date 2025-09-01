import React from "react";
import SpotlightCard from "./SpotlightCard";
import TextTiltCard from "./TextTiltCard"; // Ensure the path is correct

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
      role: "Secreatary",
      department: "IT",
      image:
        "https://res.cloudinary.com/dbk50pszr/image/upload/v1756680639/ShresthProfile_wojm2u.png",
      detail:
        "Shreshth focuses on innovation in photography and filmmaking, merging technical precision with creativity in every project.",
    },
    {
      name: "Harsh Panchal",
      role: "Co-Secreatary",
      department: "IT",
      image:
        "https://res.cloudinary.com/dbk50pszr/image/upload/v1756680443/6_oqo9os.png",
      detail:
        "Harsh builds collaboration within the team, creating an environment where new ideas thrive and creativity flourishes.",
    },
  ];

  const teamStructure = [
    {
      name: "Rahul Verma",
      position: "President",
      detail: "Strategic vision & leadership",
    },
    {
      name: "Anjali Mehta",
      position: "Vice President",
      detail: "Operations & team coordination",
    },
    {
      name: "Sneha Kapoor",
      position: "Secretary",
      detail: "Documentation & communication",
    },
    {
      name: "Amit Singh",
      position: "Treasurer",
      detail: "Financial management & planning",
    },
    {
      name: "Priya Sharma",
      position: "Content Writer",
      detail: "Creative content & storytelling",
    },
    {
      name: "Rohan Patel",
      position: "Marketing",
      detail: "Brand promotion & outreach",
    },
  ];

  return (
    <section className=" text-white py-24 px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-2">Leadership</h2>
          <p className="text-[#e95eb4] font-figtree text-lg">Meet our creative team</p>
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
          <h3 className="text-2xl font-light mb-8 text-center">
            Team <span className="text-[#e95eb4]">Structure</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {teamStructure.map((member, index) => (
              <TextTiltCard key={index}>
                <SpotlightCard className="rounded-2xl border border-white/10 p-6 h-[160px] flex flex-col justify-center cursor-pointer transition-all duration-300">
                  <h4 className="text-lg font-light mb-1">{member.name}</h4>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-2 border-b border-white/10 pb-1">
                    {member.position}
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {member.detail}
                  </p>
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
