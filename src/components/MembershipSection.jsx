import React, { useState, useRef } from "react";
import SpotlightCard from "./SpotlightCard";
import {
  Users,
  CheckCircle,
  BookOpen,
  Shield,
  Shield as ShieldIcon,
} from "lucide-react";

const MembershipSection = () => {
  const [activeTab, setActiveTab] = useState("membership");
  const [expandedRule, setExpandedRule] = useState(null);

  const clubRules = [
    {
      id: 1,
      title: "Equipment Care",
      description:
        "Members shall treat club equipment with care and respect. All borrowed equipment must be returned in the same condition it was received.",
      importance: "high",
    },
    {
      id: 2,
      title: "Active Participation",
      description:
        "Members shall participate actively in club activities and events. Regular attendance at meetings and workshops is expected to maintain membership status.",
      importance: "high",
    },
    {
      id: 3,
      title: "Intellectual Property",
      description:
        "Members shall respect intellectual property rights and avoid plagiarism. All original work must be credited appropriately, and copying others' work is strictly prohibited.",
      importance: "medium",
    },
    {
      id: 4,
      title: "Meeting Attendance",
      description:
        "Regular meetings held once every two weeks in Petroleum Department club room. Special meetings may be called by President or majority vote.",
      importance: "medium",
    },
    {
      id: 5,
      title: "Project Guidelines",
      description:
        "Members shall abide by specific rules for individual events or projects. Each event may have additional guidelines that must be followed.",
      importance: "low",
    },
    {
      id: 6,
      title: "Constitution Amendment",
      description:
        "This constitution may be amended by a two-thirds vote of the membership at regular or special meetings. All amendments must be proposed in writing.",
      importance: "low",
    },
  ];

  const membershipRules = [
    {
      icon: <Users size={20} />,
      title: "Open to All RTU Students",
      description:
        "Available to students from any department at Rajasthan Technical University, allowing everyone to explore photography and filmmaking.",
    },
    {
      icon: <CheckCircle size={20} />,
      title: "Free Membership",
      description:
        "No fees required; participate in workshops, events, and projects without any cost.",
    },
    {
      icon: <BookOpen size={20} />,
      title: "Application Process",
      description:
        "Complete a simple application and brief interview to join, ensuring members are aligned with club activities and interests.",
    },
    {
      icon: <Shield size={20} />,
      title: "Code of Conduct",
      description:
        "Members must follow university policies and club rules, maintaining a respectful and collaborative environment.",
    },
  ];

  const recruitmentSteps = [
    {
      step: 1,
      title: "Annual Recruitment Drive",
      description:
        "Comprehensive campaign at the beginning of each academic year",
      timeline: "Start of semester",
    },
    {
      step: 2,
      title: "Application Submission",
      description:
        "Complete application form with personal and academic details",
      timeline: "2 weeks",
    },
    {
      step: 3,
      title: "Interview Process",
      description:
        "Assessment of passion, commitment, and photography/filmmaking interest",
      timeline: "1 week",
    },
    {
      step: 4,
      title: "Selection & Orientation",
      description:
        "Welcome new members and introduce club goals and activities",
      timeline: "Ongoing",
    },
  ];

  const tabs = [
    { id: "membership", label: "Membership", icon: <Users size={18} /> },
    { id: "rules", label: "Rules", icon: <ShieldIcon size={18} /> },
  ];

  return (
    <section className="bg-black text-white py-24 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-thin mb-6">
            Join the <span className="text-white/70">Community</span>
          </h2>
          <p className="text-lg font-light text-white/70 max-w-2xl mx-auto leading-relaxed">
            Become part of RTU's premier photography and filming community
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex border border-white/20 rounded-2xl overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "bg-white text-black"
                    : "bg-transparent text-white"
                }`}
              >
                {tab.icon}
                <span className="font-light">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* MEMBERSHIP TAB */}
        <div className="min-h-96">
          {activeTab === "membership" && (
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Membership Requirements Box */}
              <SpotlightCard className="p-6 border border-white/20 rounded-2xl flex flex-col justify-between h-full">
                <h3 className="text-2xl font-light mb-6">
                  Membership Requirements
                </h3>
                <div className="space-y-4">
                  {membershipRules.map((rule, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="mt-1">{rule.icon}</div>
                      <div>
                        <h4 className="font-light text-lg">{rule.title}</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {rule.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>

              {/* Recruitment Process Box */}
              <SpotlightCard className="p-6 border border-white/20 rounded-2xl flex flex-col justify-between h-full">
                <h3 className="text-2xl font-light mb-6">
                  Recruitment Process
                </h3>
                <div className="space-y-4">
                  {recruitmentSteps.map((step) => (
                    <div key={step.step} className="flex items-start space-x-4">
                      <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-white font-light">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-light text-lg">{step.title}</h4>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {step.description} ({step.timeline})
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          )}

          {/* RULES TAB */}
          {activeTab === "rules" && (
            <div>
              <h3 className="text-2xl font-light mb-8 text-center">
                Club Rules & Regulations
              </h3>
              <div className="grid lg:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {clubRules.map((rule) => (
                  <SpotlightCard
                    key={rule.id}
                    className="border border-white/20 rounded-2xl p-6 cursor-pointer"
                    onClick={() =>
                      setExpandedRule(expandedRule === rule.id ? null : rule.id)
                    }
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-light text-lg">{rule.title}</h4>
                      <span className="text-xs px-2 py-1 rounded border border-white/20">
                        {rule.importance.toUpperCase()}
                      </span>
                    </div>
                    {expandedRule === rule.id && (
                      <p className="mt-4 text-white/70 text-sm">
                        {rule.description}
                      </p>
                    )}
                  </SpotlightCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;
