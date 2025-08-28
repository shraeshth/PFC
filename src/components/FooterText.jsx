import React from "react";

function FooterText() {
  return (
    <div>
      <div className="w-full mx-auto px-7 py-3 border-t border-white/30">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          {/* Copyright */}
          <div className="text-white/30 text-sm md:text-base">
            © 2025 Photography & Filming Club. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm md:text-base text-white/30">
            <a
              href="https://www.linkedin.com/in/shreshth-sharma-1b3156248/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-300"
            >
              Contact the Developer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterText;
