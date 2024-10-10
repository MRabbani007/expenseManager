import { useAppSelector } from "@/app/hooks";
import { selectAuth } from "@/features/auth/authSlice";
import CardPayments from "@/features/dashboard/CardPayments";
import CardSalary from "@/features/dashboard/CardSalary";
import ChartBudget from "@/features/dashboard/ChartBudget";
import ChartIncomeExpense from "@/features/dashboard/ChartIncomeExpense";
import ChartMonthSpending from "@/features/dashboard/ChartMonthSpending";
import { CATEGORIES } from "@/lib/data";
import { format } from "date-fns";

export default function DashboardPage() {
  const auth = useAppSelector(selectAuth);

  return (
    <main className="">
      <header className="flex items-stretch gap-4">
        <div className="size-16 rounded-full overflow-hidden">
          <img src="images/robot.jpg" className="object-cover w-full h-full" />
        </div>
        <div className="flex-1 my-auto">
          <h1 className="text-2xl font-semibold">{auth.username}</h1>
          <p className="text-sm">Welcome Back</p>
        </div>
        <div className="my-auto bg-gradient-to-br from-blue-800 to-sky-950 text-white p-4 rounded-lg">
          {format(new Date(), "EEE dd MMMM")}
        </div>
      </header>
      <div className="flex flex-wrap items-stretch gap-4">
        <ChartBudget />
        <CardSalary />
        <CardPayments />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <ChartMonthSpending />
        <ChartIncomeExpense />
      </div>
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
