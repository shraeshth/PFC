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
    },
  ];

  return (
    <section className="bg-black text-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-thin mb-3 sm:mb-4 lg:mb-6">
            Get in <span className="text-white/70">Touch</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-light text-white/70 max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Ready to join our creative community? Reach out to us and start your
            photography journey.
          </p>
        </div>

        {/* Layout */}
        <div className="flex flex-col xl:flex-row gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
          {/* Left: Contacts */}
          <div className="xl:flex-1 flex flex-col gap-4 sm:gap-6">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-light mb-2 sm:mb-4">
              Contact Our Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4 sm:gap-6">
              {contactInfo.map((contact, index) => (
                <div
                  key={index}
                  className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 bg-cover bg-center min-h-[180px] sm:min-h-[200px] lg:min-h-[220px]"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?q=80&w=766&auto=format&fit=crop&ixlib=rb-4.1.0')",
                  }}
                >
                  <div className="absolute inset-0 bg-black/60 p-4 sm:p-5 lg:p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                        <div className="text-white mt-1 flex-shrink-0">{contact.icon}</div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-base sm:text-lg lg:text-xl font-light mb-1 truncate">
                            {contact.name}
                          </h4>
                          <p className="text-white/70 text-xs sm:text-sm uppercase tracking-wide">
                            {contact.role}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Phone size={14} className="text-white/70 flex-shrink-0 sm:w-4 sm:h-4" />
                          <span className="font-light break-all sm:break-normal">{contact.phone}</span>
                        </div>
                        {contact.email && (
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <Mail size={14} className="text-white/70 flex-shrink-0 sm:w-4 sm:h-4" />
                            <span className="font-light break-all sm:break-normal text-xs sm:text-sm lg:text-base">
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
          </div>

          {/* Right: Map */}
          <div className="xl:flex-1 flex flex-col">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-light mb-4 sm:mb-6">
              Club Location
            </h3>
            {clubDetails.map((detail, index) => (
              <div
                key={index}
                className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/20 h-64 sm:h-80 md:h-96 lg:h-[400px] xl:h-full xl:min-h-[500px]"
              >
                <div className="absolute inset-0 flex flex-col">
                  <div className="p-4 sm:p-5 lg:p-6 bg-black/20 backdrop-blur-sm border-b border-white/10">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="text-white mt-1 flex-shrink-0">{detail.icon}</div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-light mb-1 text-base sm:text-lg">
                          {detail.title}
                        </h4>
                        <p className="text-white/70 text-xs sm:text-sm lg:text-base">
                          {detail.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Map iframe */}
                  <div className="flex-1 overflow-hidden">
                    <iframe
                      title="Petroleum Dept, RTU Kota"
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1378.6194174036495!2d75.80558182966116!3d25.142124086009744!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f83e09e4ee827%3A0xba0743363f19a5ce!2sRajasthan%20Technical%20University%20Department%20of%20petroleum%20and%20petrochemical%20engineering!5e0!3m2!1sen!2sin!4v1755493673959!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full"
                    ></iframe>
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