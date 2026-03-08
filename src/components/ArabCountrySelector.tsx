import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { arabCountries, getArabCountriesByRegion, regionLabels, regionOrder } from "@/data/arabCountries";

interface ArabCountrySelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const ArabCountrySelector: React.FC<ArabCountrySelectorProps> = ({ value, onValueChange, className }) => {
  const grouped = getArabCountriesByRegion();

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className || "h-11"}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {regionOrder.map(region => {
          const group = grouped[region];
          if (!group?.length) return null;
          return (
            <SelectGroup key={region}>
              <SelectLabel className="font-bold text-primary">{regionLabels[region]}</SelectLabel>
              {group.map(c => (
                <SelectItem key={c.code} value={c.code}>
                  {c.nameAr}
                </SelectItem>
              ))}
            </SelectGroup>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default ArabCountrySelector;
