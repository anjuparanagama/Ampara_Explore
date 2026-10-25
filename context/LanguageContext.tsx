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
  // Brand & Header Navigation
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
  navMyPlans: {
    en: "My Saved Plans",
    si: "සුරකින ලද සැලසුම්",
    ta: "சேமிக்கப்பட்ட திட்டங்கள்",
  },
  navLogin: {
    en: "Login / Register",
    si: "ඇතුල් වන්න / ලියාපදිංචිය",
    ta: "உள்நுழைக / பதிவு",
  },
  navLogout: {
    en: "Sign Out",
    si: "පිටවන්න",
    ta: "வெளியேறுக",
  },
  navAdmin: {
    en: "Admin Portal",
    si: "පරිපාලක පුවරුව",
    ta: "நிர்வாக தளம்",
  },
  explorer: {
    en: "Explorer",
    si: "සංචාරකයා",
    ta: "பயணி",
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
    en: " — all nestled within a crisp 25 km radial horizon.",
    si: " — සියල්ල අම්පාර නගරයේ සිට කිලෝමීටර් 25ක සීමාව තුළ.",
    ta: " — அனைத்தும் 25 கி.மீ சுற்று எல்லைக்குள்.",
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
  stat1Number: { en: "10", si: "10", ta: "10" },
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

  // Categories (Browse by Interest)
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
  catAll: { en: "All", si: "සියල්ල", ta: "அனைத்தும்" },
  catNature: { en: "Nature", si: "ස්වභාව සෞන්දර්යය", ta: "இயற்கை" },
  catHistorical: { en: "Historical", si: "ඓතිහාසික", ta: "வரலாற்று சிறப்பு" },
  catReligious: { en: "Religious", si: "ආගමික පුදබිම්", ta: "புனித தலங்கள்" },
  catSacred: { en: "Sacred", si: "පූජනීය ස්ථාන", ta: "புனித தலங்கள்" },
  catReligiousHistorical: {
    en: "Religious and Historical",
    si: "ආගමික සහ ඓතිහාසික",
    ta: "புனித மற்றும் வரலாற்று தலங்கள்",
  },
  catBeaches: { en: "Beaches", si: "වෙරළ තීරයන්", ta: "கடற்கரைகள்" },
  catWaterfalls: { en: "Waterfalls", si: "දියඇලි", ta: "நீர்வீழ்ச்சிகள்" },
  catWildlife: { en: "Wildlife", si: "වනජීවී", ta: "வனவிலங்குகள்" },
  catCultural: { en: "Cultural", si: "සංස්කෘතික", ta: "கலாச்சாரம்" },
  catNatureDesc: {
    en: "Explore serene reservoirs, lush green landscapes, and tranquil retreats.",
    si: "නෙත් සිත් ඇදගන්නා මනරම් ජලාශ, හරිත පරිසරය හා ස්වභාවික නිමැවුම්.",
    ta: "அழகிய நீர்த்தேக்கங்கள் மற்றும் இயற்கை எழில் கொஞ்சும் இடங்களை அனுபவியுங்கள்.",
  },
  catReligiousHistoricalDesc: {
    en: "Discover sacred ancient stupas, rock cave hermitages, and historic heritage ruins.",
    si: "පෞරාණික පූජනීය වෙහෙර විහාර, ගල් ලෙන් ආරාම හා ඓතිහාසික උරුමයන් සොයා යන්න.",
    ta: "பண்டைய புனித ஸ்தூபிகள், குகை ஆசிரமங்கள் மற்றும் வரலாற்று சின்னங்கள்.",
  },
  catBeachesDesc: {
    en: "Experience world-famous surf breaks, pristine golden coastlines, and coastal lagoons.",
    si: "ලෝකප්‍රකට රළ මත ලිස්සා යාමේ වෙරළ, රන්වන් වැලි තලාවන් හා වෙරළබඩ කලපු.",
    ta: "உலகப் புகழ்பெற்ற அலைச்சறுக்கு மற்றும் தங்க கடற்கரைகளை கண்டறியுங்கள்.",
  },
  catWildlifeDesc: {
    en: "Witness swimming elephant safaris, exotic bird sanctuaries, and national parks.",
    si: "දිය පිහිනන වන අලි ඇතුන්, විදේශීය පක්ෂීන් සහ ජාතික වනෝද්‍යාන සෆාරි.",
    ta: "நீந்தும் யானைகள், அரிய பறவைகள் மற்றும் வனவிலங்கு சரணාලயங்கள்.",
  },
  catWaterfallsDesc: {
    en: "Explore refreshing cascades, hidden jungle waterfalls, and river bathing spots.",
    si: "ප්‍රබෝධමත් සුන්දර දියඇලි හා ගංගා දියඇලි නැරඹීමේ මනරම් අත්දැකීම්.",
    ta: "மகிழூட்டும் நீர்வீழ்ச்சிகள் மற்றும் நதி சாகசங்களை கண்டறியுங்கள்.",
  },
  catCulturalDesc: {
    en: "Experience rich eastern heritage, authentic traditions, and local lifestyles.",
    si: "නැගෙනහිර සාම්ප්‍රදායික උරුමයන්, සංස්කෘතික අනන්‍යතාව හා ගැමි දිවිපෙවෙත.",
    ta: "பாரம்பரிய கலாச்சாரம் மற்றும் கிழக்கின் வாழ்க்கை முறையை அனுபவியுங்கள்.",
  },
  catHistoricalDesc: {
    en: "Discover ancient ruins, historic stone inscriptions, and centuries-old landmarks.",
    si: "ශතවර්ෂ ගණනාවක් පැරණි නටබුන්, සෙල්ලිපි හා ඓතිහාසික ස්ථාන.",
    ta: "பண்டைய சிதைவுகள் மற்றும் நூற்றாண்டு பழமையான வரலாற்று சின்னங்கள்.",
  },
  catReligiousDesc: {
    en: "Pay homage to sacred temples, spiritual hermitages, and peaceful shrines.",
    si: "පූජනීය බෞද්ධ සිද්ධස්ථාන, සන්සුන් ආරණ්‍ය සේනාසන හා වන්දනීය ස්ථාන.",
    ta: "புனித தலங்கள், அமைதியான ஆசிரமங்கள் மற்றும் ஆன்மீக தளங்கள்.",
  },

  // Featured Destinations Grid
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
  foundCount: {
    en: "Found",
    si: "හමුවිය",
    ta: "கிடைத்துள்ளன",
  },
  innerRing: {
    en: "0-5 km Inner",
    si: "කි.මී. 0-5 නාගරික කලාපය",
    ta: "0-5 கி.மீ உள் வலயம்",
  },
  midRing: {
    en: "5-15 km Mid",
    si: "කි.මී. 5-15 මධ්‍යම කලාපය",
    ta: "5-15 கி.மீ மத்திய வலயம்",
  },
  horizonRing: {
    en: "15-25 km Horizon",
    si: "කි.මී. 15-25 පිටත කලාපය",
    ta: "15-25 கி.மீ வெளி வலயம்",
  },
  noDestinationsFound: {
    en: "No destinations match your criteria",
    si: "ඔබගේ සෙවුමට ගැළපෙන ස්ථාන හමු නොවීය",
    ta: "உங்கள் தேடலுக்குரிய இடங்கள் எதுவும் இல்லை",
  },
  noDestinationsSubtitle: {
    en: "Try expanding your search radius or clearing category filters to discover more hidden gems.",
    si: "සෙවුම් අරය පුළුල් කරන්න හෝ පෙරහන් ඉවත් කර නැවත උත්සාහ කරන්න.",
    ta: "தேடல் எல்லையை விரிவுபடுத்தி அல்லது வடிகட்டிகளை நீக்கி மீண்டும் முயற்சிக்கவும்.",
  },
  showAllAttractions: {
    en: "Show All Attractions",
    si: "සියලු ස්ථාන පෙන්වන්න",
    ta: "அனைத்து இடங்களையும் காட்டுக",
  },
  addBtn: { en: "Add", si: "එක් කරන්න", ta: "சேர்க்க" },
  addedBtn: { en: "Added", si: "එක් කළා", ta: "சேர்க்கப்பட்டது" },
  addToPlan: {
    en: "+ Add to Plan",
    si: "+ සැලසුමට එක් කරන්න",
    ta: "+ திட்டத்தில் சேர்க்க",
  },
  inPlan: { en: "In Plan", si: "සැලසුමේ ඇත", ta: "திட்டத்தில் உள்ளது" },
  viewDetails: {
    en: "View Details",
    si: "තොරතුරු බලන්න",
    ta: "விவரங்களை காண்க",
  },
  viewGuide: {
    en: "View Guide",
    si: "මගපෙන්වීම බලන්න",
    ta: "வழிகாட்டியை காண்க",
  },
  quickPreview: {
    en: "Quick preview",
    si: "ක්ෂණික පෙරදසුන",
    ta: "முன்னோட்டம்",
  },
  ringBadge: {
    en: "RING",
    si: "කලාපය",
    ta: "வலயம்",
  },
  kmFromAmpara: {
    en: "km from Ampara Town",
    si: "කි.මී. අම්පාර නගරයේ සිට",
    ta: "கி.மீ அம்பாறை நகரத்திலிருந்து",
  },

  // Map Page & Sidebar
  explorePlaces: {
    en: "Explore Places",
    si: "ස්ථාන ගවේෂණය",
    ta: "இடங்களை ஆராய்க",
  },
  sitesCount: {
    en: "SITES",
    si: "ස්ථාන",
    ta: "இடங்கள்",
  },
  mapSubtitle: {
    en: "25 km radial radius in one view",
    si: "කි.මී. 25ක කලාපය එකම බැල්මකින්",
    ta: "25 கி.மீ சுற்றளவு ஒரே பார்வையில்",
  },
  filterOptions: {
    en: "Filter Options",
    si: "පෙරහන් විකල්ප",
    ta: "வடிகட்டுதல் தெரிவுகள்",
  },
  mapSearchPlaceholder: {
    en: "Search lake, stupa, ruins...",
    si: "වැව්, සෑරදුන්, නටබුන් සොයන්න...",
    ta: "ஏரி, தூபி, சிதைவுகளை தேடுக...",
  },
  radialZoneDistance: {
    en: "RADIAL ZONE DISTANCE",
    si: "කලාපීය දුර පරාසය",
    ta: "சுற்றுவட்ட தூர எல்லை",
  },
  show25kmRadar: {
    en: "Show 25 km Radar",
    si: "කි.මී. 25 රේඩාර් සීමාව",
    ta: "25 கி.மீ ரேடார் எல்லை",
  },
  within5km: {
    en: "Within 5 km",
    si: "කි.මී. 5 තුළ",
    ta: "5 கி.மீ-க்குள்",
  },
  within15km: {
    en: "Within 15 km",
    si: "කි.මී. 15 තුළ",
    ta: "15 கி.மீ-க்குள்",
  },
  full25km: {
    en: "Full 25 km",
    si: "සම්පූර්ණ කි.මී. 25",
    ta: "முழு 25 கி.மீ",
  },
  plannerPreset: {
    en: "PLANNER PRESET",
    si: "සංචාරක සැකසුම",
    ta: "பயண திட்டம்",
  },
  destinationsQueued: {
    en: "Destinations Queued",
    si: "ස්ථාන සැලසුම් කර ඇත",
    ta: "இடங்கள் சேர்க்கப்பட்டன",
  },
  openPlanner: {
    en: "Open Planner",
    si: "සැලසුම්කරු වෙත",
    ta: "திட்டமிடலை திறக்க",
  },
  clockTowerBenchmark: {
    en: "AMPARA CLOCK TOWER 0.0 KM",
    si: "අම්පාර ඔරලෝසු කණුව 0.0 කි.මී.",
    ta: "அம்பாறை மணிக்கூட்டுக் கோபுரம் 0.0 கி.மீ.",
  },
  benchmarkCenter: {
    en: "• 0.0 km Benchmark Center",
    si: "• කි.මී. 0.0 කේන්ද්‍රස්ථානය",
    ta: "• 0.0 கி.மீ மையப்புள்ளி",
  },
  layerTerrain: {
    en: "🗺 Terrain",
    si: "🗺 භූවිෂමතා",
    ta: "🗺 தரைத்தோற்றம்",
  },
  layerSatellite: {
    en: "🛰 Satellite",
    si: "🛰 චන්ද්‍රිකා",
    ta: "🛰 செயற்கைக்கோள்",
  },
  layerTopo: {
    en: "⛰ Topography",
    si: "⛰ උන්නතාංශ",
    ta: "⛰ நிலவியல்",
  },
  sanctuaryWildlifeRing: {
    en: "SANCTUARY & WILDLIFE RING",
    si: "අභයභූමි හා වනජීවී කලාපය",
    ta: "சரணாலயம் மற்றும் வனவிலங்கு வலயம்",
  },

  // Visit Plan Drawer
  planDrawerTitle: {
    en: "My 1-Day Visit Plan",
    si: "මගේ දින 1 සංචාරක සැලසුම",
    ta: "எனது 1-நாள் பயண திட்டம்",
  },
  placesSelected: {
    en: "places selected",
    si: "ස්ථාන තෝරාගෙන ඇත",
    ta: "இடங்கள் தேர்ந்தெடுக்கப்பட்டன",
  },
  placeSelected: {
    en: "place selected",
    si: "ස්ථානයක් තෝරාගෙන ඇත",
    ta: "இடம் தேர்ந்தெடுக்கப்பட்டது",
  },
  emptyItineraryTitle: {
    en: "Your itinerary is empty",
    si: "ඔබගේ සංචාරක සැලසුම හිස්ව පවතී",
    ta: "உங்கள் பயண திட்டம் காலியாக உள்ளது",
  },
  emptyItineraryDesc: {
    en: "Browse through Ampara attractions and click Add to assemble your customized sequence.",
    si: "අම්පාර ආකර්ෂණීය ස්ථාන පිරික්සා 'එක් කරන්න' ඔබා ඔබගේම සැලසුමක් සකස් කරගන්න.",
    ta: "அம்பாறையின் இடங்களை ஆராய்ந்து 'சேர்க்க' என்பதைக் கிளிக் செய்து உங்கள் பயண திட்டத்தை உருவாக்குங்கள்.",
  },
  totalRadialDistance: {
    en: "Total Radial Distance",
    si: "මුළු සංචාරක දුර",
    ta: "மொத்த பயண தூரம்",
  },
  clearItinerary: {
    en: "Clear Itinerary",
    si: "සැලසුම ඉවත් කරන්න",
    ta: "திட்டத்தை அழிக்க",
  },
  finalizeSequence: {
    en: "Finalize Sequence",
    si: "සැලසුම තහවුරු කරන්න",
    ta: "திட்டத்தை உறுதிப்படுத்துக",
  },
  removeStop: {
    en: "Remove",
    si: "ඉවත් කරන්න",
    ta: "நீக்குக",
  },

  // Plans & My Plans Page
  myPlansTitle: {
    en: "My Visit Plans",
    si: "මගේ සංචාරක සැලසුම්",
    ta: "எனது பயண திட்டங்கள்",
  },
  myPlansSubtitle: {
    en: "Manage, optimize, and follow your radial journey itineraries across Ampara",
    si: "අම්පාර පුරා ඔබගේ සංචාරක ගමන් මං සංවිධානය සහ කළමනාකරණය කරගන්න",
    ta: "அம்பாறை முழுவதும் உங்கள் பயண திட்டங்களை நிர்வகித்து ஒழுங்கமைக்கவும்",
  },
  createNewPlan: {
    en: "Create New Plan",
    si: "නව සැලසුමක් සාදන්න",
    ta: "புதிய திட்டம் உருவாக்குக",
  },
  allPlansTab: {
    en: "All Plans",
    si: "සියලු සැලසුම්",
    ta: "அனைத்து திட்டங்கள்",
  },
  upcomingTab: { en: "Upcoming", si: "ඉදිරි සැලසුම්", ta: "வரவிருக்கும்" },
  completedTab: { en: "Completed", si: "සම්පූර්ණ කළ", ta: "முடிவடைந்தவை" },
  draftTab: { en: "Draft", si: "කෙටුම්පත්", ta: "வரைவுகள்" },
  noPlansYet: {
    en: "No visit plans created yet",
    si: "තවමත් සංචාරක සැලසුම් සාදා නැත",
    ta: "இன்னும் பயண திட்டங்கள் உருவாக்கப்படவில்லை",
  },
  noPlansDesc: {
    en: "Start planning your 25km Ampara expedition by creating your first personalized itinerary.",
    si: "ඔබගේ පළමු සංචාරක සැලසුම සකස් කර අම්පාර චාරිකාව ආරම්භ කරන්න.",
    ta: "உங்கள் முதல் பயண திட்டத்தை உருவாக்கி உங்கள் 25 கி.மீ பயணத்தை தொடங்குங்கள்.",
  },
  optimizeRoute: {
    en: "Optimize Route",
    si: "ගමන් මාර්ගය ප්‍රශස්ත කරන්න",
    ta: "வழியை மேம்படுத்துக",
  },
  optimizedSuccess: {
    en: "Route Optimized! Waypoints sequenced for minimum travel time within the 25km radius.",
    si: "ගමන් මාර්ගය සාර්ථකව සැකසිණි! අවම කාලයකින් ගමන් කිරීමට ස්ථාන පෙළගස්වන ලදී.",
    ta: "பயண வழி மேம்படுத்தப்பட்டது! குறைந்த பயண நேரத்தில் செல்ல இடங்கள் வரிசைப்படுத்தப்பட்டன.",
  },
  tripOverview: {
    en: "Trip Overview",
    si: "සංචාරක දළ විශ්ලේෂණය",
    ta: "பயண கண்ணோட்டம்",
  },
  estimatedTravelTime: {
    en: "Estimated Travel",
    si: "ඇස්තමේන්තුගත කාලය",
    ta: "மதிப்பிடப்பட்ட நேரம்",
  },
  sequentialTimeline: {
    en: "Sequential Timeline",
    si: "අනුක්‍රමික කාලරේඛාව",
    ta: "காலவரிசை நிகழ்வுகள்",
  },
  deleteStop: { en: "Delete", si: "මකන්න", ta: "நீக்குக" },
  moveUp: { en: "Move Up", si: "ඉහළට", ta: "மேலே" },
  moveDown: { en: "Move Down", si: "පහළට", ta: "கீழே" },

  // Create Plan Modal
  createPlanTitle: {
    en: "Create New Visit Plan",
    si: "නව සංචාරක සැලසුමක් සාදන්න",
    ta: "புதிய பயண திட்டம் உருவாக்குக",
  },
  createPlanSubtitle: {
    en: "Select destinations and assemble your tailored 25km expedition",
    si: "ස්ථාන තෝරා ඔබගේ කි.මී. 25 චාරිකාව පිළියෙල කරගන්න",
    ta: "இடங்களை தேர்வு செய்து உங்கள் 25 கி.மீ பயணத்தை ஒழுங்கமைக்கவும்",
  },
  planTitleLabel: {
    en: "Plan Title",
    si: "සැලසුමේ නම",
    ta: "திட்டத்தின் பெயர்",
  },
  dateLabel: {
    en: "Target Travel Date",
    si: "සංචාරය කරන දිනය",
    ta: "பயண தேதி",
  },
  paceLabel: {
    en: "Pace & Style",
    si: "ගමන් වේගය සහ රටාව",
    ta: "பயண வேகம் மற்றும் முறை",
  },
  searchAttractionsPlaceholder: {
    en: "Search attractions by name or location...",
    si: "ස්ථානයේ නම හෝ ප්‍රදේශය අනුව සොයන්න...",
    ta: "இடத்தின் பெயர் அல்லது பகுதி மூலம் தேடுக...",
  },
  selectedDestinations: {
    en: "Selected Destinations",
    si: "තෝරාගත් ස්ථාන",
    ta: "தேர்ந்தெடுக்கப்பட்ட இடங்கள்",
  },
  noStopsSelected: {
    en: "No destinations selected yet. Click + Add on any place below.",
    si: "තවමත් ස්ථාන තෝරා නැත. පහත ඇති ඕනෑම ස්ථානයක '+ එක් කරන්න' ඔබන්න.",
    ta: "இன்னும் இடங்கள் தேர்வு செய்யப்படவில்லை. கீழே உள்ள இடங்களில் '+ சேர்க்க' கிளிக் செய்யவும்.",
  },
  cancelBtn: { en: "Cancel", si: "අවලංගු කරන්න", ta: "ரத்து" },
  savePlanBtn: {
    en: "Save & Create Plan",
    si: "සුරකින්න සහ සාදන්න",
    ta: "சேமித்து உருவாக்குக",
  },

  // Attraction Detail Page
  loadingAttraction: {
    en: "Loading Destination Details...",
    si: "තොරතුරු පූරණය වෙමින් පවතී...",
    ta: "விவரங்கள் ஏற்றப்படுகின்றன...",
  },
  attractionNotFound: {
    en: "Destination Not Found",
    si: "ස්ථානය හමු නොවීය",
    ta: "இடம் கிடைக்கவில்லை",
  },
  attractionNotFoundDesc: {
    en: "The attraction you are looking for is unavailable or has been moved.",
    si: "ඔබ සොයන ස්ථානය දැනට නොමැත හෝ වෙනත් තැනකට ගෙනගොස් ඇත.",
    ta: "நீங்கள் தேடும் இடம் தற்போது கிடைக்கவில்லை அல்லது நகர்த்தப்பட்டுள்ளது.",
  },
  backToExplore: {
    en: "Back to Explore Directory",
    si: "නැවත සංචාරක නාමාවලියට",
    ta: "மீண்டும் சுற்றுலா அடைவுக்கு",
  },
  viewFullScreen: {
    en: "View Full Screen",
    si: "සම්පූර්ණ තිරයෙන් බලන්න",
    ta: "முழுத்திரையில் காண்க",
  },
  favorite: {
    en: "Favorite",
    si: "ප්‍රියතම",
    ta: "விருப்பம்",
  },
  shareDestination: {
    en: "Share destination",
    si: "ස්ථානය බෙදාගන්න",
    ta: "இடத்தை பகிர்க",
  },
  linkCopied: {
    en: "Destination link copied to clipboard!",
    si: "ස්ථානයේ සබැඳිය පිටපත් කරගන්නා ලදී!",
    ta: "இணைப்பு பிரதி எடுக்கப்பட்டது!",
  },
  viewAllPhotos: {
    en: "View All Photos",
    si: "සියලු ඡායාරූප බලන්න",
    ta: "அனைத்து புகைப்படங்களையும் காண்க",
  },

  // Authentication & Modals
  welcomeExplorer: {
    en: "Welcome Explorer",
    si: "ආයුබෝවන් සංචාරකයා",
    ta: "வருக பயணியே",
  },
  joinAmpara: {
    en: "Join Ampara Explore",
    si: "අම්පාර එක්ස්ප්ලෝර් හා එක්වන්න",
    ta: "அம்பாறை எக்ஸ்ப்ளோருடன் இணைக",
  },
  loginSubtitle: {
    en: "Sign in to access your saved itineraries.",
    si: "ඔබගේ සුරකින ලද සංචාරක සැලසුම් වෙත පිවිසීමට ඇතුල් වන්න.",
    ta: "உங்கள் சேமிக்கப்பட்ட பயண திட்டங்களை அணுக உள்நுழையவும்.",
  },
  registerSubtitle: {
    en: "Create an account to save radial trip routes and reviews.",
    si: "සංචාරක ගමන් මාර්ග සහ සමාලෝචන සුරැකීමට ගිණුමක් සාදන්න.",
    ta: "பயண வழிகளை சேமிக்க புதிய கணக்கை உருவாக்கவும்.",
  },
  fullName: {
    en: "Full Name",
    si: "සම්පූර්ණ නම",
    ta: "முழுப் பெயர்",
  },
  emailAddress: {
    en: "Email Address",
    si: "විද්‍යුත් තැපැල් ලිපිනය",
    ta: "மின்னஞ்சல் முகவரி",
  },
  password: {
    en: "Password",
    si: "මුරපදය",
    ta: "கடவுச்சொல்",
  },
  rememberMe: {
    en: "Remember me",
    si: "මාව මතක තබාගන්න",
    ta: "என்னை நினைவில் கொள்க",
  },
  signInBtn: {
    en: "Sign In to Account",
    si: "ගිණුමට ඇතුල් වන්න",
    ta: "கணக்கில் உள்நுழைக",
  },
  registerBtn: {
    en: "Create Explorer Account",
    si: "ගිණුම සාදන්න",
    ta: "கணக்கை உருவாக்குக",
  },
  signingIn: {
    en: "Signing in...",
    si: "ඇතුල් වෙමින් පවතී...",
    ta: "உள்நுழைகிறது...",
  },
  creatingAccount: {
    en: "Creating account...",
    si: "ගිණුම සකස් වෙමින් පවතී...",
    ta: "கணக்கு உருவாகிறது...",
  },
  alreadyHaveAccount: {
    en: "Already have an account? Sign In",
    si: "දැනටමත් ගිණුමක් තිබේද? ඇතුල් වන්න",
    ta: "ஏற்கனவே கணக்கு உள்ளதா? உள்நுழைக",
  },
  dontHaveAccount: {
    en: "New to Ampara Explore? Register",
    si: "නව සාමාජිකයෙක්ද? ලියාපදිංචි වන්න",
    ta: "புதிய பயணியா? பதிவு செய்க",
  },

  // Footer & Legal
  footerBio: {
    en: "Guiding ancient stupas, untouched reservoir sanctuaries, and coastal peripheries nestled strictly within a 25 km radius of Ampara. Travel thoughtfully with genuine regional insight.",
    si: "අම්පාර නගරයේ සිට කිලෝමීටර් 25ක සීමාව තුළ පිහිටි පුරාණ සෑරදුන්, මහා ජලාශ සහ වනජීවී රක්ෂිත වෙත නිවැරදි මාර්ගෝපදේශනය.",
    ta: "அம்பாறையிலிருந்து 25 கி.மீ எல்லைக்குள் உள்ள புராதன தூபிகள் மற்றும் இயற்கை வனவிலங்கு சரணாலயங்களுக்கான வழிகாட்டி.",
  },
  footerLocation: {
    en: "Ampara District Secretariat Zone • Eastern Province",
    si: "අම්පාර දිස්ත්‍රික් ලේකම් කොට්ඨාසය • නැගෙනහිර පළාත",
    ta: "அம்பாறை மாவட்ட செயலக வலயம் • கிழக்கு மாகாணம்",
  },
  quickLinks: {
    en: "QUICK LINKS",
    si: "ක්ෂණික සබැඳි",
    ta: "விரைவு இணைப்புகள்",
  },
  footerLink1: {
    en: "0 - 5 km Town Hub & Lake Promenade",
    si: "කි.මී. 0 - 5 නගරය සහ වැව් තාවුල්ල",
    ta: "0 - 5 கி.மீ நகர மையம் & ஏரிக்கரை",
  },
  footerLink2: {
    en: "5 - 15 km Mid Forest Sanctuaries",
    si: "කි.මී. 5 - 15 මධ්‍යම වනාන්තර රක්ෂිත",
    ta: "5 - 15 கி.மீ வனவிலங்கு சரணாலயங்கள்",
  },
  footerLink3: {
    en: "15 - 25 km Gal Oya Safari Frontier",
    si: "කි.මී. 15 - 25 ගල්ඔය සෆාරි කලාපය",
    ta: "15 - 25 கி.மீ கல் ஓயா சவாரி எல்லை",
  },
  footerLink4: {
    en: "Archaeological Heritage Sites",
    si: "පුරාවිද්‍යාත්මක උරුම ස්ථාන",
    ta: "தொல்பொருள் பாரம்பரிய தளங்கள்",
  },
  heritageWildlife: {
    en: "HERITAGE & WILDLIFE",
    si: "උරුමය සහ වනජීවී",
    ta: "பாரம்பரியம் & வனவிலங்கு",
  },
  touristPolice: {
    en: "Tourist Police: +94 63 222 2222",
    si: "සංචාරක පොලිසිය: +94 63 222 2222",
    ta: "சுற்றுலா காவல்துறை: +94 63 222 2222",
  },
  safeTravelZone: {
    en: "Safe & Verified Travel Zone",
    si: "ආරක්ෂිත සහ සහතික කළ සංචාරක කලාපය",
    ta: "பாதுகாப்பான & சரிபார்க்கப்பட்ட சுற்றுலா வலயம்",
  },
  copyright: {
    en: "© 2024 Ampara Explore • Sri Lanka Tourism Development Authority aligned.",
    si: "© 2024 අම්පාර එක්ස්ප්ලෝර් • ශ්‍රී ලංකා සංචාරක සංවර්ධන අධිකාරිය අනුබද්ධිතයි.",
    ta: "© 2024 அம்பாறை எக்ஸ்ப்ளோர் • இலங்கை சுற்றுலா அபிவிருத்தி அதிகாரசபை.",
  },
  privacyPolicy: {
    en: "Privacy Policy",
    si: "පෞද්ගලිකත්ව ප්‍රතිපත්තිය",
    ta: "தனியுரிமைக் கொள்கை",
  },
  termsOfService: {
    en: "Terms of Service",
    si: "සේවා කොන්දේසි",
    ta: "சேவை விதிமுறைகள்",
  },
  culturalGuidelines: {
    en: "Cultural Guidelines",
    si: "සංස්කෘතික මාර්ගෝපදේශ",
    ta: "கலாச்சார வழிகாட்டுதல்கள்",
  },
};

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  getCategoryName: (category: string) => string;
  getZoneName: (zone: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string, fallback?: string) => fallback || key,
  getCategoryName: (category: string) => category,
  getZoneName: (zone: string) => zone,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("ampara_lang") as Language | null;
        if (saved && (saved === "en" || saved === "si" || saved === "ta")) {
          return saved;
        }
      } catch {}
    }
    return "en";
  });

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (
        e.key === "ampara_lang" &&
        e.newValue &&
        (e.newValue === "en" || e.newValue === "si" || e.newValue === "ta")
      ) {
        setLanguageState(e.newValue as Language);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("ampara_lang", lang);
    } catch {}
    // Dispatch custom event so any non-react listeners can also synchronize
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("ampara-language-change", { detail: lang }),
      );
    }
  };

  const t = (key: string, fallback?: string): string => {
    const item = translations[key];
    if (!item) return fallback !== undefined ? fallback : key;
    return item[language] || item.en || fallback || key;
  };

  const getCategoryName = (cat: string): string => {
    if (!cat) return "";
    const lower = cat.toLowerCase().trim();
    if (lower === "all") return t("catAll");
    if (lower.includes("nature")) return t("catNature");
    if (lower.includes("wildlife")) return t("catWildlife");
    if (
      lower.includes("religious and historical") ||
      lower.includes("religious & historical")
    ) {
      return t("catReligiousHistorical");
    }
    if (lower.includes("religious") || lower.includes("sacred"))
      return t("catReligious");
    if (lower.includes("historical")) return t("catHistorical");
    if (lower.includes("beach")) return t("catBeaches");
    if (lower.includes("waterfall")) return t("catWaterfalls");
    if (lower.includes("cultural")) return t("catCultural");

    const directKey = `cat_${lower.replace(/[^a-z0-9]/g, "_")}`;
    if (translations[directKey]) return t(directKey);
    return cat;
  };

  const getZoneName = (zone: string): string => {
    if (!zone) return "";
    const lower = zone.toLowerCase().trim();
    if (lower.includes("0-5") || lower.includes("0 - 5")) return t("innerRing");
    if (lower.includes("5-15") || lower.includes("5 - 15")) return t("midRing");
    if (lower.includes("15-25") || lower.includes("15 - 25"))
      return t("horizonRing");
    return zone;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, getCategoryName, getZoneName }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
