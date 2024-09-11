import { Route, Routes } from "react-router-dom";
// Imported Styles
import "./styles/styles.css";
import "./styles/appStyles.css";
import "./styles/globals.css";
// Imported Context
import { AuthProvider } from "./context/AuthProvider";
import { UserProvider } from "./context/UserState";
// Authorization & Nav
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import Layout from "./features/layout/Layout";

import SignInPage from "./views/auth/SignInPage";
import SignOutPage from "./views/auth/SignOutPage";
import SignupPage from "./views/auth/SignupPage";
// Content
import AddTransactionsPage from "./views/user/AddTransactionsPage";
import ReportPage from "./views/user/ReportPage";
import DashboardPage from "./views/user/DashboardPage";
import CalendarPage from "./views/user/CalendarPage";
import CardsPage from "./views/user/CardsPage";
import ProfilePage from "./views/user/ProfilePage";
import SettingsPage from "./views/SettingsPage";
// Admin
import AdminDashboard from "./views/admin/AdminDashboard";
import AdminCategories from "./views/admin/AdminCategories";
import AdminDescriptions from "./views/admin/AdminDescriptions";
import AdminUsers from "./views/admin/AdminUsers";

// Imported Components
import HomePage from "./views/HomePage";
import ChangePassword from "./views/ChangePassword";
import AdminPage from "./views/AdminPage";
import MissingPage from "./views/MissingPage";
import Unauthorized from "./views/Unauthorized";

const ROLES = {
  User: 2001,
  Admin: 5150,
};

function App() {
  return (
    <>
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />

              <Route element={<PersistLogin />}>
                {/* Pages visible to all */}
                <Route path="login" element={<SignInPage />} />
                <Route path="logout" element={<SignOutPage />} />
                <Route path="register" element={<SignupPage />} />
                <Route path="unauthorized" element={<Unauthorized />} />

                {/* Pages available to users */}
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.User, ROLES.Admin]} />
                  }
                >
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="addItems" element={<AddTransactionsPage />} />
                  <Route path="transactions" element={<ReportPage />} />
                  <Route path="calendar" element={<CalendarPage />} />
                  <Route path="cards" element={<CardsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="changePWD" element={<ChangePassword />} />
                </Route>

                {/* Admin page available to admin */}
                <Route
                  path="admin"
                  element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="descriptions" element={<AdminDescriptions />} />
                  <Route path="users" element={<AdminUsers />} />
                </Route>
              </Route>
              {/* catch all */}
              <Route path="*" element={<MissingPage />} />
            </Route>
          </Routes>
        </UserProvider>
      </AuthProvider>
    </>
  );
}

export default App;
