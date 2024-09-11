import CardIncomeExpense from "@/features/dashboard/CardIncomeExpense";
import { CATEGORIES } from "@/lib/data";
import { format } from "date-fns";
import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <main>
      <header className="flex items-stretch gap-2">
        <LayoutDashboard size={30} />
        <div className="flex-1">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <p className="text-sm">Welcome Back</p>
        </div>
        <div className="my-auto">{format(new Date(), "EEE dd MMMM")}</div>
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
