import React, { useState } from 'react';
import { Maximize2, X, Sparkles, Heart } from 'lucide-react';

interface DayIllustrationProps {
  illustrationKey?: string;
  themeTitle: string;
  categoryLabel?: string;
  className?: string;
  onExpand?: () => void;
  showZoomButton?: boolean;
}

export const DayIllustrationCard: React.FC<DayIllustrationProps> = ({
  illustrationKey = 'dia_1',
  themeTitle,
  categoryLabel = 'Fe y Esperanza',
  className = '',
  onExpand,
  showZoomButton = true,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenZoom = () => {
    if (onExpand) {
      onExpand();
    } else {
      setIsModalOpen(true);
    }
  };

  const renderArtwork = (isZoomed = false) => {
    const key = illustrationKey || 'dia_1';

    return (
      <div className={`w-full relative flex items-center justify-center overflow-hidden ${isZoomed ? 'h-72 sm:h-96' : 'h-52 sm:h-64'}`}>
        {/* SCENE 1: UNA VIDA NUEVA POR FE (Puerta abierta a valle de lavanda y luz) */}
        {(key === 'door_light_meadow' || key === 'dia_1') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="skyDoor" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="50%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#0B132B" />
              </linearGradient>
              <linearGradient id="sunGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
              <linearGradient id="meadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="60%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#7E22CE" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#skyDoor)" />
            <path d="M-10 240 Q 60 120 120 240 Z" fill="#0A1124" opacity="0.9" />
            <path d="M300 240 Q 340 100 420 240 Z" fill="#0A1124" opacity="0.9" />
            <g transform="translate(145, 20)">
              <circle cx="55" cy="90" r="110" fill="url(#sunGlow)" opacity="0.25" filter="blur(16px)" />
              <rect x="10" y="10" width="90" height="190" rx="6" fill="#FBBF24" opacity="0.3" stroke="#FDE68A" strokeWidth="2.5" />
              <path d="M15 15 L95 15 L145 200 L-35 200 Z" fill="url(#meadowGrad)" opacity="0.85" />
              <path d="M15 15 L95 15 L95 195 L15 195 Z" fill="#FEF3C7" opacity="0.9" />
              <path d="M15 15 L-30 35 L-30 190 L15 195 Z" fill="#92400E" stroke="#FDE68A" strokeWidth="1.5" />
              <line x1="55" y1="40" x2="-20" y2="210" stroke="#FFFBEB" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
              <line x1="55" y1="40" x2="60" y2="210" stroke="#FFFBEB" strokeWidth="4" opacity="0.7" strokeLinecap="round" />
              <line x1="55" y1="40" x2="130" y2="210" stroke="#FFFBEB" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
            </g>
            <g fill="#A855F7" opacity="0.85">
              <circle cx="40" cy="210" r="4" /><circle cx="45" cy="200" r="4.5" /><circle cx="43" cy="190" r="5" />
              <circle cx="70" cy="215" r="4" /><circle cx="72" cy="205" r="4.5" />
              <circle cx="330" cy="210" r="4" /><circle cx="335" cy="200" r="5" /><circle cx="340" cy="175" r="4" />
            </g>
            <circle cx="170" cy="70" r="3" fill="#FDE68A" opacity="0.9" />
            <circle cx="230" cy="90" r="4" fill="#FDE68A" opacity="0.8" />
          </svg>
        )}

        {/* SCENE 2: LA ALEGRÍA DE LA ESPERANZA (Pareja gozosa en campo de flores al amanecer) */}
        {(key === 'couple_praising_sun' || key === 'dia_2') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="skySunrise" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="45%" stopColor="#FDE68A" />
                <stop offset="75%" stopColor="#FB923C" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#skySunrise)" />
            <circle cx="200" cy="110" r="45" fill="#FEF08A" opacity="0.95" />
            <circle cx="200" cy="110" r="85" fill="#FDE68A" opacity="0.3" filter="blur(12px)" />
            <path d="M-20 180 Q 200 130 420 180 L 420 250 L -20 250 Z" fill="#4C1D95" opacity="0.9" />
            <path d="M-20 200 Q 180 160 420 200 L 420 250 L -20 250 Z" fill="#2E1065" />
            <g transform="translate(145, 80)">
              <circle cx="25" cy="40" r="16" fill="#F8FAFC" opacity="0.95" />
              <path d="M12 36 Q 30 15 45 42 Q 35 60 12 50 Z" fill="#1E293B" />
              <path d="M10 56 Q 25 50 40 56 L 46 110 L 4 110 Z" fill="#93C5FD" opacity="0.9" />
              <ellipse cx="25" cy="68" rx="8" ry="5" fill="#FDE68A" />
              <circle cx="85" cy="38" r="16" fill="#F8FAFC" opacity="0.95" />
              <path d="M72 32 Q 88 16 102 32 L 98 44 L 72 40 Z" fill="#1E293B" />
              <path d="M70 54 Q 85 48 100 54 L 106 110 L 64 110 Z" fill="#E2E8F0" opacity="0.9" />
              <ellipse cx="85" cy="68" rx="8" ry="5" fill="#FDE68A" />
            </g>
            <g fill="#C084FC" opacity="0.9">
              <circle cx="30" cy="180" r="4.5" /><circle cx="60" cy="170" r="4" /><circle cx="120" cy="175" r="4.5" />
              <circle cx="280" cy="185" r="4.5" /><circle cx="340" cy="180" r="4" /><circle cx="370" cy="190" r="5" />
            </g>
          </svg>
        )}

        {/* SCENE 3: ESPERANZA QUE TRAE PAZ (Río sereno, rocas y palomas de paz) */}
        {(key === 'stepping_stones_doves' || key === 'dia_3') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="pondGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0F766E" />
                <stop offset="50%" stopColor="#14B8A6" />
                <stop offset="100%" stopColor="#0E7490" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="#042F2E" />
            <ellipse cx="200" cy="160" rx="190" ry="85" fill="url(#pondGrad)" opacity="0.85" />
            <ellipse cx="140" cy="190" rx="28" ry="12" fill="#64748B" stroke="#94A3B8" strokeWidth="2" />
            <ellipse cx="190" cy="160" rx="24" ry="10" fill="#64748B" stroke="#94A3B8" strokeWidth="2" />
            <ellipse cx="240" cy="135" rx="22" ry="9" fill="#64748B" stroke="#94A3B8" strokeWidth="2" />
            <ellipse cx="285" cy="115" rx="19" ry="8" fill="#64748B" stroke="#94A3B8" strokeWidth="2" />
            <path d="M80 150 Q 95 145 105 152 Q 95 158 80 150 Z" fill="#F59E0B" />
            <path d="M310 170 Q 325 162 335 170 Q 322 178 310 170 Z" fill="#F59E0B" />
            <g fill="#FFFFFF" opacity="0.95">
              <path d="M120 50 Q 135 40 145 48 Q 130 54 120 50 Z" />
              <path d="M260 40 Q 275 30 285 38 Q 270 44 260 40 Z" />
              <path d="M200 30 Q 212 22 220 28 Q 208 34 200 30 Z" />
            </g>
          </svg>
        )}

        {/* SCENE 4: LA ESPERANZA DE GLORIA (Arcada de piedra y amanecer sobre las nubes) */}
        {(key === 'archway_dawn_glory' || key === 'dia_4') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="cloudDawn" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FDA4AF" />
                <stop offset="40%" stopColor="#FDE68A" />
                <stop offset="80%" stopColor="#DDD6FE" />
                <stop offset="100%" stopColor="#4C1D95" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#cloudDawn)" />
            <circle cx="280" cy="110" r="50" fill="#FEF08A" opacity="0.9" />
            <path d="M120 180 Q 220 130 320 160 Q 380 120 420 170 L 420 250 L 120 250 Z" fill="#F8FAFC" opacity="0.8" />
            <path d="M100 200 Q 200 160 300 180 Q 360 150 420 190 L 420 250 L 100 250 Z" fill="#F1F5F9" />
            <g fill="#78350F" opacity="0.9" stroke="#FDE68A" strokeWidth="1">
              <rect x="20" y="50" width="16" height="170" rx="3" />
              <rect x="70" y="50" width="16" height="170" rx="3" />
              <path d="M20 60 Q 53 10 86 60 Z" />
              <rect x="110" y="60" width="16" height="160" rx="3" />
              <path d="M70 70 Q 98 25 126 70 Z" />
            </g>
          </svg>
        )}

        {/* SCENE 5: FE EN LA FIDELIDAD DE DIOS (Ancla de piedra firme en la roca marina) */}
        {(key === 'coastal_anchor_rock' || key === 'dia_5') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="60%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0C4A6E" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#oceanGrad)" />
            <path d="M0 110 Q 180 95 400 105 L 400 140 L 0 140 Z" fill="#0369A1" opacity="0.7" />
            <path d="M80 240 L 120 150 L 320 145 L 380 240 Z" fill="#475569" stroke="#64748B" strokeWidth="2" />
            <g transform="translate(190, 45)">
              <circle cx="10" cy="18" r="16" fill="none" stroke="#FDE68A" strokeWidth="6" />
              <rect x="5" y="32" width="10" height="85" rx="3" fill="#E2E8F0" stroke="#F59E0B" strokeWidth="2" />
              <rect x="-26" y="44" width="72" height="10" rx="3" fill="#E2E8F0" stroke="#F59E0B" strokeWidth="2" />
              <path d="M-40 100 Q 10 145 60 100" fill="none" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" />
              <polygon points="-44,95 -34,90 -40,110" fill="#F59E0B" />
              <polygon points="64,95 54,90 60,110" fill="#F59E0B" />
            </g>
          </svg>
        )}

        {/* SCENE 6: TEN FE, DIOS TIENE UN PLAN BUENO (Sendero de piedra hacia el porvenir) */}
        {(key === 'winding_path_dawn' || key === 'dia_6') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="sunriseHills" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FDBA74" />
                <stop offset="45%" stopColor="#FDE68A" />
                <stop offset="85%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#3B0764" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#sunriseHills)" />
            <circle cx="200" cy="80" r="35" fill="#FEF08A" opacity="0.9" />
            <path d="M-20 140 Q 150 90 420 130 L 420 250 L -20 250 Z" fill="#6B21A8" opacity="0.8" />
            <path d="M195 95 Q 210 140 180 180 Q 160 210 130 250 L 270 250 Q 240 210 220 180 Q 190 140 205 95 Z" fill="#F8FAFC" opacity="0.9" stroke="#FDE68A" strokeWidth="2" />
          </svg>
        )}

        {/* SCENE 7: ESPERANZA VIVA QUE NO TIENE FIN (Tumba vacía con rayos de resurrección) */}
        {(key === 'empty_tomb_resurrection' || key === 'dia_7') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="tombSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="50%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#065F46" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#tombSky)" />
            <path d="M40 240 Q 60 90 200 80 Q 340 90 360 240 Z" fill="#334155" stroke="#475569" strokeWidth="2" />
            <rect x="140" y="115" width="80" height="110" rx="8" fill="#020617" />
            <circle cx="270" cy="170" r="50" fill="#64748B" stroke="#94A3B8" strokeWidth="4" />
            <polygon points="180,160 0,60 0,110" fill="#FEF08A" opacity="0.5" />
            <polygon points="180,160 80,0 140,0" fill="#FEF08A" opacity="0.6" />
            <polygon points="180,160 220,0 280,0" fill="#FEF08A" opacity="0.6" />
            <polygon points="180,160 400,60 400,120" fill="#FEF08A" opacity="0.5" />
            <circle cx="180" cy="160" r="30" fill="#FFFFFF" opacity="0.9" filter="blur(8px)" />
            <path d="M80 210 Q 75 190 85 185 Q 95 190 90 210 Z" fill="#FFFFFF" />
            <path d="M105 215 Q 100 195 110 190 Q 120 195 115 215 Z" fill="#FFFFFF" />
          </svg>
        )}

        {/* SCENE 8: FAMILIA Y HOGAR EN DIOS (Altar familiar y amor en casa) */}
        {(key === 'dia_8_familia' || key === 'family_prayer_home' || key === 'dia_8') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="homeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#451A03" />
                <stop offset="60%" stopColor="#78350F" />
                <stop offset="100%" stopColor="#1E1B4B" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#homeGrad)" />
            <path d="M150 140 L 150 40 Q 200 10 250 40 L 250 140 Z" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="3" opacity="0.85" />
            <line x1="200" y1="20" x2="200" y2="140" stroke="#78350F" strokeWidth="2.5" />
            <ellipse cx="200" cy="190" rx="140" ry="40" fill="#92400E" stroke="#B45309" strokeWidth="2" />
            <g transform="translate(130, 110)">
              <circle cx="20" cy="25" r="14" fill="#F8FAFC" />
              <path d="M5 45 Q 20 38 35 45 L 38 90 L 2 90 Z" fill="#1E3A8A" />
              <circle cx="120" cy="27" r="13" fill="#F8FAFC" />
              <path d="M105 45 Q 120 40 135 45 L 138 90 L 102 90 Z" fill="#9D174D" />
              <circle cx="70" cy="45" r="10" fill="#F8FAFC" />
              <path d="M58 60 Q 70 55 82 60 L 85 90 L 55 90 Z" fill="#047857" />
              <path d="M70 30 C 66 24 58 24 58 32 C 58 39 67 45 70 50 C 73 45 82 39 82 32 C 82 24 74 24 70 30 Z" fill="#F59E0B" />
            </g>
          </svg>
        )}

        {/* SCENE 9: AMIGOS Y HERMANDAD EN LA FE */}
        {(key === 'dia_9_amigos' || key === 'friends_walking_sunrise' || key === 'dia_9') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="friendsSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="50%" stopColor="#FDE68A" />
                <stop offset="100%" stopColor="#15803D" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#friendsSky)" />
            <circle cx="200" cy="100" r="35" fill="#FEF08A" opacity="0.9" />
            <path d="M-20 160 Q 200 120 420 160 L 420 250 L -20 250 Z" fill="#166534" />
            <g transform="translate(130, 85)" fill="#F8FAFC">
              <circle cx="30" cy="30" r="12" />
              <path d="M18 46 Q 30 40 42 46 L 45 95 L 15 95 Z" fill="#0E7490" />
              <circle cx="70" cy="26" r="13" />
              <path d="M56 42 Q 70 36 84 42 L 87 95 L 53 95 Z" fill="#D97706" />
              <circle cx="110" cy="30" r="12" />
              <path d="M98 46 Q 110 40 122 46 L 125 95 L 95 95 Z" fill="#7C3AED" />
              <line x1="30" y1="55" x2="110" y2="55" stroke="#FDE68A" strokeWidth="4" strokeLinecap="round" />
            </g>
          </svg>
        )}

        {/* SCENE 10: TRABAJO Y VOCACIÓN CON PROPÓSITO */}
        {(key === 'dia_10_trabajo' || key === 'work_vocation_desk' || key === 'dia_10') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="workGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="50%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#0B132B" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#workGrad)" />
            <rect x="80" y="20" width="240" height="120" rx="8" fill="#FEF3C7" opacity="0.9" stroke="#F59E0B" strokeWidth="2" />
            <path d="M80 80 L 320 80 M 200 20 L 200 140" stroke="#B45309" strokeWidth="2" />
            <polygon points="80,20 120,20 220,240 120,240" fill="#FFFBEB" opacity="0.3" />
            <rect x="20" y="145" width="360" height="95" rx="6" fill="#78350F" stroke="#92400E" strokeWidth="3" />
            <g transform="translate(150, 160)">
              <path d="M10 25 Q 50 15 50 45 Q 10 55 10 25 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
              <path d="M90 25 Q 50 15 50 45 Q 90 55 90 25 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
              <path d="M50 20 L 50 55 L 45 50 L 40 55 L 40 20 Z" fill="#F59E0B" />
            </g>
          </svg>
        )}

        {/* SCENE 11: LUZ EN LA SOCIEDAD Y AMOR AL PRÓJIMO */}
        {(key === 'dia_11_sociedad' || key === 'city_light_society' || key === 'dia_11') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="cityDawn" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E1B4B" />
                <stop offset="60%" stopColor="#4338CA" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#cityDawn)" />
            <polygon points="190,40 210,40 220,180 180,180" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
            <circle cx="200" cy="37" r="10" fill="#FEF08A" />
            <polygon points="200,37 0,0 0,90" fill="#FEF08A" opacity="0.35" />
            <polygon points="200,37 400,0 400,90" fill="#FEF08A" opacity="0.35" />
            <rect x="30" y="140" width="35" height="100" fill="#0F172A" />
            <rect x="75" y="115" width="40" height="125" fill="#1E293B" />
            <rect x="250" y="130" width="45" height="110" fill="#1E293B" />
            <circle cx="95" cy="135" r="3" fill="#FEF08A" />
            <circle cx="270" cy="150" r="3" fill="#FEF08A" />
          </svg>
        )}

        {/* SCENE 12: ORACIÓN Y REPOSO NOCTURNO */}
        {(key === 'dia_12_oracion' || key === 'night_stars_prayer' || key === 'dia_12') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="nightSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#090D16" />
                <stop offset="50%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#1E1B4B" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#nightSky)" />
            <circle cx="60" cy="40" r="1.5" fill="#FFFFFF" /><circle cx="100" cy="70" r="1.8" fill="#FDE68A" />
            <circle cx="280" cy="50" r="2" fill="#FDE68A" /><circle cx="360" cy="80" r="1.6" fill="#FDE68A" />
            <path d="M220 30 A 24 24 0 0 0 240 70 A 20 20 0 0 1 220 30 Z" fill="#FEF08A" filter="drop-shadow(0 0 8px #F59E0B)" />
            <rect x="40" y="160" width="320" height="80" rx="6" fill="#1E293B" stroke="#334155" strokeWidth="2" />
            <g transform="translate(180, 140)">
              <rect x="-30" y="20" width="12" height="30" rx="2" fill="#FEF3C7" />
              <circle cx="-24" cy="14" r="6" fill="#F59E0B" />
              <ellipse cx="20" cy="30" rx="10" ry="16" fill="#F8FAFC" transform="rotate(-15 20 30)" />
              <ellipse cx="30" cy="30" rx="10" ry="16" fill="#F8FAFC" transform="rotate(15 30 30)" />
            </g>
          </svg>
        )}

        {/* SCENE 13: SANIDAD DEL CORAZÓN Y PERDÓN */}
        {(key === 'dia_13_sanidad' || key === 'healing_heart_restoration' || key === 'dia_13') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="healGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#064E3B" />
                <stop offset="50%" stopColor="#047857" />
                <stop offset="100%" stopColor="#022C22" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#healGrad)" />
            <circle cx="200" cy="120" r="80" fill="#10B981" opacity="0.2" filter="blur(16px)" />
            <path
              d="M200 90 C 185 65 140 65 140 100 C 140 135 185 165 200 180 C 215 165 260 135 260 100 C 260 65 215 65 200 90 Z"
              fill="#F59E0B"
              stroke="#FEF3C7"
              strokeWidth="4"
              filter="drop-shadow(0 4px 12px rgba(245, 158, 11, 0.4))"
            />
            <path d="M175 95 Q 195 115 190 145" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <g stroke="#A7F3D0" strokeWidth="2.5" fill="#34D399" opacity="0.9">
              <path d="M120 160 Q 140 110 160 80" />
              <path d="M280 160 Q 260 110 240 80" />
            </g>
          </svg>
        )}

        {/* SCENE 14: EL BUEN PASTOR Y AGUAS DE REPOSO */}
        {(key === 'dia_14_pastor' || key === 'dia_14') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="pastorSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="60%" stopColor="#BAE6FD" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#pastorSky)" />
            <path d="M-20 170 Q 180 120 420 170 L 420 250 L -20 250 Z" fill="#047857" />
            <path d="M-20 200 Q 200 150 420 200 L 420 250 L -20 250 Z" fill="#065F46" />
            {/* Serene stream */}
            <path d="M160 240 Q 190 180 230 160 Q 270 140 310 150 L 330 240 Z" fill="#0EA5E9" opacity="0.8" />
            {/* Shepherd silhouette with staff */}
            <g transform="translate(110, 80)">
              <circle cx="20" cy="20" r="10" fill="#F8FAFC" />
              <path d="M10 32 Q 20 28 30 32 L 32 80 L 8 80 Z" fill="#E2E8F0" />
              {/* Staff */}
              <path d="M35 15 C 35 5 45 5 45 15 L 45 85" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
            {/* Little sheep */}
            <g fill="#FFFFFF" opacity="0.95">
              <ellipse cx="70" cy="180" rx="14" ry="10" /><circle cx="56" cy="176" r="6" />
              <ellipse cx="95" cy="190" rx="12" ry="8" /><circle cx="85" cy="186" r="5" />
            </g>
          </svg>
        )}

        {/* SCENE 15: NEUROPLASTICIDAD Y MENTE RENOVADA */}
        {(key === 'dia_15_mente' || key === 'dia_15') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="mindBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B1728" />
                <stop offset="60%" stopColor="#0E223D" />
                <stop offset="100%" stopColor="#060F1E" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#mindBg)" />
            <circle cx="200" cy="120" r="70" fill="#F59E0B" opacity="0.15" filter="blur(18px)" />
            {/* Radiant golden head profile with starlight constellation */}
            <g transform="translate(150, 45)">
              <circle cx="50" cy="30" r="6" fill="#FDE68A" />
              <circle cx="80" cy="50" r="5" fill="#F59E0B" />
              <circle cx="30" cy="70" r="5" fill="#10B981" />
              <circle cx="70" cy="90" r="6" fill="#60A5FA" />
              <line x1="50" y1="30" x2="80" y2="50" stroke="#FDE68A" strokeWidth="2" opacity="0.7" />
              <line x1="80" y1="50" x2="70" y2="90" stroke="#FDE68A" strokeWidth="2" opacity="0.7" />
              <line x1="30" y1="70" x2="70" y2="90" stroke="#10B981" strokeWidth="2" opacity="0.7" />
              <line x1="50" y1="30" x2="30" y2="70" stroke="#60A5FA" strokeWidth="2" opacity="0.7" />
              <circle cx="55" cy="65" r="14" fill="#F59E0B" opacity="0.9" />
              <Heart className="w-4 h-4 text-[#060F1E] fill-[#060F1E] translate-x-[47px] translate-y-[57px]" />
            </g>
          </svg>
        )}

        {/* SCENE 16: EL ABRAZO DEL PADRE */}
        {(key === 'dia_16_abrazo' || key === 'dia_16') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="embraceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#78350F" />
                <stop offset="60%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#1E1B4B" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#embraceGrad)" />
            <circle cx="200" cy="110" r="60" fill="#FEF08A" opacity="0.4" filter="blur(16px)" />
            <g transform="translate(160, 60)">
              {/* Father */}
              <circle cx="30" cy="30" r="16" fill="#F8FAFC" />
              <path d="M10 50 Q 30 40 50 50 L 55 120 L 5 120 Z" fill="#92400E" />
              {/* Son embraced */}
              <circle cx="55" cy="45" r="12" fill="#F8FAFC" />
              <path d="M42 62 Q 55 55 68 62 L 72 120 L 38 120 Z" fill="#E2E8F0" />
              {/* Loving Father arms wrapping around */}
              <path d="M12 55 Q 55 65 72 75" stroke="#FDE68A" strokeWidth="6" fill="none" strokeLinecap="round" />
            </g>
          </svg>
        )}

        {/* SCENE 17: CALMA EN LA TEMPESTAD */}
        {(key === 'dia_17_tempestad' || key === 'dia_17') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="stormCalm" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0F172A" />
                <stop offset="50%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#stormCalm)" />
            {/* Calming waves */}
            <path d="M0 160 Q 100 130 200 160 Q 300 190 400 160 L 400 240 L 0 240 Z" fill="#0369A1" />
            <path d="M0 185 Q 120 165 240 185 Q 340 205 400 185 L 400 240 L 0 240 Z" fill="#0C4A6E" />
            {/* Wooden boat */}
            <path d="M140 155 Q 200 185 260 155 L 250 170 Q 200 195 150 170 Z" fill="#78350F" stroke="#FDE68A" strokeWidth="2" />
            {/* Christ standing with hand outstretched */}
            <g transform="translate(195, 105)">
              <circle cx="10" cy="10" r="7" fill="#FFFFFF" />
              <path d="M5 18 L 15 18 L 18 50 L 2 50 Z" fill="#FFFFFF" />
              <line x1="15" y1="24" x2="35" y2="18" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        )}

        {/* SCENE 18: FUERZAS COMO LAS ÁGUILAS */}
        {(key === 'dia_18_aguilas' || key === 'dia_18') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="eagleSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#EA580C" />
                <stop offset="40%" stopColor="#F59E0B" />
                <stop offset="80%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0B132B" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#eagleSky)" />
            <circle cx="200" cy="60" r="40" fill="#FEF08A" opacity="0.9" />
            {/* Mountain peaks */}
            <polygon points="-20,240 100,140 220,240" fill="#1E293B" />
            <polygon points="160,240 280,130 420,240" fill="#0F172A" />
            {/* Majestic Eagle soaring */}
            <g transform="translate(170, 75)" fill="#FFFFFF">
              <path d="M30 20 Q 0 5 -30 20 Q 0 15 30 20 Z" />
              <path d="M30 20 Q 60 5 90 20 Q 60 15 30 20 Z" />
              <circle cx="30" cy="18" r="4" fill="#FDE68A" />
            </g>
          </svg>
        )}

        {/* SCENE 19: COMUNIDAD DE FE Y MESA COMPARTIDA */}
        {(key === 'dia_19_comunidad' || key === 'dia_19') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="tableGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="50%" stopColor="#0D9488" />
                <stop offset="100%" stopColor="#042F2E" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#tableGrad)" />
            <circle cx="200" cy="80" r="50" fill="#FEF3C7" opacity="0.3" filter="blur(16px)" />
            {/* Round table with bread and cup */}
            <ellipse cx="200" cy="180" rx="140" ry="45" fill="#78350F" stroke="#F59E0B" strokeWidth="2" />
            <ellipse cx="200" cy="175" rx="30" ry="12" fill="#FDE68A" />
            {/* Joined hands around table */}
            <g fill="#F8FAFC">
              <circle cx="90" cy="150" r="12" /><circle cx="140" cy="135" r="12" />
              <circle cx="200" cy="130" r="14" /><circle cx="260" cy="135" r="12" />
              <circle cx="310" cy="150" r="12" />
            </g>
          </svg>
        )}

        {/* SCENE 20: EL ESCUDO DE LA FE */}
        {(key === 'dia_20_escudo' || key === 'dia_20') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#1E1B4B" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#shieldGrad)" />
            <circle cx="200" cy="120" r="80" fill="#F59E0B" opacity="0.2" filter="blur(20px)" />
            {/* Golden Shield */}
            <path
              d="M200 40 L 260 70 L 250 150 Q 200 200 200 200 Q 200 200 150 150 L 140 70 Z"
              fill="#F59E0B"
              stroke="#FEF3C7"
              strokeWidth="4"
              filter="drop-shadow(0 4px 12px rgba(245, 158, 11, 0.5))"
            />
            {/* Cross inside shield */}
            <rect x="195" y="70" width="10" height="90" fill="#060F1E" rx="2" />
            <rect x="175" y="95" width="50" height="10" fill="#060F1E" rx="2" />
          </svg>
        )}

        {/* SCENE 21: MANANTIAL EN EL DESIERTO */}
        {(key === 'dia_21_manantial' || key === 'dia_21') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="oasisSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#065F46" />
                <stop offset="100%" stopColor="#042F2E" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#oasisSky)" />
            {/* Desert sand dunes */}
            <path d="M-20 160 Q 150 110 420 160 L 420 250 L -20 250 Z" fill="#92400E" opacity="0.8" />
            {/* Fresh water spring */}
            <ellipse cx="200" cy="190" rx="90" ry="35" fill="#38BDF8" stroke="#7DD3FC" strokeWidth="2" />
            {/* Palm trees of life */}
            <g transform="translate(180, 100)" stroke="#10B981" strokeWidth="4" fill="none" strokeLinecap="round">
              <path d="M20 90 Q 20 40 20 10" stroke="#78350F" strokeWidth="5" />
              <path d="M20 10 Q -10 0 -20 15" /><path d="M20 10 Q 50 0 60 15" />
              <path d="M20 10 Q 20 -20 20 -30" />
            </g>
          </svg>
        )}

        {/* SCENE 22: ÓLEO DE GOZO Y BELLEZA POR CENIZAS */}
        {(key === 'dia_22_oleo' || key === 'dia_22') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="oilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#451A03" />
                <stop offset="60%" stopColor="#78350F" />
                <stop offset="100%" stopColor="#0B132B" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#oilGrad)" />
            <circle cx="200" cy="120" r="70" fill="#FEF08A" opacity="0.3" filter="blur(16px)" />
            {/* Golden flask pouring oil */}
            <g transform="translate(185, 70)">
              <ellipse cx="15" cy="30" rx="14" ry="20" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="2" />
              <rect x="10" y="5" width="10" height="15" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="2" />
              {/* Golden drops */}
              <circle cx="15" cy="75" r="5" fill="#FEF08A" />
              <circle cx="15" cy="95" r="4" fill="#FEF08A" />
            </g>
          </svg>
        )}

        {/* SCENE 23: MATRIMONIO Y ALIANZA BENDECIDA */}
        {(key === 'dia_23_matrimonio' || key === 'dia_23') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="weddingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0F172A" />
                <stop offset="60%" stopColor="#831843" />
                <stop offset="100%" stopColor="#060F1E" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#weddingGrad)" />
            <circle cx="200" cy="110" r="60" fill="#F59E0B" opacity="0.25" filter="blur(18px)" />
            {/* Two wedding rings intertwined with Christ's cross */}
            <g transform="translate(160, 70)">
              <circle cx="25" cy="50" r="32" fill="none" stroke="#FDE68A" strokeWidth="8" />
              <circle cx="55" cy="50" r="32" fill="none" stroke="#F59E0B" strokeWidth="8" />
              <path d="M40 10 L 40 40 M 30 20 L 50 20" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        )}

        {/* SCENE 24: SABIDURÍA DIVINA EN DECISIONES */}
        {(key === 'dia_24_sabiduria' || key === 'dia_24') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="wisdomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E1B4B" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#wisdomGrad)" />
            {/* Celestial Compass */}
            <g transform="translate(200, 120)">
              <circle cx="0" cy="0" r="65" fill="#0B1728" stroke="#F59E0B" strokeWidth="3" />
              <polygon points="0,-50 10,0 0,50 -10,0" fill="#F59E0B" />
              <circle cx="0" cy="0" r="8" fill="#FFFFFF" />
            </g>
          </svg>
        )}

        {/* SCENE 25: LIBERTAD DEL PERDÓN */}
        {(key === 'dia_25_perdon' || key === 'dia_25') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="forgiveSky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="70%" stopColor="#67E8F9" />
                <stop offset="100%" stopColor="#0F766E" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#forgiveSky)" />
            {/* Broken chains on bottom */}
            <path d="M60 210 L 100 200 M 115 195 L 140 210" stroke="#64748B" strokeWidth="5" strokeLinecap="round" />
            <path d="M260 210 L 290 195 M 305 200 L 340 210" stroke="#64748B" strokeWidth="5" strokeLinecap="round" />
            {/* Dove flying into high sky */}
            <g transform="translate(180, 80)" fill="#FFFFFF">
              <path d="M20 20 Q 40 0 60 15 Q 40 30 20 20 Z" />
              <path d="M20 20 Q 0 10 -15 25 Q 5 25 20 20 Z" />
              <circle cx="20" cy="20" r="5" />
            </g>
          </svg>
        )}

        {/* SCENE 26: SERVICIO Y SOLIDARIDAD */}
        {(key === 'dia_26_servicio' || key === 'dia_26') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="serviceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#065F46" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#serviceGrad)" />
            <circle cx="200" cy="110" r="60" fill="#FEF3C7" opacity="0.25" filter="blur(16px)" />
            {/* Caring hands holding heart */}
            <g transform="translate(160, 80)">
              <path d="M10 60 Q 40 70 80 60" stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M40 30 C 35 20 20 20 20 35 C 20 50 40 65 40 70 C 40 65 60 50 60 35 C 60 20 45 20 40 30 Z" fill="#EF4444" stroke="#FEF3C7" strokeWidth="2" />
            </g>
          </svg>
        )}

        {/* SCENE 27: GOZO DEL ESPÍRITU */}
        {(key === 'dia_27_gozo' || key === 'dia_27') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="joyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#0F766E" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#joyGrad)" />
            {/* Gushing spring of living water */}
            <path d="M200 240 Q 180 130 190 60 Q 200 30 210 60 Q 220 130 200 240 Z" fill="#38BDF8" opacity="0.8" />
            <circle cx="200" cy="40" r="14" fill="#FEF08A" opacity="0.9" />
          </svg>
        )}

        {/* SCENE 28: PAZ PROFUNDA */}
        {(key === 'dia_28_paz' || key === 'dia_28') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="lakeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="50%" stopColor="#065F46" />
                <stop offset="100%" stopColor="#060F1E" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#lakeGrad)" />
            {/* Mirror mountain reflection in still lake */}
            <polygon points="120,130 200,40 280,130" fill="#1E293B" />
            <polygon points="120,130 200,220 280,130" fill="#0F172A" opacity="0.5" />
            <line x1="0" y1="130" x2="400" y2="130" stroke="#FDE68A" strokeWidth="1.5" opacity="0.6" />
          </svg>
        )}

        {/* SCENE 29: ANCLA FIRME TRAS EL VELO */}
        {(key === 'dia_29_ancla_eterna' || key === 'dia_29') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="veilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#1E1B4B" />
                <stop offset="100%" stopColor="#0B0F19" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#veilGrad)" />
            <circle cx="200" cy="110" r="75" fill="#FEF08A" opacity="0.3" filter="blur(16px)" />
            {/* Majestic Golden Anchor */}
            <g transform="translate(195, 55)">
              <circle cx="10" cy="15" r="14" fill="none" stroke="#FEF3C7" strokeWidth="5" />
              <rect x="7" y="28" width="8" height="75" fill="#F59E0B" rx="2" />
              <rect x="-20" y="40" width="60" height="8" fill="#F59E0B" rx="2" />
              <path d="M-30 90 Q 10 130 50 90" fill="none" stroke="#F59E0B" strokeWidth="10" strokeLinecap="round" />
            </g>
          </svg>
        )}

        {/* SCENE 30: CAMINAR PERPETUO CON DIOS */}
        {(key === 'dia_30_caminar_eterno' || key === 'dia_30') && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="eternalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="35%" stopColor="#F59E0B" />
                <stop offset="70%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#060F1E" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#eternalGrad)" />
            {/* Blazing rising sun of eternity */}
            <circle cx="200" cy="90" r="45" fill="#FFFFFF" opacity="0.95" filter="drop-shadow(0 0 20px #FEF08A)" />
            {/* Golden path into the sun */}
            <path d="M195 90 L 205 90 L 280 240 L 120 240 Z" fill="#FFFBEB" opacity="0.85" />
            {/* Walking hand in hand */}
            <g transform="translate(185, 175)" fill="#060F1E">
              <circle cx="10" cy="15" r="6" /><rect x="6" y="22" width="8" height="22" rx="2" />
              <circle cx="25" cy="15" r="6" /><rect x="21" y="22" width="8" height="22" rx="2" />
            </g>
          </svg>
        )}
      </div>
    );
  };

  return (
    <>
      <div
        className={`relative w-full rounded-[16px] overflow-hidden bg-gradient-to-b from-[#0B1E36] to-[#060F1E] border border-white/[0.1] shadow-lg select-none group ${className}`}
      >
        {/* Category Badge overlay */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#060F1E]/80 backdrop-blur-md border border-white/[0.12] text-[#FBBF24] text-[11px] font-semibold uppercase tracking-wider shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
          <span>{categoryLabel}</span>
        </div>

        {/* Zoom / Lightbox trigger */}
        {showZoomButton && (
          <button
            type="button"
            onClick={handleOpenZoom}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-[#060F1E]/80 hover:bg-[#0E223D] backdrop-blur-md border border-white/[0.12] text-[#CBD5E1] hover:text-[#F1F5F9] transition-all cursor-pointer opacity-90 hover:opacity-100 shadow-sm"
            title="Ampliar ilustración"
            aria-label="Ampliar ilustración"
          >
            <Maximize2 className="w-4 h-4 text-[#F59E0B]" strokeWidth={2} />
          </button>
        )}

        {/* SVG Canvas */}
        {renderArtwork(false)}

        {/* Caption banner below artwork */}
        <div className="p-3.5 bg-[#060F1E]/95 border-t border-white/[0.08] flex items-center justify-between gap-2">
          <span className="text-[12.5px] font-semibold text-[#F1F5F9] truncate">
            {themeTitle}
          </span>
          <button
            type="button"
            onClick={handleOpenZoom}
            className="text-[10.5px] text-[#F59E0B] hover:text-[#FBBF24] uppercase tracking-wider font-semibold shrink-0 cursor-pointer transition-colors"
          >
            Ver ilustración
          </button>
        </div>
      </div>

      {/* Lightbox / Zoom Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-[700px] rounded-[20px] bg-[#0B1728] border border-white/[0.15] shadow-2xl overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#F59E0B] block">
                  {categoryLabel}
                </span>
                <h3 className="font-editorial text-[18px] text-[#F1F5F9] font-normal">
                  {themeTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/[0.08] text-[#CBD5E1] transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {renderArtwork(true)}

            <div className="p-4 bg-[#060F1E] border-t border-white/[0.08] flex items-center justify-between text-[12px] text-[#94A3B8]">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                Ilustración Espiritual • Proceso 30 Días
              </span>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 rounded-[10px] bg-[#F59E0B] text-[#060F1E] font-semibold text-[12px] cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
