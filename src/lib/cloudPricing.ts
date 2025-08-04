// Static cloud storage pricing data for TIM
export interface CloudProvider {
  id: string;
  name: string;
  logo?: string;
  tiers: CloudTier[];
}

export interface CloudTier {
  id: string;
  name: string;
  storage: number; // GB
  monthlyPrice: number; // EUR
  annualPrice: number; // EUR
  features: string[];
}

export interface SavingsCalculation {
  provider: string;
  tier: string;
  monthlySavings: number;
  annualSavings: number;
  breakEvenMonths: number;
  timStorage: number; // GB
  timCost: number; // EUR one-time
}

// Static pricing data (updated with TIM firmware releases)
export const cloudProviders: CloudProvider[] = [
  {
    id: 'onedrive',
    name: 'Microsoft OneDrive',
    tiers: [
      {
        id: 'basic',
        name: 'OneDrive Basic',
        storage: 100,
        monthlyPrice: 2,
        annualPrice: 20,
        features: ['100 GB storage', 'Office Online', 'Email support']
      },
      {
        id: 'personal',
        name: 'Microsoft 365 Personal',
        storage: 1000,
        monthlyPrice: 7,
        annualPrice: 69,
        features: ['1 TB storage', 'Office apps', 'Premium features']
      },
      {
        id: 'family',
        name: 'Microsoft 365 Family',
        storage: 6000,
        monthlyPrice: 10,
        annualPrice: 99,
        features: ['6 TB total storage', 'Up to 6 users', 'Office apps']
      }
    ]
  },
  {
    id: 'icloud',
    name: 'Apple iCloud+',
    tiers: [
      {
        id: '50gb',
        name: 'iCloud+ 50GB',
        storage: 50,
        monthlyPrice: 0.99,
        annualPrice: 11.88,
        features: ['50 GB storage', 'Private Relay', 'Hide My Email']
      },
      {
        id: '200gb',
        name: 'iCloud+ 200GB',
        storage: 200,
        monthlyPrice: 2.99,
        annualPrice: 35.88,
        features: ['200 GB storage', 'Family sharing', 'Private Relay']
      },
      {
        id: '2tb',
        name: 'iCloud+ 2TB',
        storage: 2000,
        monthlyPrice: 9.99,
        annualPrice: 119.88,
        features: ['2 TB storage', 'HomeKit Secure Video', 'Private Relay']
      }
    ]
  },
  {
    id: 'google',
    name: 'Google Drive',
    tiers: [
      {
        id: 'basic',
        name: 'Google One Basic',
        storage: 100,
        monthlyPrice: 1.99,
        annualPrice: 19.99,
        features: ['100 GB storage', 'Premium support', 'Shared with family']
      },
      {
        id: 'standard',
        name: 'Google One Standard',
        storage: 200,
        monthlyPrice: 2.99,
        annualPrice: 29.99,
        features: ['200 GB storage', 'Premium support', 'VPN included']
      },
      {
        id: 'premium',
        name: 'Google One Premium',
        storage: 2000,
        monthlyPrice: 9.99,
        annualPrice: 99.99,
        features: ['2 TB storage', 'Premium features', 'Advanced protection']
      }
    ]
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    tiers: [
      {
        id: 'plus',
        name: 'Dropbox Plus',
        storage: 2000,
        monthlyPrice: 9.99,
        annualPrice: 99.99,
        features: ['2 TB storage', 'Smart Sync', '30-day recovery']
      },
      {
        id: 'family',
        name: 'Dropbox Family',
        storage: 2000,
        monthlyPrice: 16.99,
        annualPrice: 169.99,
        features: ['2 TB per user', 'Up to 6 users', 'Family room']
      }
    ]
  }
];

export class CloudPricingCalculator {
  // TIM hardware costs (one-time purchase)
  private readonly timPricing = {
    'tim-tiny': { storage: 256, cost: 149 },
    'tim-just': { storage: 512, cost: 299 },
    'tim-pro': { storage: 1000, cost: 499 },
    'tim-max': { storage: 2000, cost: 799 }
  };

  calculateSavings(
    timModel: keyof typeof this.timPricing,
    storageNeeded: number
  ): SavingsCalculation[] {
    const tim = this.timPricing[timModel];
    const calculations: SavingsCalculation[] = [];

    cloudProviders.forEach(provider => {
      provider.tiers.forEach(tier => {
        if (tier.storage >= storageNeeded) {
          const monthlySavings = tier.monthlyPrice;
          const annualSavings = tier.annualPrice;
          const breakEvenMonths = Math.ceil(tim.cost / tier.monthlyPrice);

          calculations.push({
            provider: provider.name,
            tier: tier.name,
            monthlySavings,
            annualSavings,
            breakEvenMonths,
            timStorage: tim.storage,
            timCost: tim.cost
          });
        }
      });
    });

    return calculations.sort((a, b) => a.annualSavings - b.annualSavings);
  }

  getTotalLifetimeSavings(
    timModel: keyof typeof this.timPricing,
    storageNeeded: number,
    yearsOfUse: number = 5
  ): { provider: string; tier: string; totalSavings: number }[] {
    const savings = this.calculateSavings(timModel, storageNeeded);
    const tim = this.timPricing[timModel];

    return savings.map(calc => ({
      provider: calc.provider,
      tier: calc.tier,
      totalSavings: (calc.annualSavings * yearsOfUse) - tim.cost
    }));
  }

  getRecommendedTIMModel(storageNeeded: number): {
    model: keyof typeof this.timPricing;
    name: string;
    cost: number;
    storage: number;
  } {
    const models = Object.entries(this.timPricing)
      .filter(([_, specs]) => specs.storage >= storageNeeded)
      .sort((a, b) => a[1].cost - b[1].cost);

    if (models.length === 0) {
      // If storage needed exceeds max TIM capacity, recommend the largest
      const maxModel = Object.entries(this.timPricing)
        .sort((a, b) => b[1].storage - a[1].storage)[0];
      
      return {
        model: maxModel[0] as keyof typeof this.timPricing,
        name: maxModel[0].replace('tim-', 'TIM ').replace('-', ' ').toUpperCase(),
        cost: maxModel[1].cost,
        storage: maxModel[1].storage
      };
    }

    const recommended = models[0];
    return {
      model: recommended[0] as keyof typeof this.timPricing,
      name: recommended[0].replace('tim-', 'TIM ').replace('-', ' ').toUpperCase(),
      cost: recommended[1].cost,
      storage: recommended[1].storage
    };
  }
}

export const cloudPricing = new CloudPricingCalculator();