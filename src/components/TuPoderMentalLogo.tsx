import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

export const TuPoderMentalLogo: React.FC<LogoProps> = ({
  className = '',
  size = 48,
  showText = true,
  textColor = 'text-[#0E2442]',
}) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Emblem SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-xs"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFB25E" />
            <stop offset="50%" stopColor="#C99757" />
            <stop offset="100%" stopColor="#AA7834" />
          </linearGradient>
          <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#25A296" />
            <stop offset="100%" stopColor="#0B4B5E" />
          </linearGradient>
          <linearGradient id="navyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A3B66" />
            <stop offset="100%" stopColor="#0A1C33" />
          </linearGradient>
        </defs>

        {/* Outer Circular Ring with subtle opening */}
        <circle
          cx="80"
          cy="80"
          r="72"
          stroke="url(#navyGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="420 30"
          transform="rotate(-45 80 80)"
        />

        {/* Stylized Leaves at Bottom Left */}
        <path
          d="M34 118C28 104 36 90 48 84C46 98 42 112 34 118Z"
          fill="#1C7E74"
        />
        <path
          d="M48 126C38 120 40 106 54 98C56 112 56 122 48 126Z"
          fill="#25A296"
        />
        <path
          d="M62 134C52 134 50 120 62 112C66 124 68 132 62 134Z"
          fill="#165B54"
        />

        {/* Male Profile (Left side facing center) */}
        <path
          d="M58 54C62 50 68 46 76 44C70 48 68 54 66 60C62 58 59 62 57 66C55 69 56 73 54 77C52 80 47 82 50 86C52 88 56 89 57 93C58 97 54 100 56 104C58 107 65 110 70 112C64 114 56 109 52 101C48 93 46 82 48 72C50 63 53 58 58 54Z"
          fill="url(#navyGrad)"
        />

        {/* Flowing Female Profile & Hair (Right side facing center) */}
        <path
          d="M102 52C96 46 88 44 80 44C88 48 92 56 94 64C96 62 98 65 101 68C103 71 102 75 104 79C106 82 111 84 108 88C106 91 101 92 100 96C98 101 102 105 98 111C94 116 88 122 80 124C88 122 98 117 104 108C110 99 113 88 111 76C109 66 106 58 102 52Z"
          fill="url(#tealGrad)"
        />

        {/* Connected Mind Nodes & Mind Heart (Center Top) */}
        <circle cx="66" cy="62" r="3.5" fill="#25A296" />
        <circle cx="80" cy="54" r="3.5" fill="#DFB25E" />
        <circle cx="94" cy="62" r="3.5" fill="#25A296" />
        <line x1="66" y1="62" x2="80" y2="54" stroke="#C99757" strokeWidth="2" strokeDasharray="2 2" />
        <line x1="80" y1="54" x2="94" y2="62" stroke="#C99757" strokeWidth="2" strokeDasharray="2 2" />

        {/* Upper Golden Heart in Mind */}
        <path
          d="M80 62C78 58 71 58 71 63C71 67 76 71 80 75C84 71 89 67 89 63C89 58 82 58 80 62Z"
          fill="url(#goldGrad)"
          stroke="#FFFFFF"
          strokeWidth="1.2"
        />

        {/* Lower Prominent Golden Heart (Chest / Soul Union) */}
        <path
          d="M80 108C76 102 66 103 66 110C66 116 74 122 80 128C86 122 94 116 94 110C94 103 84 102 80 108Z"
          fill="url(#goldGrad)"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
      </svg>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-[0.22em] font-semibold text-[#C99757] uppercase">
              — TU —
            </span>
          </div>
          <div className={`font-sans font-extrabold tracking-tight text-[18px] sm:text-[20px] leading-tight ${textColor} uppercase flex items-center gap-1`}>
            <span>PODER</span>
            <span className="w-2.5 h-2.5 inline-block text-[#C99757]">♥</span>
            <span>MENTAL</span>
          </div>
          <span className="text-[9px] tracking-[0.14em] uppercase font-medium text-[#1C7E74]">
            F.E.™ • Fortaleza y Esperanza en Dios
          </span>
        </div>
      )}
    </div>
  );
};
