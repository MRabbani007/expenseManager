import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { GlobalContext, GlobalProvider } from "../context/GlobalState";
import CardHeader from "../components/CardHeader";
import CardIncomeExpense from "../components/CardIncomeExpense";
import SectionViewTransactions from "../components/SectionViewTransactions";

const HomePage = () => {
  return (
    <GlobalProvider>
      <Navbar />
      <div className="pt-[60px] px-2">
        <CardHeader />
        <CardIncomeExpense />
      </div>
    </GlobalProvider>
  );
};

export default HomePage;
