import { ProductConfig } from '@/types/product';

export const products: ProductConfig[] = [
  {
    id: 'tiny-tim',
    name: 'Tiny TIM',
    basePrice: 299,
    processor: 'N97',
    baseRam: '8GB',
    baseStorage: '256GB M.2',
    features: ['File Server', 'Smart Home', 'VPN Access'],
    allowsJailbreak: false,
    popular: false
  },
  {
    id: 'just-tim',
    name: 'Just TIM',
    basePrice: 449,
    processor: 'N100',
    baseRam: '16GB',
    baseStorage: '500GB M.2',
    features: ['File Server', 'Smart Home', 'VPN Access'],
    ramUpgrades: [
      { id: 'ram-32gb', name: '32GB', price: 100, description: 'Upgrade to 32GB RAM' }
    ],
    storageUpgrades: [
      { id: 'storage-1tb', name: '1TB M.2', price: 100, description: 'Upgrade to 1TB storage' },
      { id: 'storage-2tb', name: '2TB M.2', price: 250, description: 'Upgrade to 2TB storage' }
    ],
    allowsJailbreak: false,
    popular: true,
    savings: '€50 vs upgrading Tiny TIM'
  },
  {
    id: 'tim-pro',
    name: 'TIM Pro',
    basePrice: 699,
    processor: 'N200',
    baseRam: '24GB (2x12)',
    baseStorage: '1TB M.2',
    features: ['File Server', 'Smart Home', 'VPN Access'],
    storageUpgrades: [
      { id: 'storage-2tb', name: '2TB M.2', price: 150, description: 'Upgrade to 2TB storage' }
    ],
    maxRam: '24GB (max)',
    allowsJailbreak: true,
    jailbreakPrice: 350,
    popular: false
  },
  {
    id: 'tim-max',
    name: 'TIM Max',
    basePrice: 1299,
    processor: 'Ryzen 5',
    baseRam: '64GB',
    baseStorage: '2TB M.2',
    features: ['All Features Included'],
    externalUpgrades: [
      { id: 'ext-4tb', name: '4TB External', price: 200, description: 'Add 4TB external storage' },
      { id: 'ext-8tb', name: '8TB External', price: 400, description: 'Add 8TB external storage' },
      { id: 'ext-10tb', name: '10TB External', price: 600, description: 'Add 10TB external storage' }
    ],
    gpuUpgrades: [
      { id: 'rtx-3060', name: 'RTX 3060', price: 300, description: 'External RTX 3060 GPU' },
      { id: 'rtx-4060', name: 'RTX 4060', price: 500, description: 'External RTX 4060 GPU' },
      { id: 'rtx-4070', name: 'RTX 4070', price: 700, description: 'External RTX 4070 GPU' },
      { id: 'rtx-5060', name: 'RTX 5060', price: 800, description: 'External RTX 5060 GPU (Pre-order)' }
    ],
    maxRam: '64GB (max)',
    includesJailbreak: true,
    allowsJailbreak: true,
    popular: false
  }
];

export const softwareAddons = [
  {
    id: 'game-streaming',
    name: 'Game Streaming',
    description: 'Stream games from your TIM to any device',
    fullPrice: 199,
    bundlePrice: 99,
    availableFor: ['just-tim', 'tim-pro', 'tim-max']
  },
  {
    id: 'downloads',
    name: 'Download Manager',
    description: 'Advanced download management and automation',
    fullPrice: 99,
    bundlePrice: 49,
    availableFor: ['just-tim', 'tim-pro', 'tim-max']
  }
];