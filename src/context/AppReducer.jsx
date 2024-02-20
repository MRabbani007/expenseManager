import { ACTIONS } from "../data/utils";

export const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.REMOVE_TRANSACTION: {
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    }
    case ACTIONS.ADD_TRANSACTION: {
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    }
    case ACTIONS.EDIT_TRANSACTION: {
      let transactionIndex = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id
      );
      state.transactions.splice(transactionIndex, 1, action.payload);
      return {
        ...state,
        transactions: state.transactions,
      };
    }
    case ACTIONS.GET_TRANSACTION: {
      console.log({ ...state, transactions: action.payload });
      return { ...state, transactions: action.payload };
    }
    case "clear": {
      // return { ...state, transactions: [] };
      return state;
    }
    default:
      return state;
  }
};
