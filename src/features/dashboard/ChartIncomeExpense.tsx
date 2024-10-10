import { format } from "date-fns";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    month: "Jan",
    income: 100,
    expense: 80,
  },
  {
    month: "Feb",
    income: 100,
    expense: 85,
  },
  {
    month: "Mar",
    income: 100,
    expense: 90,
  },
  {
    month: "Apr",
    income: 100,
    expense: 90,
  },
];

export default function ChartIncomeExpense() {
  const [month, setMonth] = useState(new Date().getMonth());

  const handlePrev = () => {
    setMonth((curr) => curr - 1);
  };
  const handleNext = () => {
    setMonth((curr) => curr + 1);
  };

  return (
    <div className="flex-1 bg-zinc-200 p-4 rounded-xl">
      <div className="flex items-center gap-4 group">
        <p className="text-xl font-bold">Analysis</p>
        <button
          className="ml-auto opacity-0 group-hover:opacity-100 duration-200"
          onClick={handlePrev}
        >
          <ChevronLeft />
        </button>
        <span className="text-base min-w-8 text-center">
          {format(new Date(new Date().setMonth(month)), "LLL")}
        </span>
        <button
          onClick={handleNext}
          className=" opacity-0 group-hover:opacity-100 duration-200"
        >
          <ChevronRight />
        </button>
      </div>
      <div className="h-[300px] flex items-end">
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#8884d8" />
            <Bar dataKey="expense" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
