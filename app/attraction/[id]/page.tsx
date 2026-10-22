"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Compass,
  ArrowLeft,
  MapPin,
  Clock,
  Star,
  Heart,
  Share2,
  Plus,
  Check,
  Navigation,
  Sparkles,
  Info,
  Calendar,
  Building,
  Car,
  Sunrise,
  CheckCircle2,
  Camera,
  Trees,
  Phone,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sun,
  Shield,
  HelpCircle,
} from "lucide-react";
import VisitPlanDrawer from "@/components/VisitPlanDrawer";
import AuthModal from "@/components/AuthModal";
import { amparaAttractions, Attraction } from "@/data/amparaData";

// Comprehensive rich profile data for Ampara destinations
interface AttractionProfile {
  tag: string;
  tagColor: string;
  subtitle: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  quote: string;
  galleryImages: { url: string; caption: string }[];
  hours: string;
  hoursDetail: string;
  tariff: string;
  tariffDetail: string;
  roadType: string;
  roadDetail: string;
  authority: string;
  facilities: string;
  routeDesc: string;
  tips: { title: string; desc: string; icon: "sunrise" | "trees" | "sun" }[];
}

const ATTRACTION_PROFILES: Record<string, AttractionProfile> = {
  "senanayake-samudraya": {
    tag: "✓ ECOLOGICAL LANDMARK",
    tagColor: "bg-emerald-500",
    subtitle: "The monumental inland sea of independent Sri Lanka • Built 1949",
    aboutTitle: "About the Inland Sea",
    aboutParagraphs: [
      "Engineered in 1949 as the crowning achievement of the Gal Oya Development Scheme spearheaded by independent Sri Lanka's first Prime Minister, Rt. Hon. D.S. Senanayake, this reservoir covers an astounding water spread of over 7,800 hectares (nearly 77 square kilometers). Far more than an irrigation masterwork, it endured essential civil engineering principles that transformed the parched scrub plains of the East into a flourishing sanctuary.",
      "What makes Senanayake Samudraya globally singular is its status as Sri Lanka's premier open-water boat safari destination. Hemmed in by the jagged granite silhouette of Mount Inginiyagala and Dimbula, peaceful motorized dinghies navigate tranquil lake channels where wild Asian elephants swim between wooded islets. In the serene morning mist, rare White-bellied Sea Eagles dive into the mirrors of water, while Native cormorants dry their plumage atop petrified forest trunks that rise gracefully from the deep basin.",
    ],
    quote:
      "Standing on the Inginiyagala bund as dusk gathers is akin to gazing over an ocean cradled in the arms of ancient mountains — absolute calm unbroken by modern noise.",
    galleryImages: [
      { url: "/images/hero-bg.jpg", caption: "🌅 Reservoir Sunset" },
      { url: "/images/login-bg.jpg", caption: "🛶 Outrigger Lagoon Views" },
      {
        url: "/images/gal-oya-elephants.jpg",
        caption: "🐘 Shoreline Wildlife",
      },
    ],
    hours: "06:00 - 18:30",
    hoursDetail: "Boat safaris operate 06:30 - 09:30 & 15:30 - 18:00",
    tariff: "Free Bund Access",
    tariffDetail: "Boat Safari from LKR 3,500+",
    roadType: "Paved A25 Highway",
    roadDetail: "Smooth asphalt all vehicles",
    authority:
      "Irrigation Department & Department of Wildlife Conservation (Gal Oya Sector)",
    facilities:
      "Paved parking lot, scenic viewing platforms, sanitary facilities, near-ring fresh coconut stalls",
    routeDesc:
      "Est. 15-20 min drive via Inginiyagala Road (B350 / A25) • Smooth asphalt",
    tips: [
      {
        title: "Boat Safari Bookings",
        desc: "Boats launch from the Inginiyagala Wildlife Jetty. Register early before 07:00 AM for birdlife or after 03:45 PM for swimming elephants.",
        icon: "sunrise",
      },
      {
        title: "Eco-Etiquette Buffer",
        desc: "Zero plastic waste permitted along the bund. Boat operators are mandated to preserve a 50-meter buffer from swimming elephants.",
        icon: "trees",
      },
      {
        title: "Recommended Gear",
        desc: "High SPF sunscreen, wide-brim hat, telephoto lens (200-500mm for wildlife), reusable canteen, and light rainproof windbreaker.",
        icon: "sun",
      },
    ],
  },
  "gal-oya-national-park": {
    tag: "✓ PROTECTED WILDLIFE SANCTUARY",
    tagColor: "bg-emerald-600",
    subtitle:
      "Sri Lanka's only national park featuring boat safaris with swimming wild elephants",
    aboutTitle: "About Gal Oya National Park",
    aboutParagraphs: [
      "Established in 1954 to safeguard the rich catchment basin of the Senanayake Samudraya, Gal Oya National Park encompasses over 25,900 hectares of dense evergreen and savannah forest. It is celebrated worldwide for its iconic swimming wild elephant herds, who migrate between islands in the reservoir.",
      "The park also protects herds of axis deer, leopards, sloth bears, water buffalo, and 150 species of birds including the rare Lesser Adjutant and Brahminy Kite. Visitors can experience both motorized boat safaris and guided jungle treks led by indigenous Vedda guides.",
    ],
    quote:
      "Witnessing a herd of wild elephants swimming serenely across mist-covered lake waters against the backdrop of untouched jungle is one of nature's greatest spectacles.",
    galleryImages: [
      {
        url: "/images/gal-oya-elephants.jpg",
        caption: "🐘 Swimming Elephant Herd",
      },
      { url: "/images/hero-bg.jpg", caption: "🌊 Lake Safari Channel" },
      {
        url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        caption: "🌿 Evergreen Canopy",
      },
    ],
    hours: "06:00 - 18:00",
    hoursDetail: "Ranger permits required before entry",
    tariff: "DWC Park Permit",
    tariffDetail: "Safari boat fees apply",
    roadType: "Jeep & Waterway Route",
    roadDetail: "Access via Inginiyagala Jetty",
    authority: "Department of Wildlife Conservation (DWC), Sri Lanka",
    facilities:
      "Wildlife Ranger Office, briefing room, life jackets, boat jetty, vehicle parking",
    routeDesc:
      "Est. 25 min drive from Ampara town to Inginiyagala Park Headquarters • Paved route",
    tips: [
      {
        title: "Best Elephant Sightings",
        desc: "Late afternoon boat safaris (15:30 - 17:45) offer the highest probability of spotting herds bathing and swimming between islands.",
        icon: "sunrise",
      },
      {
        title: "Strict Zero-Feeding Rule",
        desc: "Never feed or provoke wild animals. Maintain silent observation and follow ranger directives at all times.",
        icon: "trees",
      },
      {
        title: "Safari Essentials",
        desc: "Bring binoculars, zoom lenses, polarising sunglasses, drinking water, and insect repellent.",
        icon: "sun",
      },
    ],
  },
  "deegawapi-stupa": {
    tag: "✓ SOLOSMASTHANA SACRED SANCTUARY",
    tagColor: "bg-sky-600",
    subtitle:
      "One of the 16 sacred Solosmasthana sites blessed by Lord Buddha • Built 3rd Century BC",
    aboutTitle: "About Deegawapi Sacred Stupa",
    aboutParagraphs: [
      "Built by King Saddhatissa in the 3rd century BC, Dighavapi (Deegawapi) is venerated as one of the Solosmasthana—the sixteen holiest Buddhist sanctuaries in Sri Lanka. According to the ancient Mahavamsa chronicle, the Lord Buddha sat in serene meditation upon this exact consecrated ground during his third visit to Lanka.",
      "With an immense ancient circumference that rivalled the great stupas of Anuradhapura, ongoing national archaeological excavations have unveiled gold reliquaries, historic stone inscriptions, and the original brick terraces of the ancient monastic kingdom of Digamadulla.",
    ],
    quote:
      "A sacred sanctuary where centuries of royal devotion and spiritual silence converge under the eastern skies.",
    galleryImages: [
      {
        url: "/images/deegawapi-stupa.jpg",
        caption: "🛕 Historic Sacred Stupa",
      },
      {
        url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        caption: "🍃 Sacred Sand Terrace",
      },
      { url: "/images/login-bg.jpg", caption: "🌅 Twilight Puja Atmosphere" },
    ],
    hours: "05:30 - 20:00",
    hoursDetail: "Daily Morning & Evening Pujas",
    tariff: "Free Admission",
    tariffDetail: "Pilgrim donations welcome",
    roadType: "Paved Ampara-Deegawapi Rd",
    roadDetail: "Smooth highway all vehicles",
    authority: "Department of Archaeology & Deegawapi Sacred Temple Trust",
    facilities:
      "Pilgrim rest hall (Vishrama Shala), lotus flower stalls, sand terrace, clean sanitation",
    routeDesc:
      "Est. 20 min drive from Ampara town center via Deegawapiya Road • Paved asphalt",
    tips: [
      {
        title: "Temple Dress Code",
        desc: "Wear white or light-colored attire covering shoulders and knees. Remove footwear and hats before entering the sand terrace (Malhuwa).",
        icon: "trees",
      },
      {
        title: "Puja Timing & Flowers",
        desc: "Participate in the traditional morning (06:00 AM) or evening (06:00 PM) flower offering and chimes for a deeply peaceful experience.",
        icon: "sunrise",
      },
      {
        title: "Archaeological Museum",
        desc: "Visit the nearby excavation museum to view ancient gold reliquaries, clay tiles, and stone inscriptions discovered on site.",
        icon: "sun",
      },
    ],
  },
  "buddhangala-monastery": {
    tag: "✓ ANCIENT FOREST HERMITAGE",
    tagColor: "bg-amber-600",
    subtitle:
      "Ancient cave monastery perched atop monolithic boulders with 360° jungle vistas",
    aboutTitle: "About Buddhangala Forest Hermitage",
    aboutParagraphs: [
      "Perched amidst massive granite outcrops surrounded by dense wilderness, Buddhangala dates back over 2,300 years to King Devanampiyatissa's era. Monks observe deep silent meditation in natural drip-ledge rock shelters, keeping alive ancient ascetic Buddhist traditions.",
      "The rock summit stupa enshrines authentic relics of the Lord Buddha and his chief disciples, Venerable Sariputta and Moggallana. Wild spotted deer roam freely and calmly throughout the monastic grounds, creating an aura of harmony between man and wildlife.",
    ],
    quote:
      "High above the canopy on the summit rock, only the wind whispers through the Bo leaves — a true refuge of pristine peace.",
    galleryImages: [
      { url: "/images/buddhangala.jpg", caption: "🛕 Sacred Summit Stupa" },
      { url: "/images/deegawapi-stupa.jpg", caption: "🪨 Meditation Caves" },
      { url: "/images/hero-bg.jpg", caption: "🦌 Roaming Spotted Deer" },
    ],
    hours: "06:00 - 18:30",
    hoursDetail: "Daily quiet hours observed",
    tariff: "Free Admission",
    tariffDetail: "Respectful donation box on site",
    roadType: "Buddhangala Forest Road",
    roadDetail: "Paved & well-maintained",
    authority: "Buddhangala Monastic Trust & Department of Archaeology",
    facilities:
      "Car park, stone staircase, quiet meditation walking paths, drinking water",
    routeDesc:
      "Est. 12 min drive from Ampara town center through scenic rural forest road",
    tips: [
      {
        title: "Summit Climb at Sunrise",
        desc: "Climb the stone steps early in the morning to enjoy cool stone underfoot and a 360-degree vista over the morning mist of Ampara.",
        icon: "sunrise",
      },
      {
        title: "Quiet Reverence",
        desc: "Maintain absolute silence near meditation shelters. Do not feed or disturb the wild spotted deer that wander the grounds.",
        icon: "trees",
      },
      {
        title: "Sun Protection",
        desc: "The rock summit warms rapidly by midday. Wear socks for walking on the sunlit rock terrace during noon hours.",
        icon: "sun",
      },
    ],
  },
  "rajagala-archaeological-site": {
    tag: "✓ 1,000-ACRE ARCHAEOLOGICAL MOUNTAIN",
    tagColor: "bg-indigo-600",
    subtitle:
      "Epic forested mountain monastery featuring over 500 ancient ruins & Arhat Mahinda's Stupa",
    aboutTitle: "About Rajagala (Rassahela) Heritage Mountain",
    aboutParagraphs: [
      "Rising over 1,000 feet above the forested valley of Bakkiella, Rajagala spans over 1,000 acres and preserves more than 500 ancient stone structures, drip-ledge caves, stone stupas, and ancient bridges. Inhabited by thousands of Buddhist monks between the 3rd century BC and 10th century AD, it was one of Asia's largest monastic universities.",
      "Rock inscriptions discovered here by archaeologists provide rare, indisputable historical evidence verifying the passing and cremation of Arhat Mahinda Thero—the royal monk from India who introduced Buddhism to Sri Lanka in the 3rd century BC.",
    ],
    quote:
      "Walking through Rajagala's shaded mountain canopy is like stepping straight into a lost monastic civilization frozen in time.",
    galleryImages: [
      {
        url: "/images/rajagala.jpg",
        caption: "🏛️ Ancient Stone Pillars & Summit Peak",
      },
      {
        url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        caption: "🌿 Mountain Forest Trail",
      },
      {
        url: "/images/deegawapi-stupa.jpg",
        caption: "🛕 Arhat Mahinda Relic Stupa",
      },
    ],
    hours: "07:00 - 16:30",
    hoursDetail: "Ticket counter closes at 15:00",
    tariff: "Archaeology Dept Ticket",
    tariffDetail: "Local & foreign rates apply",
    roadType: "Ampara-Maha Oya (A27)",
    roadDetail: "Smooth paved road to Bakkiella",
    authority: "Department of Archaeology, Sri Lanka",
    facilities:
      "Archaeological visitor reception, ticket counter, guided nature trails, parking",
    routeDesc:
      "Est. 30 min drive via A27 Highway to Bakkiella • Follow archaeological signboards",
    tips: [
      {
        title: "Hiking Preparation",
        desc: "Wear sturdy hiking or sports shoes with good grip. The mountain trail includes stone steps and natural forest inclines.",
        icon: "trees",
      },
      {
        title: "Hydration Essential",
        desc: "Carry at least 1.5 liters of drinking water per person. There are no commercial stalls once you ascend the mountain.",
        icon: "sun",
      },
      {
        title: "Allow 3-4 Hours",
        desc: "Start before 08:30 AM to comfortably explore the refectory, stone inscriptions, and Mahinda Stupa before afternoon heat.",
        icon: "sunrise",
      },
    ],
  },
  "ampara-peace-pagoda": {
    tag: "✓ TOWN PROMENADE & HARMONY SHRINE",
    tagColor: "bg-sky-500",
    subtitle:
      "Gleaming white dome built by Nipponzan Myohoji monks overlooking tranquil Ampara Tank",
    aboutTitle: "About Ampara Japanese Peace Pagoda",
    aboutParagraphs: [
      "Situated right on the rim of the town lake, this peaceful monument was built by the Japanese Buddhist monk Ven. Nichidatsu Fujii to radiate harmony and international goodwill. The surrounding park promenade offers tranquil sunset strolls, with views of birds nesting on the placid tank water.",
      "The stupa features four exquisite golden reliefs depicting key episodes from the life of the Buddha, and its whitewashed terrace provides a breezy vantage point overlooking water lilies and fishermen's outrigger boats.",
    ],
    quote:
      "Reflections of the gleaming stupa glistening across the tank water at twilight make it the town's most peaceful promenade.",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        caption: "🕊️ Gleaming White Stupa",
      },
      { url: "/images/login-bg.jpg", caption: "🌅 Lake Tank Sunset" },
      { url: "/images/hero-bg.jpg", caption: "🚶 Promenade Walking Track" },
    ],
    hours: "06:00 - 20:30",
    hoursDetail: "Illuminated beautifully at dusk",
    tariff: "Free Admission",
    tariffDetail: "Public heritage park",
    roadType: "Town Lake Promenade",
    roadDetail: "5 mins from clock tower",
    authority: "Nipponzan Myohoji Order & Ampara Urban Council",
    facilities:
      "Paved walking promenade, lake viewing benches, parking, evening lighting",
    routeDesc:
      "Est. 5 min drive or 15 min walk from Ampara Clock Tower along Lake Road",
    tips: [
      {
        title: "Sunset Promenade",
        desc: "Visit at 17:15 to watch the golden sunset over the lake water followed by the stupa's night illumination.",
        icon: "sunrise",
      },
      {
        title: "Lake Birdwatching",
        desc: "Great egrets, spot-billed pelicans, and kingfishers frequently perch on the dead trees in the lake tank.",
        icon: "trees",
      },
      {
        title: "Accessible to All",
        desc: "Level paved pathways make this site easily accessible for families, children, and elderly travelers.",
        icon: "sun",
      },
    ],
  },
  "panama-kudumbigala": {
    tag: "✓ MONOLITHIC MOUNTAIN SANCTUARY",
    tagColor: "bg-amber-700",
    subtitle:
      "Towering granite boulder peaks rising above jungle canopy with unique cylindrical stupa",
    aboutTitle: "About Kudumbigala Forest Sanctuary",
    aboutParagraphs: [
      "Rising majestically above the arid plains on the frontier of Yala East and Panama, Kudumbigala is an ancient monastic sanctuary surrounded by monolithic granite boulder peaks. It is famous for hosting Sri Lanka's only surviving ancient cylindrical stupa ('Belumgala Stupa') constructed atop a dizzying boulder peak.",
      "Dating back to the 3rd century BC, more than 200 caves with ancient Brahmi inscriptions were used by forest-dwelling meditating monks. The summit affords awe-inspiring 360-degree panoramic views of pristine jungle stretching to the Indian Ocean.",
    ],
    quote:
      "Standing atop Belumgala peak at dawn as the sun rises over the horizon is an unforgettable sight of wild Sri Lanka.",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
        caption: "⛰️ Monolithic Granite Peak",
      },
      {
        url: "/images/gal-oya-elephants.jpg",
        caption: "🌿 Dry-Zone Wilderness",
      },
      {
        url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
        caption: "🛕 Belumgala Summit Stupa",
      },
    ],
    hours: "06:00 - 17:00",
    hoursDetail: "Daylight access only",
    tariff: "Free Admission",
    tariffDetail: "Sanctuary checkpost sign-in",
    roadType: "Panama - Okanda Road",
    roadDetail: "Gravel road, SUV or van advised",
    authority: "Forest Department & Kudumbigala Hermitage Trust",
    facilities:
      "Natural rock staircase, rainwater ponds, hermitage reception, rustic parking",
    routeDesc:
      "Accessible via Panama towards Okanda • Scenic gravel route across wildlife territory",
    tips: [
      {
        title: "Early Morning Ascent",
        desc: "Ascend Belumgala before 09:00 AM to avoid extreme midday heat on the bare granite rocks.",
        icon: "sunrise",
      },
      {
        title: "Wildlife Caution",
        desc: "Wild elephants and sloth bears inhabit the surrounding forest. Stay strictly on marked pilgrim footpaths.",
        icon: "trees",
      },
      {
        title: "Carry Hydration",
        desc: "Bring sufficient drinking water and wear high-grip shoes for ascending the granite summit.",
        icon: "sun",
      },
    ],
  },
  "muhudu-maha-viharaya": {
    tag: "✓ COASTAL ARCHAEOLOGICAL HERITAGE",
    tagColor: "bg-cyan-600",
    subtitle:
      "Historic beachside temple marking where Queen Viharamahadevi landed • 2nd Century BC",
    aboutTitle: "About Muhudu Maha Viharaya & Dunes",
    aboutParagraphs: [
      "Standing proudly amid shifting sand dunes right on the shoreline of Pottuvil, Muhudu Maha Viharaya was built over 2,000 years ago by King Kavan Tissa to commemorate the legendary landing of Princess Viharamahadevi. The site features stone pillars, ancient foundations, and magnificent carved standing Buddha statues emerging dramatically against the backdrop of ocean surf.",
      "The temple remains an active spiritual sanctuary where the chanting of monks mingles with the rhythm of the waves, offering travelers a striking combination of archaeological royalty and pristine coastal scenery.",
    ],
    quote:
      "Ancient stone Buddha statues gazing calmly over the ocean waves with coastal breezes whistling through the sand dunes.",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        caption: "🏖️ Pottuvil Coastal Dunes",
      },
      {
        url: "/images/login-bg.jpg",
        caption: "🗿 Ancient Standing Buddha Statues",
      },
      {
        url: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        caption: "🌊 Oceanfront Temple Enclosure",
      },
    ],
    hours: "06:00 - 18:30",
    hoursDetail: "Open daily for visitors",
    tariff: "Free Admission",
    tariffDetail: "Pilgrim donations welcome",
    roadType: "Pottuvil Beach Road",
    roadDetail: "Smooth paved road all vehicles",
    authority: "Department of Archaeology, Sri Lanka",
    facilities:
      "Dune walkways, stone enclosure, vehicle parking, nearby beach access",
    routeDesc:
      "Located on the Pottuvil coastal strip • Smooth asphalt drive via A4 Highway",
    tips: [
      {
        title: "Dune Walking Shoes",
        desc: "Sand can get hot in the midday sun. Remove footwear at the stone threshold of the stupa.",
        icon: "trees",
      },
      {
        title: "Sunset Photography",
        desc: "Late afternoon light casts striking shadows of the stone Buddha statues across the golden dunes.",
        icon: "sunrise",
      },
      {
        title: "Respect Sacred Ruins",
        desc: "Do not climb or sit on ancient stone columns or carved moonstones surrounding the shrine.",
        icon: "sun",
      },
    ],
  },
  "arugam-bay-beach": {
    tag: "✓ WORLD-RENOWNED SURF HAVEN",
    tagColor: "bg-cyan-500",
    subtitle:
      "Crescent golden beach renowned for international point-break surf & lagoon sunsets",
    aboutTitle: "About Arugam Bay Beach & Surf Point",
    aboutParagraphs: [
      "Arugam Bay is Sri Lanka's internationally acclaimed surfing capital, sitting on the southern rim of Ampara district's Indian Ocean coastline. Famed for its consistent right-hand point breaks, powdery golden sand, and vibrant coastal culture, it attracts ocean enthusiasts from across the globe between May and October.",
      "Beyond the world-class swell, the area offers tranquil outrigger boat safaris in the adjacent Pottuvil and Kottukal lagoons, where visitors regularly observe sea eagles, monitor lizards, and wild elephants drinking at water's edge at sunset.",
    ],
    quote:
      "Golden sands stretching into azure ocean swells — an unforgettable coastal haven in Sri Lanka's eastern frontier.",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        caption: "🏄 Main Point Surfing Break",
      },
      {
        url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80",
        caption: "🌅 Golden Hour Ocean Sunset",
      },
      { url: "/images/login-bg.jpg", caption: "🛶 Lagoon Eco-Safari Waters" },
    ],
    hours: "05:00 - 22:00",
    hoursDetail: "Surfing best early morning & late afternoon",
    tariff: "Free Beach Access",
    tariffDetail: "Surfboard rentals from LKR 1,500/day",
    roadType: "A4 Coastal Highway",
    roadDetail: "Smooth paved road all vehicles",
    authority:
      "Sri Lanka Tourism Development Authority (SLTDA) & Pottuvil Pradeshiya Sabha",
    facilities:
      "Surf rental shacks, beachfront cafes, lifeguard tower, showers, scooter rentals",
    routeDesc:
      "Accessible via A4 highway • Direct 40-50 min drive through scenic paddy landscapes",
    tips: [
      {
        title: "Best Surf Swell Season",
        desc: "Prime surfing season runs from May to October when offshore winds produce clean, consistent peelers.",
        icon: "sunrise",
      },
      {
        title: "Lagoon Safari at Twilight",
        desc: "Book a local outrigger canoe ride in Pottuvil Lagoon at 16:30 for birdwatching and wild elephant sightings.",
        icon: "trees",
      },
      {
        title: "Ocean Safety Notice",
        desc: "Respect local surfing etiquette and watch for coral reefs at Main Point during low tide.",
        icon: "sun",
      },
    ],
  },
  "rambakan-oya-cascade": {
    tag: "✓ HISTORIC CANOPY CASCADE & SLUICE",
    tagColor: "bg-blue-600",
    subtitle:
      "Scenic rocky rapids & 2,000-year-old ancient stone slab engineering sluice",
    aboutTitle: "About Rambakan Oya Forest Cascade",
    aboutParagraphs: [
      "Deep in the forested hinterlands of Maha Oya, Rambakan Oya features natural water cascades cascading over ancient granite bedrock. It is famed for its 2,000-year-old monolithic stone slab sluice—an astonishing feat of ancient hydraulic engineering with interlocking rock boulders built to withstand heavy monsoonal river flows.",
      "Surrounded by virgin dry-zone forests, visitors can swim in naturally sculpted cool freshwater rock pools, explore archaeological excavations, and enjoy peaceful picnics under tall kumbuk and mee trees.",
    ],
    quote:
      "The thunder of cool freshwater gushing through ancient rock sluices that have stood firm for two millennia.",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80",
        caption: "💦 Rambakan Oya Rapids",
      },
      {
        url: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80",
        caption: "🌿 Forest Shaded Canopy",
      },
      { url: "/images/hero-bg.jpg", caption: "🏛️ Ancient Stone Slab Sluice" },
    ],
    hours: "06:30 - 18:00",
    hoursDetail: "Daytime river bathing allowed in marked safe zones",
    tariff: "Free Admission",
    tariffDetail: "Archaeological heritage park",
    roadType: "Ampara-Maha Oya Road (A27)",
    roadDetail: "Paved highway followed by gravel access",
    authority: "Department of Archaeology & Irrigation Department",
    facilities:
      "Rest huts, vehicle parking, stone steps down to the water, safety railings",
    routeDesc: "Est. 30-35 min drive via A27 highway towards Maha Oya",
    tips: [
      {
        title: "Safe Bathing Advice",
        desc: "Bathe only in calm, designated natural pools. Exercise caution during monsoon periods when water volume rises.",
        icon: "trees",
      },
      {
        title: "Visit Ancient Sluice",
        desc: "Do not miss the archaeological preserved stone sluice located 300m upstream of the modern dam.",
        icon: "sunrise",
      },
      {
        title: "Pack Water & Snacks",
        desc: "No large supermarkets nearby; carry your drinking water and refreshments from town.",
        icon: "sun",
      },
    ],
  },
  "magul-maha-viharaya": {
    tag: "✓ 5TH CENTURY ROYAL MONASTERY",
    tagColor: "bg-purple-600",
    subtitle:
      "Historic royal marriage pavilion of King Kavantissa & Queen Viharamahadevi",
    aboutTitle: "About Magul Maha Viharaya",
    aboutParagraphs: [
      "Constructed in the 5th century BC, Magul Maha Viharaya is steeped in legendary romance: it is recorded as the consecrated royal site where King Kavan Tissa married Princess Viharamahadevi of Ruhuna.",
      "The complex contains Sri Lanka's only moonstone depicting carved mahouts atop elephants, alongside an ancient Bodhigara, stone stupa, pond, and extensive stone pillar ruins set within peaceful dry-zone woodlands.",
    ],
    quote:
      "A timeless royal sanctuary where the romance of ancient Ruhuna echoes through stone ruins and sacred Bo trees.",
    galleryImages: [
      {
        url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        caption: "🛕 Royal Stone Pavilion",
      },
      {
        url: "/images/deegawapi-stupa.jpg",
        caption: "🐘 Unique Elephant Moonstone",
      },
      { url: "/images/login-bg.jpg", caption: "🌿 Forest Monastery Grounds" },
    ],
    hours: "06:30 - 18:00",
    hoursDetail: "Open daily for heritage pilgrims",
    tariff: "Archaeological Department Ticket",
    tariffDetail: "Local & foreign rates apply",
    roadType: "A4 Highway towards Lahugala",
    roadDetail: "Smooth paved road all vehicles",
    authority: "Department of Archaeology, Sri Lanka",
    facilities:
      "Archaeological information kiosk, parking, shaded rest pavilions, water",
    routeDesc:
      "Est. 30 min drive along A4 Highway towards Lahugala National Park",
    tips: [
      {
        title: "Admire the Moonstone",
        desc: "Take time to study the moonstone at the main entrance, unique for portraying riders sitting atop carved elephants.",
        icon: "trees",
      },
      {
        title: "Combine with Lahugala",
        desc: "Pair your morning visit to Magul Maha Viharaya with an afternoon elephant watch at adjacent Lahugala Kitulana.",
        icon: "sunrise",
      },
      {
        title: "Sacred Respect",
        desc: "Dress respectfully with shoulders and knees covered when walking within the sacred stupa and Bodhigara perimeter.",
        icon: "sun",
      },
    ],
  },
  "kumana-national-park": {
    tag: "✓ PREMIER MIGRATORY BIRD WETLAND",
    tagColor: "bg-emerald-700",
    subtitle:
      "200-hectare mangrove swamp sanctuary sheltering over 255 species of rare water birds",
    aboutTitle: "About Kumana National Park (Yala East)",
    aboutParagraphs: [
      "Kumana National Park, historically known as Yala East, is celebrated as one of the most critical bird nesting grounds in South Asia. Its 200-hectare mangrove swamp (Kumana Villu) teems with thousands of migratory and resident aquatic birds between May and July.",
      "Beyond its world-class avifauna, the park's dense thorn scrub and granite outcrops shelter wild Asian elephants, elusive leopards, sloth bears, marsh crocodiles, and wild boars.",
    ],
    quote:
      "Where the sky comes alive with thousands of nesting waterbirds above emerald lagoons and pristine wild frontiers.",
    galleryImages: [
      {
        url: "/images/gal-oya-elephants.jpg",
        caption: "🦩 Kumana Villu Waterbirds",
      },
      { url: "/images/hero-bg.jpg", caption: "🌊 Coastal Mangrove Safari" },
      {
        url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        caption: "🐆 Wilderness Tracks",
      },
    ],
    hours: "06:00 - 18:00",
    hoursDetail: "Safari jeeps enter 06:00 - 10:00 & 14:30 - 18:00",
    tariff: "DWC Park Entrance Ticket",
    tariffDetail: "Safari jeep hire available at Okanda gate",
    roadType: "Okanda Gate Jeep Trail",
    roadDetail: "4WD Safari Jeep recommended",
    authority: "Department of Wildlife Conservation (DWC), Sri Lanka",
    facilities:
      "Wildlife ticket counter at Okanda, ranger briefings, safari track signboards",
    routeDesc:
      "Accessible via Panama towards Okanda Gate • 4WD Safari jeep recommended",
    tips: [
      {
        title: "Prime Bird Nesting Season",
        desc: "Visit between May and July to see immense colonies of Painted Storks, Spoonbills, and Herons nesting at Kumana Villu.",
        icon: "sunrise",
      },
      {
        title: "Safari Gear",
        desc: "High-magnification binoculars and zoom telephoto lenses (300mm+) are essential for bird and wildlife viewing.",
        icon: "sun",
      },
      {
        title: "Ranger Instructions",
        desc: "Always remain inside your safari jeep; wildlife tracks are active with wild elephants and sloth bears.",
        icon: "trees",
      },
    ],
  },
};

