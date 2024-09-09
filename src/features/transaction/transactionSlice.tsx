import { RootState } from "@/app/store";
import { Transaction } from "@/types/type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Transaction = {
  id: "",
  amount: 0,
  category: "",
  currency: "KZT",
  description: "",
  paymethod: "cash",
  type: "expense",
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransaction: (state, action) => {
      const { payload }: { payload: Transaction } = action;
      return { ...state, ...payload };
    },
    clearTransaction: () => initialState,
  },
});

export const { setTransaction, clearTransaction } = transactionSlice.actions;

export const selectTransaction = (state: RootState) => state?.transaction;

export default transactionSlice.reducer;
