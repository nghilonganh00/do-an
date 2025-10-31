import React from "react";

export const ChevronUp: React.FC<IconProps> = ({ className = "", width = 20, height = 20, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <path d="M13 6L8 11L3 6" stroke="#ADB7BC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
