import React, { useEffect, useState } from "react";
// Imported Components
import { GlobalProvider } from "../context/GlobalState";
import Navbar from "../components/Navbar";
import SectionExpenseDesc from "../components/SectionExpenseDesc";
import SectionViewTransactions from "../components/SectionViewTransactions";
import SectionAddTransaction from "../components/SectionAddTransaction";
import CardDatePayMethod from "../components/CardDatePayMethod";
import { UserProvider } from "../context/UserState";

const AddTransactionsPage = () => {
  return (
    <UserProvider>
      <GlobalProvider>
        <Navbar />
        <div className="page-container flex flex-col items-center">
          <CardDatePayMethod />
          <SectionExpenseDesc />
          <div className="my-3">
            <SectionAddTransaction />
          </div>
          <div className="px-2">
            <SectionViewTransactions />
          </div>
        </div>
      </GlobalProvider>
    </UserProvider>
  );
};

export default AddTransactionsPage;
