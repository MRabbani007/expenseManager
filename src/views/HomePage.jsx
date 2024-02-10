import React from "react";
import Navbar from "../components/Navbar";
import { GlobalProvider } from "../context/GlobalState";
import CardHeader from "../components/CardHeader";
import CardIncomeExpense from "../components/CardIncomeExpense";

import { UserProvider } from "../context/UserState";
import CardPayment from "../components/CardPayment";

const HomePage = () => {
  return (
    <UserProvider>
      <GlobalProvider>
        <Navbar />
        <div className="page-container px-2 flex flex-col gap-3">
          <CardHeader />
          <CardIncomeExpense />
          <CardPayment />
        </div>
      </GlobalProvider>
    </UserProvider>
  );
};

export default HomePage;
