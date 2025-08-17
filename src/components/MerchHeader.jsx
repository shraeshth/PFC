import React from "react";

const MerchHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-6">
      <h1 className="text-5xl font-bold uppercase tracking-wide">{title}</h1>
      <p className="text-sm opacity-70">{subtitle}</p>
    </div>
  );
};

export default MerchHeader;
