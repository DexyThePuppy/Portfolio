import { 
  UserIcon, 
  MapPinIcon,
  UserGroupIcon,
  HeartIcon,
  FaceSmileIcon,
  HandRaisedIcon,
  CloudIcon,
  CubeIcon,
  FilmIcon,
  MusicalNoteIcon,
  PhotoIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

// Types
export interface InfoItem {
  id: string;
  title: string;
  icon: React.ElementType;
}

export interface StatCategory {
  category: string;
  items: InfoItem[];
}

export interface Language {
  id: string;
  name: string;
  flag: string;
}

export interface PlatformItem {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  color?: string;
}

export interface TechItem {
  id: string;
  category: string;
  name: string;
  spec: string;
  image: string;
  url: string;
  color?: string;
}

// Main Info - Updated from new data
export const mainInfo: InfoItem[] = [
  { id: '1', title: 'Main', icon: UserIcon },
  { id: '2', title: '23 | Austria', icon: MapPinIcon },
  { id: '3', title: 'He/Him', icon: UserIcon },
  { id: '4', title: 'Shep × Bernese × Dragon', icon: UserIcon },
  { id: '5', title: 'Single and looking', icon: HeartIcon },
  { id: '6', title: 'Ambivert', icon: UserGroupIcon }
];

// Stats - Updated from new data
export const statsInfo: StatCategory[] = [
  { 
    category: 'Physical',
    items: [
      { id: '1', title: 'Height: 187 cm / 6.13 ft', icon: UserIcon },
      { id: '2', title: 'Weight: 99 kg / 218.3 lbs', icon: HeartIcon }
    ]
  },
  {
    category: 'Traits',
    items: [
      { id: '1', title: 'Totally Innocent', icon: FaceSmileIcon },
      { id: '2', title: 'Cuddle Buddy', icon: HeartIconSolid }
    ]
  },
  {
    category: 'Personality',
    items: [
      { id: '1', title: 'Overwhelmed fast', icon: HandRaisedIcon },
      { id: '2', title: 'Sensitive', icon: HeartIcon },
      { id: '3', title: 'Pretty shy', icon: FaceSmileIcon },
      { id: '4', title: 'Big Spoon', icon: HeartIconSolid }
    ]
  }
];

// Hobbies and Skills - Updated from new data
export const hobbies: InfoItem[] = [
  { id: '1', title: 'Front-end Dev', icon: CloudIcon },
  { id: '2', title: '3D Artist', icon: CubeIcon },
  { id: '3', title: 'Content Creator', icon: FilmIcon },
  { id: '4', title: 'Music Producer', icon: MusicalNoteIcon },
  { id: '5', title: 'Social Media', icon: PhotoIcon },
  { id: '6', title: 'PC/VR Gaming', icon: ComputerDesktopIcon }
];

// Languages - Updated from new data
export const languages: Language[] = [
  { id: '1', name: 'Austrian', flag: '🇦🇹' },
  { id: '2', name: 'German', flag: '🇩🇪' },
  { id: '3', name: 'American', flag: '🇺🇸' },
  { id: '4', name: 'Bosnian', flag: '🇧🇦' }
];

// Tech Setup - With local images and manufacturer links
// Sorted: PC Components → Peripherals → Portables → VR Gear
export const techSetup: TechItem[] = [
  // === PC Components ===
  { 
    id: '1', 
    category: 'CPU', 
    name: 'Ryzen 9', 
    spec: '7950X3D',
    image: '/img/tech/cpu.jpg',
    url: 'https://www.amd.com/en/products/processors/desktops/ryzen/7000-series/amd-ryzen-9-7950x3d.html',
    color: 'from-orange-500/20 to-red-500/20'
  },
  { 
    id: '2', 
    category: 'Motherboard', 
    name: 'MAG X670E', 
    spec: 'TOMAHAWK WIFI',
    image: '/img/tech/motherboard.png',
    url: 'https://www.msi.com/Motherboard/MAG-X670E-TOMAHAWK-WIFI',
    color: 'from-red-500/20 to-red-700/20'
  },
  { 
    id: '3', 
    category: 'RAM', 
    name: 'VENGEANCE', 
    spec: '96GB DDR5',
    image: '/img/tech/ram.webp',
    url: 'https://www.corsair.com/p/memory/cmh96gx5m2b5600c40/vengeance-rgb-96gb-2x48gb-ddr5-dram-5600mhz-c40-memory-kit-black-cmh96gx5m2b5600c40',
    color: 'from-yellow-500/20 to-amber-500/20'
  },
  { 
    id: '4', 
    category: 'Cooler', 
    name: 'TITAN 360 QX', 
    spec: 'iCUE LINK LCD AIO',
    image: '/img/tech/cooler.png',
    url: 'https://www.corsair.com/us/en/p/bundles/titan-360-qx-lcd-aio-combo-black/titan-360-qx-lcd-aio-combo-black',
    color: 'from-cyan-500/20 to-pink-500/20'
  },
  { 
    id: '5', 
    category: 'GPU', 
    name: 'RTX 5090', 
    spec: '32G VANGUARD SOC',
    image: '/img/tech/gpu.png',
    url: 'https://www.msi.com/Graphics-Card/GeForce-RTX-5090-32G-VANGUARD-SOC',
    color: 'from-green-500/20 to-emerald-500/20'
  },
  { 
    id: '6', 
    category: 'Case', 
    name: '500D RGB SE', 
    spec: 'Obsidian Series',
    image: '/img/tech/case.png',
    url: 'https://www.corsair.com/p/pc-cases/cc-9011139-ww/obsidian-series-500d-rgb-se-premium-mid-tower-case-cc-9011139-ww',
    color: 'from-gray-600/20 to-gray-800/20'
  },
  // === Storage ===
  { 
    id: '7', 
    category: 'NAS', 
    name: 'Synology', 
    spec: 'DS725+ • 40+ TB',
    image: '/img/tech/nas.png',
    url: 'https://www.synology.com/products/DS725+',
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  // === Peripherals ===
  { 
    id: '8', 
    category: 'Monitor', 
    name: 'MAG272CQR', 
    spec: '27" 165Hz 1ms',
    image: '/img/tech/monitor.png',
    url: 'https://www.msi.com/Monitor/Optix-MAG272CQR',
    color: 'from-red-500/20 to-gray-700/20'
  },
  { 
    id: '9', 
    category: 'Keyboard', 
    name: 'K65 PLUS', 
    spec: 'Wireless RGB',
    image: '/img/tech/keyboard.png',
    url: 'https://www.corsair.com/us/en/p/keyboards/ch-91d401l-na/k65-plus-wireless-75-percent-rgb-mechanical-gaming-keyboard-ch-91d401l-na',
    color: 'from-purple-500/20 to-violet-500/20'
  },
  { 
    id: '10', 
    category: 'Mouse', 
    name: 'SCIMITAR', 
    spec: 'ELITE Wireless',
    image: '/img/tech/mouse.webp',
    url: 'https://www.corsair.com/us/en/p/gaming-mouse/ch-9314311-na/scimitar-elite-wireless-mmo-gaming-mouse-ch-9314311-na',
    color: 'from-pink-500/20 to-rose-500/20'
  },
  // === Portable Devices ===
  { 
    id: '11', 
    category: 'Laptop', 
    name: 'MacBook', 
    spec: 'M1 Pro 14" • 512GB • 24GB',
    image: '/img/tech/macbook.png',
    url: 'https://www.apple.com/macbook-pro/',
    color: 'from-gray-400/20 to-gray-600/20'
  },
  { 
    id: '12', 
    category: 'Handheld', 
    name: 'Steam Deck', 
    spec: 'OLED 1TB',
    image: '/img/tech/steamdeck.png',
    url: 'https://www.steamdeck.com/en/oled',
    color: 'from-indigo-600/20 to-slate-700/20'
  },
  // === VR Gear ===
  { 
    id: '13', 
    category: 'VR Headset', 
    name: 'Quest 2', 
    spec: 'Standalone + PCVR',
    image: '/img/tech/quest.png',
    url: 'https://www.meta.com/quest/products/quest-2/',
    color: 'from-blue-400/20 to-indigo-500/20'
  },
  { 
    id: '14', 
    category: 'Basestations', 
    name: 'Valve', 
    spec: '2× Lighthouse 2.0',
    image: '/img/tech/lighthouse.png',
    url: 'https://www.valvesoftware.com/index/base-stations',
    color: 'from-slate-500/20 to-gray-500/20'
  },
  { 
    id: '15', 
    category: 'Controllers', 
    name: 'Index', 
    spec: '2× Knuckles',
    image: '/img/tech/knuckles.png',
    url: 'https://www.valvesoftware.com/index/controllers',
    color: 'from-indigo-500/20 to-purple-500/20'
  },
  { 
    id: '16', 
    category: 'VR Tracking', 
    name: 'Full Body', 
    spec: '4× Vive 3.0 Trackers',
    image: '/img/tech/tracker.png',
    url: 'https://www.vive.com/us/accessory/vive-tracker/',
    color: 'from-teal-500/20 to-cyan-500/20'
  }
];

// VR Platforms - With images and links
export const platforms: PlatformItem[] = [
  { 
    id: '1', 
    name: 'Resonite', 
    description: 'Social VR & Creation',
    image: '/img/vr/resonite.png',
    url: 'https://resonite.com/',
    color: 'from-orange-500/20 to-yellow-500/20'
  },
  { 
    id: '2', 
    name: 'VRChat', 
    description: 'Social VR Platform',
    image: '/img/vr/VRChat.png',
    url: 'https://hello.vrchat.com/',
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  { 
    id: '3', 
    name: 'Somnium Space', 
    description: 'Open Metaverse',
    image: '/img/vr/somniumSpace.png',
    url: 'https://somnium.space/',
    color: 'from-purple-500/20 to-indigo-500/20'
  }
];
