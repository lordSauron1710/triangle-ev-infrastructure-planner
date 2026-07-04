import { CalendarDays, MapPin, SlidersHorizontal, TableProperties } from "lucide-react";

const facts = [
  { value: "3", label: "synthetic locations", icon: MapPin },
  { value: "3", label: "planning periods", icon: CalendarDays },
  { value: "3", label: "decision variables", icon: SlidersHorizontal },
  { value: "4", label: "scenarios", icon: TableProperties },
];

export function FactsRail() {
  return (
    <section className="facts-rail" aria-label="Version zero model scope">
      {facts.map(({ value, label, icon: Icon }) => (
        <div key={label}>
          <Icon size={25} strokeWidth={1.7} />
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}
