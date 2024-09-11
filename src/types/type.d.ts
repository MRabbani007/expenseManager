declare type Transaction = {
  id: string;
  userID?: string | null;

  type: "income" | "expense" | null;
  category: string | null;
  description: string | null;
  amount: number | null;
  paymethod: string | null;
  currency: "KZT" | "RUB" | "USD" | "EUR" | null;
  date?: string | null;

  createdAt?: string | null;
  updatedAt?: string | null;
};

declare type Category = {
  id?: string;
  label: string;
  value: string;
  detail?: string;
  icon: string;
  sortIndex?: Number;
  group?: string;
  groupNo?: Number;
};

declare type Description = {
  id?: string;
  userId?: string;

  group?: string;
  category: string;
  categoryID?: string;
  isSelected?: boolean;

  label: string;
  value: string;
  icon?: string;
};

declare type TimePeriod = {
  period: string;
  startDate?: string;
  endDate?: string;
  offset?: number;
};

declare type BankCard = {
  id: string;
  bank: string;
  nameOnCard: string;
  expDate: string;
  masked: string;
};

declare type BankCardProps = {
  cardDetails: BankCard;
  className: string;
};

declare type AccountTypes =
  | "deposite"
  | "credit"
  | "loan "
  | "investment"
  | "other";
