// ============================================================
// LUXE STORE — Product Data
// ============================================================

const PRODUCTS = [
  {
    id: 1,
    name: "Obsidian Ceramic Vase",
    category: "home",
    price: 189,
    originalPrice: 240,
    rating: 4.8,
    reviews: 124,
    badge: "Bestseller",
    description: "Hand-thrown from raw black stoneware. Each piece bears the marks of the maker — subtle, intentional, irrepeatable. Glazed with a matte obsidian finish that catches light like volcanic glass.",
    details: ["Hand-thrown stoneware", "Matte obsidian glaze", "H: 32cm, W: 14cm", "Food safe, dishwasher safe", "Made in Portugal"],
    images: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=600&q=80",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&q=80"
    ],
    tags: ["ceramic", "vase", "decor"]
  },
  {
    id: 2,
    name: "Woven Linen Throw",
    category: "home",
    price: 124,
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    badge: null,
    description: "Loomed from 100% European flax on traditional shuttle looms. The irregular weave creates a living texture — no two throws are identical. Grows softer with every wash.",
    details: ["100% European flax linen", "130cm × 170cm", "Machine washable 40°C", "OEKO-TEX certified", "Made in Lithuania"],
    images: [
      "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=600&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80"
    ],
    tags: ["linen", "textile", "throw"]
  },
  {
    id: 3,
    name: "Brass Desk Lamp",
    category: "lighting",
    price: 295,
    originalPrice: 380,
    rating: 4.7,
    reviews: 56,
    badge: "Sale",
    description: "Articulated in solid unlacquered brass that patinas naturally over years of use. The pivoting arm and adjustable shade let you sculpt light precisely where you need it.",
    details: ["Solid unlacquered brass", "LED compatible (E27)", "Arm reach: 45cm", "Hand-polished finish", "3-year warranty"],
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80",
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a35f3cd9c?w=600&q=80"
    ],
    tags: ["brass", "lamp", "lighting"]
  },
  {
    id: 4,
    name: "Raw Edge Walnut Board",
    category: "kitchen",
    price: 98,
    originalPrice: null,
    rating: 4.6,
    reviews: 203,
    badge: null,
    description: "Cut from a single slab of American black walnut, live edge preserved. The natural grain becomes a story — growth rings, knots, and all the evidence of a long life.",
    details: ["Solid American black walnut", "Approx. 45cm × 28cm", "Food-grade mineral oil finish", "Hand-sanded to 400 grit", "Made in Vermont, USA"],
    images: [
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&q=80",
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
    ],
    tags: ["walnut", "kitchen", "cutting board"]
  },
  {
    id: 5,
    name: "Merino Wool Cardigan",
    category: "fashion",
    price: 215,
    originalPrice: 275,
    rating: 4.9,
    reviews: 341,
    badge: "New",
    description: "Knitted from ultra-fine 17.5-micron merino. Drapes with the authority of cashmere, breathes with the intelligence of wool. A cardigan for every season.",
    details: ["100% Merino wool (17.5 micron)", "Regular fit", "Sizes: XS–XXL", "Hand wash cold / dry flat", "Manufactured ethically in Italy"],
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=600&q=80"
    ],
    tags: ["merino", "cardigan", "fashion"]
  },
  {
    id: 6,
    name: "Leather Journal",
    category: "stationery",
    price: 65,
    originalPrice: null,
    rating: 4.8,
    reviews: 178,
    badge: null,
    description: "Vegetable-tanned full-grain leather that develops a rich patina. Lay-flat binding with 240 pages of 90gsm acid-free paper. A journal that earns its scars.",
    details: ["Full-grain vegetable-tanned leather", "240 pages, 90gsm acid-free", "Lay-flat Smyth-sewn binding", "A5 format (148mm × 210mm)", "Handmade in Florence"],
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
      "https://images.unsplash.com/photo-1455720288655-74a62e52f1d8?w=600&q=80",
      "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?w=600&q=80"
    ],
    tags: ["leather", "journal", "stationery"]
  },
  {
    id: 7,
    name: "Stone Pestle & Mortar",
    category: "kitchen",
    price: 78,
    originalPrice: null,
    rating: 4.7,
    reviews: 92,
    badge: null,
    description: "Hewn from a single piece of volcanic basalt. The porous surface releases natural oils from spices without heat, unlocking flavors that blades simply cannot achieve.",
    details: ["Solid volcanic basalt stone", "ø 16cm, 2.8kg", "Unpolished interior for grip", "Hand-chiselled exterior", "Made in Thailand"],
    images: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80",
      "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
    ],
    tags: ["stone", "kitchen", "mortar"]
  },
  {
    id: 8,
    name: "Pendant Ceiling Light",
    category: "lighting",
    price: 340,
    originalPrice: 420,
    rating: 4.5,
    reviews: 47,
    badge: "Sale",
    description: "A sculptural globe of mouth-blown smoke glass, suspended from hand-spun brass hardware. Diffuses warm light into something like a mood.",
    details: ["Mouth-blown smoke glass", "Solid brass hardware", "ø 28cm globe", "3m fabric cord (adjustable)", "Compatible with dimmers"],
    images: [
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&q=80",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80"
    ],
    tags: ["glass", "pendant", "lighting"]
  },
  {
    id: 9,
    name: "Silk Pillowcase Set",
    category: "home",
    price: 88,
    originalPrice: null,
    rating: 4.8,
    reviews: 267,
    badge: "New",
    description: "22-momme mulberry silk. The weight of it on your face is an education in luxury. Reduces friction, retains moisture, and keeps you cooler than any cotton can.",
    details: ["22-momme Grade 6A mulberry silk", "Set of 2 standard pillowcases", "51cm × 76cm", "Hidden zip closure", "Hand wash or cold machine wash"],
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
      "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=600&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80"
    ],
    tags: ["silk", "pillowcase", "bedding"]
  },
  {
    id: 10,
    name: "Fine Merino Scarf",
    category: "fashion",
    price: 95,
    originalPrice: null,
    rating: 4.6,
    reviews: 134,
    badge: null,
    description: "240cm of fine merino in a simple rib. Long enough to wrap twice, light enough to forget you're wearing it. The only scarf you'll need for ten years.",
    details: ["100% superfine merino (19 micron)", "240cm × 35cm", "Rib knit construction", "Dry clean or hand wash cold", "Made in Scotland"],
    images: [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80"
    ],
    tags: ["merino", "scarf", "fashion"]
  },
  {
    id: 11,
    name: "Copper Pour-Over Kettle",
    category: "kitchen",
    price: 145,
    originalPrice: 185,
    rating: 4.9,
    reviews: 88,
    badge: "Bestseller",
    description: "Hammered copper with a gooseneck spout precision-engineered for a 3–4mm water flow. Brews like a ritual. The copper heats evenly and looks better every year.",
    details: ["Hammered solid copper body", "Tin-lined interior", "0.9L capacity", "Compatible with all hobs incl. induction", "Thermometer included"],
    images: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&q=80"
    ],
    tags: ["copper", "kettle", "coffee"]
  },
  {
    id: 12,
    name: "Oak Floating Shelf Set",
    category: "home",
    price: 112,
    originalPrice: null,
    rating: 4.7,
    reviews: 156,
    badge: null,
    description: "Three shelves in solid white oak, finished with a single coat of natural hardwax oil. Wall hardware concealed. The result: shelves that look like they're growing from the wall.",
    details: ["Solid white oak, 3-piece set", "40cm / 60cm / 80cm widths", "Hidden bracket system", "Natural hardwax oil finish", "Max load: 15kg per shelf"],
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aaa4df33?w=600&q=80",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"
    ],
    tags: ["oak", "shelf", "home"]
  }
];

