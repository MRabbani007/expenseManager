import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
// Imported Context
import { UserContext } from "./UserState";
// Imported Data
import { appReducer } from "./AppReducer";
import { ACTIONS, SERVER, getDate, loadLocal, saveLocal } from "../data/utils";
import AuthContext from "./AuthProvider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// Initial state
const initialState = {
  transactions: [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();

  // Store transactions
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Store transaction description
  // Note: Amount handled in Add section
  const [description, setDescription] = useState("taxi");
  const [category, setCategory] = useState("transport");
  const [paymethod, setPayMethod] = useState("Halyk");
  // Store transaction type
  const [transactionType, setTransactionType] = useState(() => "expense");
  const [currency, setCurrency] = useState(() => "KZT");
  const [transactionDate, setTransactionDate] = useState(getDate(0));
  const [startDate, setStartDate] = useState(getDate(0));
  const [endDate, setEndDate] = useState(getDate(0));

  const handleDesc = (desc, cat) => {
    setDescription(desc);
    setCategory(cat);
  };
  const handleType = (value) => {
    setTransactionType(value);
  };
  const handleCurrency = (value) => {
    setCurrency(value);
  };
  const handlePayMethod = (value) => {
    setPayMethod(value);
  };
  const handleDate = (value) => {
    setTransactionDate(value);
  };
  const handleStartDate = (value) => {
    setStartDate(value);
  };
  const handleEndDate = (value) => {
    setEndDate(value);
  };

  // Actions
  async function addTransaction(transaction) {
    dispatch({
      type: ACTIONS.ADD_TRANSACTION,
      payload: transaction,
    });
    let data = await axiosPrivate.post(SERVER.ADD_TRANSACTION, {
      type: ACTIONS.ADD_TRANSACTION,
      payload: {
        transaction: transaction,
        userName: auth?.user,
      },
    });
  }

  async function deleteTransaction(id) {
    dispatch({
      type: ACTIONS.REMOVE_TRANSACTION,
      payload: id,
    });
    let data = await axiosPrivate.post(SERVER.EDIT_TRANSACTION, {
      type: ACTIONS.REMOVE_TRANSACTION,
      payload: { userName: auth?.user, transactionId: id },
    });
  }

  async function editTransaction(transaction) {
    dispatch({ type: ACTIONS.EDIT_TRANSACTION, payload: transaction });
    let data = await axiosPrivate.post(SERVER.EDIT_TRANSACTION, {
      type: ACTIONS.EDIT_TRANSACTION,
      payload: { userName: auth?.user, transaction: transaction },
    });
  }

  async function getTransaction(date1 = startDate, date2 = endDate) {
    let response = await axiosPrivate.post(SERVER.GET_TRANSACTION, {
      type: ACTIONS.GET_TRANSACTION,
      payload: { userName: auth?.user, startDate: date1, endDate: date2 },
    });
    if (!!response && !response.includes("Error") && Array.isArray(response)) {
      dispatch({ type: ACTIONS.GET_TRANSACTION, payload: response });
    }
  }

  useEffect(() => {
    // getTransaction();
  }, [auth?.user]);

  useEffect(() => {
    // getTransaction(transactionDate, transactionDate);
  }, [transactionDate]);

  return (
    <GlobalContext.Provider
      value={{
        description: description,
        category: category,
        paymethod: paymethod,
        transactions: state.transactions,
        transactionType: transactionType,
        transactionDate: transactionDate,
        currency: currency,
        startDate: startDate,
        endDate: endDate,
        handleStartDate,
        handleEndDate,
        handleCurrency,
        addTransaction,
        editTransaction,
        deleteTransaction,
        getTransaction,
        handleDesc,
        handleType,
        handleDate,
        handlePayMethod,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
