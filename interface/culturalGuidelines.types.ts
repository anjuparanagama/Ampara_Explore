export type GuidelinesTab = "all" | "temples" | "wildlife" | "eco";

export interface GuidelineCategoryItem {
  category: "temples" | "wildlife" | "eco";
  dos: string[];
  donts: string[];
}

export interface GuidelineCategoryMeta {
  label: string;
  desc: string;
}

export interface GuidelinesTabsProps {
  activeTab: GuidelinesTab;
  setActiveTab: (tab: GuidelinesTab) => void;
}

export interface GuidelinesCategoryCardProps {
  category: GuidelineCategoryItem;
  meta?: GuidelineCategoryMeta;
}

export interface GuidelinesGridProps {
  categories: GuidelineCategoryItem[];
}

export const guidelineCategoryTitles: Record<string, GuidelineCategoryMeta> = {
  temples: {
    label: "Ancient Stupas, Monasteries & Sacred Enclosures",
    desc: "Guidelines for Deegawapi Stupa, Buddhangala Hermitage, Rajagala & Magul Maha Viharaya.",
  },
  wildlife: {
    label: "Wild Elephant Corridors & Lake Safaris",
    desc: "Protection guidelines for Gal Oya National Park & Senanayake Samudraya waterways.",
  },
  eco: {
    label: "Environmental Conservation & Leave No Trace",
    desc: "Preserving wetlands, reservoirs, and archaeological rock ruins for future generations.",
  },
};

export const defaultDosAndDonts: GuidelineCategoryItem[] = [
  {
    category: "temples",
    dos: [
      "Dress respectfully: Wear clothing covering shoulders and knees (white or light colors preferred).",
      "Remove all footwear, caps, and sunglasses before entering temple sand courtyards (Malhuwa).",
      "Maintain quiet reverence around meditation caves and monastic walking corridors.",
      "Seek permission before photographing resident venerable monks.",
    ],
    donts: [
      "Never pose with your back turned to the Buddha statue for selfies or group photos.",
      "Do not lean on ancient stupa brickwork or sit on sacred moonstones (Sandakada Pahana).",
      "Avoid loud phone conversations, music, or shouting inside hermitages like Buddhangala & Rajagala.",
      "Do not bring alcoholic beverages, meat products, or tobacco onto temple grounds.",
    ],
  },
  {
    category: "wildlife",
    dos: [
      "Maintain a safe distance of at least 50 meters from wild elephants at all times.",
      "Follow wildlife ranger instructions strictly when taking boat safaris from Inginiyagala Jetty.",
      "Always wear fastened life jackets throughout lake excursions on Senanayake Samudraya.",
      "Remain silent and seated when observing elephants swimming between reservoir islands.",
    ],
    donts: [
      "Never feed wild elephants under any circumstance — it endangers both travelers and wildlife.",
      "Do not sound vehicle horns, rev engines, or illuminate high beams at wildlife crossings.",
      "Never use flash photography near nesting water birds or herd matriarchs.",
      "Do not alight from safari jeeps or vehicles inside protected Gal Oya National Park sectors.",
    ],
  },
  {
    category: "eco",
    dos: [
      "Practice 'Leave No Trace' — bring back all your water bottles, snack wrappers, and trash.",
      "Stick to designated walking trails to prevent soil erosion around ancient rock stairs.",
      "Use eco-friendly reef/water-safe sunscreen before swimming in designated reservoir pools.",
      "Support local Ampara village fruit vendors, clay craft artisans, and licensed eco-guides.",
    ],
    donts: [
      "Never pick, dislodge, or take ancient brick fragments, stupa plaster, or carved stones.",
      "Do not dispose of plastic bottles, polly-bags, or cans in reservoirs or waterways.",
      "Never light campfires or discard cigarette butts near dry zone grass or forest reserves.",
      "Do not carve names, graffiti, or markings on boulders, caves, or bark.",
    ],
  },
];
