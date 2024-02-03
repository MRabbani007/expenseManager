import React, { useEffect, useState } from "react";
// Imported Components
import { GlobalProvider } from "../context/GlobalState";
import Navbar from "../components/Navbar";
import SectionExpenseDesc from "../components/SectionExpenseDesc";
import SectionViewTransactions from "../components/SectionViewTransactions";
// Imported Data
import { getDate, loadLocal, saveLocal } from "../data/utils";
import SectionAddTransaction from "../components/SectionAddTransaction";
import SectionTransactionType from "../components/SectionTransactionType";

const AddTransactionsPage = () => {
  return (
    <GlobalProvider>
      <Navbar />
      <div className="min-h-screen pt-[60px] flex flex-col items-center">
        <SectionTransactionType />
        <SectionExpenseDesc />
        <div className="my-3">
          <SectionAddTransaction />
        </div>
        <SectionViewTransactions />
      </div>
    </GlobalProvider>
  );
};

export default AddTransactionsPage;
