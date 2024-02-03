import React, { useContext, useEffect, useState } from "react";
import { FiEdit, FiSave } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GlobalContext } from "../context/GlobalState";
import { IoCloseOutline } from "react-icons/io5";
import { parseDate } from "../data/utils";

const CardExpense = ({ transaction, index }) => {
  const { deleteTransaction, editTransaction } = useContext(GlobalContext);
  const [edit, setEdit] = useState(false);
  const [editDate, setEditDate] = useState(parseDate(transaction.date));
  const [editCategory, setEditCategory] = useState(transaction.category);
  const [editDescription, setEditDescription] = useState(
    transaction.description
  );
  const [editAmount, setEditAmount] = useState(transaction.amount);
  const [editCurrency, setEditCurrenct] = useState(transaction.currency);
  const [editType, setEditType] = useState(transaction.type);
  const [editPayMethod, setEditPayMethod] = useState(transaction.paymethod);

  const [type, setType] = useState("");
  const [curr, setCurr] = useState("");
  useEffect(() => {
    setType(() => {
      if (transaction.type === "income") {
        return "+";
      } else if (transaction.type === "expense") {
        return "-";
      } else {
        return "";
      }
    });
    setCurr(() => {
      if (transaction.currency === "USD" || transaction.currency === "dollar") {
        return "$";
      } else if (
        transaction.currency === "KZT" ||
        transaction.currency === "tenge"
      ) {
        return "T";
      } else {
        return transaction.currency;
      }
    });
  }, [transaction]);

  const handleEdit = () => {
    editTransaction({
      id: transaction.id,
      type: editType,
      date: editDate,
      category: editCategory,
      description: editDescription,
      amount: editAmount,
      paymethod: editPayMethod,
      currency: editCurrency,
    });
    setEdit(false);
  };
  return (
    <tr className={type === "+" ? "text-green-500" : "text-red-500"}>
      {edit ? (
        <>
          <td>
            <FiSave className="icon-sm" onClick={() => handleEdit()} />
          </td>
          <td>{index + 1}</td>
          <td>
            <input
              type="date"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
            />
          </td>
          <td>
            <select
              name="editpaymethod"
              id=""
              value={editPayMethod}
              onChange={(e) => setEditPayMethod(e.target.value)}
              className=""
            >
              <option value="Halyk">Halyk</option>
              <option value="Kaspi">Kaspi</option>
              <option value="Cash">Cash</option>
            </select>
          </td>
          <td>
            <IoCloseOutline
              className="icon-sm"
              onClick={() => setEdit(false)}
            />
          </td>
        </>
      ) : (
        <>
          <td>
            <FiEdit className="icon-sm" onClick={() => setEdit(!edit)} />
          </td>
          <td>{index + 1}</td>
          <td>{parseDate(transaction.date)}</td>
          <td>{transaction.category}</td>
          <td>{transaction.description}</td>
          <td>{curr + transaction.amount}</td>
          <td>{transaction.paymethod}</td>
          <td>
            <RiDeleteBin6Line
              className="icon-sm"
              onClick={() => deleteTransaction(transaction.id)}
            />
          </td>
        </>
      )}
    </tr>
  );
};

export default CardExpense;
