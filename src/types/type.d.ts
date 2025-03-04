declare global {
  type Currency = "KZT" | "RUB" | "USD" | "EUR";
  type TransactionType = "income" | "expense";

  type TransactionDescription =
    | string
    | {
        icon: string;
        label: string;
        category: string;
      };

  type Transaction = {
    id: string;
    userID?: string;

    type: TransactionType;

    category: string;

    description: string;
    descId?: TransactionDescription;
    details?: string;
    notes?: string;

    amount: number;
    paymethod: string;
    accountId?: string;

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
    sortIndex?: number;
    group?: string;
    groupNo?: number;
  };

  type Description = {
    _id?: string;
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
    _id?: string;
    id: string;
    type: string; // "Bank Card" | "Cash" | "Savings Account"
    name: string;
    currency?: string;

    color?: string;
    icon?: string;
    imageUrl?: string;

    bank?: string;
    nameOnCard?: string;
    masked?: string;
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
  };

  // TODO: Remove
  type AccountTypes = "deposite" | "credit" | "loan " | "investment" | "other";

  // TODO: Remove
  type Account = {
    userID: string;
    type: "card" | "cash" | "savings";
  };

  type UserProfile = {
    defaultCard: string;
    lastUsedCard: string;
  };

  type UserSettings = {
    id: string;
    userID: string;
    transactionDisplay: string;
    transactionsPerPage: number;
  };

  type SummaryResponse = {
    totals: {
      totalSpending: number;
      totalIncome: number;
    };
    breakDown: {
      _id: string;
      income: number;
      spending: number;
      count: number;
      descLabel: string;
      descIcon: string;
      categoryId: string;
      categoryLabel: string;
    }[];
  };
}

export {};
