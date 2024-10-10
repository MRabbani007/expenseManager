import FormAddPayment from "@/components/forms/FormAddPayment";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { BiPlus } from "react-icons/bi";

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
  const [add, setAdd] = useState(false);
  const [type, setType] = useState("");

  return (
    <main>
      <header className="flex items-stretch gap-2">
        <CalendarDays size={30} />
        <div className="flex-1">
          <h1 className="font-semibold text-2xl">Calendar</h1>
          <p className="text-sm">Upcoming Payments</p>
        </div>
      </header>
      {add ? <FormAddPayment setAdd={setAdd} type={type} /> : null}
      <section>
        <div className="flex items-center justify-between border-b-2 border-zinc-600 mb-4">
          <h2 className="font-bold text-2xl">Bills</h2>
          <Button
            onClick={() => {
              setAdd(true);
              setType("bill");
            }}
            variant="ghost"
          >
            <BiPlus size={30} />
          </Button>
        </div>
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
      </section>
      <section>
        <div className="flex items-center justify-between border-b-2 border-zinc-600 mb-4">
          <h2 className="font-bold text-2xl">Subscriptions</h2>
          <Button
            onClick={() => {
              setAdd(true);
              setType("subscription");
            }}
            variant="ghost"
          >
            <BiPlus size={30} />
          </Button>
        </div>
        <div className="flex flex-wrap items-stretch gap-4">
          No Subscriptions
        </div>
      </section>
      <section>
        <div className="flex items-center justify-between border-b-2 border-zinc-600 mb-4">
          <h2 className="font-bold text-2xl">Payments</h2>
          <Button
            onClick={() => {
              setAdd(true);
              setType("payment");
            }}
            variant="ghost"
          >
            <BiPlus size={30} />
          </Button>
        </div>
        <div className="flex flex-wrap items-stretch gap-4">No Payments</div>
      </section>
    </main>
  );
}
