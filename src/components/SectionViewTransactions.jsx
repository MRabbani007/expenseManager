import React, { useContext } from "react";
// Imported Components
import CardTableHeader from "./CardTableHeader";
import CardExpense from "./CardExpense";

const SectionViewTransactions = () => {
  const transactions = [];

  return (
    <table className="flex-1">
      <thead>
        <CardTableHeader />
      </thead>
      <tbody>
        {transactions.map((transaction, index) => {
          return (
            <CardExpense transaction={transaction} key={index} index={index} />
          );
        })}
      </tbody>
    </table>
  );
};

export default SectionViewTransactions;
