export interface Faction {
  id: "spacewalkers" | "pilots";
  name: string;
  tagline: string;
  description: string;
  status: "active" | "locked";
  accentColor: string;
  features: string[];
}

export interface CelestialBody {
  id: string;
  name: string;
  hoursRequired: number;
  xpBonus: number;
  color: string;
  description: string;
  atmosphere?: string;
  distanceFromSun?: string;
  funFact?: string;
}

export interface RankTier {
  id: string;
  name: string;
  tierNumber: number;
  iconName: string;
  xpRequired: number;
}

export interface Soundscape {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
  audioPreviewUrl?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
