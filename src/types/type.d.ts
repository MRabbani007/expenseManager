declare global {
  type Currency = "KZT" | "RUB" | "USD" | "EUR";
  type TransactionType = "income" | "expense";

  type Transaction = {
    id: string;
    userID?: string;

    type: TransactionType;

    category: string;

    description: string;
    details?: string;
    notes?: string;

    amount: number;
    paymethod: string;

    currency: Currency;
    date?: string;

    createdAt?: string;
    updatedAt?: string;
  };

  type Category = {
    id?: string;
    label: string;
    value: string;
    detail?: string;
    icon: string;
    sortIndex?: Number;
    group?: string;
    groupNo?: Number;
  };

  type Description = {
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

  type TransactionFilter = {
    filterType: string;
    period?: string;
    startDate?: string;
    endDate?: string;
    offset?: number;
  };

  type TimePeriod = {
    period: string;
    startDate?: string;
    endDate?: string;
    offset?: number;
  };

  type AccountInfo = {
    id: string;
    type: string; // "Bank Card" | "Cash" | "Savings Account"
    name: string;
    currency?: string;

    color?: string;
    icon?: string;
    imageUrl?: string;

    bank?: string;
    nameOnCard?: string;
    expDate?: Date;
    accountType?: string;

    createdAt?: Date;
    updatedAt?: Date;
  };

  type BankCard = {
    id: string;
    bank?: string;
    nameOnCard?: string;
    expDate?: Date;
    masked: string;
  };

  type BankCardProps = {
    cardDetails: BankCard;
    className: string;
  };

  // TODO: Remove
  type AccountTypes = "deposite" | "credit" | "loan " | "investment" | "other";

  // TODO: Remove
  type Account = {
    userID: string;
    type: "card" | "cash" | "savings";
  };

  type UserSettings = {
    id: string;
    userID: string;
    transactionDisplay: string;
    transactionsPerPage: number;
  };
}

export {};
