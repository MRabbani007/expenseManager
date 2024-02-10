import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserState";

const temp = [
  {
    name: "rent",
    currency: "tenge",
    amount: 230000,
    dueDate: "2024-01-01",
    recurring: "false",
    frequency: "month",
  },
  {
    name: "bills",
    currency: "tenge",
    amount: 14000,
    dueDate: "2024-01-01",
    recurring: "false",
    frequency: "month",
  },
  {
    name: "bus",
    currency: "tenge",
    amount: 9000,
    dueDate: "2024-01-01",
    recurring: "false",
    frequency: "month",
  },
  {
    name: "water",
    currency: "tenge",
    amount: 1000,
    dueDate: "2024-01-01",
    recurring: "false",
    frequency: "week",
  },
];

const CardPayment = () => {
  const { userName, theme } = useContext(UserContext);
  const [payments, setPayments] = useState(temp);

  return (
    <div
      className={`border-red-500 shadow-lg shadow-red-700 rounded-lg w-[300px] font-mono`}
      style={{
        boxShadow: "4px 4px 10px 1px" + theme.shadow,
      }}
    >
      <div
        className="text-red-50 font-normal text-center p-1 rounded-t-lg bg-red-500"
        style={{
          backgroundColor: theme.navbar_bg,
          color: theme.navbar_text,
        }}
      >
        Payments
      </div>
      <table className="payment p-1">
        <thead className="mx-auto">
          <tr>
            <th>Due</th>
            <th>Name</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody className="mx-auto">
          {payments.length === 0
            ? "Add Payments"
            : payments.map((payment, index) => {
                let curr =
                  payment.currency === "tenge"
                    ? "T"
                    : payment.currency === "dollar"
                    ? "$"
                    : payment.currency;
                return (
                  <tr key={index}>
                    <td>{payment.dueDate}</td>
                    <td>{payment.name}</td>
                    <td>{curr + payment.amount}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default CardPayment;
