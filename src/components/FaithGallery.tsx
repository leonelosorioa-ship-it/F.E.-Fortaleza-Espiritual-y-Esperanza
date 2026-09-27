import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, Shuffle, Eye, Maximize2, X, Heart, Compass, Moon, BookOpen, Volume2, VolumeX, Check } from 'lucide-react';

export type FaithGalleryCategory = 'todas' | 'familias' | 'naturaleza' | 'oracion';

export interface FaithImageItem {
  id: string;
  category: 'familias' | 'naturaleza' | 'oracion';
  categoryLabel: string;
  title: string;
  scriptureRef: string;
  verse: string;
  reflection: string;
  svgKey: string;
  mood: string;
}

const FAITH_COLLECTION: FaithImageItem[] = [
  // --- FAMILIAS ---
  {
    id: 'fam_1',
    category: 'familias',
    categoryLabel: 'Familia & Hogar',
    title: 'El Altar del Hogar al Anochecer',
    scriptureRef: 'Josué 24:15',
    verse: 'Pero yo y mi casa serviremos al Señor.',
    reflection: 'Cuando la noche cubre la casa, la paz de Dios se convierte en el manto que resguarda a padres e hijos bajo un mismo amor incondicional.',
    svgKey: 'fam_altar_hogar',
    mood: 'Protección y Calma',
  },
  {
    id: 'fam_2',
    category: 'familias',
    categoryLabel: 'Familia & Gracia',
    title: 'El Abrazo Tierno del Padre',
    scriptureRef: 'Salmo 103:13',
    verse: 'Tan compasivo es el Señor con los que le temen como un padre con sus hijos.',
    reflection: 'No hay juicio en el regazo divino; solo la certeza de que tus hijos y tu linaje están seguros en las manos del Creador.',
    svgKey: 'fam_abrazo_padre',
    mood: 'Ternura y Perdón',
  },
  {
    id: 'fam_3',
    category: 'familias',
    categoryLabel: 'Familia & Gratitud',
    title: 'La Mesa Compartida en Paz',
    scriptureRef: 'Hechos 2:46',
    verse: 'Partían el pan en las casas y comían juntos con alegría y sencillez de corazón.',
    reflection: 'La verdadera riqueza del hogar no se mide en abundancia material, sino en la sencillez de una mesa donde reina la gratitud a Dios.',
    svgKey: 'fam_mesa_compartida',
    mood: 'Comunión y Gozo',
  },
  {
    id: 'fam_4',
    category: 'familias',
    categoryLabel: 'Familia & Alianza',
    title: 'Cordón de Tres Dobleces',
    scriptureRef: 'Eclesiastés 4:12',
    verse: 'Uno solo puede ser vencido, pero dos pueden resistir. ¡El cordón de tres hilos no se rompe fácilmente!',
    reflection: 'Un matrimonio cimentado en Cristo no tambalea ante la tormenta; el amor paciente y el perdón mutuo son su fortaleza diaria.',
    svgKey: 'fam_cordon_tres',
    mood: 'Alianza y Firmeza',
  },

  // --- NATURALEZA ---
  {
    id: 'nat_1',
    category: 'naturaleza',
    categoryLabel: 'Naturaleza & Reposo',
    title: 'Aguas de Reposo en la Madrugada',
    scriptureRef: 'Salmo 23:2',
    verse: 'Junto a aguas de reposo me pastoreará. Confortará mi alma.',
    reflection: 'Así como el lago refleja el cielo en calma, cuando sueltas el control de tu día, tu mente se vuelve un remanso cristalino.',
    svgKey: 'nat_aguas_reposo',
    mood: 'Quietud y Restauración',
  },
  {
    id: 'nat_2',
    category: 'naturaleza',
    categoryLabel: 'Naturaleza & Creación',
    title: 'El Olivo Fructífero en Su Presencia',
    scriptureRef: 'Salmo 52:8',
    verse: 'Pero yo soy como olivo verde en la casa de Dios; en la misericordia de Dios confío eternamente y para siempre.',
    reflection: 'Tus raíces están afianzadas en la gracia eterna; aun en épocas de sequía, Dios mantiene verde y fecundo tu espíritu.',
    svgKey: 'nat_olivo_verde',
    mood: 'Vitalidad y Confianza',
  },
  {
    id: 'nat_3',
    category: 'naturaleza',
    categoryLabel: 'Naturaleza & Cumbres',
    title: 'El Refugio de las Alturas Celestiales',
    scriptureRef: 'Salmo 121:1-2',
    verse: 'Alzaré mis ojos a los montes; ¿de dónde vendrá mi socorro? Mi socorro viene del Señor, que hizo los cielos y la tierra.',
    reflection: 'La inmensidad de las montañas nos recuerda la grandeza de un Dios que sostiene el universo y al mismo tiempo cuida de ti.',
    svgKey: 'nat_cumbres_estrellas',
    mood: 'Soberanía y Asombro',
  },
  {
    id: 'nat_4',
    category: 'naturaleza',
    categoryLabel: 'Naturaleza & Provisión',
    title: 'Manantial Abierto en el Desierto',
    scriptureRef: 'Isaías 41:18',
    verse: 'Abriré ríos en las alturas desoladas, y manantiales en medio de los valles; convertiré el desierto en estanque de aguas.',
    reflection: 'Donde la lógica humana ve escasez y sequía, la providencia de Dios hace brotar agua viva y nuevos senderos de bendición.',
    svgKey: 'nat_manantial_oasis',
    mood: 'Esperanza y Milagro',
  },
  {
    id: 'nat_5',
    category: 'naturaleza',
    categoryLabel: 'Naturaleza & Providencia',
    title: 'Los Lirios Silvestres del Valle',
    scriptureRef: 'Mateo 6:28-29',
    verse: 'Fíjense cómo crecen los lirios del campo. No trabajan ni hilan... y ni aun Salomón se vistió como uno de ellos.',
    reflection: 'Si Dios cuida con tanto detalle de la flor del campo, ¿cuánto más cuidará de tus necesidades, de tu salud y de tu familia?',
    svgKey: 'nat_lirios_valle',
    mood: 'Paz sin Afán',
  },

  // --- ORACIÓN ---
  {
    id: 'ora_1',
    category: 'oracion',
    categoryLabel: 'Oración & Noche',
    title: 'La Lámpara Sagrada en la Noche',
    scriptureRef: 'Salmo 119:105',
    verse: 'Lámpara es a mis pies tu palabra, y lumbrera a mi camino.',
    reflection: 'La Escritura no ilumina toda la distancia lejana, sino el próximo paso que debes dar hoy con serenidad y fe.',
    svgKey: 'ora_lampara_escrituras',
    mood: 'Guía y Sabiduría',
  },
  {
    id: 'ora_2',
    category: 'oracion',
    categoryLabel: 'Oración & Entrega',
    title: 'Manos que Sueltan el Control',
    scriptureRef: 'Filipenses 4:6-7',
    verse: 'Por nada estéis afanosos... y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones.',
    reflection: 'Orar es abrir las manos tensas para soltar lo que no puedes cambiar y recibir el descanso sobrenatural del Espíritu Santo.',
    svgKey: 'ora_manos_entrega',
    mood: 'Rendición y Sosiego',
  },
  {
    id: 'ora_3',
    category: 'oracion',
    categoryLabel: 'Oración & Vigilia',
    title: 'Santuario de Medianoche',
    scriptureRef: 'Salmo 63:6',
    verse: 'Cuando en mi lecho me acuerdo de ti, de noche medito en ti, porque has sido mi socorro.',
    reflection: 'El silencio de la noche no es ausencia de vida, sino el instante sagrado en que el alma se reencuentra con su Creador.',
    svgKey: 'ora_santuario_medianoche',
    mood: 'Intimidad y Sosiego',
  },
  {
    id: 'ora_4',
    category: 'oracion',
    categoryLabel: 'Oración & Espíritu',
    title: 'La Paloma de la Gracia y Reconciliación',
    scriptureRef: 'Romanos 8:26',
    verse: 'El Espíritu nos ayuda en nuestra debilidad; pues qué hemos de pedir como conviene, no lo sabemos, pero el Espíritu mismo intercede por nosotros.',
    reflection: 'Cuando las palabras no alcanzan, tu respiración sosegada y el gemido sincero del corazón son comprendidos perfectamente por Dios.',
    svgKey: 'ora_paloma_gracia',
    mood: 'Consuelo y Gracia',
  },
];

