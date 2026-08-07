import React from "react";

interface PlanetIconProps {
  id: string;
  className?: string;
}

export const PlanetIcon: React.FC<PlanetIconProps> = ({ id, className = "w-8 h-8" }) => {
  switch (id) {
    case "sun":
      // Glowing solar sphere with surface flares
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="url(#sun-grad)" />
          <circle cx="50" cy="50" r="42" fill="#FBBF24" opacity="0.9" />
          <path d="M 50 8 C 65 18, 70 30, 50 45 C 30 60, 35 72, 50 92 C 60 78, 65 52, 50 8 Z" fill="#F59E0B" opacity="0.6" />
          <circle cx="35" cy="35" r="12" fill="#FEF08A" opacity="0.6" filter="blur(2px)" />
          <defs>
            <radialGradient id="sun-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>
          </defs>
        </svg>
      );

    case "mercury":
      // Image 1: Peach/orange planet with spots/craters & 4-pointed stars
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="#FF834E" />
          <path d="M 50 2 A 48 48 0 0 0 50 98 A 38 48 0 0 1 50 2 Z" fill="#F05E28" opacity="0.75" />
          <circle cx="25" cy="46" r="3.5" fill="#FFBBA0" opacity="0.9" />
          <circle cx="45" cy="24" r="2.5" fill="#FFBBA0" opacity="0.9" />
          <circle cx="52" cy="15" r="3.5" fill="#FFBBA0" opacity="0.9" />
          <circle cx="64" cy="24" r="2" fill="#FFBBA0" opacity="0.9" />
          <circle cx="35" cy="53" r="4.5" fill="#FFBBA0" opacity="0.9" />
          <circle cx="60" cy="56" r="2" fill="#F05E28" opacity="0.8" />
          <circle cx="80" cy="46" r="3.5" fill="#F05E28" opacity="0.8" />
          <circle cx="61" cy="78" r="3" fill="#FFCDB8" opacity="0.9" />
          <circle cx="16" cy="63" r="3" fill="#FFCDB8" opacity="0.9" />
          <circle cx="26" cy="69" r="2" fill="#FFCDB8" opacity="0.9" />
          <circle cx="86" cy="62" r="2.5" fill="#F05E28" opacity="0.8" />
          <path d="M 40 23 Q 40 33 30 33 Q 40 33 40 43 Q 40 33 50 33 Q 40 33 40 23 Z" fill="#FFF2EC" />
          <path d="M 71 57 Q 71 67 61 67 Q 71 67 71 77 Q 71 67 81 67 Q 71 67 71 57 Z" fill="#FFF2EC" />
        </svg>
      );

    case "venus":
      // Image 2: Golden/tan striped gas planet with top-left glossy glare
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#venus-clip)">
            <circle cx="50" cy="50" r="48" fill="#E6B875" />
            <path d="M 0 12 C 30 5, 70 20, 100 10 L 100 24 C 70 32, 30 18, 0 26 Z" fill="#F5DEB3" opacity="0.85" />
            <path d="M 0 28 C 35 22, 65 38, 100 28 L 100 45 C 60 52, 35 34, 0 42 Z" fill="#C29452" />
            <path d="M 0 48 C 30 40, 70 56, 100 46 L 100 62 C 70 70, 30 52, 0 60 Z" fill="#DDB06C" />
            <path d="M 0 66 C 40 60, 60 76, 100 68 L 100 85 C 60 92, 40 76, 0 82 Z" fill="#B0803D" />
            <path d="M 0 85 C 30 80, 70 94, 100 88 L 100 100 L 0 100 Z" fill="#8F6224" />
            <path d="M 12 25 C 20 12, 38 8, 52 8 C 36 12, 22 22, 16 38 C 13 33, 12 29, 12 25 Z" fill="#FFFFFF" opacity="0.5" />
          </g>
          <clipPath id="venus-clip">
            <circle cx="50" cy="50" r="48" />
          </clipPath>
        </svg>
      );

    case "earth":
      // Image 3: Blue Earth with vibrant green continents & atmospheric shadow
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#earth-clip)">
            <circle cx="50" cy="50" r="48" fill="#0083EE" />
            <path d="M 15 25 C 20 15, 38 10, 48 8 C 45 18, 52 24, 45 32 C 38 40, 25 45, 20 40 C 15 35, 12 30, 15 25 Z" fill="#74D055" />
            <path d="M 52 6 C 58 4, 66 8, 62 16 C 55 18, 50 12, 52 6 Z" fill="#8AE36C" />
            <path d="M 22 45 C 30 45, 42 55, 38 72 C 32 88, 28 92, 22 82 C 18 72, 18 55, 22 45 Z" fill="#74D055" />
            <path d="M 56 22 C 65 15, 85 12, 98 25 C 95 38, 85 45, 75 42 C 66 40, 58 32, 56 22 Z" fill="#74D055" />
            <path d="M 55 42 C 68 40, 92 48, 88 75 C 75 85, 62 80, 58 68 C 54 58, 52 48, 55 42 Z" fill="#66C647" />
            <path d="M 50 2 A 48 48 0 0 1 98 50 A 48 48 0 0 1 50 98 A 48 48 0 0 0 98 50 A 48 48 0 0 0 50 2 Z" fill="#003E96" opacity="0.4" />
          </g>
          <clipPath id="earth-clip">
            <circle cx="50" cy="50" r="48" />
          </clipPath>
        </svg>
      );

    case "mars":
      // Image 4: Vibrant orange/red planet with darker orange surface terrain
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#mars-clip)">
            <circle cx="50" cy="50" r="48" fill="#FF5630" />
            <path d="M 8 38 C 22 28, 48 45, 68 32 C 85 20, 92 35, 96 48 C 82 58, 62 48, 45 60 C 25 72, 12 55, 8 38 Z" fill="#E03E1A" opacity="0.85" />
            <path d="M 25 68 C 40 60, 68 75, 88 65 C 95 78, 80 92, 60 95 C 40 98, 20 85, 25 68 Z" fill="#C42E0C" opacity="0.85" />
            <circle cx="78" cy="25" r="3" fill="#B32405" opacity="0.7" />
            <circle cx="28" cy="25" r="2.5" fill="#FF8366" opacity="0.8" />
            <circle cx="12" cy="52" r="2" fill="#B32405" opacity="0.7" />
          </g>
          <clipPath id="mars-clip">
            <circle cx="50" cy="50" r="48" />
          </clipPath>
        </svg>
      );

    case "jupiter":
      // Image 5: Banded orange/brown Jupiter with the Great Red Spot
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#jupiter-clip)">
            <circle cx="50" cy="50" r="48" fill="#F8A155" />
            <rect x="0" y="8" width="100" height="8" fill="#8D4B27" />
            <rect x="0" y="24" width="100" height="12" fill="#C46D32" />
            <rect x="0" y="44" width="100" height="16" fill="#F57C00" />
            <rect x="0" y="66" width="100" height="12" fill="#A0522D" />
            <rect x="0" y="84" width="100" height="10" fill="#723617" />
            <rect x="0" y="16" width="100" height="8" fill="#FCE0BD" />
            <rect x="0" y="36" width="100" height="8" fill="#FCE0BD" />
            <rect x="0" y="60" width="100" height="6" fill="#FCE0BD" />
            <rect x="0" y="78" width="100" height="6" fill="#FCE0BD" />
            <ellipse cx="65" cy="74" rx="14" ry="8" fill="#E64A19" />
            <ellipse cx="65" cy="74" rx="10" ry="5" fill="#F4511E" />
            <circle cx="44" cy="12" r="3" fill="#BD7243" />
          </g>
          <clipPath id="jupiter-clip">
            <circle cx="50" cy="50" r="48" />
          </clipPath>
        </svg>
      );

    case "saturn":
      // Saturn with golden stripes and orbital ring
      return (
        <svg className={className} viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="50" rx="54" ry="16" fill="none" stroke="#EAB308" strokeWidth="7" opacity="0.4" transform="rotate(-15 60 50)" />
          <g clipPath="url(#saturn-clip)">
            <circle cx="60" cy="50" r="36" fill="#EAB308" />
            <rect x="20" y="28" width="80" height="8" fill="#CA8A04" />
            <rect x="20" y="44" width="80" height="10" fill="#FEF08A" />
            <rect x="20" y="60" width="80" height="8" fill="#A16207" />
          </g>
          <path d="M 8 58 A 54 16 0 0 0 112 42" fill="none" stroke="#FDE047" strokeWidth="7" transform="rotate(-15 60 50)" />
          <clipPath id="saturn-clip">
            <circle cx="60" cy="50" r="36" />
          </clipPath>
        </svg>
      );

    case "uranus":
      // Cyan Ice Giant with subtle tilt ring
      return (
        <svg className={className} viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="60" cy="50" rx="46" ry="10" fill="none" stroke="#7DD3FC" strokeWidth="3" opacity="0.6" transform="rotate(80 60 50)" />
          <g clipPath="url(#uranus-clip)">
            <circle cx="60" cy="50" r="38" fill="#38BDF8" />
            <circle cx="60" cy="50" r="34" fill="#0284C7" opacity="0.4" />
            <path d="M 22 30 C 40 25, 80 25, 98 30 Z" fill="#BAE6FD" opacity="0.5" />
          </g>
          <clipPath id="uranus-clip">
            <circle cx="60" cy="50" r="38" />
          </clipPath>
        </svg>
      );

    case "neptune":
      // Deep Blue Ice Giant with storm clouds
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#neptune-clip)">
            <circle cx="50" cy="50" r="48" fill="#1D4ED8" />
            <path d="M 0 20 C 30 10, 70 30, 100 15 L 100 35 C 70 45, 30 25, 0 35 Z" fill="#3B82F6" opacity="0.7" />
            <ellipse cx="40" cy="65" rx="14" ry="7" fill="#1E40AF" opacity="0.9" />
            <ellipse cx="70" cy="35" rx="10" ry="4" fill="#93C5FD" opacity="0.8" />
          </g>
          <clipPath id="neptune-clip">
            <circle cx="50" cy="50" r="48" />
          </clipPath>
        </svg>
      );

    case "pluto":
      // Dwarf planet with heart-shaped Tombaugh Regio glacier
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#pluto-clip)">
            <circle cx="50" cy="50" r="48" fill="#94A3B8" />
            <path d="M 10 20 C 30 40, 50 10, 90 30 L 90 60 C 50 40, 30 70, 10 50 Z" fill="#64748B" opacity="0.8" />
            {/* Heart shape */}
            <path d="M 45 45 C 40 35, 30 38, 30 46 C 30 54, 45 64, 45 64 C 45 64, 60 54, 60 46 C 60 38, 50 35, 45 45 Z" fill="#F1F5F9" opacity="0.9" />
          </g>
          <clipPath id="pluto-clip">
            <circle cx="50" cy="50" r="48" />
          </clipPath>
        </svg>
      );

    case "galaxy-core":
    default:
      // Glowing purple cosmic space orb with stellar vortex
      return (
        <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="48" fill="url(#galaxy-grad)" />
          <circle cx="50" cy="50" r="28" fill="url(#galaxy-core)" opacity="0.9" />
          <path d="M 50 12 Q 50 50 12 50 Q 50 50 50 88 Q 50 50 88 50 Q 50 50 50 12 Z" fill="#FFFFFF" opacity="0.95" />
          <defs>
            <radialGradient id="galaxy-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C7B8FF" />
              <stop offset="50%" stopColor="#3CCBFF" />
              <stop offset="100%" stopColor="#0B1020" />
            </radialGradient>
            <radialGradient id="galaxy-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F4A940" />
            </radialGradient>
          </defs>
        </svg>
      );
  }
};
