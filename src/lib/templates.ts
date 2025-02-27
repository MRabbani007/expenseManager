import { getDate } from "./date";

export const T_Transaction: Transaction = {
  id: "",
  amount: 0,
  category: "",
  description: "",
  type: "expense",
  currency: "KZT",
  paymethod: "cash",
  date: getDate(new Date()),
};

export const T_AccountInfo: AccountInfo = {
  id: "",
  type: "", // "Bank Card" | "Cash" | "Savings Account"
  name: "",
  currency: "",

  color: "",
  icon: "",
  imageUrl: "",

  bank: "",
  nameOnCard: "",
  expDate: new Date(),
  accountType: "",

  createdAt: new Date(),
  updatedAt: new Date(),
};

export const T_UserSettings: UserSettings = {
  id: "",
  userID: "",
  transactionDisplay: "card",
  transactionsPerPage: 20,
};
