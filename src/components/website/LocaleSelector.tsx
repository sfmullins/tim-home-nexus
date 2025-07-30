import React from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';

const LocaleSelector = () => {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <Select value={locale} onValueChange={setLocale}>
        <SelectTrigger className="w-24 border-0 bg-transparent">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en-IE">🇮🇪 IE</SelectItem>
          <SelectItem value="en-UK">🇬🇧 UK</SelectItem>
          <SelectItem value="en-US">🇺🇸 US</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default LocaleSelector;