const TESTIMONIALS = [
  {
    name: "Marina K.",
    location: "Stockholm",
    rating: 5,
    text: "The Obsidian Vase arrived wrapped in tissue paper, nested in a hand-stamped box. Before I'd even seen the object, the experience had already begun. It now sits on my windowsill and I find myself staring at it.",
    product: "Obsidian Ceramic Vase"
  },
  {
    name: "James O.",
    location: "London",
    rating: 5,
    text: "I've bought cheaper cardigans that felt fine. This one makes me feel like someone who has figured something out. The weight of the wool, the way it moves — I understand now why people talk about heirlooms.",
    product: "Merino Wool Cardigan"
  },
  {
    name: "Cécile D.",
    location: "Paris",
    rating: 5,
    text: "The leather journal has been with me for eight months now and it has transformed into something I didn't buy. The patina, the slight swell of the pages — it is more itself now than when it arrived.",
    product: "Leather Journal"
  }
];

const CATEGORIES = [
  { id: "all", name: "All Objects", count: 12 },
  { id: "home", name: "Home", count: 4 },
  { id: "kitchen", name: "Kitchen", count: 3 },
  { id: "lighting", name: "Lighting", count: 2 },
  { id: "fashion", name: "Fashion", count: 2 },
  { id: "stationery", name: "Stationery", count: 1 }
];
