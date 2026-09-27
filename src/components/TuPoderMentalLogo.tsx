import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

export const TuPoderMentalLogo: React.FC<LogoProps> = ({
  className = '',
  size = 44,
  showText = true,
  textColor = 'text-[#0B1E36]',
}) => {
  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 min-w-0 ${className}`}>
      {/* 
        Exact Vector Representation of "Nuevo Logo Tu Poder Mental"
        - Navy circular frame
        - Male profile (left) & Female profile with closed eye (right)
        - Neural constellation in the mind with golden heart
        - Prominent lower golden heart
        - 4 green botanical leaves at bottom-left
      */}
      <svg
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 shrink-0 drop-shadow-sm select-none"
        aria-label="Logo Tu Poder Mental"
      >
        <defs>
          {/* Metallic Gold Gradients for the 2 Hearts */}
          <linearGradient id="goldHeartMain" x1="20%" y1="10%" x2="80%" y2="90%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          <linearGradient id="goldHeartMind" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Deep Navy Gradient for Silhouettes & Ring */}
          <linearGradient id="navyPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0B1E36" />
            <stop offset="50%" stopColor="#0E2849" />
            <stop offset="100%" stopColor="#081426" />
          </linearGradient>

          {/* Hair Accent Tone */}
          <linearGradient id="navyHair" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#102A4E" />
            <stop offset="60%" stopColor="#0B1E36" />
            <stop offset="100%" stopColor="#061120" />
          </linearGradient>

          {/* Botanical Leaf Gradients */}
          <linearGradient id="leafDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>

          <linearGradient id="leafMid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          <linearGradient id="leafBright" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          <linearGradient id="leafTeal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#0F766E" />
          </linearGradient>
        </defs>

        {/* 1. OUTER CIRCULAR RING */}
        <circle
          cx="110"
          cy="104"
          r="86"
          stroke="url(#navyPrimary)"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeDasharray="470 70"
          transform="rotate(-52 110 104)"
        />

        {/* 2. SILHOUETTES & INNER COMPOSITION */}
        <g id="faces-and-hair">
          {/* MALE SILHOUETTE (Left Profile - Navy) */}
          {/* Hair locks on top curving dynamically */}
          <path
            d="M86 36C96 32 108 34 118 38C110 40 102 44 96 50C104 48 112 50 118 54C110 56 102 61 98 68C98 64 94 62 90 60C85 58 80 60 76 64C72 58 76 50 78 44C81 40 83 38 86 36Z"
            fill="url(#navyPrimary)"
          />

          {/* Male Face Contour & Neck */}
          <path
            d="M80 52C82 56 80 62 76 66C73 70 71 76 71 80C68 81 64 83 62 87C60 91 63 94 66 94C66 97 64 100 66 103C68 106 72 106 74 107C74 112 70 116 71 121C72 125 78 128 84 130C86 135 84 142 86 148C88 153 92 158 96 160C88 158 82 151 80 144C78 137 77 130 73 126C68 120 62 114 62 105C62 98 66 94 62 88C59 84 62 78 65 74C68 70 70 64 74 58C76 55 78 53 80 52Z"
            fill="url(#navyPrimary)"
          />

          {/* Central Body of Male Head & Forehead Connection */}
          <path
            d="M78 54C86 52 96 54 102 60C106 64 108 72 108 80C108 92 104 104 101 116C98 128 98 140 102 152C96 150 90 145 86 138C82 130 82 120 84 110C86 100 86 90 84 80C82 72 80 62 78 54Z"
            fill="url(#navyPrimary)"
          />

          {/* FEMALE FLOWING HAIR (Navy & Deep Blue Waves) */}
          <path
            d="M112 36C124 37 136 43 144 52C152 61 156 73 156 86C156 100 152 113 146 125C140 137 132 147 122 155C118 158 113 161 108 162C116 156 124 148 130 138C136 128 139 116 139 104C139 91 135 80 128 70C123 62 116 56 110 50C106 46 108 40 112 36Z"
            fill="url(#navyHair)"
          />

          {/* Female Inner Flowing Locks Framing the Face */}
          <path
            d="M106 52C114 58 120 66 122 76C124 86 121 96 116 105C112 113 108 122 106 132C104 142 106 152 110 160C106 158 102 153 100 146C98 138 100 130 102 122C104 114 106 106 104 98C102 90 98 83 96 75C95 68 98 62 101 57C103 54 104 53 106 52Z"
            fill="#0E2849"
          />

          {/* FEMALE PROFILE CONTOUR (Serene face facing Right) */}
          {/* Elegant facial outline */}
          <path
            d="M136 60C138 64 141 68 145 72C149 76 153 80 154 86C155 89 153 92 150 94C147 96 148 99 151 101C153 103 151 106 148 108C146 110 148 113 149 116C150 120 147 125 143 129C139 133 133 138 127 141"
            stroke="url(#navyPrimary)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Female Closed Serene Eye with Lashes */}
          <path
            d="M137 83C140 86 144 87 147 85"
            stroke="#0B1E36"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
          {/* Delicate eyelashes curving softly downwards */}
          <path
            d="M141 86L140 89"
            stroke="#0B1E36"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M144 86L144 90"
            stroke="#0B1E36"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>

        {/* 3. MIND NEURAL CONSTELLATION & UPPER GOLDEN HEART */}
        <g id="mind-constellation">
          {/* Constellation Network Connecting Lines */}
          <line x1="88" y1="64" x2="108" y2="52" stroke="#E5A93C" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="108" y1="52" x2="124" y2="56" stroke="#0284C7" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="124" y1="56" x2="126" y2="70" stroke="#00BCD4" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="108" y1="52" x2="105" y2="72" stroke="#E5A93C" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="88" y1="64" x2="102" y2="72" stroke="#00BCD4" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="102" y1="72" x2="126" y2="70" stroke="#E5A93C" strokeWidth="1.8" strokeLinecap="round" />

          {/* Network Nodes (Cyan & Gold) */}
          <circle cx="88" cy="64" r="3.5" fill="#E5A93C" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="108" cy="52" r="4.2" fill="#00BCD4" stroke="#FFFFFF" strokeWidth="1.2" />
          <circle cx="124" cy="56" r="3.8" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />
          <circle cx="126" cy="70" r="4.2" fill="#0284C7" stroke="#FFFFFF" strokeWidth="1.2" />

          {/* UPPER GOLDEN HEART (Nestled inside the mind network) */}
          <path
            d="M107 68 C104 62 94 62 94 70 C94 77 103 83 107 89 C111 83 120 77 120 70 C120 62 110 62 107 68 Z"
            fill="url(#goldHeartMind)"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinejoin="round"
            className="filter drop-shadow-xs"
          />
          {/* Subtle inner heart highlight */}
          <path
            d="M98 67 C96 69 96 72 98 74"
            stroke="#FEF9C3"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* 4. LOWER PROMINENT GOLDEN HEART (Center-Base Soul Connection) */}
        <g id="lower-golden-heart">
          <path
            d="M122 136 C117 127 103 127 103 139 C103 149 116 158 122 167 C128 158 141 149 141 139 C141 127 127 127 122 136 Z"
            fill="url(#goldHeartMain)"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinejoin="round"
            className="filter drop-shadow-sm"
          />
          {/* Inner sheen arc for metallic gloss */}
          <path
            d="M108 135 C105 139 105 144 109 148"
            stroke="#FEF3C7"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* 5. FOUR BOTANICAL LEAVES (Sprouting gracefully on Bottom Left) */}
        <g id="botanical-leaves">
          {/* Leaf 1: Upper-most leaf pointing up-left */}
          <path
            d="M48 94 C46 80 58 68 74 65 C76 81 66 94 48 94 Z"
            fill="url(#leafDark)"
          />
          <path d="M52 90 C62 82 68 74 72 68" stroke="#A7F3D0" strokeWidth="1" opacity="0.6" strokeLinecap="round" />

          {/* Leaf 2: Main large left-pointing leaf */}
          <path
            d="M40 114 C32 100 44 84 62 80 C64 98 56 112 40 114 Z"
            fill="url(#leafMid)"
          />
          <path d="M44 110 C52 100 58 92 60 84" stroke="#D1FAE5" strokeWidth="1.2" opacity="0.7" strokeLinecap="round" />

          {/* Leaf 3: Lower-left vibrant leaf */}
          <path
            d="M50 134 C40 124 48 108 66 104 C68 120 62 132 50 134 Z"
            fill="url(#leafBright)"
          />
          <path d="M54 130 C60 122 64 114 65 107" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" strokeLinecap="round" />

          {/* Leaf 4: Bottom-most teal leaf anchoring to the circle */}
          <path
            d="M68 148 C56 142 62 126 78 120 C82 136 78 146 68 148 Z"
            fill="url(#leafTeal)"
          />
          <path d="M70 144 C76 138 78 130 78 124" stroke="#CCFBF1" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
        </g>
      </svg>

      {/* Brand Wordmark & Typography Matching Uploaded Artwork */}
      {showText && (
        <div className="flex flex-col text-left select-none min-w-0">
          {/* Line 1: — TU — */}
          <div className="flex items-center gap-1 -mb-0.5">
            <span className="w-2.5 sm:w-3.5 h-[1.5px] bg-[#CBD5E1]/60 inline-block" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.26em] font-semibold text-[#CBD5E1] uppercase">
              TU
            </span>
            <span className="w-2.5 sm:w-3.5 h-[1.5px] bg-[#CBD5E1]/60 inline-block" />
          </div>

          {/* Line 2: PODER (with Golden Heart in the 'O') */}
          <div className="flex items-center font-sans font-bold tracking-[0.04em] text-[15px] sm:text-[20px] leading-none text-[#F1F5F9] uppercase">
            <span>P</span>
            {/* The 'O' with embedded golden heart */}
            <span className="relative inline-flex items-center justify-center mx-[1px] sm:mx-[1.5px] w-[14px] h-[14px] sm:w-[18px] sm:h-[18px] rounded-full border-[2px] sm:border-[2.5px] border-[#F1F5F9]">
              <svg
                viewBox="0 0 24 24"
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-[#F59E0B] stroke-[#B45309] stroke-[0.8]"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </span>
            <span>DER</span>
          </div>

          {/* Line 3: MENTAL */}
          <div className="font-sans font-semibold tracking-[0.2em] sm:tracking-[0.24em] text-[9.5px] sm:text-[12px] leading-tight text-[#CBD5E1] uppercase -mt-0.5">
            MENTAL
          </div>

          {/* Secondary Subtitle: F.E.™ */}
          <span className="text-[7px] xs:text-[8px] sm:text-[9px] tracking-[0.02em] sm:tracking-[0.08em] uppercase font-semibold text-[#10B981] mt-0.5 leading-tight truncate max-w-[130px] xs:max-w-[170px] sm:max-w-none block">
            F.E.™  Fortaleza Espiritual y Esperanza
          </span>
        </div>
      )}
    </div>
  );
};
