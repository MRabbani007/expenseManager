import {
  Zap,
  CarFront,
  Droplet,
  Droplets,
  Smartphone,
  Wifi,
} from "lucide-react";
import { ReactNode } from "react";

type Bill = {
  amount: number;
  description: string;
  dueDate: string | null;
  icon: ReactNode | null;
};

const bills: Bill[] = [
  { amount: 2000, description: "", dueDate: "07/10/2024", icon: <Zap /> },
  {
    amount: 3000,
    description: "",
    dueDate: "07/10/2024",
    icon: <CarFront />,
  },
  { amount: 4000, description: "", dueDate: "07/10/2024", icon: <Droplet /> },
  {
    amount: 5000,
    description: "",
    dueDate: "07/10/2024",
    icon: <Droplets />,
  },
  {
    amount: 6000,
    description: "",
    dueDate: "07/10/2024",
    icon: <Smartphone />,
  },
  { amount: 7000, description: "", dueDate: "07/10/2024", icon: <Wifi /> },
  { amount: 2000, description: "", dueDate: "07/10/2024", icon: <Zap /> },
  {
    amount: 3000,
    description: "",
    dueDate: "07/10/2024",
    icon: <CarFront />,
  },
  { amount: 4000, description: "", dueDate: "07/10/2024", icon: <Droplet /> },
  { amount: 4000, description: "", dueDate: "07/10/2024", icon: <Droplet /> },
];

export default function CardPayments() {
  return (
    <div className="flex-1 bg-zinc-200 p-4 rounded-xl space-y-4">
      <p className="text-xl font-bold">Bills & Payments</p>
      <div className="flex items-center gap-4 flex-wrap">
        {bills.map((item, idx) => (
          <RenderBill bill={item} key={idx} />
        ))}
      </div>
    </div>
  );
}

function RenderBill({ bill }: { bill: Bill }) {
  return (
    <div className="flex items-center gap-2 p-2 bg-zinc-100 rounded-lg">
      {bill.icon}
      <div>
        <p>{bill.amount.toLocaleString("en-US")}</p>
        <p className="text-xs">{bill.dueDate}</p>
      </div>
    </div>
  );
}
