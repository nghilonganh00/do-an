import React from "react";

export const Stack: React.FC<IconProps> = ({
  className = "",
  width = 20,
  height = 20,
  color = "#5F6C72",
  ...props
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <g clipPath="url(#clip0_2510_7245)">
      <path
        d="M2.5 13.75L10 18.125L17.5 13.75"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 10L10 14.375L17.5 10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 6.25L10 10.625L17.5 6.25L10 1.875L2.5 6.25Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2510_7245">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
