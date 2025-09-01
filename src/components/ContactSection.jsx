import React from "react";

const ContactSection = () => {
  const contacts = [
    {
      name: "Garvit Sharma",
      role: "Co-ordinator",
      phone: "+91 75972 29078",
    },
    {
      name: "Venkatesh Kumar",
      role: "Co-Coordinator",
      phone: "+91 81023 56429",
    },
  ];

  return (
    <section className="bg-black text-white py-12 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light mb-2">Contact</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contacts - Creative Stacked Layout */}
          <div className="space-y-3">
            {contacts.map((contact, index) => (
              <div
                key={index}
                className="border border-white/20 rounded-xl overflow-hidden"
              >
                {/* Top bar with name and role */}
                <div className=" p-4 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-light text-lg">{contact.name}</h4>
                      <p className="text-gray-400 text-xs uppercase tracking-wide">
                        {contact.role}
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-[#ff66c4] rounded-full flex items-center justify-center">
                      <span className="text-black text-sm font-bold">
                        {contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Phone section */}
                <div className="p-4 bg-black/50">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center">
                      <i className="ri-phone-fill text-[#ff66c4] text-sm"></i>
                    </div>
                    <span className="font-mono text-sm">{contact.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="border border-white/20 rounded-xl overflow-hidden h-[280px] flex flex-col">
            <div className=" p-4 border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center">
                  <i className="ri-map-pin-fill text-[#ff66c4] text-sm"></i>
                </div>
                <span className="text-sm font-light">
                  Petroleum Engineering Department
                </span>
              </div>
            </div>
            <div className="flex-1">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1378.6194174036495!2d75.80558182966116!3d25.142124086009744!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f83e09e4ee827%3A0xba0743363f19a5ce!2sRajasthan%20Technical%20University%20Department%20of%20petroleum%20and%20petrochemical%20engineering!5e0!3m2!1sen!2sin!4v1755493673959!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "invert(1) grayscale(1) contrast(0.8)",
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
