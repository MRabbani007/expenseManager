import { Eye, Zap } from "lucide-react";
import CardHeader from "../components/CardHeader";
import CardIncomeExpense from "../components/CardIncomeExpense";
import CardPayment from "../components/CardPayment";

const HomePage = () => {
  return (
    <main className="bg-stone-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center h-full px-8">
        <div className="flex flex-col">
          <p className="flex items-center">
            <Zap
              size={24}
              className="bg-orange-500 rounded-full text-white p-1 border-[1px] border-black"
            />
            <span className="h-[1px] w-5 bg-black"></span>
            <span className="py-1 px-2 bg-white border-[1px] border-black rounded-full text-xs">
              Explore a 14 day free trial
            </span>
          </p>
          <p className="font-light text-6xl text-stone-800 my-6">
            Managing money made <span className="font-semibold">simple</span>
          </p>
          <form className="flex flex-wrap items-stretch bg-stone-300 rounded-full max-w-[400px]">
            <input
              type="email"
              placeholder="yourEmail@example.com"
              className="flex-1 bg-transparent outline-none border-none rounded-full px-4"
            />
            <button className="py-2 px-4 bg-sky-800 hover:bg-sky-700 duration-200 text-white rounded-full m-1 font-extralight text-nowrap">
              Get Started
            </button>
          </form>
          <p className="text-stone-600 border-t-2 border-stone-600 pt-4 mt-10">
            #1 Most downloaded personal finance app
          </p>
          <p className="text-stone-600 flex items-center gap-2">
            <Eye size={24} />
            Over 30M users trust Wallet
          </p>
        </div>
        <div></div>
      </div>
    </main>
  );
};

export default HomePage;
