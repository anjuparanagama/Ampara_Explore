import * as nextEnv from "@next/env";
import mysql from "mysql2/promise";
import { randomUUID } from "node:crypto";
import { amparaAttractions, interestCategories } from "../data/amparaData";

nextEnv.loadEnvConfig(process.cwd());

if (!process.env.DB_URL) throw new Error("DB_URL is not configured.");

const url = new URL(process.env.DB_URL);
const pool = mysql.createPool({
  host: url.hostname,
  port: Number(url.port || 4000),
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.replace(/^\//, "") || undefined,
  ssl: { rejectUnauthorized: true },
});

interface AttractionDetailSeed {
  image: string;
  galleryImages: { url: string; caption: string }[];
  subtitle: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  quote: string;
  tips: { title: string; desc: string; icon: "sunrise" | "trees" | "sun" }[];
  routeDesc: string;
}

const ATTRACTION_DETAILS: Record<string, AttractionDetailSeed> = {
  "senanayake-samudraya": {
    image: "/images/hero-bg.jpg",
    galleryImages: [
      { url: "/images/hero-bg.jpg", caption: "🌅 Reservoir Sunset" },
      { url: "/images/login-bg.jpg", caption: "🛶 Outrigger Lagoon Views" },
    ],
    subtitle: "The monumental inland sea of independent Sri Lanka • Built 1949",
    aboutTitle: "About the Inland Sea",
    aboutParagraphs: [
      "Engineered in 1949 as the crowning achievement of the Gal Oya Development Scheme spearheaded by independent Sri Lanka's first Prime Minister, Rt. Hon. D.S. Senanayake, this reservoir covers an astounding water spread of over 7,800 hectares (nearly 77 square kilometers). Far more than an irrigation masterwork, it endured essential civil engineering principles that transformed the parched scrub plains of the East into a flourishing sanctuary.",
      "What makes Senanayake Samudraya globally singular is its status as Sri Lanka's premier open-water boat safari destination. Hemmed in by the jagged granite silhouette of Mount Inginiyagala and Dimbula, peaceful motorized dinghies navigate tranquil lake channels where wild Asian elephants swim between wooded islets. In the serene morning mist, rare White-bellied Sea Eagles dive into the mirrors of water, while Native cormorants dry their plumage atop petrified forest trunks that rise gracefully from the deep basin.",
    ],
    quote:
      "Standing on the Inginiyagala bund as dusk gathers is akin to gazing over an ocean cradled in the arms of ancient mountains — absolute calm unbroken by modern noise.",
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
    routeDesc: "Est. 15-20 min drive via Inginiyagala Road (B350 / A25) • Smooth asphalt",
  },
  "gal-oya-national-park": {
    image: "/images/gal-oya-elephants.jpg",
    galleryImages: [
      { url: "/images/gal-oya-elephants.jpg", caption: "🐘 Swimming Elephant Herd" },
      { url: "/images/hero-bg.jpg", caption: "🌊 Lake Safari Channel" },
    ],
    subtitle: "Sri Lanka's only national park featuring boat safaris with swimming wild elephants",
    aboutTitle: "About Gal Oya National Park",
    aboutParagraphs: [
      "Established in 1954 to safeguard the rich catchment basin of the Senanayake Samudraya, Gal Oya National Park encompasses over 25,900 hectares of dense evergreen and savannah forest. It is celebrated worldwide for its iconic swimming wild elephant herds, who migrate between islands in the reservoir.",
      "The park also protects herds of axis deer, leopards, sloth bears, water buffalo, and 150 species of birds including the rare Lesser Adjutant and Brahminy Kite. Visitors can experience both motorized boat safaris and guided jungle treks led by indigenous Vedda guides.",
    ],
    quote:
      "Witnessing a herd of wild elephants swimming serenely across mist-covered lake waters against the backdrop of untouched jungle is one of nature's greatest spectacles.",
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
    routeDesc: "Est. 25 min drive from Ampara town to Inginiyagala Park Headquarters • Paved route",
  },
  "deegawapi-stupa": {
    image: "/images/deegawapi-stupa.jpg",
    galleryImages: [
      { url: "/images/deegawapi-stupa.jpg", caption: "🛕 Historic Sacred Stupa" },
      { url: "/images/login-bg.jpg", caption: "🌅 Twilight Puja Atmosphere" },
    ],
    subtitle: "One of the 16 sacred Solosmasthana sites blessed by Lord Buddha • Built 3rd Century BC",
    aboutTitle: "About Deegawapi Sacred Stupa",
    aboutParagraphs: [
      "Built by King Saddhatissa in the 3rd century BC, Dighavapi (Deegawapi) is venerated as one of the Solosmasthana—the sixteen holiest Buddhist sanctuaries in Sri Lanka. According to the ancient Mahavamsa chronicle, the Lord Buddha sat in serene meditation upon this exact consecrated ground during his third visit to Lanka.",
      "With an immense ancient circumference that rivalled the great stupas of Anuradhapura, ongoing national archaeological excavations have unveiled gold reliquaries, historic stone inscriptions, and the original brick terraces of the ancient monastic kingdom of Digamadulla.",
    ],
    quote:
      "A sacred sanctuary where centuries of royal devotion and spiritual silence converge under the eastern skies.",
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
    routeDesc: "Est. 20 min drive from Ampara town center via Deegawapiya Road • Paved asphalt",
  },
  "buddhangala-monastery": {
    image: "/images/buddhangala.jpg",
    galleryImages: [
      { url: "/images/buddhangala.jpg", caption: "🛕 Sacred Summit Stupa" },
      { url: "/images/deegawapi-stupa.jpg", caption: "🪨 Meditation Caves" },
    ],
    subtitle: "Ancient cave monastery perched atop monolithic boulders with 360° jungle vistas",
    aboutTitle: "About Buddhangala Forest Hermitage",
    aboutParagraphs: [
      "Perched amidst massive granite outcrops surrounded by dense wilderness, Buddhangala dates back over 2,300 years to King Devanampiyatissa's era. Monks observe deep silent meditation in natural drip-ledge rock shelters, keeping alive ancient ascetic Buddhist traditions.",
      "The rock summit stupa enshrines authentic relics of the Lord Buddha and his chief disciples, Venerable Sariputta and Moggallana. Wild spotted deer roam freely and calmly throughout the monastic grounds, creating an aura of harmony between man and wildlife.",
    ],
    quote:
      "High above the canopy on the summit rock, only the wind whispers through the Bo leaves — a true refuge of pristine peace.",
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
    routeDesc: "Est. 12 min drive from Ampara town center through scenic rural forest road",
  },
  "rajagala-archaeological-site": {
    image: "/images/rajagala.jpg",
    galleryImages: [
      { url: "/images/rajagala.jpg", caption: "🏛️ Ancient Stone Pillars & Summit Peak" },
      { url: "/images/deegawapi-stupa.jpg", caption: "🛕 Arhat Mahinda Relic Stupa" },
    ],
    subtitle: "Epic forested mountain monastery featuring over 500 ancient ruins & Arhat Mahinda's Stupa",
    aboutTitle: "About Rajagala (Rassahela) Heritage Mountain",
    aboutParagraphs: [
      "Rising over 1,000 feet above the forested valley of Bakkiella, Rajagala spans over 1,000 acres and preserves more than 500 ancient stone structures, drip-ledge caves, stone stupas, and ancient bridges. Inhabited by thousands of Buddhist monks between the 3rd century BC and 10th century AD, it was one of Asia's largest monastic universities.",
      "Rock inscriptions discovered here by archaeologists provide rare, indisputable historical evidence verifying the passing and cremation of Arhat Mahinda Thero—the royal monk from India who introduced Buddhism to Sri Lanka in the 3rd century BC.",
    ],
    quote:
      "Walking through Rajagala's shaded mountain canopy is like stepping straight into a lost monastic civilization frozen in time.",
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
    routeDesc: "Est. 30 min drive via A27 Highway to Bakkiella • Follow archaeological signboards",
  },
  "ampara-peace-pagoda": {
    image: "/images/login-bg.jpg",
    galleryImages: [
      { url: "/images/login-bg.jpg", caption: "🌅 Lake Tank Sunset" },
      { url: "/images/hero-bg.jpg", caption: "🚶 Promenade Walking Track" },
    ],
    subtitle: "Gleaming white dome built by Nipponzan Myohoji monks overlooking tranquil Ampara Tank",
    aboutTitle: "About Ampara Japanese Peace Pagoda",
    aboutParagraphs: [
      "Situated right on the rim of the town lake, this peaceful monument was built by the Japanese Buddhist monk Ven. Nichidatsu Fujii to radiate harmony and international goodwill. The surrounding park promenade offers tranquil sunset strolls, with views of birds nesting on the placid tank water.",
      "The stupa features four exquisite golden reliefs depicting key episodes from the life of the Buddha, and its whitewashed terrace provides a breezy vantage point overlooking water lilies and fishermen's outrigger boats.",
    ],
    quote:
      "Reflections of the gleaming stupa glistening across the tank water at twilight make it the town's most peaceful promenade.",
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
    routeDesc: "Est. 5 min drive or 15 min walk from Ampara Clock Tower along Lake Road",
  },
  "panama-kudumbigala": {
    image: "/images/buddhangala.jpg",
    galleryImages: [
      { url: "/images/buddhangala.jpg", caption: "⛰️ Monolithic Granite Peak" },
      { url: "/images/gal-oya-elephants.jpg", caption: "🌿 Dry-Zone Wilderness" },
    ],
    subtitle: "Towering granite boulder peaks rising above jungle canopy with unique cylindrical stupa",
    aboutTitle: "About Kudumbigala Forest Sanctuary",
    aboutParagraphs: [
      "Rising majestically above the arid plains on the frontier of Yala East and Panama, Kudumbigala is an ancient monastic sanctuary surrounded by monolithic granite boulder peaks. It is famous for hosting Sri Lanka's only surviving ancient cylindrical stupa ('Belumgala Stupa') constructed atop a dizzying boulder peak.",
      "Dating back to the 3rd century BC, more than 200 caves with ancient Brahmi inscriptions were used by forest-dwelling meditating monks. The summit affords awe-inspiring 360-degree panoramic views of pristine jungle stretching to the Indian Ocean.",
    ],
    quote:
      "Standing atop Belumgala peak at dawn as the sun rises over the horizon is an unforgettable sight of wild Sri Lanka.",
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
    routeDesc: "Accessible via Panama towards Okanda • Scenic gravel route across wildlife territory",
  },
  "muhudu-maha-viharaya": {
    image: "/images/deegawapi-stupa.jpg",
    galleryImages: [
      { url: "/images/deegawapi-stupa.jpg", caption: "🗿 Ancient Standing Buddha Statues" },
      { url: "/images/login-bg.jpg", caption: "🌊 Coastal Temple Enclosure" },
    ],
    subtitle: "Historic beachside temple marking where Queen Viharamahadevi landed • 2nd Century BC",
    aboutTitle: "About Muhudu Maha Viharaya & Dunes",
    aboutParagraphs: [
      "Standing proudly amid shifting sand dunes right on the shoreline of Pottuvil, Muhudu Maha Viharaya was built over 2,000 years ago by King Kavan Tissa to commemorate the legendary landing of Princess Viharamahadevi. The site features stone pillars, ancient foundations, and magnificent carved standing Buddha statues emerging dramatically against the backdrop of ocean surf.",
      "The temple remains an active spiritual sanctuary where the chanting of monks mingles with the rhythm of the waves, offering travelers a striking combination of archaeological royalty and pristine coastal scenery.",
    ],
    quote:
      "Ancient stone Buddha statues gazing calmly over the ocean waves with coastal breezes whistling through the sand dunes.",
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
    routeDesc: "Located on the Pottuvil coastal strip • Smooth asphalt drive via A4 Highway",
  },
  "arugam-bay-beach": {
    image: "/images/hero-bg.jpg",
    galleryImages: [
      { url: "/images/hero-bg.jpg", caption: "🌅 Golden Hour Ocean Sunset" },
      { url: "/images/login-bg.jpg", caption: "🛶 Lagoon Eco-Safari Waters" },
    ],
    subtitle: "Crescent golden beach renowned for international point-break surf & lagoon sunsets",
    aboutTitle: "About Arugam Bay Beach & Surf Point",
    aboutParagraphs: [
      "Arugam Bay is Sri Lanka's internationally acclaimed surfing capital, sitting on the southern rim of Ampara district's Indian Ocean coastline. Famed for its consistent right-hand point breaks, powdery golden sand, and vibrant coastal culture, it attracts ocean enthusiasts from across the globe between May and October.",
      "Beyond the world-class swell, the area offers tranquil outrigger boat safaris in the adjacent Pottuvil and Kottukal lagoons, where visitors regularly observe sea eagles, monitor lizards, and wild elephants drinking at water's edge at sunset.",
    ],
    quote:
      "Golden sands stretching into azure ocean swells — an unforgettable coastal haven in Sri Lanka's eastern frontier.",
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
    routeDesc: "Accessible via A4 highway • Direct drive through scenic paddy landscapes",
  },
  "rambakan-oya-cascade": {
    image: "/images/hero-bg.jpg",
    galleryImages: [
      { url: "/images/hero-bg.jpg", caption: "💦 Rambakan Oya Rapids" },
      { url: "/images/rajagala.jpg", caption: "🏛️ Ancient Stone Slab Sluice" },
    ],
    subtitle: "Scenic rocky rapids & 2,000-year-old ancient stone slab engineering sluice",
    aboutTitle: "About Rambakan Oya Forest Cascade",
    aboutParagraphs: [
      "Deep in the forested hinterlands of Maha Oya, Rambakan Oya features natural water cascades cascading over ancient granite bedrock. It is famed for its 2,000-year-old monolithic stone slab sluice—an astonishing feat of ancient hydraulic engineering with interlocking rock boulders built to withstand heavy monsoonal river flows.",
      "Surrounded by virgin dry-zone forests, visitors can swim in naturally sculpted cool freshwater rock pools, explore archaeological excavations, and enjoy peaceful picnics under tall kumbuk and mee trees.",
    ],
    quote:
      "The thunder of cool freshwater gushing through ancient rock sluices that have stood firm for two millennia.",
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
    routeDesc: "Est. 30-35 min drive via A27 highway towards Maha Oya",
  },
  "magul-maha-viharaya": {
    image: "/images/deegawapi-stupa.jpg",
    galleryImages: [
      { url: "/images/deegawapi-stupa.jpg", caption: "🐘 Unique Elephant Moonstone" },
      { url: "/images/login-bg.jpg", caption: "🌿 Forest Monastery Grounds" },
    ],
    subtitle: "Historic royal marriage pavilion of King Kavantissa & Queen Viharamahadevi",
    aboutTitle: "About Magul Maha Viharaya",
    aboutParagraphs: [
      "Constructed in the 5th century BC, Magul Maha Viharaya is steeped in legendary romance: it is recorded as the consecrated royal site where King Kavan Tissa married Princess Viharamahadevi of Ruhuna.",
      "The complex contains Sri Lanka's only moonstone depicting carved mahouts atop elephants, alongside an ancient Bodhigara, stone stupa, pond, and extensive stone pillar ruins set within peaceful dry-zone woodlands.",
    ],
    quote:
      "A timeless royal sanctuary where the romance of ancient Ruhuna echoes through stone ruins and sacred Bo trees.",
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
    routeDesc: "Est. 30 min drive along A4 Highway towards Lahugala National Park",
  },
  "kumana-national-park": {
    image: "/images/gal-oya-elephants.jpg",
    galleryImages: [
      { url: "/images/gal-oya-elephants.jpg", caption: "🦩 Kumana Villu Waterbirds" },
      { url: "/images/hero-bg.jpg", caption: "🌊 Coastal Mangrove Safari" },
    ],
    subtitle: "200-hectare mangrove swamp sanctuary sheltering over 255 species of rare water birds",
    aboutTitle: "About Kumana National Park (Yala East)",
    aboutParagraphs: [
      "Kumana National Park, historically known as Yala East, is celebrated as one of the most critical bird nesting grounds in South Asia. Its 200-hectare mangrove swamp (Kumana Villu) teems with thousands of migratory and resident aquatic birds between May and July.",
      "Beyond its world-class avifauna, the park's dense thorn scrub and granite outcrops shelter wild Asian elephants, elusive leopards, sloth bears, marsh crocodiles, and wild boars.",
    ],
    quote:
      "Where the sky comes alive with thousands of nesting waterbirds above emerald lagoons and pristine wild frontiers.",
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
    routeDesc: "Accessible via Panama towards Okanda Gate • 4WD Safari jeep recommended",
  },
  "kondawattuwan-lake": {
    image: "/images/login-bg.jpg",
    galleryImages: [
      { url: "/images/login-bg.jpg", caption: "🌅 Lake Promenade Sunset" },
      { url: "/images/hero-bg.jpg", caption: "🛶 Local Fishing Canoes" },
    ],
    subtitle: "Tranquil town lake promenade, lotus beds and evening breezes",
    aboutTitle: "About Kondawattuwan Reservoir & Park",
    aboutParagraphs: [
      "Picturesque inland lake and park promenade just minutes from Ampara town, boasting tranquil lotus flowers, evening breezes, and wild cormorants.",
      "Popular among locals and travelers for evening strolls, cycling, and taking in serene sunset views across the gentle waters.",
    ],
    quote: "The gentle ripples of Kondawattuwan reflect the twilight glow, making it a peaceful stop near Ampara town.",
    tips: [
      {
        title: "Sunset Strolls",
        desc: "Best visited between 17:00 and 18:30 when the afternoon heat drops and cool lake winds blow.",
        icon: "sunrise",
      },
      {
        title: "Birdwatching",
        desc: "Watch for spot-billed pelicans, egrets, and cormorants nesting along the tree fringes.",
        icon: "trees",
      },
      {
        title: "Family Friendly",
        desc: "Flat paved walking paths make it ideal for casual walks and photography.",
        icon: "sun",
      },
    ],
    routeDesc: "Est. 8 min drive from Ampara town center via Kondawattuwan Road",
  },
  "lahugala-kitulana-national-park": {
    image: "/images/gal-oya-elephants.jpg",
    galleryImages: [
      { url: "/images/gal-oya-elephants.jpg", caption: "🐘 Grazing Elephants" },
      { url: "/images/hero-bg.jpg", caption: "🌿 Lahugala Tank" },
    ],
    subtitle: "Critical protected elephant sanctuary centered on scenic Lahugala Tank",
    aboutTitle: "About Lahugala Kitulana National Park",
    aboutParagraphs: [
      "Critically important protected elephant sanctuary centered on Lahugala Tank, where massive wild herds gather to graze on succulent Beru grass.",
      "The park also features historical ruins and pristine wetland vegetation, creating an ideal haven for bird lovers and wildlife enthusiasts.",
    ],
    quote: "Seeing herds of majestic wild elephants feeding quietly along the water edge is a hallmark of Lahugala.",
    tips: [
      {
        title: "Afternoon Elephant Viewing",
        desc: "Arrive around 15:30 to see elephants emerge from the forest to feed on the reservoir grass.",
        icon: "sunrise",
      },
      {
        title: "Quiet Observation",
        desc: "Stay inside the observation area and maintain a safe, quiet distance from wild herds.",
        icon: "trees",
      },
      {
        title: "Binoculars Recommended",
        desc: "Carry binoculars to observe distant herds and wetland bird species across the water.",
        icon: "sun",
      },
    ],
    routeDesc: "Est. 28 min drive along A4 Highway towards Lahugala",
  },
};

function getFallbackDetails(attraction: (typeof amparaAttractions)[0]): AttractionDetailSeed {
  // Use images available in public/images
  let image = "/images/hero-bg.jpg";
  if (attraction.category.toLowerCase().includes("wildlife")) {
    image = "/images/gal-oya-elephants.jpg";
  } else if (attraction.category.toLowerCase().includes("religious")) {
    image = "/images/deegawapi-stupa.jpg";
  } else if (attraction.category.toLowerCase().includes("historical")) {
    image = "/images/rajagala.jpg";
  } else if (attraction.category.toLowerCase().includes("beach")) {
    image = "/images/hero-bg.jpg";
  } else {
    image = "/images/login-bg.jpg";
  }

  return {
    image,
    galleryImages: [
      { url: image, caption: `📍 ${attraction.name}` },
      { url: "/images/login-bg.jpg", caption: "🌅 Scenic Regional View" },
    ],
    subtitle: `${attraction.description.slice(0, 85)}...`,
    aboutTitle: `About ${attraction.name}`,
    aboutParagraphs: [
      attraction.description,
      `Located at ${attraction.location}, this site is positioned within ${attraction.distanceKm} km of Ampara town center, making it an essential highlight of the 25km discovery zone.`,
    ],
    quote: `A serene highlight of the 25km Ampara discovery horizon, showcasing ${attraction.name} in its natural splendour.`,
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
    routeDesc: `Est. ${Math.round(attraction.distanceKm * 1.2 + 5)} min drive from Ampara town center via ${attraction.location}`,
  };
}

async function seedPlaces() {
  try {
    const categoryIds = new Map<string, string>();
    for (const category of interestCategories) {
      const categoryId = randomUUID();
      await pool.execute(
        `INSERT INTO categories (id, name, description)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE description = VALUES(description)`,
        [categoryId, category.title, `Explore ${category.title.toLowerCase()} destinations in Ampara.`],
      );
      const [rows] = await pool.execute("SELECT id FROM categories WHERE name = ?", [category.title]);
      categoryIds.set(category.title, (rows as Array<{ id: string }>)[0].id);
    }

    for (const attraction of amparaAttractions) {
      const categoryId =
        categoryIds.get(attraction.category) ||
        categoryIds.get("Religious and Historical") ||
        categoryIds.get("Nature");
      if (!categoryId) throw new Error(`Missing category for ${attraction.name}.`);

      const richData = ATTRACTION_DETAILS[attraction.id] || getFallbackDetails(attraction);

      await pool.execute(
        `INSERT INTO attractions
         (id, category_id, name, slug, description, location, image, images, distance_km,
          duration, highlights, rating, reviews_count, radial_zone,
          subtitle, about_title, about_paragraphs, quote, tips, route_desc)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
          category_id = VALUES(category_id),
          name = VALUES(name),
          description = VALUES(description),
          location = VALUES(location),
          image = VALUES(image),
          images = VALUES(images),
          distance_km = VALUES(distance_km),
          duration = VALUES(duration),
          highlights = VALUES(highlights),
          rating = VALUES(rating),
          reviews_count = VALUES(reviews_count),
          radial_zone = VALUES(radial_zone),
          subtitle = VALUES(subtitle),
          about_title = VALUES(about_title),
          about_paragraphs = VALUES(about_paragraphs),
          quote = VALUES(quote),
          tips = VALUES(tips),
          route_desc = VALUES(route_desc)`,
        [
          randomUUID(),
          categoryId,
          attraction.name,
          attraction.id,
          attraction.description,
          attraction.location,
          richData.image,
          JSON.stringify(richData.galleryImages),
          attraction.distanceKm,
          attraction.duration,
          JSON.stringify(attraction.highlights),
          attraction.rating,
          attraction.reviewsCount,
          attraction.radialZone,
          richData.subtitle,
          richData.aboutTitle,
          JSON.stringify(richData.aboutParagraphs),
          richData.quote,
          JSON.stringify(richData.tips),
          richData.routeDesc,
        ],
      );
    }

    console.log(`Successfully seeded ${interestCategories.length} categories and ${amparaAttractions.length} attractions with rich DB details.`);
  } finally {
    await pool.end();
  }
}

seedPlaces().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
