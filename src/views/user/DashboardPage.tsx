import CardIncomeExpense from "@/features/dashboard/CardIncomeExpense";
import { CATEGORIES } from "@/lib/data";
import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <main>
      <header className="flex items-center gap-2 border-b-2 border-zinc-200 pb-2">
        <LayoutDashboard size={30} />
        <h1 className="font-bold text-2xl">Dashboard</h1>
      </header>
      <CardIncomeExpense />
      <div className="flex flex-wrap items-stretch gap-2">
        {CATEGORIES.map((item, idx) => (
          <div
            key={idx}
            title={item.label}
            className="flex flex-col items-center gap-2 bg-zinc-100 rounded-lg py-2 px-6"
          >
            {item.icon}
            {/* <p className="font-semibold text-mono">{item.label}</p> */}
          </div>
        ))}
      </div>
      {/* <CardPayment /> */}
    </main>
  );
}
