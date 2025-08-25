// Mock data for the PC Community platform

export interface Proposition {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  author: string;
  category: "configurations" | "boitiers" | "offres";
  votes: number;
  comments: number;
  views: number;
  price?: number;
  images: string[];
  createdAt: string;
  tags: string[];
  userVote?: "up" | "down" | null;
  specs?: Record<string, string>;
}

export interface Comment {
  id: string;
  propositionId: string;
  author: string;
  content: string;
  createdAt: string;
  votes: number;
  userVote?: "up" | "down" | null;
}

// Mock propositions data
export const mockPropositions: Proposition[] = [
  {
    id: "1",
    title: "Config Gaming 4K Ultra - RTX 4080 & Ryzen 7 7800X3D",
    description: "Configuration ultra performante pour du gaming 4K en très haute qualité. Optimisée pour les derniers jeux AAA.",
    fullDescription: "Cette configuration gaming haut de gamme est conçue pour offrir une expérience de jeu exceptionnelle en 4K Ultra. Le processeur Ryzen 7 7800X3D avec sa technologie V-Cache offre des performances gaming inégalées, tandis que la RTX 4080 assure un framerate élevé même dans les jeux les plus exigeants.",
    author: "GamerPro_2024",
    category: "configurations",
    votes: 142,
    comments: 23,
    views: 1547,
    price: 2850,
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    createdAt: "2024-01-15",
    tags: ["Gaming", "4K", "RTX 4080", "AMD", "Haut de gamme"],
    specs: {
      "Processeur": "AMD Ryzen 7 7800X3D",
      "Carte graphique": "NVIDIA RTX 4080 16GB",
      "RAM": "32GB DDR5-5600",
      "Stockage": "1TB NVMe SSD + 2TB HDD",
      "Alimentation": "850W 80+ Gold",
      "Refroidissement": "AIO 280mm"
    }
  },
  {
    id: "2", 
    title: "Boîtier Corsair 4000D - Parfait airflow et câble management",
    description: "Test complet du Corsair 4000D avec focus sur l'airflow et l'espace disponible pour les configurations gaming.",
    fullDescription: "Le Corsair 4000D Airflow est un boîtier mid-tower qui excelle dans la gestion thermique. Avec son panneau avant perforé et ses 3 ventilateurs inclus, il offre un airflow optimal pour maintenir des températures basses.",
    author: "TechReviewer",
    category: "boitiers",
    votes: 89,
    comments: 15,
    views: 892,
    price: 109,
    images: ["/placeholder.svg", "/placeholder.svg"],
    createdAt: "2024-01-12",
    tags: ["Corsair", "Mid-tower", "Airflow", "Cable management"],
    specs: {
      "Format": "Mid Tower ATX",
      "Ventilateurs inclus": "3x 120mm",
      "Support GPU": "370mm max",
      "Support AIO": "280mm/360mm",
      "Ports": "2x USB 3.0, 1x USB-C",
      "Dimensions": "453 x 230 x 466mm"
    }
  },
  {
    id: "3",
    title: "RTX 4070 Ti à 650€ - Excellent rapport qualité/prix",
    description: "Super offre sur la RTX 4070 Ti chez plusieurs revendeurs. Performance 1440p garantie !",
    fullDescription: "Offre exceptionnelle sur la RTX 4070 Ti disponible chez plusieurs revendeurs français. Cette carte graphique offre d'excellentes performances en 1440p et permet même du gaming 4K dans certains titres avec DLSS 3.",
    author: "DealsHunter",
    category: "offres",
    votes: 76,
    comments: 31,
    views: 2103,
    price: 650,
    images: ["/placeholder.svg"],
    createdAt: "2024-01-14",
    tags: ["RTX 4070 Ti", "Promo", "1440p", "DLSS 3"],
    specs: {
      "GPU": "NVIDIA RTX 4070 Ti",
      "VRAM": "12GB GDDR6X",
      "Base Clock": "2310 MHz",
      "Boost Clock": "2610 MHz",
      "TGP": "285W",
      "Connecteurs": "3x DP 1.4a, 1x HDMI 2.1"
    }
  },
  {
    id: "4",
    title: "Mini-ITX Beast - RTX 4070 dans un Dan A4-H2O",
    description: "Build ultra compact avec refroidissement liquide custom. Performances maximales dans un format minimal.",
    fullDescription: "Ce build Mini-ITX repousse les limites du format compact. Avec un refroidissement liquide custom et une RTX 4070, cette configuration offre des performances impressionnantes dans un volume de seulement 11 litres.",
    author: "ITXMaster",
    category: "configurations", 
    votes: 234,
    comments: 47,
    views: 3421,
    price: 2100,
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    createdAt: "2024-01-10",
    tags: ["Mini-ITX", "Compact", "Watercooling", "RTX 4070"],
    specs: {
      "Processeur": "Intel Core i5-13600K",
      "Carte graphique": "NVIDIA RTX 4070",
      "RAM": "32GB DDR4-3600",
      "Stockage": "2TB NVMe SSD",
      "Alimentation": "750W SFX",
      "Refroidissement": "Custom loop"
    }
  },
  {
    id: "5",
    title: "NZXT H6 Flow - Le nouveau roi de l'airflow ?",
    description: "Premier test du nouveau boîtier NZXT H6 Flow. Design moderne et performances thermiques au top.",
    fullDescription: "Le NZXT H6 Flow marque un tournant dans la gamme de boîtiers NZXT. Avec son design épuré et son excellent airflow, il se positionne comme une alternative sérieuse aux références du marché.",
    author: "CaseModder",
    category: "boitiers",
    votes: 67,
    comments: 19,
    views: 756,
    price: 139,
    images: ["/placeholder.svg", "/placeholder.svg"],
    createdAt: "2024-01-08",
    tags: ["NZXT", "H6 Flow", "Moderne", "Thermiques"],
    specs: {
      "Format": "Mid Tower ATX",
      "Ventilateurs inclus": "2x 140mm",
      "Support GPU": "400mm max", 
      "Support AIO": "280mm/360mm",
      "Panneau latéral": "Verre trempé",
      "RGB": "Compatible NZXT CAM"
    }
  }
];

// Mock comments data
export const mockComments: Comment[] = [
  {
    id: "c1",
    propositionId: "1",
    author: "TechEnthusiast",
    content: "Excellente config ! J'ai exactement la même et je confirme que ça tourne parfaitement en 4K. Le 7800X3D est vraiment un monstre pour le gaming.",
    createdAt: "2024-01-15",
    votes: 12,
    userVote: null
  },
  {
    id: "c2", 
    propositionId: "1",
    author: "BudgetGamer",
    content: "Un peu cher pour moi mais effectivement c'est du très haut de gamme. Est-ce que tu as testé avec la RTX 4070 Ti à la place ?",
    createdAt: "2024-01-15",
    votes: 5,
    userVote: null
  },
  {
    id: "c3",
    propositionId: "2", 
    author: "ModdingFan",
    content: "J'ai ce boîtier depuis 6 mois, le cable management est vraiment top et l'airflow excellent. Très bon choix !",
    createdAt: "2024-01-12",
    votes: 8,
    userVote: null
  }
];

// Mock user data
export const mockUser = {
  id: "user1",
  username: "CurrentUser", 
  email: "user@example.com",
  isAdmin: false
};

export const adminUser = {
  id: "admin1",
  username: "minicubse",
  email: "admin@pccommunity.com", 
  isAdmin: true
};