function AttractionDetailContent() {
  const params = useParams();
  const id = (params?.id as string) || "senanayake-samudraya";

  // Match attraction or default to first
  const attraction =
    amparaAttractions.find((a) => a.id === id) || amparaAttractions[0];

  // Match rich profile or construct fallback from attraction properties
  const profile: AttractionProfile = ATTRACTION_PROFILES[attraction.id] || {
    tag: `✓ ${attraction.category.toUpperCase()} LANDMARK`,
    tagColor: "bg-[#0084d1]",
    subtitle: `${attraction.description.slice(0, 80)}...`,
    aboutTitle: `About ${attraction.name}`,
    aboutParagraphs: [
      attraction.description,
      `Located at ${attraction.location}, this site is positioned within ${attraction.distanceKm} km of Ampara town center, making it an essential highlight of the 25km discovery zone.`,
    ],
    quote: `A serene highlight of the 25km Ampara discovery horizon, showcasing ${attraction.name} in its natural splendour.`,
    galleryImages: [
      { url: attraction.image, caption: `📍 ${attraction.name}` },
      { url: "/images/login-bg.jpg", caption: "🌅 Scenic Regional View" },
      { url: "/images/hero-bg.jpg", caption: "🍃 Surrounding Horizon" },
    ],
    hours: "06:00 - 18:30",
    hoursDetail: "Open daily for visitors",
    tariff: "Free / Local Entry",
    tariffDetail: "Standard visitor tariff",
    roadType: "Regional Road",
    roadDetail: "Accessible by car or van",
    authority: "Sri Lanka Tourism & Local Regional Administration",
    facilities: "Vehicle parking, visitor access, scenic vantage points",
    routeDesc: `Est. ${Math.round(attraction.distanceKm * 1.2)} min drive from Ampara town center`,
    tips: [
      {
        title: "Optimal Visit Timing",
        desc: "Early morning or late afternoon provides the most comfortable temperatures and best natural light.",
        icon: "sunrise",
      },
      {
        title: "Preserve Cleanliness",
        desc: "Follow the 'Leave No Trace' eco guidelines by taking all waste and plastics back with you.",
        icon: "trees",
      },
      {
        title: "Recommended Duration",
        desc: `Allow approximately ${attraction.duration} to fully explore the destination and surroundings.`,
        icon: "sun",
      },
    ],
  };

  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<"morning" | "afternoon">(
    "morning",
  );
  const [isAddedToPlan, setIsAddedToPlan] = useState(true);
  const [isPlanDrawerOpen, setIsPlanDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [visitPlan, setVisitPlan] = useState<Attraction[]>([
    amparaAttractions[0],
    amparaAttractions[3],
  ]);

  const handleTogglePlan = (attr: Attraction) => {
    if (visitPlan.some((p) => p.id === attr.id)) {
      setVisitPlan(visitPlan.filter((p) => p.id !== attr.id));
      if (attr.id === attraction.id) setIsAddedToPlan(false);
    } else {
      setVisitPlan([...visitPlan, attr]);
      if (attr.id === attraction.id) setIsAddedToPlan(true);
    }
  };

  // Nearby attractions: filter out current attraction and show other top 3
  const nearbyPlaces = amparaAttractions
    .filter((a) => a.id !== attraction.id)
    .slice(0, 3)
    .map((item) => ({
      id: item.id,
      tag: item.category.toUpperCase(),
      tagColor: "bg-[#0084d1] text-white",
      distance: `${item.distanceKm} km away`,
      rating: item.rating,
      reviews: `${item.reviewsCount}+ reviews`,
      title: item.name,
      desc: item.description,
      image: item.image,
    }));

  return (
    <div className="min-h-screen bg-[#f3f6fa] flex flex-col justify-between font-sans text-slate-800 antialiased selection:bg-[#0284c7] selection:text-white">
      {/* 1. Header Bar */}
      {/* 2. Top Breadcrumb Bar */}
      <div className="w-full px-4 sm:px-8 py-3">
        <div className="max-w-[1370px] mx-auto flex items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex min-w-0 items-center gap-2">
            <Link href="/" className="hover:text-[#0084d1]">
              Home
            </Link>
            <span>/</span>
            <Link href="/#explore" className="hover:text-[#0084d1]">
              Explore
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate max-w-[180px] sm:max-w-none">
              {attraction.name}
            </span>
          </div>

          <Link
            href="/#explore"
            className="inline-flex items-center gap-1 text-slate-600 hover:text-[#0084d1] font-bold transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Explore Directory</span>
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="!max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 space-y-6 flex-1">
        {/* 3. Hero Visual Gallery Stack */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:items-start">
          <div className="lg:col-span-7 space-y-4">
            {/* Main Large Hero Banner (Left 8 cols) */}
            <div className="relative rounded-3xl overflow-hidden min-h-[380px] sm:min-h-[460px] flex flex-col justify-between p-6 sm:p-8 border border-slate-200/80 shadow-md group">
              {/* Background Image - Specific to attraction */}
              <Image
                src={attraction.image}
                alt={attraction.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-center transform group-hover:scale-102 transition-transform duration-1000 ease-out"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/50" />

              {/* Top Bar Badges & Actions */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                    <Compass className="w-3.5 h-3.5 text-sky-400" />
                    <span className="uppercase">
                      {attraction.radialZone} RING
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-sky-300 text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{attraction.distanceKm} km from Ampara Town</span>
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all cursor-pointer ${
                      isFavorite
                        ? "bg-red-500/90 border-red-400 text-white"
                        : "bg-slate-900/50 border-white/20 text-white hover:bg-white hover:text-red-500"
                    }`}
                    title="Favorite"
                  >
                    <Heart
                      className={`w-4 h-4 ${isFavorite ? "fill-white" : ""}`}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (
                        typeof window !== "undefined" &&
                        navigator.clipboard
                      ) {
                        navigator.clipboard.writeText(window.location.href);
                        alert("Destination link copied to clipboard!");
                      }
                    }}
                    className="w-9 h-9 rounded-full bg-slate-900/50 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-slate-900 flex items-center justify-center transition-all cursor-pointer"
                    title="Share destination"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Title & Badges */}
              <div className="relative z-10 space-y-2 mt-auto pt-16">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 ${profile.tagColor} text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs`}
                  >
                    {profile.tag}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-black/60 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>
                      {attraction.rating} ({attraction.reviewsCount}+ Reviews)
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-1 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/10">
                    <Clock className="w-3 h-3 text-sky-400" />
                    <span>{attraction.duration}</span>
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                  {attraction.name}
                </h1>

                <p className="text-slate-200 text-xs sm:text-sm font-medium">
                  {profile.subtitle}
                </p>
              </div>
            </div>

            {/* Supporting Gallery */}
            <div className="grid grid-cols-2 gap-3">
              {profile.galleryImages.slice(0, 2).map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-28 sm:h-36 rounded-2xl overflow-hidden border border-slate-200/80 group"
                >
                  <Image
                    src={img.url}
                    alt={img.caption}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute bottom-2 left-3 text-[11px] font-bold text-white flex items-center gap-1 drop-shadow-sm">
                    {img.caption}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* About section beside the image gallery */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-lg font-black text-slate-900">
              <Info className="w-5 h-5 text-[#0084d1]" />
              <h2>{profile.aboutTitle}</h2>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3">
              {profile.aboutParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="bg-sky-50/70 border-l-4 border-[#0084d1] rounded-r-2xl p-4 text-xs italic text-slate-700 leading-relaxed font-medium">
              &ldquo;{profile.quote}&rdquo;
            </div>

            <div className="pt-2">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Featured Highlights
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {attraction.highlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5 text-xs font-semibold text-slate-800 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#0084d1] shrink-0" />
                    <span className="truncate">{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Action Bar & 5 Key Metric Cards */}
        <section className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-150">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#0084d1] mb-1">
                <span className="w-2 h-2 rounded-full bg-[#0084d1]" />
                <span>25KM RADIAL DESTINATION HIGHLIGHTS</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {attraction.description}
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => handleTogglePlan(attraction)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
                  isAddedToPlan
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-[#0084d1] hover:bg-[#0070b3] text-white"
                }`}
              >
                {isAddedToPlan ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Visit Plan</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>+ Add to Visit Plan</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("location-map");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-4 py-2.5 rounded-full bg-sky-50 hover:bg-sky-100 text-[#0084d1] border border-sky-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>View on Map</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  window.open(
                    `https://maps.google.com/?q=${encodeURIComponent(attraction.name + " " + attraction.location)}`,
                    "_blank",
                  );
                }}
                className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions</span>
              </button>
            </div>
          </div>

          {/* 5 Key Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {/* Metric 1 */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0084d1] flex items-center justify-center shrink-0">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 leading-tight">
                  {attraction.distanceKm} km
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  From Town
                </div>
                <div className="text-[9px] text-slate-400">Clock Tower 0km</div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0084d1] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 leading-tight truncate max-w-[90px]">
                  {profile.hours}
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Visiting Hours
                </div>
                <div className="text-[9px] text-slate-400 truncate max-w-[90px]">
                  Daylight Access
                </div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 leading-tight truncate max-w-[90px]">
                  {profile.tariff}
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Tariff / Fee
                </div>
                <div className="text-[9px] text-slate-400 truncate max-w-[90px]">
                  {profile.tariffDetail}
                </div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0084d1] flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 leading-tight">
                  {attraction.duration}
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Recommended
                </div>
                <div className="text-[9px] text-slate-400">Duration</div>
              </div>
            </div>

            {/* Metric 5 */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-900 leading-tight truncate max-w-[90px]">
                  {profile.roadType}
                </div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Road Access
                </div>
                <div className="text-[9px] text-slate-400 truncate max-w-[90px]">
                  Direct Access
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. 2-Column Main Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: About & Field Tips (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Visitor Guide & Field Tips */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-slate-900">
                  Visitor Guide &amp; Field Tips
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">
                  Updated Season 2024 / 2025
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {profile.tips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-xl bg-sky-100 text-[#0084d1] flex items-center justify-center mb-2">
                        {tip.icon === "sunrise" ? (
                          <Sunrise className="w-4 h-4" />
                        ) : tip.icon === "trees" ? (
                          <Trees className="w-4 h-4" />
                        ) : (
                          <Sun className="w-4 h-4" />
                        )}
                      </div>
                      <div className="text-xs font-bold text-slate-900 leading-snug">
                        {tip.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                        {tip.desc}
                      </div>
                    </div>
                    <div className="text-[10px] font-bold text-[#0084d1] pt-2">
                      Explorer Guideline →
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Add to Plan & Practical Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Add to Your One-Day Plan Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                  TRIP SEQUENCING
                </span>
                <span className="text-[10px] font-bold text-[#0084d1] bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                  25KM OPTIMIZED
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  Add to Your One-Day Plan
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Combine {attraction.name} seamlessly with other attractions
                  within the 25km radius.
                </p>
              </div>

              {/* Time Slot Selector */}
              <div>
                <div className="text-[11px] font-bold text-slate-700 uppercase mb-2">
                  Select Preferred Slot
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedSlot("morning")}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedSlot === "morning"
                        ? "bg-sky-50 border-[#0084d1] ring-2 ring-sky-100 text-slate-900"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center gap-1">
                      <span>🌅 Morning</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      07:00 AM - 11:00 AM
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedSlot("afternoon")}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedSlot === "afternoon"
                        ? "bg-sky-50 border-[#0084d1] ring-2 ring-sky-100 text-slate-900"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center gap-1">
                      <span>🌤 Afternoon</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      02:30 PM - 05:45 PM
                    </div>
                  </button>
                </div>
              </div>

              {/* Transit & Stay Info */}
              <div className="bg-slate-50 rounded-2xl p-3.5 space-y-2 text-xs border border-slate-200/80">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    <Car className="w-3.5 h-3.5" /> Distance from center:
                  </span>
                  <span className="font-bold text-slate-800">
                    {attraction.distanceKm} km
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Recommended stay:
                  </span>
                  <span className="font-bold text-slate-800">
                    {attraction.duration}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 mb-1">
                    <span>Radial Horizon Zone</span>
                    <span className="text-[#0084d1] font-bold">
                      {attraction.radialZone}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#0084d1] h-1.5 rounded-full"
                      style={{
                        width: `${Math.min(100, (attraction.distanceKm / 25) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Add Stop CTA */}
              <button
                type="button"
                onClick={() => handleTogglePlan(attraction)}
                className="w-full bg-[#0084d1] hover:bg-[#0070b3] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>
                  {isAddedToPlan
                    ? "Stop Added to Plan"
                    : "Add This Stop to Plan"}
                </span>
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsPlanDrawerOpen(true)}
                  className="text-xs font-bold text-[#0084d1] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Open My Planner Timeline</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Location & Access Map Section */}
        <section
          id="location-map"
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-[#0084d1]">
                25 KM PHYSICAL RADIAL HORIZON
              </div>
              <h3 className="text-xl font-black text-slate-900">
                Location &amp; Access Navigation
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Direct Navigable Route</span>
            </span>
          </div>

          {/* Map Graphic Box */}
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-200 bg-[#e5f3f0]">
            <svg
              className="w-full h-full"
              viewBox="0 0 800 400"
              preserveAspectRatio="xMidYMid slice"
            >
              {/* Regional Terrain Water & Land */}
              <path
                d="M 120 160 Q 250 110 380 150 T 560 200 Q 660 250 730 210 L 790 330 Q 570 390 390 350 Q 210 390 100 290 Z"
                fill="#bbf0f7"
                stroke="#67e8f9"
                strokeWidth="3"
              />
              <circle cx="200" cy="220" r="140" fill="#dcfce7" opacity="0.6" />
              <circle cx="520" cy="250" r="160" fill="#dcfce7" opacity="0.6" />

              {/* Road lines */}
              <path
                d="M 80 80 Q 260 140 450 190 T 700 240"
                stroke="#f97316"
                strokeWidth="4"
                strokeDasharray="6 4"
                fill="none"
              />
              <path
                d="M 100 350 Q 280 280 460 210 T 720 120"
                stroke="#0284c7"
                strokeWidth="5"
                fill="none"
              />

              {/* Destination Pin */}
              <g transform="translate(460, 200)">
                <circle
                  cx="0"
                  cy="0"
                  r="10"
                  fill="#ef4444"
                  className="animate-ping"
                  opacity="0.75"
                />
                <circle cx="0" cy="0" r="8" fill="#ef4444" />
                <circle cx="0" cy="0" r="3" fill="#ffffff" />
                <text
                  x="14"
                  y="5"
                  fill="#0f172a"
                  fontSize="13"
                  fontWeight="900"
                >
                  {attraction.name}
                </text>
              </g>

              {/* Ampara Town Departure Pin */}
              <g transform="translate(100, 350)">
                <circle cx="0" cy="0" r="8" fill="#0284c7" />
                <circle cx="0" cy="0" r="3" fill="#ffffff" />
                <text
                  x="15"
                  y="5"
                  fill="#0f172a"
                  fontSize="12"
                  fontWeight="bold"
                >
                  Ampara Clock Tower (0.0 km)
                </text>
              </g>
            </svg>

            {/* Bottom floating route badge */}
            <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200/90 shadow-lg flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0084d1]" />
                  <span>
                    {attraction.distanceKm} km from Ampara Clock Tower
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  {profile.routeDesc}
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  window.open(
                    `https://maps.google.com/?q=${encodeURIComponent(attraction.name + " " + attraction.location)}`,
                    "_blank",
                  );
                }}
                className="bg-[#0084d1] hover:bg-[#0070b3] text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs cursor-pointer shrink-0"
              >
                Google Maps GPS
              </button>
            </div>
          </div>

          {/* 3 Waypoint Segments */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-[#0084d1] flex items-center justify-center font-bold text-xs">
                1
              </span>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Ampara Town Hub
                </div>
                <div className="text-[10px] text-slate-500">
                  0.0 km departure point
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-sky-100 text-[#0084d1] flex items-center justify-center font-bold text-xs">
                2
              </span>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  {attraction.location}
                </div>
                <div className="text-[10px] text-slate-500">
                  {attraction.radialZone} sector
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                3
              </span>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  {attraction.name}
                </div>
                <div className="text-[10px] text-slate-500">
                  {attraction.distanceKm} km destination
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. More Places to Explore Nearby Section */}
        <section className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-[10px] font-black uppercase tracking-wider text-[#0084d1]">
                ⭐ 25KM RADIAL CIRCUIT
              </div>
              <h3 className="text-xl font-black text-slate-900">
                More Places to Explore Nearby
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Coordinate seamless, multi-stop itineraries reachable within a
                20-30 minute drive.
              </p>
            </div>

            <Link
              href="/#explore"
              className="text-xs font-bold text-[#0084d1] hover:underline inline-flex items-center gap-1 shrink-0"
            >
              <span>Explore All 25km Destinations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 3 Specific Nearby Attraction Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {nearbyPlaces.map((place) => (
              <div
                key={place.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Image & Badges */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={place.image}
                    alt={place.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs ${place.tagColor}`}
                    >
                      {place.tag}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-slate-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-xs">
                    {place.distance}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500 mb-1.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{place.rating}</span>
                      <span className="text-slate-400 font-normal">
                        ({place.reviews})
                      </span>
                    </div>

                    <Link
                      href={`/attraction/${place.id}`}
                      className="text-base font-black text-slate-900 group-hover:text-[#0084d1] transition-colors leading-snug block mb-1.5"
                    >
                      {place.title}
                    </Link>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {place.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href={`/attraction/${place.id}`}
                      className="text-xs font-bold text-slate-700 group-hover:text-[#0084d1] transition-colors"
                    >
                      View Details
                    </Link>

                    <Link
                      href={`/attraction/${place.id}`}
                      className="w-7 h-7 rounded-full bg-sky-100 text-[#0084d1] group-hover:bg-[#0084d1] group-hover:text-white flex items-center justify-center transition-all"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Regional Respect Banner */}
        <section className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-emerald-950">
                Visiting Sacred &amp; Ecological Sites in Ampara
              </div>
              <div className="text-[11px] sm:text-xs text-emerald-800/90 mt-0.5">
                Observe modest dress code at temples, zero plastic littering,
                and 50m safe buffer distance from wildlife.
              </div>
            </div>
          </div>

          <Link
            href="/cultural-guidelines"
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shrink-0 text-center"
          >
            Read Cultural Guidelines
          </Link>
        </section>
      </main>

      {/* 9. Slide-Over Plan Drawer */}
      <VisitPlanDrawer
        isOpen={isPlanDrawerOpen}
        onClose={() => setIsPlanDrawerOpen(false)}
        visitPlan={visitPlan}
        onRemove={(remId) =>
          setVisitPlan(visitPlan.filter((p) => p.id !== remId))
        }
        onClear={() => setVisitPlan([])}
      />

      {/* 10. Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

    </div>
  );
}

export default function AttractionDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f3f6fa] flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-[#0084d1] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <div className="text-sm font-bold text-slate-700">
              Loading Destination Details...
            </div>
          </div>
        </div>
      }
    >
      <AttractionDetailContent />
    </Suspense>
  );
}
