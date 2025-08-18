import React from "react";
import { Phone, Mail, MapPin, User } from "lucide-react";

const ContactSection = () => {
  const contactInfo = [
    {
      name: "Shreshth Sharma",
      role: "Student Co-ordinator",
      phone: "9413205649",
      email: "sharmashershth@gmail.com",
      icon: <User size={20} />,
    },
    {
      name: "Harsh Panchal",
      role: "Co-Coordinator",
      phone: "86858 65175",
      email: null,
      icon: <User size={20} />,
    },
  ];

  const clubDetails = [
    {
      icon: <MapPin size={20} />,
      title: "Club Location",
      detail: "Petroleum Department, RTU Kota Campus",
      mapEmbed: (
        <iframe
          title="RTU Kota Campus"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.961027622921!2d75.82791677504885!3d25.213803983851794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db318f4ad45fd%3A0xb42561f1eec7f0aa!2sRajasthan%20Technical%20University%2C%20Kota!5e0!3m2!1sen!2sin!4v1692284140184!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{
            border: 0,
            borderRadius: "1rem",
          }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      ),
    },
  ];

  return (
    <section className="bg-black text-white py-10 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-thin mb-6">
            Get in <span className="text-white/70">Touch</span>
          </h2>
          <p className="text-lg font-light text-white/70 max-w-2xl mx-auto leading-relaxed">
            Ready to join our creative community? Reach out to us and start your
            photography journey
          </p>
        </div>

        {/* Bento layout with fixed height */}
        <div className="flex flex-col lg:flex-row gap-12 h-[400px]">
          {/* Left: Contacts */}
          <div className="lg:flex-1 flex flex-col gap-6 h-full">
            <h3 className="text-2xl font-light mb-4">Contact Our Team</h3>
            {contactInfo.map((contact, index) => (
              <div
                key={index}
                className="relative flex flex-1 rounded-2xl overflow-hidden bg-cover bg-left bg-no-repeat border border-white/20"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=766&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
              >
                <div className="absolute inset-0 bg-black/60 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="text-white mt-1">{contact.icon}</div>
                      <div>
                        <h4 className="text-xl font-light mb-1">
                          {contact.name}
                        </h4>
                        <p className="text-white/70 text-sm uppercase tracking-wide">
                          {contact.role}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <Phone size={16} className="text-white/70" />
                        <span className="font-light text-sm">
                          {contact.phone}
                        </span>
                      </div>
                      {contact.email && (
                        <div className="flex items-center space-x-3">
                          <Mail size={16} className="text-white/70" />
                          <span className="font-light text-sm">
                            {contact.email}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Map */}
          <div className="lg:flex-1 h-full flex flex-col grayscale">
            <h3 className="text-2xl font-light mb-10">Club Location</h3>
            {clubDetails.map((detail, index) => (
              <div
                key={index}
                className="relative flex flex-1 rounded-2xl overflow-hidden border border-white/20"
              >
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="text-white mt-1">{detail.icon}</div>
                      <div>
                        <h4 className="font-light mb-1">{detail.title}</h4>
                        <p className="text-white/70 text-sm">{detail.detail}</p>
                      </div>
                    </div>
                    <div className="flex-1 rounded-2xl overflow-hidden border border-white/20 h-full">
                      <iframe
                        title="Petroleum Dept, RTU Kota"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1378.6194174036495!2d75.80558182966116!3d25.142124086009744!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f83e09e4ee827%3A0xba0743363f19a5ce!2sRajasthan%20Technical%20University%20Department%20of%20petroleum%20and%20petrochemical%20engineering!5e0!3m2!1sen!2sin!4v1755493673959!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{
                          border: 0,
                          borderRadius: "1rem",
                        }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
