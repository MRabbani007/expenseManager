import React, { useContext, useEffect, useState } from "react";
// Imported Contect
import { UserContext } from "../context/UserState";
// Imported Data
import { ACTIONS, SERVER, currencyExchange, getMonth } from "../data/utils";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const CardIncomeExpense = () => {
  const { auth } = useAuth();
  const { userName, theme } = useContext(UserContext);
  const axiosPrivate = useAxiosPrivate();

  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const budget = 400000;
  const currency = "T";
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    setRatio((expenses / budget).toFixed(2) * 100);
  }, [budget, expenses]);

  useEffect(() => {
    if (auth?.user && auth?.roles) {
      getTransaction();
    }
  }, [auth?.user]);

  const getTransaction = async () => {
    let { firstDay, lastDay } = getMonth();
    let response = await axiosPrivate.post(SERVER.GET_TRANSACTION, {
      roles: auth?.roles,
      action: {
        type: ACTIONS.GET_TRANSACTION,
        payload: {
          userName: auth?.user,
          startDate: firstDay,
          endDate: lastDay,
        },
      },
    });
    if (!!response?.data && Array.isArray(response?.data)) {
      setTransactions(response.data);
    }
  };

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
        {/* Budget */}
        <div className="text-end text-blue-500">
          <span className="font-semibold">Budget:</span>
          {currency + budget.toLocaleString()}
        </div>
        {/* Progress Bar */}
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
        {/* Spending */}
        <div className="text-red-500">
          <span className="font-semibold">Spending:</span>
          {currency + expenses.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default CardIncomeExpense;
