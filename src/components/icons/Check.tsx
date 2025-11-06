import React from "react";

export const Check: React.FC<IconProps> = ({
  className = "",
  size = 14,
  width = 20,
  height = 20,
  color = "white",
  ...props
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path
        d="M11.8125 3.9375L5.6875 10.0625L2.625 7"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
