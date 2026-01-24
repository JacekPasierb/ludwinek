import React from "react";

type Props = {
  size?: number;
  className?: string;
  title?: string;
};

const NoLitteringIcon = ({
  size = 144,
  className,
  title = "Zakaz pozostawiania śmieci",
}: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>

      {/* Tło koła */}
      <circle cx="32" cy="32" r="30" fill="currentColor" />

      {/* Biały ring (znak zakazu) */}
      <circle
        cx="32"
        cy="32"
        r="26"
        fill="none"
        stroke="#fff"
        strokeWidth="4"
      />

      {/* Kosz – bardziej wyrazisty */}
      <g fill="#fff">
        {/* Pokrywa */}
        <rect x="20" y="20" width="24" height="6" rx="3" />
        {/* Uchwyt */}
        <rect x="28" y="17.5" width="8" height="3" rx="1.5" />

        {/* Korpus kosza */}
        <rect x="22" y="26" width="20" height="24" rx="3" />

        {/* Wewnętrzne „listwy” – grubsze, żeby były widoczne */}
        <rect x="26.5" y="30" width="3" height="16" rx="1.5" />
        <rect x="30.5" y="30" width="3" height="16" rx="1.5" />
        <rect x="34.5" y="30" width="3" height="16" rx="1.5" />

        {/* Delikatne wycięcie u góry korpusu (otwór) */}
        <rect
          x="25"
          y="27.5"
          width="14"
          height="3.2"
          rx="1.6"
          fill="currentColor"
          opacity="0.25"
        />
      </g>

      {/* Przekreślenie jako ciemne (wycięcie) — nie zlewa się z bielą */}
      <rect
        x="9"
        y="29"
        width="46"
        height="7"
        rx="3.5"
        transform="rotate(-45 32 32)"
        fill="currentColor"
        opacity="0.95"
      />
    </svg>
  );
};

export default NoLitteringIcon;
