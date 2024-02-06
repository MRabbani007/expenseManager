import React, { useContext, useEffect, useState } from "react";
import { fetchTransaction } from "../data/serverFunctions";
import { GlobalContext } from "../context/GlobalState";
import { ACTIONS, currencyExchange, getMonth } from "../data/utils";
import { UserContext } from "../context/UserState";

const CardIncomeExpense = () => {
  const { userName, theme } = useContext(UserContext);

  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const budget = 400000;
  const currency = "T";
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    setRatio((expenses / budget).toFixed(2) * 100);
    getTransaction();
  }, [budget, expenses]);

  async function getTransaction() {
    let { firstDay, lastDay } = getMonth();
    let response = await fetchTransaction({
      type: ACTIONS.GET_TRANSACTION,
      payload: { userName: userName, startDate: firstDay, endDate: lastDay },
    });
    if (!response.includes("Error") && Array.isArray(response)) {
      setTransactions(response);
    }
  }

  const calculateIncome = () => {
    let expenses = 0;
    let income = 0;
    transactions.map((transaction) => {
      let amount = transaction.amount;
      if (transaction.currency === "dollar") {
        amount = currencyExchange(amount, "USD", "KZT");
      }
      if (transaction.type === "income") {
        income += 1 * amount;
      } else if (transaction.type === "expense") {
        expenses += 1 * amount;
      }
    });
    return { expenses, income };
  };

  useEffect(() => {
    if (transactions.length !== 0) {
      let { expenses, income } = calculateIncome();
      setIncome(income);
      setExpenses(expenses);
    }
  }, [transactions]);

  return (
    <div
      className={`border-red-500 rounded-lg w-[300px] font-mono`}
      style={{
        boxShadow: "4px 4px 10px 1px" + theme.shadow,
      }}
    >
      <div
        className="text-red-50 font-normal text-center p-1 rounded-t-lg"
        style={{
          backgroundColor: theme.navbar_bg,
          color: theme.navbar_text,
        }}
      >
        February, 2024
      </div>
      <div className="text-green-500 my-2 mx-5">
        <span className="font-semibold">Income:</span>{" "}
        {currency + income.toLocaleString()}
      </div>
      <div className="my-5 mx-5 pb-3">
        <div className="text-end text-blue-500">
          <span className="font-semibold">Budget:</span>
          {currency + budget.toLocaleString()}
        </div>
        <div className="h-fit bg-slate-200 outline-none rounded-xl overflow-hidden">
          <div
            className={
              " h-full bg-green-600 text-white rounded-xl outline-none text-center bg-blend-overlay shrink-0"
            }
            style={{ width: ratio + "%" }}
          >
            {ratio + "%"}
          </div>
        </div>
        <div className="text-red-500">
          <span className="font-semibold">Spending:</span>
          {currency + expenses.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default CardIncomeExpense;