interface FaithGalleryProps {
  initialCategory?: FaithGalleryCategory;
  className?: string;
  onSelectInspiringDay?: (dayNumber: number) => void;
}

export const FaithGallery: React.FC<FaithGalleryProps> = ({
  initialCategory = 'todas',
  className = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FaithGalleryCategory>(initialCategory);
  const [randomSeed, setRandomSeed] = useState<number>(() => Math.floor(Math.random() * 1000));
  const [activeModalItem, setActiveModalItem] = useState<FaithImageItem | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [contemplationBreathe, setContemplationBreathe] = useState<boolean>(false);
  const [breathePhase, setBreathePhase] = useState<'Inhala' | 'Sostén' | 'Exhala' | 'Descansa'>('Inhala');

  // Shuffle & randomize items
  const displayedItems = useMemo(() => {
    let pool = selectedCategory === 'todas'
      ? [...FAITH_COLLECTION]
      : FAITH_COLLECTION.filter((item) => item.category === selectedCategory);

    // Deterministic shuffle with seed so it changes on button click
    const shuffled = [...pool].sort((a, b) => {
      const hashA = (a.id.charCodeAt(0) * 31 + randomSeed) % 97;
      const hashB = (b.id.charCodeAt(0) * 31 + randomSeed) % 97;
      return hashA - hashB;
    });

    return shuffled;
  }, [selectedCategory, randomSeed]);

  const handleShuffle = () => {
    setRandomSeed(Math.floor(Math.random() * 10000) + 1);
  };

  // Contemplation breathing timer in modal
  useEffect(() => {
    if (!contemplationBreathe || !activeModalItem) return;

    const phases: Array<'Inhala' | 'Sostén' | 'Exhala' | 'Descansa'> = ['Inhala', 'Sostén', 'Exhala', 'Descansa'];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % phases.length;
      setBreathePhase(phases[idx]);
    }, 4000);

    return () => clearInterval(interval);
  }, [contemplationBreathe, activeModalItem]);

  const copyVerseToClipboard = (item: FaithImageItem) => {
    const text = `«${item.verse}» (${item.scriptureRef})\n\n${item.reflection}\n— Vía Tu Poder Mental • F.E.™`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Organic, editorial SVG rendering with Sanctuary aesthetic
  const renderArtworkSvg = (svgKey: string, isZoomed = false) => {
    const heightClass = isZoomed ? 'h-64 sm:h-84 md:h-96' : 'h-48 sm:h-56';

    return (
      <div className={`w-full relative flex items-center justify-center overflow-hidden bg-[#060F1E] ${heightClass}`}>
        {/* Subtle nocturnal noise / vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060F1E] via-transparent to-[#060F1E]/40 pointer-events-none z-10" />

        {/* 1. fam_altar_hogar */}
        {svgKey === 'fam_altar_hogar' && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="fah_sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0B132B" />
                <stop offset="60%" stopColor="#1C2541" />
                <stop offset="100%" stopColor="#3A2818" />
              </linearGradient>
              <radialGradient id="fah_warmGlow" cx="50%" cy="65%" r="45%">
                <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="400" height="240" fill="url(#fah_sky)" />
            {/* Arched sanctuary window looking out at stars */}
            <path d="M140 180 L 140 60 Q 200 15 260 60 L 260 180 Z" fill="#060C1B" stroke="#D97706" strokeWidth="1.5" strokeOpacity="0.4" />
            <circle cx="170" cy="50" r="1.5" fill="#FEF08A" opacity="0.8" />
            <circle cx="230" cy="70" r="1.2" fill="#FFFFFF" opacity="0.8" />
            <circle cx="200" cy="40" r="1.8" fill="#FDE68A" opacity="0.9" />
            {/* Soft room table and glowing oil lamp */}
            <circle cx="200" cy="155" r="90" fill="url(#fah_warmGlow)" />
            <rect x="70" y="165" width="260" height="75" rx="4" fill="#1C1917" stroke="#292524" strokeWidth="2" />
            {/* Lamp */}
            <path d="M194 165 L 206 165 L 204 150 L 196 150 Z" fill="#D97706" />
            <ellipse cx="200" cy="142" rx="4.5" ry="9" fill="#FEF08A" />
            <circle cx="200" cy="142" r="14" fill="#F59E0B" opacity="0.4" filter="blur(4px)" />
            {/* Family silhouettes praying with hands joined */}
            <g fill="#090D16">
              {/* Father */}
              <circle cx="140" cy="140" r="14" />
              <path d="M122 165 Q 140 152 158 165 L 160 210 L 120 210 Z" />
              {/* Mother */}
              <circle cx="260" cy="142" r="13" />
              <path d="M244 165 Q 260 154 276 165 L 280 210 L 240 210 Z" />
              {/* Child */}
              <circle cx="200" cy="175" r="9" />
              <path d="M188 190 Q 200 184 212 190 L 214 220 L 186 220 Z" />
            </g>
          </svg>
        )}

        {/* 2. fam_abrazo_padre */}
        {svgKey === 'fam_abrazo_padre' && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="fap_dusk" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E1B4B" />
                <stop offset="45%" stopColor="#431407" />
                <stop offset="80%" stopColor="#78350F" />
                <stop offset="100%" stopColor="#0B132B" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#fap_dusk)" />
            <circle cx="200" cy="115" r="75" fill="#F59E0B" opacity="0.25" filter="blur(16px)" />
            <path d="M0 200 Q 200 170 400 200 L 400 240 L 0 240 Z" fill="#0C1322" />
            {/* Father kneeling embracing child */}
            <g transform="translate(160, 65)">
              <circle cx="35" cy="40" r="18" fill="#F8FAFC" opacity="0.95" />
              <path d="M10 65 Q 35 52 60 65 L 68 150 L 5 150 Z" fill="#0B1728" />
              {/* Child */}
              <circle cx="65" cy="58" r="13" fill="#F8FAFC" opacity="0.95" />
              <path d="M50 78 Q 65 70 80 78 L 85 145 L 45 145 Z" fill="#1E293B" />
              {/* Father arms holding child safely */}
              <path d="M15 75 Q 60 90 78 98" stroke="#FBBF24" strokeWidth="6" fill="none" strokeLinecap="round" />
            </g>
            <circle cx="70" cy="50" r="1.5" fill="#FEF08A" opacity="0.7" />
            <circle cx="320" cy="70" r="2" fill="#FEF08A" opacity="0.7" />
          </svg>
        )}

        {/* 3. fam_mesa_compartida */}
        {svgKey === 'fam_mesa_compartida' && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="fmc_bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="60%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#2E1065" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#fmc_bg)" />
            <circle cx="200" cy="110" r="70" fill="#FDE68A" opacity="0.2" filter="blur(16px)" />
            {/* Warm table ellipse */}
            <ellipse cx="200" cy="175" rx="150" ry="45" fill="#78350F" stroke="#92400E" strokeWidth="2" />
            {/* Bread & cup */}
            <ellipse cx="200" cy="168" rx="22" ry="10" fill="#FDE68A" />
            <path d="M190 162 Q 200 156 210 162" stroke="#78350F" strokeWidth="1.5" fill="none" />
            {/* Joined hands around */}
            <g fill="#F1F5F9">
              <circle cx="85" cy="150" r="12" />
              <circle cx="140" cy="132" r="13" />
              <circle cx="200" cy="125" r="14" />
              <circle cx="260" cy="132" r="13" />
              <circle cx="315" cy="150" r="12" />
            </g>
            <path d="M85 162 Q 200 188 315 162" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />
          </svg>
        )}

        {/* 4. fam_cordon_tres */}
        {svgKey === 'fam_cordon_tres' && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="fct_sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0F172A" />
                <stop offset="50%" stopColor="#1E1B4B" />
                <stop offset="100%" stopColor="#451A03" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#fct_sky)" />
            <circle cx="200" cy="110" r="60" fill="#F59E0B" opacity="0.25" filter="blur(18px)" />
            {/* Entwined golden cords / cross */}
            <g transform="translate(140, 50)">
              <path d="M30 40 Q 60 70 90 40 Q 60 10 30 40 Z" fill="none" stroke="#FDE68A" strokeWidth="4" />
              <path d="M60 40 Q 90 70 120 40 Q 90 10 60 40 Z" fill="none" stroke="#F59E0B" strokeWidth="4" />
              {/* Center Cross of Christ */}
              <rect x="56" y="-10" width="8" height="110" rx="2" fill="#FFFFFF" opacity="0.9" />
              <rect x="36" y="15" width="48" height="8" rx="2" fill="#FFFFFF" opacity="0.9" />
            </g>
            {/* Loving couple silhouette below */}
            <g transform="translate(170, 160)" fill="#060F1E">
              <circle cx="15" cy="15" r="10" /><path d="M5 30 Q 15 24 25 30 L 28 70 L 2 70 Z" />
              <circle cx="45" cy="17" r="9" /><path d="M36 30 Q 45 25 54 30 L 56 70 L 34 70 Z" />
              <line x1="25" y1="40" x2="36" y2="40" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            </g>
          </svg>
        )}

        {/* 5. nat_aguas_reposo */}
        {svgKey === 'nat_aguas_reposo' && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="nar_lake" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0B132B" />
                <stop offset="50%" stopColor="#0F766E" />
                <stop offset="85%" stopColor="#042F2E" />
                <stop offset="100%" stopColor="#06121E" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#nar_lake)" />
            {/* Distant misty hills */}
            <path d="M-20 120 Q 100 80 240 110 Q 340 70 420 115 L 420 150 L -20 150 Z" fill="#0D2E2B" opacity="0.6" />
            {/* Water surface reflection */}
            <line x1="0" y1="135" x2="400" y2="135" stroke="#5EEAD4" strokeWidth="1" opacity="0.4" />
            <line x1="120" y1="150" x2="280" y2="150" stroke="#5EEAD4" strokeWidth="1.5" opacity="0.3" />
            <line x1="160" y1="170" x2="240" y2="170" stroke="#5EEAD4" strokeWidth="2" opacity="0.4" />
            {/* Stepping smooth stones in water */}
            <ellipse cx="140" cy="180" rx="36" ry="14" fill="#334155" stroke="#475569" strokeWidth="1.5" />
            <ellipse cx="205" cy="165" rx="30" ry="11" fill="#334155" stroke="#475569" strokeWidth="1.5" />
            <ellipse cx="265" cy="155" rx="24" ry="9" fill="#334155" stroke="#475569" strokeWidth="1.5" />
            {/* Gentle crescent moon */}
            <path d="M310 35 A 18 18 0 0 0 326 65 A 15 15 0 0 1 310 35 Z" fill="#FEF08A" filter="drop-shadow(0 0 6px #F59E0B)" />
          </svg>
        )}

        {/* 6. nat_olivo_verde */}
        {svgKey === 'nat_olivo_verde' && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="nov_dawn" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0F172A" />
                <stop offset="45%" stopColor="#1E3A5F" />
                <stop offset="85%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#1C1917" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#nov_dawn)" />
            {/* Dawn Sun rising behind the olive tree */}
            <circle cx="200" cy="115" r="45" fill="#FEF08A" opacity="0.85" />
            <circle cx="200" cy="115" r="80" fill="#F59E0B" opacity="0.3" filter="blur(16px)" />
            <path d="M0 190 Q 200 160 400 190 L 400 240 L 0 240 Z" fill="#0C1322" />
            {/* Ancient majestic Olive Tree silhouette */}
            <g transform="translate(160, 40)" fill="#090D16">
              {/* Trunk with twists */}
              <path d="M30 160 Q 45 100 35 70 Q 20 50 15 20 Q 35 45 42 65 Q 55 40 70 25 Q 55 55 50 75 Q 60 110 50 160 Z" />
              {/* Foliage puffs */}
              <ellipse cx="10" cy="20" rx="30" ry="20" fill="#064E3B" opacity="0.9" />
              <ellipse cx="65" cy="25" rx="32" ry="22" fill="#064E3B" opacity="0.9" />
              <ellipse cx="40" cy="5" rx="35" ry="20" fill="#047857" opacity="0.95" />
              <circle cx="42" cy="-5" r="2" fill="#FDE68A" />
              <circle cx="65" cy="15" r="2" fill="#FDE68A" />
            </g>
          </svg>
        )}

        {/* 7. nat_cumbres_estrellas */}
        {svgKey === 'nat_cumbres_estrellas' && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="nce_night" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#030712" />
                <stop offset="50%" stopColor="#0B132B" />
                <stop offset="100%" stopColor="#1E1B4B" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#nce_night)" />
            {/* Stars */}
            <circle cx="40" cy="40" r="1.5" fill="#FFFFFF" /><circle cx="90" cy="65" r="1.2" fill="#FDE68A" />
            <circle cx="160" cy="30" r="2" fill="#FFFFFF" /><circle cx="240" cy="50" r="1.6" fill="#FDE68A" />
            <circle cx="320" cy="35" r="1.5" fill="#FFFFFF" /><circle cx="370" cy="70" r="1.8" fill="#FDE68A" />
            {/* Starlight constellation line */}
            <line x1="160" y1="30" x2="240" y2="50" stroke="#FDE68A" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.5" />
            {/* Mountain layers */}
            <polygon points="-30,240 100,105 230,240" fill="#1E293B" />
            <polygon points="120,240 260,85 410,240" fill="#0F172A" />
            <polygon points="210,240 330,120 440,240" fill="#090D16" />
            {/* Snow golden starlight highlight on peak */}
            <polygon points="260,85 245,110 275,110" fill="#FDE68A" opacity="0.8" />
          </svg>
        )}

        {/* 8. nat_manantial_oasis */}
        {svgKey === 'nat_manantial_oasis' && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="nmo_sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="50%" stopColor="#78350F" />
                <stop offset="100%" stopColor="#0B132B" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#nmo_sky)" />
            {/* Desert dunes */}
            <path d="M-20 150 Q 150 110 420 150 L 420 250 L -20 250 Z" fill="#92400E" opacity="0.7" />
            {/* Gushing fresh stream */}
            <ellipse cx="200" cy="185" rx="100" ry="38" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
            <circle cx="200" cy="180" r="14" fill="#BAE6FD" opacity="0.9" />
            {/* Palm of life */}
            <g transform="translate(180, 70)" stroke="#10B981" strokeWidth="4" fill="none" strokeLinecap="round">
              <path d="M20 100 Q 20 50 20 20" stroke="#78350F" strokeWidth="6" />
              <path d="M20 20 Q -15 5 -25 25" /><path d="M20 20 Q 55 5 65 25" />
              <path d="M20 20 Q 20 -15 20 -25" />
            </g>
          </svg>
        )}

        {/* 9. nat_lirios_valle */}
        {svgKey === 'nat_lirios_valle' && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="nlv_sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#312E81" />
                <stop offset="60%" stopColor="#6D28D9" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#nlv_sky)" />
            <circle cx="200" cy="140" r="60" fill="#FEF08A" opacity="0.3" filter="blur(16px)" />
            <path d="M0 170 Q 200 145 400 170 L 400 240 L 0 240 Z" fill="#064E3B" />
            {/* Lilies blooming */}
            <g transform="translate(130, 110)">
              {/* Lily 1 */}
              <path d="M25 80 Q 25 35 25 20" stroke="#047857" strokeWidth="3" fill="none" />
              <path d="M25 20 C 15 5 5 15 15 30 C 25 40 35 40 40 25 C 45 10 35 5 25 20 Z" fill="#FFFFFF" stroke="#FEF3C7" strokeWidth="1.5" />
              <circle cx="25" cy="22" r="3" fill="#F59E0B" />
              {/* Lily 2 */}
              <path d="M80 80 Q 80 45 80 30" stroke="#047857" strokeWidth="3" fill="none" />
              <path d="M80 30 C 70 15 60 25 70 40 C 80 50 90 50 95 35 C 100 20 90 15 80 30 Z" fill="#FFFFFF" stroke="#FEF3C7" strokeWidth="1.5" />
              <circle cx="80" cy="32" r="3" fill="#F59E0B" />
              {/* Lily 3 */}
              <path d="M135 80 Q 135 30 135 15" stroke="#047857" strokeWidth="3" fill="none" />
              <path d="M135 15 C 125 0 115 10 125 25 C 135 35 145 35 150 20 C 155 5 145 0 135 15 Z" fill="#FFFFFF" stroke="#FEF3C7" strokeWidth="1.5" />
              <circle cx="135" cy="17" r="3" fill="#F59E0B" />
            </g>
          </svg>
        )}

        {/* 10. ora_lampara_escrituras */}
        {svgKey === 'ora_lampara_escrituras' && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="ole_bg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0B0F19" />
                <stop offset="60%" stopColor="#1E1B4B" />
                <stop offset="100%" stopColor="#451A03" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#ole_bg)" />
            <circle cx="200" cy="110" r="70" fill="#FEF08A" opacity="0.25" filter="blur(18px)" />
            {/* Wooden desk */}
            <rect x="30" y="145" width="340" height="95" rx="4" fill="#29180D" stroke="#451A03" strokeWidth="2" />
            {/* Open Holy Scripture */}
            <g transform="translate(130, 150)">
              <path d="M10 25 Q 70 12 70 50 Q 10 62 10 25 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
              <path d="M130 25 Q 70 12 70 50 Q 130 62 130 25 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
              {/* Text lines impression */}
              <line x1="20" y1="32" x2="60" y2="30" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="20" y1="40" x2="55" y2="38" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="80" y1="30" x2="120" y2="32" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="85" y1="38" x2="120" y2="40" stroke="#94A3B8" strokeWidth="1.5" />
              {/* Golden ribbon bookmark */}
              <path d="M70 20 L 70 60 L 65 55 L 60 60 L 60 20 Z" fill="#F59E0B" />
            </g>
            {/* Candle glow */}
            <rect x="290" y="125" width="14" height="40" rx="3" fill="#FEF3C7" />
            <ellipse cx="297" cy="115" rx="5" ry="9" fill="#F59E0B" />
            <circle cx="297" cy="115" r="16" fill="#FBBF24" opacity="0.4" filter="blur(6px)" />
          </svg>
        )}

        {/* 11. ora_manos_entrega */}
        {svgKey === 'ora_manos_entrega' && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="ome_bg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0B132B" />
                <stop offset="50%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#060F1E" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#ome_bg)" />
            <circle cx="200" cy="100" r="65" fill="#FEF08A" opacity="0.3" filter="blur(16px)" />
            {/* Divine light descending into open cupped hands */}
            <polygon points="200,20 160,150 240,150" fill="#FFFBEB" opacity="0.25" />
            <g transform="translate(160, 125)">
              <ellipse cx="25" cy="40" rx="14" ry="24" fill="#F8FAFC" transform="rotate(-25 25 40)" opacity="0.95" />
              <ellipse cx="55" cy="40" rx="14" ry="24" fill="#F8FAFC" transform="rotate(25 55 40)" opacity="0.95" />
              {/* Golden heart / grace ball resting in palms */}
              <circle cx="40" cy="25" r="12" fill="#F59E0B" filter="drop-shadow(0 0 8px #FDE68A)" />
              <Sparkles className="w-4 h-4 text-[#060F1E] translate-x-[32px] translate-y-[17px]" />
            </g>
          </svg>
        )}

        {/* 12. ora_santuario_medianoche */}
        {svgKey === 'ora_santuario_medianoche' && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="osm_bg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#030712" />
                <stop offset="50%" stopColor="#0F172A" />
                <stop offset="100%" stopColor="#1E1B4B" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#osm_bg)" />
            <circle cx="70" cy="45" r="1.5" fill="#FFFFFF" /><circle cx="120" cy="80" r="1.8" fill="#FDE68A" />
            <circle cx="290" cy="50" r="2" fill="#FFFFFF" /><circle cx="340" cy="85" r="1.5" fill="#FDE68A" />
            <circle cx="200" cy="55" r="24" fill="#FEF08A" opacity="0.9" filter="drop-shadow(0 0 12px #F59E0B)" />
            {/* Bedroom / Sanctuary silhouette with peaceful believer in bed with folded hands */}
            <rect x="50" y="160" width="300" height="80" rx="6" fill="#111827" stroke="#1F2937" strokeWidth="2" />
            <g transform="translate(180, 135)" fill="#F8FAFC">
              <circle cx="20" cy="20" r="10" />
              <ellipse cx="20" cy="35" rx="16" ry="12" fill="#374151" />
              <path d="M12 28 Q 20 22 28 28" stroke="#F59E0B" strokeWidth="2" fill="none" />
            </g>
          </svg>
        )}

        {/* 13. ora_paloma_gracia */}
        {svgKey === 'ora_paloma_gracia' && (
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="opg_bg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="60%" stopColor="#0D9488" />
                <stop offset="100%" stopColor="#042F2E" />
              </linearGradient>
            </defs>
            <rect width="400" height="240" fill="url(#opg_bg)" />
            <circle cx="200" cy="110" r="70" fill="#FEF08A" opacity="0.3" filter="blur(20px)" />
            {/* White Dove gliding downwards */}
            <g transform="translate(180, 65)" fill="#FFFFFF">
              <path d="M20 20 Q 50 -10 75 10 Q 50 30 20 20 Z" />
              <path d="M20 20 Q -10 -10 -35 10 Q -10 30 20 20 Z" />
              <ellipse cx="20" cy="25" rx="8" ry="16" />
              <circle cx="20" cy="10" r="6" />
              {/* Olive branch in beak */}
              <path d="M20 6 Q 28 2 34 6" stroke="#10B981" strokeWidth="2.5" fill="none" />
            </g>
            {/* Stone altar with quiet incense glow */}
            <rect x="140" y="170" width="120" height="70" rx="4" fill="#334155" stroke="#475569" strokeWidth="2" />
            <ellipse cx="200" cy="170" rx="40" ry="10" fill="#64748B" />
            <circle cx="200" cy="165" r="5" fill="#F59E0B" />
          </svg>
        )}
      </div>
    );
  };

  return (
    <section className={`w-full space-y-4 ${className}`} aria-labelledby="faith-gallery-heading">
      {/* Editorial Header with Santuario Nocturno vibe */}
      <div className="bg-[#0B1728] border border-white/[0.08] rounded-[18px] p-4 sm:p-6 space-y-3 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Moon className="w-4 h-4 text-[#F59E0B]" strokeWidth={2} />
              <h2 id="faith-gallery-heading" className="text-[11px] sm:text-[11.5px] font-semibold tracking-wider uppercase text-[#CBD5E1]">
                Galería Visual de Fe • Modo Santuario
              </h2>
            </div>
            <p className="font-editorial text-[20px] sm:text-[24px] text-[#F1F5F9] font-normal leading-snug">
              Imágenes inspiradoras para contemplar y descansar en Dios
            </p>
          </div>

          {/* Random shuffle control */}
          <button
            type="button"
            onClick={handleShuffle}
            className="min-h-[44px] px-3.5 py-2 rounded-[10px] bg-white/[0.05] hover:bg-white/[0.1] active:bg-white/[0.15] border border-white/[0.1] text-[#FBBF24] text-[12px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs self-start sm:self-center shrink-0"
            title="Mostrar otra selección aleatoria"
          >
            <Shuffle className="w-4 h-4 text-[#F59E0B]" strokeWidth={2} />
            <span>Nueva Inspiración</span>
          </button>
        </div>

        {/* Unboxed category filters (Segmented Controls) */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 -mx-1 px-1">
          {(
            [
              { id: 'todas', label: 'Todas las Imágenes' },
              { id: 'familias', label: 'Familias & Hogar' },
              { id: 'naturaleza', label: 'Naturaleza & Creación' },
              { id: 'oracion', label: 'Oración & Noche' },
            ] as const
          ).map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`min-h-[40px] px-3.5 py-1.5 rounded-[10px] text-[12px] font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                  isActive
                    ? 'bg-[#0E223D] text-[#FBBF24] border-[#F59E0B]/60 shadow-xs'
                    : 'bg-white/[0.03] text-[#94A3B8] hover:text-[#F1F5F9] border-white/[0.06] hover:bg-white/[0.06]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Inspiring Cards (Organic, Editorial & Sober) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
        {displayedItems.slice(0, 6).map((item) => (
          <article
            key={item.id}
            className="group relative rounded-[16px] bg-[#0B1728] border border-white/[0.08] hover:border-[#F59E0B]/40 shadow-lg overflow-hidden flex flex-col justify-between transition-all duration-300"
          >
            {/* Artwork Canvas */}
            <div className="relative w-full cursor-pointer" onClick={() => setActiveModalItem(item)}>
              {renderArtworkSvg(item.svgKey, false)}

              {/* Discreet hover trigger for full contemplation */}
              <div className="absolute top-2.5 right-2.5 z-20 opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="p-2 rounded-full bg-[#060F1E]/80 backdrop-blur-md border border-white/[0.1] text-[#CBD5E1] hover:text-white flex items-center justify-center shadow-xs">
                  <Maximize2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                </span>
              </div>

              {/* Editorial unboxed kicker on top */}
              <div className="absolute bottom-2 left-3 z-20 text-[10px] uppercase font-semibold text-[#FDE68A] tracking-wider drop-shadow-md">
                {item.mood}
              </div>
            </div>

            {/* Editorial Caption Box with zero-pill discipline */}
            <div className="p-3.5 sm:p-4 space-y-2 flex-1 flex flex-col justify-between bg-[#0B1728]">
              <div className="space-y-1">
                {/* Clean unboxed metadata separator */}
                <div className="flex items-center gap-1.5 text-[10.5px] text-[#94A3B8] font-medium tracking-wide">
                  <span>{item.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#FBBF24] font-semibold">{item.scriptureRef}</span>
                </div>

                <h3 className="font-editorial text-[16px] text-[#F1F5F9] font-normal leading-snug line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-[12px] sm:text-[12.5px] italic text-[#CBD5E1] line-clamp-2 leading-relaxed font-serif">
                  «{item.verse}»
                </p>
              </div>

              {/* Action row */}
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModalItem(item)}
                  className="min-h-[36px] text-[11.5px] font-semibold text-[#F59E0B] hover:text-[#FBBF24] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Pausa Contemplativa</span>
                </button>

                <span className="text-[10px] text-[#64748B]">Santuario F.E.™</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* FULL CONTEMPLATIVE LIGHTBOX MODAL */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => {
            setActiveModalItem(null);
            setContemplationBreathe(false);
          }}
        >
          <div
            className="relative w-full max-w-[680px] max-h-[92vh] rounded-[22px] bg-[#0B1728] border border-white/[0.15] shadow-2xl flex flex-col overflow-hidden text-white animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between shrink-0 bg-[#060F1E]/95">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-[11px] text-[#94A3B8]">
                  <span className="text-[#F59E0B] font-semibold uppercase tracking-wider">{activeModalItem.categoryLabel}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeModalItem.mood}</span>
                </div>
                <h3 className="font-editorial text-[18px] sm:text-[22px] text-[#F1F5F9] font-normal leading-snug">
                  {activeModalItem.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveModalItem(null);
                  setContemplationBreathe(false);
                }}
                className="min-h-[44px] min-w-[44px] p-2 rounded-full hover:bg-white/[0.08] text-[#CBD5E1] transition-colors cursor-pointer flex items-center justify-center"
                aria-label="Cerrar pausa contemplativa"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Artwork Canvas */}
            <div className="w-full shrink-0 relative">
              {renderArtworkSvg(activeModalItem.svgKey, true)}

              {/* Breathing overlay if enabled */}
              {contemplationBreathe && (
                <div className="absolute inset-0 bg-[#060F1E]/75 backdrop-blur-xs flex flex-col items-center justify-center p-4 z-20 animate-fade-in">
                  <div className="w-24 h-24 rounded-full border-2 border-[#F59E0B] flex items-center justify-center animate-pulse bg-[#F59E0B]/10">
                    <span className="font-editorial text-[18px] text-[#FEF08A] font-semibold">
                      {breathePhase}
                    </span>
                  </div>
                  <span className="text-[12px] text-[#CBD5E1] mt-3 max-w-[280px] text-center font-medium">
                    Suelta toda prisa. Dios sostiene tu respiración y tu corazón en este momento.
                  </span>
                </div>
              )}
            </div>

            {/* Meditative Content Section */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 bg-[#0B1728]">
              {/* Scripture Highlight */}
              <div className="p-4 rounded-[14px] bg-[#060F1E] border border-white/[0.08] space-y-1.5">
                <span className="text-[10px] sm:text-[10.5px] font-semibold text-[#F59E0B] uppercase tracking-wider block">
                  Promesa Bíblica • {activeModalItem.scriptureRef}
                </span>
                <p className="font-editorial text-[16px] sm:text-[18px] italic text-[#F1F5F9] leading-relaxed">
                  «{activeModalItem.verse}»
                </p>
              </div>

              {/* Meditative Reflection */}
              <div className="space-y-1">
                <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#94A3B8] block">
                  Reflexión de Paz para el Santuario Nocturno
                </span>
                <p className="text-[13.5px] sm:text-[14px] text-[#CBD5E1] leading-relaxed">
                  {activeModalItem.reflection}
                </p>
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="p-3.5 sm:p-4 bg-[#060F1E] border-t border-white/[0.08] flex items-center justify-between gap-2 shrink-0 flex-wrap">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setContemplationBreathe(!contemplationBreathe)}
                  className={`min-h-[44px] px-3.5 py-1.5 rounded-[10px] text-[12px] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border ${
                    contemplationBreathe
                      ? 'bg-[#10B981]/20 border-[#10B981] text-[#A7F3D0]'
                      : 'bg-white/[0.04] border-white/[0.1] text-[#CBD5E1] hover:bg-white/[0.08]'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>{contemplationBreathe ? 'Detener Respiración' : 'Pausa de Respiración (1 min)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => copyVerseToClipboard(activeModalItem)}
                  className="min-h-[44px] px-3.5 py-1.5 rounded-[10px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-[#CBD5E1] text-[12px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Copiar versículo y reflexión"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <BookOpen className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copiado' : 'Guardar / Copiar'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveModalItem(null);
                  setContemplationBreathe(false);
                }}
                className="min-h-[44px] px-4 py-1.5 rounded-[10px] bg-[#F59E0B] text-[#060F1E] font-semibold text-[12px] cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
