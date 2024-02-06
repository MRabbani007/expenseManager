import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { appReducer } from "./AppReducer";
// Imported Data
import { ACTIONS, getDate, loadLocal, saveLocal } from "../data/utils";
import { fetchTransaction } from "../data/serverFunctions";
import { UserContext } from "./UserState";

// Initial state
const initialState = {
  transactions: [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const { userName } = useContext(UserContext);
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
  function addTransaction(transaction) {
    dispatch({
      type: ACTIONS.ADD_TRANSACTION,
      payload: transaction,
    });
    fetchTransaction({
      type: ACTIONS.ADD_TRANSACTION,
      payload: {
        transaction: transaction,
        userName: userName,
      },
    });
  }

  function deleteTransaction(id) {
    dispatch({
      type: ACTIONS.REMOVE_TRANSACTION,
      payload: id,
    });
    fetchTransaction({
      type: ACTIONS.REMOVE_TRANSACTION,
      payload: { userName: userName, transactionId: id },
    });
  }

  function editTransaction(transaction) {
    dispatch({ type: ACTIONS.EDIT_TRANSACTION, payload: transaction });
    fetchTransaction({
      type: ACTIONS.EDIT_TRANSACTION,
      payload: { userName: userName, transaction: transaction },
    });
  }

  async function getTransaction(date1 = startDate, date2 = endDate) {
    let response = await fetchTransaction({
      type: ACTIONS.GET_TRANSACTION,
      payload: { userName: userName, startDate: date1, endDate: date2 },
    });
    if (!response.includes("Error") && Array.isArray(response)) {
      dispatch({ type: ACTIONS.GET_TRANSACTION, payload: response });
    }
  }

  function loadInitialState() {
    // TODO: fix load local transactions
    if (true || userName !== "") {
      getTransaction();
    } else {
      let data = loadLocal("transactions");
      if (!!data) {
        if (Array.isArray(data)) {
          return { transactions: data };
        } else {
          return data;
        }
      } else {
        return initialState;
      }
    }
  }

  function deleteAll() {
    dispatch({ type: "clear" });
  }
  useEffect(() => {
    loadInitialState();
  }, [userName]);

  useEffect(() => {
    saveLocal("transactions", state);
  }, [state]);

  useEffect(() => {
    getTransaction(transactionDate, transactionDate);
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
        deleteAll,
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
