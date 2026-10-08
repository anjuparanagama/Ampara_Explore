"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "si" | "ta";

export interface Translations {
  [key: string]: {
    en: string;
    si: string;
    ta: string;
  };
}

export const translations: Translations = {
  // Brand & Header
  brandTitle: {
    en: "Ampara Explore",
    si: "අම්පාර එක්ස්ප්ලෝර්",
    ta: "அம்பாறை எக்ஸ்ப்ளோர்",
  },
  radialHorizon: {
    en: "25KM RADIAL HORIZON",
    si: "කි.මී. 25 සීමිත කලාපය",
    ta: "25கி.மீ சுற்றுவட்ட எல்லை",
  },
  navHome: {
    en: "Home",
    si: "මුල් පිටුව",
    ta: "முகப்பு",
  },
  navExplore: {
    en: "Explore",
    si: "ගවේෂණය",
    ta: "ஆராய்க",
  },
  navMap: {
    en: "Map",
    si: "සිතියම",
    ta: "வரைபடம்",
  },
  navPlan: {
    en: "My Visit Plan",
    si: "මගේ සංචාරක සැලසුම",
    ta: "எனது பயண திட்டம்",
  },
  navLogin: {
    en: "Login / Register",
    si: "ඇතුල් වන්න / ලියාපදිංචිය",
    ta: "உள்நுழைக / பதிவு",
  },

  // Hero Section
  heroZonePill: {
    en: "Eastern Province, Sri Lanka • 25 km Discovery Zone",
    si: "නැගෙනහිර පළාත, ශ්‍රී ලංකාව • කි.මී. 25 සංචාරක කලාපය",
    ta: "கிழக்கு மாகாணம், இலங்கை • 25 கி.மீ சுற்றுலா வலயம்",
  },
  heroTitleDiscover: {
    en: "Discover",
    si: "අත්විඳින්න",
    ta: "கண்டறியுங்கள்",
  },
  heroTitleCity: {
    en: "Ampara",
    si: "අම්පාර",
    ta: "அம்பாறை",
  },
  heroSubtitle: {
    en: "Explore pristine reservoirs, sacred centuries-old stupas, and roaming wild elephant herds",
    si: "මනරම් මහා ජලාශ, ඓතිහාසික පූජනීය සෑරදුන් සහ නිදැල්ලේ සැරිසරන වන අලි රංචු",
    ta: "இயற்கை நீர்த்தேக்கங்கள், பழம்பெரும் தூபிகள் மற்றும் காட்டு யானைக் கூட்டங்கள்",
  },
  heroSubtitleSuffix: {
    en: " —all nestled within a crisp 25 km radial horizon.",
    si: " —සියල්ල අම්පාර නගරයේ සිට කිලෝමීටර් 25ක සීමාව තුළ.",
    ta: " —அனைத்தும் 25 கி.மீ சுற்று எல்லைக்குள்.",
  },
  searchPlaceholder: {
    en: "Search places to visit, temples, wildlife...",
    si: "ස්ථාන, පුදබිම්, වනජීවී කලාප සොයන්න...",
    ta: "இடங்கள், கோயில்கள், வனவிலங்குகளை தேடுக...",
  },
  withinRadius: {
    en: "Within",
    si: "සීමාව",
    ta: "எல்லைக்குள்",
  },
  searchButton: {
    en: "Search",
    si: "සොයන්න",
    ta: "தேடுக",
  },
  popularLabel: {
    en: "Popular:",
    si: "ප්‍රධාන ස්ථාන:",
    ta: "பிரபலமானவை:",
  },
  ctaExplore: {
    en: "Explore Attractions",
    si: "ආකර්ෂණීය ස්ථාන බලන්න",
    ta: "சுற்றுலா இடங்களை காண்க",
  },
  ctaMap: {
    en: "View Radial Map",
    si: "කලාප සිතියම බලන්න",
    ta: "வரைபடத்தை காண்க",
  },

  // Stat Cards
  stat1Number: { en: "40+", si: "40+", ta: "40+" },
  stat1Label: {
    en: "Attractions Indexed",
    si: "ලැයිස්තුගත ස්ථාන",
    ta: "பதிவுசெய்த இடங்கள்",
  },
  stat2Number: { en: "25 km", si: "කි.මී. 25", ta: "25 கி.மீ" },
  stat2Label: {
    en: "Focused Radius",
    si: "කේන්ද්‍රගත අරය",
    ta: "கவனம் செலுத்தும் ஆரம்",
  },
  stat3Number: { en: "1-Day", si: "දින 1", ta: "1-நாள்" },
  stat3Label: {
    en: "Smart Sequence Plans",
    si: "දිනක සංචාරක සැලසුම්",
    ta: "சிறந்த பயண திட்டங்கள்",
  },
  stat4Label: {
    en: "Explorer Satisfaction",
    si: "සංචාරක තෘප්තිමත්භාවය",
    ta: "பயணிகளின் திருப்தி",
  },

  // Categories
  browseInterestTitle: {
    en: "Browse by Interest",
    si: "ඔබ කැමති අංශය අනුව සොයන්න",
    ta: "விருப்பங்களின்படி தேடுக",
  },
  browseInterestSubtitle: {
    en: "Tailor your 25km exploration around what you love most",
    si: "ඔබ වඩාත්ම ප්‍රියකරන සංචාරක අත්දැකීම තෝරාගන්න",
    ta: "நீங்கள் அதிகம் விரும்பும் அனுபவத்தை தேர்வு செய்க",
  },
  catNature: { en: "Nature", si: "ස්වභාව සෞන්දර්යය", ta: "இயற்கை" },
  catHistorical: { en: "Historical", si: "ඓතිහාසික", ta: "வரலாற்று சிறப்பு" },
  catReligious: { en: "Religious", si: "ආගමික පුදබිම්", ta: "புனித தலங்கள்" },
  catBeaches: { en: "Beaches", si: "වෙරළ තීරයන්", ta: "கடற்கரைகள்" },
  catWaterfalls: { en: "Waterfalls", si: "දියඇලි", ta: "நீர்வீழ்ச்சிகள்" },
  catWildlife: { en: "Wildlife", si: "වනජීවී", ta: "வனவிலங்குகள்" },
  catCultural: { en: "Cultural", si: "සංස්කෘතික", ta: "கலாச்சாரம்" },

  // Destinations Grid
  destinationsTitle: {
    en: "Curated Destinations in Ampara",
    si: "අම්පාරේ සුවිශේෂී සංචාරක ස්ථාන",
    ta: "அம்பாறையின் முக்கிய இடங்கள்",
  },
  destinationsSubtitle: {
    en: "Every site carefully measured from Ampara Clock Tower center within 25 km",
    si: "අම්පාර ඔරලෝසු කණුවේ සිට කිලෝමීටර් 25ක සීමාව තුළ සියලුම ස්ථාන",
    ta: "அம்பாறை மணிக்கூட்டுக் கோபுரத்திலிருந்து 25 கி.மீ எல்லைக்குள்",
  },
  addBtn: { en: "Add", si: "එක් කරන්න", ta: "சேர்க்க" },
  addedBtn: { en: "Added", si: "එක් කළා", ta: "சேர்க்கப்பட்டது" },
  viewDetails: {
    en: "View Details",
    si: "තොරතුරු බලන්න",
    ta: "விவரங்களை காண்க",
  },

  // Footer
  footerBio: {
    en: "Guiding ancient stupas, untouched reservoir sanctuaries, and coastal peripheries nestled strictly within a 25 km radius of Ampara. Travel thoughtfully with genuine regional insight.",
    si: "අම්පාර නගරයේ සිට කිලෝමීටර් 25ක සීමාව තුළ පිහිටි පුරාණ සෑරදුන්, මහා ජලාශ සහ වනජීවී රක්ෂිත වෙත නිවැරදි මාර්ගෝපදේශනය.",
    ta: "அம்பாறையிலிருந்து 25 கி.மீ எல்லைக்குள் உள்ள புராதன தூபிகள் மற்றும் இயற்கை வனவிலங்கு சரணாலயங்களுக்கான வழிகாட்டி.",
  },
  quickLinks: { en: "QUICK LINKS", si: "ක්ෂණික සබැඳි", ta: "விரைவு இணைப்புகள்" },
  heritageWildlife: {
    en: "HERITAGE & WILDLIFE",
    si: "උරුමය සහ වනජීවී",
    ta: "பாரம்பரியம் & வனவிலங்கு",
  },
  copyright: {
    en: "© 2024 Ampara Explore • Sri Lanka Tourism Development Authority aligned.",
    si: "© 2024 අම්පාර එක්ස්ප්ලෝර් • ශ්‍රී ලංකා සංචාරක සංවර්ධන අධිකාරිය අනුබද්ධිතයි.",
    ta: "© 2024 அம்பாறை எக்ஸ்ப்ளோர் • இலங்கை சுற்றுலா அபிவிருத்தி அதிகாரசபை.",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("ampara_lang") as Language | null;
    if (saved && (saved === "en" || saved === "si" || saved === "ta")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("ampara_lang", lang);
  };

  const t = (key: string): string => {
    const item = translations[key];
    if (!item) return key;
    return item[language] || item.en || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
