// Sample product catalog with 24 realistic products across 4 categories
export const CATEGORIES = [
  "All Categories",
  "Electronics",
  "Home & Kitchen",
  "Apparel & Fashion",
  "Audio & Entertainment"
];

export const BRANDS = [
  "ApexAudio",
  "KromaVision",
  "OmniGear",
  "NordicComfort",
  "Velocita",
  "TerraBrew",
  "AeroCraft",
  "LuminaLife"
];

export const SAMPLE_PRODUCTS = [
  {
    id: "prod-101",
    name: "Apex ANC-900 Wireless Noise Cancelling Headphones",
    brand: "ApexAudio",
    category: "Audio & Entertainment",
    rating: 4.8,
    reviewCount: 3421,
    originalPrice: 349.99,
    salePrice: 249.99,
    discountPercent: 29,
    inStock: true,
    stockCount: 14,
    deliveryDays: 2,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-102",
    badge: "Best Seller",
    variants: [
      { id: "v1", name: "Midnight Black", color: "#18181b" },
      { id: "v2", name: "Platinum Silver", color: "#e4e4e7" },
      { id: "v3", name: "Navy Blue", color: "#1e3a8a" }
    ],
    specs: {
      "Battery Life": "40 Hours",
      "Driver Size": "40mm Bio-Cellulose",
      "Bluetooth": "5.3 Multi-Point",
      "Weight": "250g",
      "Noise Cancellation": "Dual-Feed Active Hybrid ANC"
    },
    description: "Industry-leading adaptive active noise cancellation with spatial audio head tracking, ultra-soft memory foam ear cushions, and crystal-clear microphone beamforming.",
    reviews: [
      { user: "Marcus T.", rating: 5, date: "2 days ago", comment: "The noise cancellation is terrifyingly good. Blocked out subway noise completely." },
      { user: "Elena R.", rating: 4, date: "1 week ago", comment: "Comfortable for 8+ hour work sessions. Wish the carrying case was slightly smaller." }
    ]
  },
  {
    id: "prod-102",
    name: "KromaVision UltraClear 32\" 4K UHD Pro IPS Monitor",
    brand: "KromaVision",
    category: "Electronics",
    rating: 4.7,
    reviewCount: 1890,
    originalPrice: 699.00,
    salePrice: 529.00,
    discountPercent: 24,
    inStock: true,
    stockCount: 8,
    deliveryDays: 1,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1547119957-637f8679db1e?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-103",
    badge: "Amazon Choice",
    variants: [
      { id: "v1", name: "32-inch 4K 144Hz", color: "#0f172a" },
      { id: "v2", name: "27-inch 4K 60Hz", color: "#334155" }
    ],
    specs: {
      "Resolution": "3840 x 2160 UHD",
      "Panel Type": "Fast IPS 10-bit",
      "Refresh Rate": "144Hz",
      "Color Gamut": "98% DCI-P3 / 100% sRGB",
      "Ports": "Thunderbolt 4 90W PD, HDMI 2.1, DP 1.4"
    },
    description: "Designed for content creators and engineering power users. Factory color calibrated with delta-E < 1, uniform brightness matrix, and one-cable USB-C connectivity.",
    reviews: [
      { user: "David S.", rating: 5, date: "3 weeks ago", comment: "Razor sharp text rendering. Powered my MacBook Pro with a single cable seamlessly." }
    ]
  },
  {
    id: "prod-103",
    name: "OmniGear Tactile Pro Mechanical Keyboard RGB",
    brand: "OmniGear",
    category: "Electronics",
    rating: 4.6,
    reviewCount: 954,
    originalPrice: 179.99,
    salePrice: 129.99,
    discountPercent: 28,
    inStock: true,
    stockCount: 22,
    deliveryDays: 3,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-104",
    badge: "Top Rated",
    variants: [
      { id: "v1", name: "Gateron Brown (Tactile)", color: "#78350f" },
      { id: "v2", name: "Gateron Red (Linear)", color: "#b91c1c" },
      { id: "v3", name: "Gateron Blue (Clicky)", color: "#1d4ed8" }
    ],
    specs: {
      "Form Factor": "75% Compact Layout",
      "Hot-Swappable": "5-pin PCB Support",
      "Keycaps": "Double-Shot PBT Cherry Profile",
      "Connectivity": "Tri-Mode 2.4GHz / Bluetooth 5.1 / Type-C",
      "Battery": "4000mAh"
    },
    description: "Custom gasket mounted mechanical keyboard built with aviation aluminum top frame and multi-layer silicone dampeners for deep acoustic signature.",
    reviews: [
      { user: "Sarah L.", rating: 5, date: "Yesterday", comment: "The sound out of the box is incredible. No rattle on the spacebar." }
    ]
  },
  {
    id: "prod-104",
    name: "AeroCraft ChronoSmart GPS Titanium Watch",
    brand: "AeroCraft",
    category: "Electronics",
    rating: 4.5,
    reviewCount: 1420,
    originalPrice: 449.00,
    salePrice: 389.00,
    discountPercent: 13,
    inStock: true,
    stockCount: 6,
    deliveryDays: 1,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-105",
    badge: "Save 13%",
    variants: [
      { id: "v1", name: "Titanium Grey / Silicon", color: "#64748b" },
      { id: "v2", name: "Onyx Black / Leather", color: "#0f172a" }
    ],
    specs: {
      "Display": "1.43\" AMOLED Sapphire Glass",
      "Case": "Grade 5 Aerospace Titanium",
      "Water Resistance": "10 ATM (100 meters)",
      "Battery Life": "Up to 18 Days",
      "Sensors": "Dual-frequency GNSS, ECG, SpO2, Heart Rate"
    },
    description: "Rugged expedition smartwatch engineered for endurance athletes and outdoorsmen with topo maps, offline elevation profiling, and emergency satellite SOS.",
    reviews: [
      { user: "Carlos G.", rating: 4, date: "4 days ago", comment: "GPS locks in less than 5 seconds. Incredible battery life." }
    ]
  },
  {
    id: "prod-105",
    name: "TerraBrew Barista Touch Thermal Espresso Machine",
    brand: "TerraBrew",
    category: "Home & Kitchen",
    rating: 4.9,
    reviewCount: 2150,
    originalPrice: 899.95,
    salePrice: 749.95,
    discountPercent: 17,
    inStock: true,
    stockCount: 5,
    deliveryDays: 2,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1534687941688-6a1ae6ddc65b?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-106",
    badge: "Staff Pick",
    variants: [
      { id: "v1", name: "Brushed Stainless Steel", color: "#cbd5e1" },
      { id: "v2", name: "Matte Charcoal", color: "#334155" }
    ],
    specs: {
      "Pump Pressure": "15 Bar Italian Pump",
      "Heat-up Time": "3 Seconds (ThermoJet)",
      "Grinder": "Hardened Stainless Conical Burrs (30 settings)",
      "Water Tank": "2.0 Liters BPA-free",
      "Interface": "Intuitive High-Res Touchscreen"
    },
    description: "Cafe quality micro-foam milk texturing and precision espresso extraction at home with automated dosing, pre-infusion, and real-time brew pressure gauges.",
    reviews: [
      { user: "Anthony B.", rating: 5, date: "1 month ago", comment: "Literally paid for itself in 3 months of avoided coffee shop runs." }
    ]
  },
  {
    id: "prod-106",
    name: "LuminaLife PureFlow HEPA Smart Air Purifier 600",
    brand: "LuminaLife",
    category: "Home & Kitchen",
    rating: 4.7,
    reviewCount: 880,
    originalPrice: 229.00,
    salePrice: 179.00,
    discountPercent: 22,
    inStock: true,
    stockCount: 19,
    deliveryDays: 2,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-107",
    badge: "Eco Choice",
    variants: [
      { id: "v1", name: "Alpine White", color: "#f8fafc" },
      { id: "v2", name: "Slate Grey", color: "#475569" }
    ],
    specs: {
      "Coverage": "Up to 1,200 sq. ft in 30 mins",
      "Filter Type": "H13 True HEPA + Activated Carbon",
      "Filtration": "Captures 99.97% down to 0.1 microns",
      "Noise Level": "21dB in Sleep Mode",
      "Smart Control": "Wi-Fi App + Air Quality Index Display"
    },
    description: "Triple-stage air filtration system neutralizes wildfire smoke, cooking odors, allergens, and VOCs with continuous laser particle monitoring.",
    reviews: [
      { user: "Rachel K.", rating: 5, date: "2 weeks ago", comment: "Huge difference in morning allergy symptoms within 48 hours." }
    ]
  },
  {
    id: "prod-107",
    name: "NordicComfort 100% Merino Wool Thermal Crewneck",
    brand: "NordicComfort",
    category: "Apparel & Fashion",
    rating: 4.8,
    reviewCount: 620,
    originalPrice: 165.00,
    salePrice: 125.00,
    discountPercent: 24,
    inStock: true,
    stockCount: 12,
    deliveryDays: 3,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-108",
    badge: "Sustainable",
    variants: [
      { id: "v1", name: "Heather Oatmeal", color: "#e2e8f0" },
      { id: "v2", name: "Forest Moss", color: "#166534" },
      { id: "v3", name: "Deep Charcoal", color: "#1e293b" }
    ],
    specs: {
      "Material": "100% Extra-fine 19.5 Micron Merino Wool",
      "Fit": "Tailored Modern Relaxed",
      "Care": "Machine washable on wool cycle",
      "Origin": "Ethically sourced New Zealand farms",
      "Weight": "280 GSM Midweight"
    },
    description: "Naturally temperature regulating, antimicrobial and odor-resistant knit sweater crafted for seamless layering from alpine cabins to city commutes.",
    reviews: [
      { user: "Oliver P.", rating: 5, date: "5 days ago", comment: "So soft you can wear it with no undershirt without itchiness." }
    ]
  },
  {
    id: "prod-108",
    name: "Velocita HydroShield Weatherproof Commuter Parka",
    brand: "Velocita",
    category: "Apparel & Fashion",
    rating: 4.6,
    reviewCount: 432,
    originalPrice: 320.00,
    salePrice: 240.00,
    discountPercent: 25,
    inStock: true,
    stockCount: 7,
    deliveryDays: 2,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-109",
    badge: "Storm Ready",
    variants: [
      { id: "v1", name: "Matte Black", color: "#020617" },
      { id: "v2", name: "Cadet Olive", color: "#3f6212" }
    ],
    specs: {
      "Waterproofing": "20,000mm HydroStatic Membrane",
      "Breathability": "15,000g/m2/24hr",
      "Insulation": "PrimaLoft Gold Eco 120g",
      "Zippers": "YKK AquaGuard taped seams",
      "Pockets": "7 functional pockets with RFID blocker"
    },
    description: "Minimalist technical outerwear delivering torrential downpour protection with lightweight breathability and fleece-lined handwarmer pockets.",
    reviews: [
      { user: "Julian M.", rating: 4, date: "3 weeks ago", comment: "Stayed bone dry walking through a 45-minute coastal storm." }
    ]
  },
  {
    id: "prod-109",
    name: "ApexAudio StudioMaster Reference Dynamic Microphones",
    brand: "ApexAudio",
    category: "Audio & Entertainment",
    rating: 4.9,
    reviewCount: 1640,
    originalPrice: 299.00,
    salePrice: 229.00,
    discountPercent: 23,
    inStock: true,
    stockCount: 16,
    deliveryDays: 1,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-110",
    badge: "Broadcast Choice",
    variants: [
      { id: "v1", name: "Stealth Black XLR/USB-C", color: "#09090b" },
      { id: "v2", name: "Classic Chrome XLR", color: "#e4e4e7" }
    ],
    specs: {
      "Polar Pattern": "Tight Cardioid",
      "Frequency Response": "50Hz - 20,000Hz",
      "Interface": "Dual XLR and 24-bit/96kHz USB-C",
      "Mount": "Built-in pneumatic shock absorption",
      "Pop Filter": "Integrated acoustic mesh"
    },
    description: "The gold standard for podcasters, voice actors, and streaming creators. Features internal DSP speech enhancement and zero-latency headphone monitoring.",
    reviews: [
      { user: "Chloe W.", rating: 5, date: "1 week ago", comment: "Warm broadcast radio tone without requiring an expensive preamp." }
    ]
  },
  {
    id: "prod-110",
    name: "TerraBrew Precision Electric Gooseneck Kettle 0.9L",
    brand: "TerraBrew",
    category: "Home & Kitchen",
    rating: 4.8,
    reviewCount: 3120,
    originalPrice: 159.00,
    salePrice: 119.00,
    discountPercent: 25,
    inStock: true,
    stockCount: 25,
    deliveryDays: 2,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1520970014086-2208d157c9e2?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-111",
    badge: "Deal of Day",
    variants: [
      { id: "v1", name: "Matte Black with Walnut Handle", color: "#1c1917" },
      { id: "v2", name: "Polished Copper", color: "#b45309" }
    ],
    specs: {
      "Capacity": "0.9 Liters",
      "Wattage": "1200W Rapid Heating",
      "Temperature Control": "Degree-accurate 135F - 212F LCD dial",
      "Hold Mode": "60-Minute temperature lock",
      "Spout": "Fluted precision flow rate gooseneck"
    },
    description: "Engineered specifically for specialty pour-over coffee brewing and artisan loose leaf teas with continuous balance ergonomic handle.",
    reviews: [
      { user: "Liam N.", rating: 5, date: "4 days ago", comment: "The pour control is buttery smooth. Heats water in 2 minutes." }
    ]
  },
  {
    id: "prod-111",
    name: "KromaVision CinemaStream OLED 4K Smart TV 55\"",
    brand: "KromaVision",
    category: "Electronics",
    rating: 4.8,
    reviewCount: 2840,
    originalPrice: 1499.00,
    salePrice: 1199.00,
    discountPercent: 20,
    inStock: true,
    stockCount: 4,
    deliveryDays: 2,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-112",
    badge: "Flagship",
    variants: [
      { id: "v1", name: "55-inch OLED evo", color: "#0f172a" },
      { id: "v2", name: "65-inch OLED evo", color: "#1e293b" }
    ],
    specs: {
      "Display": "Self-lit OLED pixels (Infinite Contrast)",
      "HDR": "Dolby Vision IQ, HDR10+, HLG",
      "Audio": "40W 2.2ch Dolby Atmos soundstage",
      "Gaming": "4x HDMI 2.1, VRR, G-Sync, FreeSync 120Hz",
      "Processor": "Alpha 9 Gen 6 AI Super Scaling"
    },
    description: "Deepest inky blacks with dazzling spectral peak brightness. Ultra-slim floating gallery design mounts flush against your living room wall.",
    reviews: [
      { user: "Evan H.", rating: 5, date: "2 weeks ago", comment: "Movies look like they were meant to be seen in an IMAX theater." }
    ]
  },
  {
    id: "prod-112",
    name: "Velocita SwiftRide Carbon Commuter Backpack 24L",
    brand: "Velocita",
    category: "Apparel & Fashion",
    rating: 4.7,
    reviewCount: 740,
    originalPrice: 189.00,
    salePrice: 139.00,
    discountPercent: 26,
    inStock: true,
    stockCount: 18,
    deliveryDays: 1,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-113",
    badge: "Popular",
    variants: [
      { id: "v1", name: "Carbon Weave Black", color: "#18181b" },
      { id: "v2", name: "Storm Grey Cordura", color: "#475569" }
    ],
    specs: {
      "Fabric": "Cordura 840D Ballistic Nylon",
      "Laptop Sleeve": "Suspended faux-fur lined up to 16\"",
      "Capacity": "24 Liters expand to 28L",
      "Weather Resistance": "Roll-top + YKK Weatherproof Zips",
      "Weight": "980g"
    },
    description: "Ergonomic ventilated back panel, magnetic Fidlock quick-release buckles, and dedicated compartments for chargers, passport, and daily tech essentials.",
    reviews: [
      { user: "Hannah F.", rating: 5, date: "3 weeks ago", comment: "Walked 2 miles in pouring rain and my laptop was 100% dry inside." }
    ]
  },
  {
    id: "prod-113",
    name: "LuminaLife PureCeramic Non-Stick 10-Piece Cookware Set",
    brand: "LuminaLife",
    category: "Home & Kitchen",
    rating: 4.6,
    reviewCount: 1120,
    originalPrice: 399.00,
    salePrice: 289.00,
    discountPercent: 28,
    inStock: true,
    stockCount: 9,
    deliveryDays: 3,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-114",
    badge: "Non-Toxic",
    variants: [
      { id: "v1", name: "Sage Green & Brass", color: "#84cc16" },
      { id: "v2", name: "Cream White & Stainless", color: "#fef08a" },
      { id: "v3", name: "Navy Blue & Gold", color: "#1e3a8a" }
    ],
    specs: {
      "Coating": "Thermolon Mineral Ceramic (PTFE, PFOA, Lead Free)",
      "Core": "Hard-anodized reinforced aluminum",
      "Oven Safe": "Up to 550F (Lids up to 425F)",
      "Compatibility": "Gas, Electric, Induction, Ceramic",
      "Included": "8\" & 10\" skillets, 2qt saucepan, 3qt sauté, 5qt dutch oven"
    },
    description: "Searing performance without toxic chemicals. Heavy gauge forged aluminum base ensures zero hot spots and effortless wipe-clean cleanup.",
    reviews: [
      { user: "Chef Daniel", rating: 5, date: "1 month ago", comment: "Eggs literally glide around the pan with zero oil. Amazing heat retention." }
    ]
  },
  {
    id: "prod-114",
    name: "ApexAudio SonicWave Portable Bluetooth Speaker IP67",
    brand: "ApexAudio",
    category: "Audio & Entertainment",
    rating: 4.7,
    reviewCount: 2210,
    originalPrice: 149.00,
    salePrice: 99.00,
    discountPercent: 34,
    inStock: true,
    stockCount: 30,
    deliveryDays: 1,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-115",
    badge: "34% Off",
    variants: [
      { id: "v1", name: "Forest Camo", color: "#4d7c0f" },
      { id: "v2", name: "Coral Red", color: "#ef4444" },
      { id: "v3", name: "Midnight Navy", color: "#1e3a8a" }
    ],
    specs: {
      "Audio Power": "35W RMS Dual Bass Radiators",
      "Waterproofing": "IP67 Submersible & Dustproof",
      "Battery Life": "24 Hours Continuous Playback",
      "Party Mode": "Link 100+ Speakers Wirelessly",
      "Powerbank": "Reverse USB-A charging port"
    },
    description: "Room-filling 360-degree acoustic fidelity in a floating, drop-resistant silicone chassis engineered for beach days, pool parties, and hiking trails.",
    reviews: [
      { user: "Brad K.", rating: 5, date: "6 days ago", comment: "Took it on a 4-day camping trip, dropped in a river, still sounds flawless." }
    ]
  },
  {
    id: "prod-115",
    name: "OmniGear ErgoPro Vertical Wireless Ergonomic Mouse",
    brand: "OmniGear",
    category: "Electronics",
    rating: 4.5,
    reviewCount: 1530,
    originalPrice: 89.99,
    salePrice: 64.99,
    discountPercent: 28,
    inStock: true,
    stockCount: 20,
    deliveryDays: 2,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-116",
    badge: "Ergonomic",
    variants: [
      { id: "v1", name: "Graphite Right-Handed", color: "#1f2937" },
      { id: "v2", name: "Silver White Right-Handed", color: "#e5e7eb" }
    ],
    specs: {
      "Angle": "57-degree natural handshake posture",
      "Sensor": "4000 DPI Darkfield High Precision",
      "Battery": "USB-C rechargeable (Up to 4 months per charge)",
      "Connectivity": "LogiBolt 2.4GHz + 3-device Bluetooth",
      "Buttons": "6 programmable silent switches"
    },
    description: "Clinically proven to reduce forearm muscle strain and wrist pressure by 40% during extended desk work. Whisper-quiet clicks and precision thumb scroll wheel.",
    reviews: [
      { user: "Jessica T.", rating: 5, date: "2 weeks ago", comment: "Completely eliminated my carpal tunnel ache after just one week." }
    ]
  },
  {
    id: "prod-116",
    name: "NordicComfort UltraPlush Organic Bamboo Duvet King",
    brand: "NordicComfort",
    category: "Home & Kitchen",
    rating: 4.9,
    reviewCount: 890,
    originalPrice: 249.00,
    salePrice: 189.00,
    discountPercent: 24,
    inStock: true,
    stockCount: 8,
    deliveryDays: 2,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-117",
    badge: "5 Star Luxury",
    variants: [
      { id: "v1", name: "King Size (106 x 90 in)", color: "#f8fafc" },
      { id: "v2", name: "Queen Size (90 x 90 in)", color: "#f1f5f9" }
    ],
    specs: {
      "Fabric": "100% OEKO-TEX Bamboo Lyocell (400 TC)",
      "Fill": "Cruelty-free Down Alternative CloudWeave",
      "Baffle Box": "12-inch baffled chambers prevent clumping",
      "Thermal Rating": "All-Season Breathable (350 GSM)",
      "Hypoallergenic": "Dust-mite resistant and silky smooth"
    },
    description: "Silky cooling drape prevents night sweats while providing cozy, cloud-like loft. Features 8 corner duvet tie loops for secure fastening.",
    reviews: [
      { user: "Heather B.", rating: 5, date: "3 weeks ago", comment: "Sleeps crisp and cool in the summer and warm in winter. Unbelievable comfort." }
    ]
  },
  {
    id: "prod-117",
    name: "AeroCraft Aviator Polarized Titanium Sunglasses",
    brand: "AeroCraft",
    category: "Apparel & Fashion",
    rating: 4.7,
    reviewCount: 510,
    originalPrice: 195.00,
    salePrice: 145.00,
    discountPercent: 26,
    inStock: true,
    stockCount: 15,
    deliveryDays: 1,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-118",
    badge: "UV400",
    variants: [
      { id: "v1", name: "Gunmetal Frame / G-15 Green Lens", color: "#374151" },
      { id: "v2", name: "Matte Gold Frame / Polarized Amber", color: "#ca8a04" }
    ],
    specs: {
      "Lens": "Category 3 Tri-Acetate Cellulose (TAC) Polarized",
      "Protection": "100% UV400 UVA/UVB blocking",
      "Frame": "Flexible Beta-Titanium Memory Alloy",
      "Weight": "Ultra-light 18 grams",
      "Hinges": "Japanese spring hinges tested to 50,000 cycles"
    },
    description: "Classic military teardrop silhouette updated with featherweight memory titanium frame and glare-cutting anti-reflective saltwater coatings.",
    reviews: [
      { user: "Greg V.", rating: 5, date: "1 month ago", comment: "Weightless on your face, zero headache after driving all afternoon." }
    ]
  },
  {
    id: "prod-118",
    name: "KromaVision PocketCinema 1080p Smart DLP Projector",
    brand: "KromaVision",
    category: "Electronics",
    rating: 4.4,
    reviewCount: 680,
    originalPrice: 499.00,
    salePrice: 399.00,
    discountPercent: 20,
    inStock: true,
    stockCount: 11,
    deliveryDays: 2,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-119",
    badge: "Portable",
    variants: [
      { id: "v1", name: "Midnight Nebula", color: "#1e1b4b" },
      { id: "v2", name: "Glacier White", color: "#f8fafc" }
    ],
    specs: {
      "Brightness": "450 ANSI Lumens DLP",
      "Resolution": "Native 1080p FHD (4K Input supported)",
      "Screen Size": "40\" to 150\" Diagonal",
      "Battery": "Built-in 2.5-hour Movie Playtime",
      "OS": "Android TV 11 with Netflix certified"
    },
    description: "Auto-focus and auto-keystone correction beam razor sharp video onto any wall or ceiling in seconds. Built-in Harman Kardon stereo speakers.",
    reviews: [
      { user: "Sam R.", rating: 4, date: "2 weeks ago", comment: "Backyard movie nights with the kids are magical. Super compact." }
    ]
  },
  {
    id: "prod-119",
    name: "TerraBrew Precision Digital Coffee Scale 0.1g",
    brand: "TerraBrew",
    category: "Home & Kitchen",
    rating: 4.8,
    reviewCount: 1420,
    originalPrice: 69.99,
    salePrice: 49.99,
    discountPercent: 29,
    inStock: true,
    stockCount: 35,
    deliveryDays: 1,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-120",
    badge: "Essential",
    variants: [
      { id: "v1", name: "Matte Black with Silicone Mat", color: "#171717" },
      { id: "v2", name: "Brushed Aluminum Silver", color: "#e5e7eb" }
    ],
    specs: {
      "Accuracy": "0.1g Precision Load Cell",
      "Timer": "Auto-tare and auto-timer flow detector",
      "Capacity": "2000g Maximum Load",
      "Display": "Invisible hidden LED touch matrix",
      "Battery": "Type-C Lithium Polymer 1600mAh"
    },
    description: "Designed for pour over and espresso baristas. Detects instant flow rate changes and automatically starts timing upon first coffee drop.",
    reviews: [
      { user: "Leo M.", rating: 5, date: "3 days ago", comment: "Zero delay when pouring. As good as scales costing triple the price." }
    ]
  },
  {
    id: "prod-120",
    name: "Velocita SprintPro Seamless Marathon Running Shoes",
    brand: "Velocita",
    category: "Apparel & Fashion",
    rating: 4.7,
    reviewCount: 980,
    originalPrice: 175.00,
    salePrice: 135.00,
    discountPercent: 23,
    inStock: true,
    stockCount: 13,
    deliveryDays: 2,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-121",
    badge: "Carbon Plate",
    variants: [
      { id: "v1", name: "Electric Crimson (Size 10)", color: "#dc2626" },
      { id: "v2", name: "Cyber Volt (Size 10.5)", color: "#84cc16" },
      { id: "v3", name: "Triple Stealth (Size 10)", color: "#18181b" }
    ],
    specs: {
      "Midsole": "Supercritical Pebax Nitrogen Foam + Full-length Carbon Plate",
      "Drop": "8mm Offset (38mm heel / 30mm forefoot)",
      "Weight": "198 grams (Men's size 9)",
      "Upper": "Engineered breathable Monomesh",
      "Outsole": "Vibram Megagrip traction rubber"
    },
    description: "Maximum energy return marathon racing shoe. Propulsive carbon rocker geometry drives you forward with explosive toe-off stride efficiency.",
    reviews: [
      { user: "Kevin D.", rating: 5, date: "2 weeks ago", comment: "Shaved 4 minutes off my half-marathon PR on the first race day." }
    ]
  },
  {
    id: "prod-121",
    name: "ApexAudio StudioMonitors 5\" Powered Reference Pair",
    brand: "ApexAudio",
    category: "Audio & Entertainment",
    rating: 4.9,
    reviewCount: 1250,
    originalPrice: 399.00,
    salePrice: 319.00,
    discountPercent: 20,
    inStock: true,
    stockCount: 7,
    deliveryDays: 2,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-122",
    badge: "Pro Audio",
    variants: [
      { id: "v1", name: "Matte Black Pair", color: "#09090b" },
      { id: "v2", name: "Studio White Pair", color: "#f8fafc" }
    ],
    specs: {
      "Amplification": "Class D Bi-Amped 100W Total RMS",
      "Drivers": "5.25\" Woven Kevlar Woofer + 1\" Silk Dome Tweeter",
      "Inputs": "Balanced XLR, 1/4\" TRS, RCA, Optical, Bluetooth 5.0",
      "Frequency Response": "45Hz - 22,000Hz flat profile",
      "DSP": "Room acoustic boundary tuning switches"
    },
    description: "Ultra-flat frequency response allows audio engineers, beatmakers, and video editors to hear every nuance and flaw in mixes with surgical precision.",
    reviews: [
      { user: "Tyler R.", rating: 5, date: "5 days ago", comment: "Unbeatable clarity in the mid-range. Bass is tight and unhyped." }
    ]
  },
  {
    id: "prod-122",
    name: "OmniGear MagCharge 3-in-1 Foldable Travel Station",
    brand: "OmniGear",
    category: "Electronics",
    rating: 4.6,
    reviewCount: 1980,
    originalPrice: 119.00,
    salePrice: 79.00,
    discountPercent: 34,
    inStock: true,
    stockCount: 28,
    deliveryDays: 1,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-123",
    badge: "Travel Pick",
    variants: [
      { id: "v1", name: "Space Grey Anodized", color: "#475569" },
      { id: "v2", name: "Silver Frost", color: "#e2e8f0" }
    ],
    specs: {
      "Compatibility": "15W MagSafe Phone, 5W Apple Watch, 5W AirPods",
      "Form Factor": "Folds down flat to passport size",
      "Material": "CNC Aerospace Aluminum + Vegan Leather Pad",
      "Included": "65W GaN Fast Charger + 2m Braided Cable",
      "Safety": "Foreign object detection & thermal throttling"
    },
    description: "Replaces 3 separate chargers with one compact foldable stand that magnetically snaps phone in portrait or landscape StandBy bedside mode.",
    reviews: [
      { user: "Danielle C.", rating: 5, date: "1 week ago", comment: "A permanent fixture in my carry-on backpack now. Cleanest hotel nightstand." }
    ]
  },
  {
    id: "prod-123",
    name: "NordicComfort Handcrafted Full-Grain Leather Weekender",
    brand: "NordicComfort",
    category: "Apparel & Fashion",
    rating: 4.9,
    reviewCount: 420,
    originalPrice: 385.00,
    salePrice: 295.00,
    discountPercent: 23,
    inStock: true,
    stockCount: 6,
    deliveryDays: 3,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-124",
    badge: "Heritage",
    variants: [
      { id: "v1", name: "Cognac Tan Veg-Tanned", color: "#b45309" },
      { id: "v2", name: "Espresso Dark Brown", color: "#451a03" }
    ],
    specs: {
      "Leather": "Certified Full-Grain Tuscan Vegetable-Tanned Cowhide",
      "Hardware": "Solid antique brass rivets and YKK Excella zippers",
      "Lining": "100% Heavyweight Japanese Herringbone Cotton Canvas",
      "Dimensions": "20.5\" x 11.5\" x 10\" (TSA Carry-on approved)",
      "Warranty": "Lifetime craftsmanship guarantee"
    },
    description: "Develops a magnificent personalized patina over decades of travel. Includes separated zippered shoe compartment and padded shoulder strap.",
    reviews: [
      { user: "Harrison W.", rating: 5, date: "1 month ago", comment: "Smells incredible and the leather thick and supple. Complimented on every flight." }
    ]
  },
  {
    id: "prod-124",
    name: "LuminaLife Smart Ultrasonic Aromatherapy Diffuser",
    brand: "LuminaLife",
    category: "Home & Kitchen",
    rating: 4.5,
    reviewCount: 1670,
    originalPrice: 79.99,
    salePrice: 54.99,
    discountPercent: 31,
    inStock: true,
    stockCount: 21,
    deliveryDays: 1,
    freeDelivery: true,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&auto=format&fit=crop&q=80",
    hoverImage: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&auto=format&fit=crop&q=80",
    swappedId: "prod-101",
    badge: "Best Seller",
    variants: [
      { id: "v1", name: "Handmade Ceramic White", color: "#f8fafc" },
      { id: "v2", name: "Terracotta Clay", color: "#ea580c" }
    ],
    specs: {
      "Capacity": "500ml Reservoir (Up to 16 hours continuous mist)",
      "Coverage": "450 sq. ft",
      "Lighting": "Warm ambient glow + 7 soothing LED tones",
      "Auto Shutoff": "Safety auto-off when water level is depleted",
      "Technology": "2.4MHz High-Frequency Ultrasonic atomization"
    },
    description: "Dispenses micro-fine cold aromatic vapor without degrading delicate essential oil compounds. Ultra-quiet operation below 19 decibels.",
    reviews: [
      { user: "Natalie E.", rating: 5, date: "1 week ago", comment: "Looks like a piece of art on my entryway console. Very peaceful mist." }
    ]
  }
];
