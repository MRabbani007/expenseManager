import React from "react";
import { GlobalProvider } from "../context/GlobalState";
import Navbar from "../components/Navbar";
import CardHeader from "../components/CardHeader";
import CardIncomeExpense from "../components/CardIncomeExpense";
import CardTimePeriod from "../components/CardTimePeriod";
import SectionViewTransactions from "../components/SectionViewTransactions";

const ReportPage = () => {
  return (
    <GlobalProvider>
      <Navbar />
      <div className="pt-[60px] px-2">
        <CardTimePeriod />
        <SectionViewTransactions />
      </div>
    </GlobalProvider>
  );
};

export default ReportPage;
