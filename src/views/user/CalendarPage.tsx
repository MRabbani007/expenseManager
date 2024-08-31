import {
  CalendarDays,
  Droplet,
  Droplets,
  Phone,
  ShieldCheck,
  Smartphone,
  Wifi,
  Zap,
} from "lucide-react";

const BILLS = [
  { label: "Electricity", value: "electricity", icon: <Zap size={30} /> },
  { label: "Hot Water", value: "hot_water", icon: <Droplet size={30} /> },
  { label: "Cold Water", value: "cold_water", icon: <Droplets size={30} /> },
  { label: "Telephone", value: "electricity", icon: <Phone size={30} /> },
  { label: "Mobile", value: "electricity", icon: <Smartphone size={30} /> },
  { label: "Internet", value: "electricity", icon: <Wifi size={30} /> },
  { label: "Insurance", value: "electricity", icon: <ShieldCheck size={30} /> },
];
export default function CalendarPage() {
  return (
    <main>
      <header className="flex items-center gap-2 border-b-2 border-zinc-200 pb-2">
        <CalendarDays size={30} />
        <h1 className="font-bold text-2xl">Calendar</h1>
      </header>
      <header className="flex items-center gap-2 border-b-2 border-zinc-200 pb-2">
        <CalendarDays size={30} />
        <h2 className="font-bold text-2xl">Bills & Payments</h2>
      </header>
      <div className="flex flex-wrap items-stretch gap-4">
        {BILLS.map((item, idx) => (
          <div
            key={idx}
            title={item.label}
            className="flex flex-col items-center gap-2 p-2 bg-zinc-100 rounded-xl"
          >
            {item.icon}
            {/* <span>{item.label}</span> */}
          </div>
        ))}
      </div>
    </main>
  );
}
