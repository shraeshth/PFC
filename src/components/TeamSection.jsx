import React, { useState } from "react";
import SpotlightCard from "./SpotlightCard";

const TeamSection = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const facultyCoordinator = {
    name: "Mrs. Shweta Sharma",
    role: "Faculty Co-ordinator",
    image:
      "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?q=80&w=1632&auto=format&fit=crop",
    message:
      "I encourage you to keep exploring new techniques, experimenting with different styles, and collaborating with fellow members. Remember, the beauty of photography and filmmaking lies in the endless possibilities.",
  };

  const studentLeadership = [
    {
      name: "Shreshth Sharma",
      role: "Co-ordinator",
      department: "IT",
      phone: "9413205649",
      email: "sharmashershth@gmail.com",
      image:
        "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      message:
        "Every image you create is a reflection of your soul. The journey of a photographer is like a blank canvas waiting to be filled.",
    },
    {
      name: "Harsh Panchal",
      role: "Co-Coordinator",
      department: "IT",
      rollNumber: "22/500",
      image:
        "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      message:
        "Collaboration and creativity are key. Join workshops, photo walks, and learn from experiences to enhance your craft.",
    },
  ];

  const teamStructure = [
    { name: "Rahul Verma", position: "President" },
    { name: "Anjali Mehta", position: "Vice President" },
    { name: "Sneha Kapoor", position: "Secretary" },
    { name: "Amit Singh", position: "Treasurer" },
    { name: "Priya Sharma", position: "Content Writer" },
    { name: "Rohan Patel", position: "Marketer" },
  ];

  return (
    <section className="bg-black text-white py-24 px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-thin mb-6">
            Meet the <span className="text-white/">Team</span>
          </h2>
        </div>

        {/* Faculty + Student Coordinators */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Faculty (Big Bento) */}
          <SpotlightCard className="lg:w-1/2 bg-black text-white rounded-2xl overflow-hidden border border-white/20 flex flex-col h-[500px]">
            <div className="h-2/5 w-full">
              <img
                src={facultyCoordinator.image}
                alt={facultyCoordinator.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-light mb-2">
                  {facultyCoordinator.name}
                </h3>
                <p className="text-gray-400 text-sm uppercase tracking-wide mb-4">
                  {facultyCoordinator.role}
                </p>
              </div>
              <p className="font-light italic leading-relaxed">
                {facultyCoordinator.message}
              </p>
            </div>
          </SpotlightCard>

          {/* Student Coordinators (Two small Bento) */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            {studentLeadership.map((member, index) => (
              <SpotlightCard
                key={index}
                className="flex bg-black overflow-hidden border border-white/20 rounded-2xl cursor-pointer transition-all duration-300 h-[237px]"
              >
                <div
                  onClick={() =>
                    setSelectedMember(selectedMember === index ? null : index)
                  }
                  className="w-full flex flex-row h-full"
                >
                  {/* Image side */}
                  <div className="w-1/2 h-full flex-shrink-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text side */}
                  <div className="p-4 flex-1 flex flex-col justify-center overflow-hidden">
                    <h3 className="text-2xl font-light mb-1 truncate">
                      {member.name}
                    </h3>
                    <p className="text-gray-400 text-lg uppercase tracking-wide mb-2 truncate">
                      {member.role}
                    </p>
                    {member.department && (
                      <p className="text-gray-500 text-sm mb-2 truncate">
                        {member.department}
                      </p>
                    )}
                    {selectedMember === index && (
                      <div className="mt-2 space-y-1 text-gray-300 text-sm overflow-auto max-h-[80px]">
                        {member.phone && (
                          <p>
                            <span className="text-gray-500">Phone:</span>{" "}
                            {member.phone}
                          </p>
                        )}
                        {member.email && (
                          <p>
                            <span className="text-gray-500">Email:</span>{" "}
                            {member.email}
                          </p>
                        )}
                        {member.rollNumber && (
                          <p>
                            <span className="text-gray-500">Roll:</span>{" "}
                            {member.rollNumber}
                          </p>
                        )}
                        {member.message && (
                          <p className="italic">{member.message}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Team Structure */}
        <div>
          <h3 className="text-2xl font-light mb-8 text-center">
            Organizational <span className="text-gray-400">Structure</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {teamStructure.map((member, index) => (
              <SpotlightCard
                key={index}
                className="flex bg-black rounded-2xl border border-white/20 overflow-hidden transition-all duration-300 h-[180px]"
              >
                <div className="w-2/5 h-full flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1508341591423-4347099e1f19?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <p className="text-lg font-light">{member.name}</p>
                  <p className="text-sm uppercase tracking-wide font-light text-gray-400">
                    {member.position}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
