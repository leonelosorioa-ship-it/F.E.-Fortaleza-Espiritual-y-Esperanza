import React from 'react';

export type JesusSceneKey =
  | 'campo_lavanda_juntos'
  | 'clara_intimidad_paz'
  | 'leo_fortaleza_oracion'
  | 'mirada_amor_rayos'
  | 'adoracion_altar_misericordia'
  | 'custodia_santisimo_radiante'
  | 'fortaleza_espiritual_final';

interface JesusSceneProps {
  sceneKey: JesusSceneKey;
  className?: string;
  showCaption?: boolean;
}

export const JesusEnTiConfioScene: React.FC<JesusSceneProps> = ({
  sceneKey,
  className = '',
  showCaption = false,
}) => {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#0A1624] select-none ${className}`}>
      {/* SCENE 1: Campo de Lavanda Juntos al Amanecer */}
      {sceneKey === 'campo_lavanda_juntos' && (
        <svg viewBox="0 0 360 480" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="skySunrise" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7DD3FC" />
              <stop offset="40%" stopColor="#FED7AA" />
              <stop offset="70%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#C4B5FD" />
            </linearGradient>
            <radialGradient id="sunGlow" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#F59E0B" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#D97706" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="lavenderField" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6D28D9" />
              <stop offset="40%" stopColor="#5B21B6" />
              <stop offset="100%" stopColor="#31104B" />
            </linearGradient>
          </defs>

          {/* Sky with soft sunrise */}
          <rect width="360" height="480" fill="url(#skySunrise)" />
          {/* Sun with golden rays */}
          <circle cx="180" cy="140" r="160" fill="url(#sunGlow)" />

          {/* Sunbeams */}
          <g opacity="0.45" stroke="#FFFFFF" strokeWidth="1.5" className="animate-shimmer-rays">
            <line x1="180" y1="140" x2="40" y2="0" />
            <line x1="180" y1="140" x2="120" y2="0" />
            <line x1="180" y1="140" x2="240" y2="0" />
            <line x1="180" y1="140" x2="320" y2="0" />
            <line x1="180" y1="140" x2="360" y2="80" />
            <line x1="180" y1="140" x2="0" y2="80" />
          </g>

          {/* Floating light particles & hearts */}
          <g fill="#FEF08A" opacity="0.75">
            <circle cx="90" cy="100" r="2.5" />
            <circle cx="270" cy="110" r="2" />
            <circle cx="140" cy="70" r="1.8" />
            <circle cx="220" cy="80" r="2.2" />
          </g>

          {/* CLARA LUZ (Left figure) */}
          <g transform="translate(45, 140)">
            {/* Long dark hair */}
            <path d="M75 50 C50 60, 30 110, 35 180 C45 220, 60 250, 70 270 C85 240, 95 190, 85 140 Z" fill="#0F172A" />
            <path d="M75 50 C100 60, 120 110, 115 180 C105 220, 90 250, 80 270 C65 240, 55 190, 65 140 Z" fill="#0F172A" />
            {/* Soft blue dress */}
            <path d="M50 150 Q 75 135 100 150 L 115 320 L 35 320 Z" fill="#93C5FD" opacity="0.9" />
            {/* Gentle hands on heart */}
            <ellipse cx="75" cy="175" rx="18" ry="12" fill="#FED7AA" />
            <path d="M62 170 C 68 165, 82 165, 88 170 C 85 182, 65 182, 62 170 Z" fill="#FDBA74" />
            {/* Face in serene profile / smile */}
            <ellipse cx="75" cy="95" rx="22" ry="26" fill="#FED7AA" />
            {/* Peaceful closed eyes */}
            <path d="M65 94 Q 70 98 75 95" stroke="#475569" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M78 94 Q 83 98 88 95" stroke="#475569" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            {/* Sweet smile */}
            <path d="M72 108 Q 76 112 80 108" stroke="#E11D48" strokeWidth="1.8" fill="none" strokeLinecap="round" />
            {/* Hair bangs */}
            <path d="M54 85 Q 75 70 96 85 Q 98 95 96 110 Q 75 75 54 110 Z" fill="#0F172A" />
          </g>

          {/* LEO (Right figure) */}
          <g transform="translate(165, 130)">
            {/* Short neat dark hair */}
            <path d="M60 45 C45 55, 45 80, 50 95 C55 65, 85 60, 95 85 C100 70, 95 50, 80 45 Z" fill="#0F172A" />
            {/* Linen shirt */}
            <path d="M40 160 Q 75 145 110 160 L 125 330 L 25 330 Z" fill="#F1F5F9" />
            {/* Hands folded over heart with reverence */}
            <ellipse cx="75" cy="180" rx="20" ry="13" fill="#FED7AA" />
            <path d="M60 174 C 68 168, 82 168, 90 174 C 86 186, 64 186, 60 174 Z" fill="#FDBA74" />
            {/* Face in peace */}
            <ellipse cx="75" cy="100" rx="23" ry="27" fill="#FED7AA" />
            {/* Peaceful closed eyes */}
            <path d="M64 98 Q 70 102 76 99" stroke="#334155" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <path d="M80 99 Q 86 102 92 98" stroke="#334155" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            {/* Subtle serene smile */}
            <path d="M72 114 Q 77 118 82 114" stroke="#475569" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>

          {/* Foreground Lavender Field */}
          <g fill="url(#lavenderField)">
            <ellipse cx="60" cy="460" rx="100" ry="50" />
            <ellipse cx="200" cy="470" rx="120" ry="60" />
            <ellipse cx="320" cy="460" rx="90" ry="50" />
            {/* Lavender spikes */}
            <g fill="#A78BFA" opacity="0.85">
              <ellipse cx="40" cy="410" rx="4" ry="18" />
              <ellipse cx="70" cy="390" rx="5" ry="22" />
              <ellipse cx="110" cy="420" rx="4" ry="16" />
              <ellipse cx="260" cy="415" rx="5" ry="20" />
              <ellipse cx="295" cy="395" rx="6" ry="24" />
              <ellipse cx="330" cy="410" rx="5" ry="18" />
            </g>
          </g>

          {/* Floating Rose & Violet Petals */}
          <g fill="#FDA4AF" opacity="0.8" className="animate-float-petal">
            <path d="M80 240 Q 86 235 90 242 Q 84 246 80 240 Z" />
            <path d="M280 220 Q 287 215 292 222 Q 285 227 280 220 Z" />
            <path d="M180 270 Q 186 265 190 273 Q 183 277 180 270 Z" />
            <path d="M120 180 Q 125 175 130 181 Q 124 185 120 180 Z" />
          </g>
        </svg>
      )}

      {/* SCENE 2: Clara Luz - Intimidad, Respiración & Calma */}
      {sceneKey === 'clara_intimidad_paz' && (
        <svg viewBox="0 0 360 480" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="claraBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="35%" stopColor="#FDE68A" />
              <stop offset="70%" stopColor="#DDD6FE" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <radialGradient id="claraHalo" cx="50%" cy="35%" r="50%">
              <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="360" height="480" fill="url(#claraBg)" />
          <circle cx="180" cy="180" r="140" fill="url(#claraHalo)" />

          {/* Soft floating hearts & glowing particles */}
          <g fill="#FEF08A">
            <path d="M120 80 Q 125 72 130 80 Q 135 72 140 80 Q 130 92 120 80 Z" opacity="0.6" />
            <path d="M230 100 Q 235 92 240 100 Q 245 92 250 100 Q 240 112 230 100 Z" opacity="0.65" />
          </g>

          {/* Clara Luz Centered Close Up */}
          <g transform="translate(60, 60)">
            {/* Flowing Dark Hair with wind effect */}
            <path d="M120 80 C60 90, 20 160, 25 280 C35 340, 70 380, 85 410 C110 360, 130 280, 120 190 Z" fill="#0F172A" />
            <path d="M120 80 C180 90, 220 160, 215 280 C205 340, 170 380, 155 410 C130 360, 110 280, 120 190 Z" fill="#0F172A" />

            {/* Periwinkle dress */}
            <path d="M75 220 Q 120 200 165 220 L 190 420 L 50 420 Z" fill="#93C5FD" opacity="0.95" />

            {/* Delicate hands over heart */}
            <ellipse cx="120" cy="255" rx="30" ry="18" fill="#FED7AA" />
            <path d="M100 248 C 110 240, 130 240, 140 248 C 135 264, 105 264, 100 248 Z" fill="#FDBA74" />

            {/* Radiant serene face */}
            <ellipse cx="120" cy="140" rx="36" ry="42" fill="#FED7AA" />

            {/* Gentle curved closed eyelashes */}
            <path d="M104 138 Q 112 144 120 139" stroke="#334155" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M126 139 Q 134 144 142 138" stroke="#334155" strokeWidth="3" fill="none" strokeLinecap="round" />

            {/* Soft peaceful blush */}
            <circle cx="102" cy="150" r="7" fill="#FDA4AF" opacity="0.5" />
            <circle cx="140" cy="150" r="7" fill="#FDA4AF" opacity="0.5" />

            {/* Gracious smile */}
            <path d="M115 160 Q 121 166 128 160" stroke="#E11D48" strokeWidth="2.2" fill="none" strokeLinecap="round" />

            {/* Elegant front bangs */}
            <path d="M88 120 Q 120 100 152 120 Q 155 140 150 160 Q 120 105 90 160 Z" fill="#0F172A" />
          </g>

          {/* Floating gentle petals */}
          <g fill="#F472B6" opacity="0.75" className="animate-float-petal">
            <ellipse cx="60" cy="200" rx="7" ry="4" transform="rotate(-25 60 200)" />
            <ellipse cx="290" cy="180" rx="6" ry="3.5" transform="rotate(35 290 180)" />
            <ellipse cx="170" cy="340" rx="8" ry="4.5" transform="rotate(15 170 340)" />
          </g>
        </svg>
      )}

      {/* SCENE 3: Leo - Fortaleza Espiritual & Firmeza */}
      {sceneKey === 'leo_fortaleza_oracion' && (
        <svg viewBox="0 0 360 480" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="leoBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="30%" stopColor="#FDE68A" />
              <stop offset="70%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            <radialGradient id="leoRays" cx="50%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#FBBF24" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="360" height="480" fill="url(#leoBg)" />
          <circle cx="180" cy="160" r="150" fill="url(#leoRays)" />

          {/* Sunbeams of divine clarity */}
          <g stroke="#FFFBEB" strokeWidth="2" opacity="0.4" className="animate-shimmer-rays">
            <line x1="180" y1="160" x2="30" y2="0" />
            <line x1="180" y1="160" x2="180" y2="0" />
            <line x1="180" y1="160" x2="330" y2="0" />
            <line x1="180" y1="160" x2="360" y2="120" />
            <line x1="180" y1="160" x2="0" y2="120" />
          </g>

          {/* Leo Centered Close Up */}
          <g transform="translate(60, 50)">
            {/* Short Dark Hair */}
            <path d="M120 70 C80 80, 75 120, 80 145 C95 105, 140 100, 158 135 C165 110, 155 80, 135 70 Z" fill="#0F172A" />

            {/* Linen Shirt with open collar */}
            <path d="M60 230 Q 120 210 180 230 L 200 430 L 40 430 Z" fill="#F8FAFC" />

            {/* Strong hands folded in surrender over heart */}
            <ellipse cx="120" cy="270" rx="34" ry="20" fill="#FED7AA" />
            <path d="M96 260 C 108 250, 132 250, 144 260 C 138 278, 102 278, 96 260 Z" fill="#FDBA74" />

            {/* Noble masculine face in serene peace */}
            <ellipse cx="120" cy="150" rx="38" ry="44" fill="#FED7AA" />

            {/* Peaceful closed eyes */}
            <path d="M102 146 Q 111 152 120 147" stroke="#334155" strokeWidth="3.2" fill="none" strokeLinecap="round" />
            <path d="M127 147 Q 136 152 145 146" stroke="#334155" strokeWidth="3.2" fill="none" strokeLinecap="round" />

            {/* Calm, confident smile of faith */}
            <path d="M114 172 Q 121 178 128 172" stroke="#475569" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </g>

          {/* Golden blessing dust particles */}
          <g fill="#FEF08A" opacity="0.85">
            <circle cx="100" cy="180" r="3" />
            <circle cx="260" cy="190" r="2.5" />
            <circle cx="180" cy="290" r="3.5" />
            <circle cx="230" cy="260" r="2" />
          </g>
        </svg>
      )}

      {/* SCENE 4: Mirada de Amor & Rayos Celestiales */}
      {sceneKey === 'mirada_amor_rayos' && (
        <svg viewBox="0 0 360 480" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="covenantBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="50%" stopColor="#FED7AA" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>
            <radialGradient id="centerHeartGlow" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#FFF" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="360" height="480" fill="url(#covenantBg)" />
          <circle cx="180" cy="200" r="160" fill="url(#centerHeartGlow)" />

          {/* Diagonal bright rays connecting both faces */}
          <g stroke="#FFFFFF" strokeWidth="2" opacity="0.6">
            <line x1="80" y1="100" x2="280" y2="300" />
            <line x1="60" y1="160" x2="300" y2="240" />
            <line x1="120" y1="80" x2="240" y2="320" />
          </g>

          {/* Clara (Left) and Leo (Right) leaning gently in mutual tenderness */}
          <g transform="translate(10, 80)">
            {/* Clara face profile close up */}
            <path d="M40 70 C70 90, 85 140, 80 190 C70 210, 50 230, 30 240 Z" fill="#FED7AA" />
            {/* Closed eye with soft smile */}
            <path d="M60 140 Q 66 145 72 141" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M62 165 Q 68 170 74 166" stroke="#E11D48" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M10 60 C30 70, 70 80, 80 130 C70 170, 30 220, 0 250 Z" fill="#0F172A" />
          </g>

          <g transform="translate(190, 80)">
            {/* Leo face profile close up */}
            <path d="M120 70 C90 90, 75 140, 80 190 C90 210, 110 230, 130 240 Z" fill="#FED7AA" />
            <path d="M98 141 Q 92 145 86 140" stroke="#334155" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M96 166 Q 90 170 84 165" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M150 60 C130 70, 90 80, 80 130 C90 170, 130 220, 160 250 Z" fill="#0F172A" />
          </g>

          {/* Glowing heart between them */}
          <g transform="translate(155, 170)" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2">
            <path d="M25 15 C20 0, 0 0, 0 18 C0 32, 25 45, 25 48 C25 45, 50 32, 50 18 C50 0, 30 0, 25 15 Z" />
          </g>
        </svg>
      )}

      {/* SCENE 5: Adoración en el Altar • Jesús de la Divina Misericordia & Custodia */}
      {sceneKey === 'adoracion_altar_misericordia' && (
        <svg viewBox="0 0 360 480" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="churchNave" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="30%" stopColor="#2E1065" />
              <stop offset="65%" stopColor="#451A03" />
              <stop offset="100%" stopColor="#18181B" />
            </linearGradient>
            <radialGradient id="altarLight" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.95" />
              <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.5" />
              <stop offset="80%" stopColor="#B45309" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
            {/* Divine Mercy Rays (Pale/White & Red) */}
            <linearGradient id="mercyRed" x1="0%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#B91C1C" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="mercyPale" x1="0%" y1="0%" x2="-50%" y2="100%">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Church interior */}
          <rect width="360" height="480" fill="url(#churchNave)" />
          {/* Sanctuary Altar glow */}
          <circle cx="180" cy="180" r="160" fill="url(#altarLight)" />

          {/* Stained Glass arched windows on sides */}
          <path d="M20 60 A 20 20 0 0 1 60 60 L 60 180 L 20 180 Z" fill="#0284C7" opacity="0.3" stroke="#FDE68A" strokeWidth="1" />
          <path d="M300 60 A 20 20 0 0 1 340 60 L 340 180 L 300 180 Z" fill="#0284C7" opacity="0.3" stroke="#FDE68A" strokeWidth="1" />

          {/* Central Painting: Jesús de la Divina Misericordia */}
          <g transform="translate(130, 40)">
            {/* Arched Altarpiece Frame */}
            <path d="M0 40 A 50 50 0 0 1 100 40 L 100 130 L 0 130 Z" fill="#1C1917" stroke="#F59E0B" strokeWidth="2.5" />
            {/* Jesus silhouette in white robe with hand blessing */}
            <ellipse cx="50" cy="45" rx="14" ry="18" fill="#FED7AA" />
            <path d="M35 60 Q 50 55 65 60 L 75 130 L 25 130 Z" fill="#F8FAFC" />
            {/* Red Ray (Blood) pouring to the right */}
            <polygon points="50,75 85,130 65,130" fill="url(#mercyRed)" className="animate-shimmer-rays" />
            {/* Pale Ray (Water) pouring to the left */}
            <polygon points="50,75 15,130 35,130" fill="url(#mercyPale)" className="animate-shimmer-rays" />
            {/* Radiant golden halo */}
            <circle cx="50" cy="45" r="22" stroke="#FDE68A" strokeWidth="1.5" fill="none" opacity="0.8" />
          </g>

          {/* Altar Table with White Cloth & Candles */}
          <rect x="70" y="170" width="220" height="35" rx="3" fill="#FFFFFF" opacity="0.9" />
          {/* Candles */}
          <rect x="85" y="152" width="6" height="18" fill="#FEF3C7" /><circle cx="88" cy="148" r="3.5" fill="#F59E0B" />
          <rect x="269" y="152" width="6" height="18" fill="#FEF3C7" /><circle cx="272" cy="148" r="3.5" fill="#F59E0B" />

          {/* Holy Monstrance (Custodia) in Center of Altar */}
          <g transform="translate(170, 135)" fill="#F59E0B" stroke="#B45309" strokeWidth="0.8">
            <path d="M10 25 L 7 42 L 13 42 Z" />
            <circle cx="10" cy="20" r="10" fill="#FEF08A" />
            <circle cx="10" cy="20" r="5" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="1" />
            <line x1="10" y1="6" x2="10" y2="10" stroke="#F59E0B" strokeWidth="1.5" />
            <line x1="8" y1="8" x2="12" y2="8" stroke="#F59E0B" strokeWidth="1.5" />
          </g>

          {/* Wooden kneeler pews in foreground */}
          <rect x="40" y="270" width="280" height="14" rx="2" fill="#291A10" stroke="#451A03" strokeWidth="1.5" />

          {/* Clara Luz & Leo Kneeling in Adoration (View from back/side) */}
          <g transform="translate(75, 220)">
            {/* Clara Luz Kneeling */}
            <path d="M40 70 C30 90, 20 150, 15 190 L 70 190 C65 150, 60 90, 50 70 Z" fill="#93C5FD" opacity="0.9" />
            {/* Dark long hair down back */}
            <path d="M45 40 C35 55, 30 90, 35 125 C45 130, 55 130, 60 125 C65 90, 60 55, 50 40 Z" fill="#0F172A" />
            <ellipse cx="48" cy="35" rx="14" ry="16" fill="#FED7AA" />
          </g>

          <g transform="translate(180, 210)">
            {/* Leo Kneeling in deep reverence */}
            <path d="M45 75 C35 95, 25 155, 20 200 L 80 200 C75 155, 70 95, 60 75 Z" fill="#F1F5F9" />
            <ellipse cx="52" cy="40" rx="15" ry="17" fill="#FED7AA" />
            <path d="M52 23 C40 28, 38 45, 42 55 C48 38, 62 38, 66 50 C68 35, 62 25, 52 23 Z" fill="#0F172A" />
          </g>

          {/* Floating glowing heart sparkles */}
          <g fill="#FEF08A" opacity="0.8">
            <circle cx="90" cy="180" r="3" />
            <circle cx="280" cy="175" r="2.5" />
            <circle cx="140" cy="230" r="2" />
            <circle cx="230" cy="225" r="2" />
          </g>
        </svg>
      )}

      {/* SCENE 6: Custodia Radiante del Santísimo Sacramento */}
      {sceneKey === 'custodia_santisimo_radiante' && (
        <svg viewBox="0 0 360 480" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="monstranceBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="40%" stopColor="#451A03" />
              <stop offset="80%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#18181B" />
            </linearGradient>
            <radialGradient id="hostLight" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="25%" stopColor="#FEF08A" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="goldMetal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="35%" stopColor="#F59E0B" />
              <stop offset="70%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
          </defs>

          <rect width="360" height="480" fill="url(#monstranceBg)" />
          {/* Glorious Sunburst light from the Host */}
          <circle cx="180" cy="190" r="170" fill="url(#hostLight)" />

          {/* 360 degree Golden Rays streaming out */}
          <g stroke="#FDE68A" strokeWidth="2.5" opacity="0.75" strokeLinecap="round" className="animate-shimmer-rays">
            {Array.from({ length: 32 }).map((_, i) => {
              const angle = (i * 360) / 32;
              const rad = (angle * Math.PI) / 180;
              const x1 = 180 + Math.cos(rad) * 45;
              const y1 = 190 + Math.sin(rad) * 45;
              const length = i % 2 === 0 ? 110 : 85;
              const x2 = 180 + Math.cos(rad) * length;
              const y2 = 190 + Math.sin(rad) * length;
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
          </g>

          {/* Baroque Monstrance Body */}
          <g transform="translate(140, 100)">
            {/* Cross on apex */}
            <rect x="37" y="10" width="6" height="24" rx="1.5" fill="url(#goldMetal)" />
            <rect x="29" y="16" width="22" height="6" rx="1.5" fill="url(#goldMetal)" />

            {/* Circular Sunburst Frame */}
            <circle cx="40" cy="90" r="42" stroke="url(#goldMetal)" strokeWidth="6" fill="#0A0F1D" />

            {/* Inner Golden Rim with Jewels */}
            <circle cx="40" cy="90" r="30" stroke="#FEF08A" strokeWidth="3" fill="#FFFBEB" />

            {/* THE EUCHARISTIC HOST: Radiant White with Divine Sparkle */}
            <circle cx="40" cy="90" r="22" fill="#FFFFFF" filter="drop-shadow(0 0 12px #FFFFFF)" />
            {/* IHS / Cross subtle etching on Host */}
            <path d="M40 76 L 40 104 M 30 84 L 50 84" stroke="#FDE68A" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />

            {/* Pedestal & Stem */}
            <path d="M37 132 L 35 220 Q 30 250 15 270 L 65 270 Q 50 250 45 220 L 43 132 Z" fill="url(#goldMetal)" />
            <ellipse cx="40" cy="180" rx="14" ry="7" fill="#FEF08A" />
            <ellipse cx="40" cy="270" rx="35" ry="10" fill="url(#goldMetal)" stroke="#FEF08A" strokeWidth="1.5" />
          </g>

          {/* Floating Rose Petals around the Santísimo */}
          <g fill="#FDA4AF" opacity="0.85" className="animate-float-petal">
            <path d="M80 140 Q 86 132 92 140 Q 86 148 80 140 Z" />
            <path d="M280 150 Q 288 142 294 150 Q 288 158 280 150 Z" />
            <path d="M120 280 Q 128 270 134 280 Q 128 290 120 280 Z" />
            <path d="M240 290 Q 248 280 254 290 Q 248 300 240 290 Z" />
          </g>
        </svg>
      )}

      {/* SCENE 7: "Fortaleza Espiritual" Final Scene */}
      {sceneKey === 'fortaleza_espiritual_final' && (
        <svg viewBox="0 0 360 480" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="finalBg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="35%" stopColor="#312E81" />
              <stop offset="70%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#0B132B" />
            </linearGradient>
            <radialGradient id="gloryGlow" cx="50%" cy="30%" r="55%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#F59E0B" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#B45309" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect width="360" height="480" fill="url(#finalBg)" />
          <circle cx="180" cy="140" r="160" fill="url(#gloryGlow)" />

          {/* St. Faustina Divine Mercy Image blurred behind altar */}
          <g opacity="0.3" transform="translate(140, 20)">
            <ellipse cx="40" cy="35" rx="14" ry="18" fill="#FED7AA" />
            <path d="M25 50 Q 40 45 55 50 L 65 110 L 15 110 Z" fill="#F8FAFC" />
            <polygon points="40,65 70,110 50,110" fill="#EF4444" opacity="0.8" />
            <polygon points="40,65 10,110 30,110" fill="#38BDF8" opacity="0.8" />
          </g>

          {/* Monstrance on Altar glowing */}
          <g transform="translate(165, 90)" fill="#F59E0B">
            <circle cx="15" cy="25" r="14" fill="#FEF08A" />
            <circle cx="15" cy="25" r="7" fill="#FFFFFF" />
            <path d="M12 40 L 9 70 L 21 70 L 18 40 Z" />
          </g>

          {/* Clara & Leo Kneeling Facing Forward with Peaceful Joy */}
          {/* Clara Luz (Left) */}
          <g transform="translate(50, 180)">
            {/* Long flowing black hair */}
            <path d="M70 40 C45 50, 30 100, 35 170 C45 210, 60 230, 70 250 C85 220, 95 170, 85 120 Z" fill="#0F172A" />
            <path d="M70 40 C95 50, 110 100, 105 170 C95 210, 80 230, 70 250 C55 220, 45 170, 55 120 Z" fill="#0F172A" />
            {/* Soft blue dress */}
            <path d="M45 140 Q 70 125 95 140 L 110 280 L 30 280 Z" fill="#93C5FD" opacity="0.95" />
            {/* Hands on heart */}
            <ellipse cx="70" cy="165" rx="18" ry="12" fill="#FED7AA" />
            {/* Face smiling */}
            <ellipse cx="70" cy="85" rx="22" ry="26" fill="#FED7AA" />
            <path d="M60 84 Q 65 88 70 85" stroke="#334155" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M73 85 Q 78 88 83 84" stroke="#334155" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <path d="M66 98 Q 70 102 75 98" stroke="#E11D48" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          </g>

          {/* Leo (Right) */}
          <g transform="translate(170, 170)">
            {/* Short dark hair */}
            <path d="M60 40 C45 50, 45 75, 50 90 C55 60, 85 55, 95 80 C100 65, 95 45, 80 40 Z" fill="#0F172A" />
            <path d="M40 150 Q 75 135 110 150 L 125 290 L 25 290 Z" fill="#F8FAFC" />
            {/* Hands on heart */}
            <ellipse cx="75" cy="170" rx="20" ry="13" fill="#FED7AA" />
            <ellipse cx="75" cy="90" rx="23" ry="27" fill="#FED7AA" />
            <path d="M64 88 Q 70 92 76 89" stroke="#334155" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <path d="M80 89 Q 86 92 92 88" stroke="#334155" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <path d="M72 104 Q 77 108 82 104" stroke="#475569" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>

          {/* Gold Text Overlay Matching Video: "Fortaleza Espiritual" */}
          <text
            x="180"
            y="435"
            textAnchor="middle"
            fill="#FEF08A"
            fontFamily="serif"
            fontSize="26"
            fontWeight="bold"
            letterSpacing="2"
            filter="drop-shadow(0 2px 8px rgba(0,0,0,0.8))"
          >
            Fortaleza Espiritual
          </text>
        </svg>
      )}

      {/* Optional subtle caption badge */}
      {showCaption && (
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between text-[11px] text-[#FEF08A] bg-[#060F1E]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          <span className="font-semibold tracking-wide truncate">
            {sceneKey === 'campo_lavanda_juntos' && 'Paz en la Creación'}
            {sceneKey === 'clara_intimidad_paz' && 'Clara Luz • Calma del Alma'}
            {sceneKey === 'leo_fortaleza_oracion' && 'Leo • Fortaleza en Dios'}
            {sceneKey === 'mirada_amor_rayos' && 'Covenant de Paz y Alianza'}
            {sceneKey === 'adoracion_altar_misericordia' && 'Jesús, en Ti Confío'}
            {sceneKey === 'custodia_santisimo_radiante' && 'El Santísimo Sacramento'}
            {sceneKey === 'fortaleza_espiritual_final' && 'Fortaleza Espiritual y Esperanza'}
          </span>
          <span className="text-[10px] text-[#CBD5E1] uppercase font-bold shrink-0">F.E.™</span>
        </div>
      )}
    </div>
  );
};
