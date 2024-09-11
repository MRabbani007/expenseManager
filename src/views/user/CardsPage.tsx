import BankCard from "@/components/BankCard";
import { Button } from "@/components/ui/button";
import CardPayMethod from "@/features/dashboard/CardPayMethod";
import {
  Banknote,
  Coins,
  CreditCard,
  Ellipsis,
  GraduationCap,
  PaintRoller,
  PiggyBank,
  Wallet,
} from "lucide-react";

const CASH_PAYMENT = [
  { label: "Cash", value: "cash", icon: <Banknote size={30} /> },
  { label: "Wallet", value: "wallet", icon: <Wallet size={30} /> },
  { label: "Coins", value: "coins", icon: <Coins size={30} /> },
];

const SAVINGS = [
  { label: "College", value: "college", icon: <GraduationCap size={30} /> },
  { label: "Remont", value: "remont", icon: <PaintRoller size={30} /> },
  { label: "Others", value: "others", icon: <Ellipsis size={30} /> },
];

const temp = { icon: GraduationCap };

const CARD: BankCard = {
  id: "asd",
  bank: "Halyk Bank",
  nameOnCard: "Mohamad Rabbani",
  expDate: "01/09",
  masked: "1234",
};

export default function CardsPage() {
  return (
    <main>
      <header className="flex items-stretch gap-2">
        <CreditCard size={30} />
        <div className="flex-1">
          <h1 className="font-semibold text-xl">Accounts & Cards</h1>
          <p className="text-sm">View & manage your accounts</p>
        </div>
        <Button>Add</Button>
      </header>
      {false && <temp.icon size={30} />}
      <div className="flex flex-wrap items-center gap-4">
        <BankCard cardDetails={CARD} className="from-green-700 to-green-950" />
        <BankCard cardDetails={CARD} className="from-green-700 to-green-950" />
        <BankCard cardDetails={CARD} className="from-green-700 to-green-950" />
        {/* <CardPayMethod
          title="Kaspi Bank"
          name="Mohamad Rabbani"
          className="from-red-700 to-red-950"
        />
        <CardPayMethod
          title="Kaspi Bank"
          name="Mohamad Rabbani"
          className="from-red-700 to-red-950"
        /> */}
      </div>
      <header className="flex items-center gap-2 border-b-2 border-zinc-200 pb-2">
        <Banknote size={30} />
        <h2 className="font-bold text-2xl">Cash</h2>
      </header>
      <div className="flex flex-wrap items-stretch gap-2">
        {CASH_PAYMENT.map((item, idx) => (
          <div
            key={idx}
            title={item.label}
            className="flex flex-col items-center gap-2 bg-zinc-100 rounded-lg py-2 px-6"
          >
            {item.icon}
            <p className="font-semibold text-mono">{item.label}</p>
          </div>
        ))}
      </div>
      <header className="flex items-center gap-2 border-b-2 border-zinc-200 pb-2">
        <PiggyBank size={30} />
        <h2 className="font-bold text-2xl">Savings</h2>
      </header>
      <div className="flex flex-wrap items-stretch gap-2">
        {SAVINGS.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-2 bg-zinc-100 rounded-lg py-2 px-6"
          >
            {item.icon}
            <p className="font-semibold text-mono">{item.label}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
