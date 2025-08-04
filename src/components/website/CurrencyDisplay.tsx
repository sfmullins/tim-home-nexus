import React from 'react';
import { useLocale } from '@/contexts/LocaleContext';

interface CurrencyDisplayProps {
  amount: number;
  className?: string;
}

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ amount, className = '' }) => {
  const { currency, currencySymbol } = useLocale();

  // Convert EUR base prices to other currencies (mock conversion for demo)
  const convertPrice = (baseAmount: number) => {
    switch (currency) {
      case 'GBP':
        return Math.round(baseAmount * 0.85); // Mock conversion rate
      case 'USD':
        return Math.round(baseAmount * 1.10); // Mock conversion rate
      default:
        return Math.round(baseAmount); // EUR - always round to whole numbers
    }
  };

  const convertedAmount = convertPrice(amount);

  return (
    <span className={className}>
      {currencySymbol}{convertedAmount}
    </span>
  );
};

export default CurrencyDisplay;