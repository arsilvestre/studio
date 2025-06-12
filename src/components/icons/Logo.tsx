import type { SVGProps } from 'react';

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="150"
    height="30"
    viewBox="0 0 150 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <text
      x="50%"
      y="50%"
      dominantBaseline="middle"
      textAnchor="middle"
      fontFamily="Poppins, sans-serif"
      fontSize="20"
      fontWeight="bold"
      fill="currentColor"
    >
      NexusConnect
    </text>
  </svg>
);

export default Logo;
