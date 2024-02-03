import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./views/HomePage";
import SigninPage from "./views/SigninPage";
import SignupPage from "./views/SignupPage";
import ReportPage from "./views/ReportPage";
import AddTransactionsPage from "./views/AddTransactionsPage";
import "./styles/styles.css";
import SettingsPage from "./views/SettingsPage";

function App() {
  return (
    <>
      <BrowserRouter basename="/expenseManager/">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addItems" element={<AddTransactionsPage />} />
          <Route path="/transactions" element={<ReportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
