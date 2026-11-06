'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { COUNTRY_LIST, type CountryCode } from '@/lib/countries';
import { useCountry } from './country-provider';

export function CountrySwitcher() {
  const { country, setCountry } = useCountry();

  return (
    <Select value={country} onValueChange={(v) => setCountry(v as CountryCode)}>
      <SelectTrigger
        className="w-[140px] h-9 border-slate-300 bg-white"
        aria-label="Seleccionar país"
      >
        <SelectValue placeholder="País" />
      </SelectTrigger>
      <SelectContent>
        {COUNTRY_LIST.map((c) => (
          <SelectItem key={c.code} value={c.code}>
            <span className="mr-2">{c.flag}</span>
            <span>{c.name}</span>
            <span className="ml-2 text-xs text-slate-500">{c.currencySymbol}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
