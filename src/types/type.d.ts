export type Transaction = {
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

export type Description = {
  id?: string;
  userId?: string;

  group?: string;
  category: string;
  selected?: boolean;

  label: string;
  value: string;
  image?: string;
};

export type TimePeriod = {
  period: string;
  startDate?: string;
  endDate?: string;
  offset?: number;
};
