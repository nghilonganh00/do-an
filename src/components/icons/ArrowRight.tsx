import React from "react";

export const ArrowRight: React.FC<IconProps> = ({
  className = "",
  width = 20,
  height = 20,
  color = "white",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      {...props}
    >
      <path d="M3.125 10H16.875" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M11.25 4.375L16.875 10L11.25 15.625"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
