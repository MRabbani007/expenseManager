const isLocal = false && window?.location?.pathname === "http://localhost:5173";

export const BASE_URL = isLocal
  ? "http://localhost:3000"
  : "https://expensemanagerserver.onrender.com";
