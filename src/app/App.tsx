import { Outlet, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "../features/auth/ProtectedRoute";
import LoginPage from "../features/auth/pages/LoginPage";
import TransactionDetailsPage from "../features/transactions/pages/TransactionDetailsPage";
import TransactionsPage from "../features/transactions/pages/TransactionsPage";
import AppLayout from "../layouts/AppLayout";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProfilePage from "../features/profile/pages/ProfilePage";
import { UserDataProvider } from "../features/auth/UserDataProvider";

function AuthenticatedDataRoute() {
  return (
    <UserDataProvider>
      <Outlet />
    </UserDataProvider>
  );
}

function App() {
  return (
    <Routes>
      {/* Pages not using the navbar layout */}
      <Route path="/login" element={<LoginPage />} />

      {/* Pages using the navbar layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AuthenticatedDataRoute />}>
          <Route element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="transactions" element={<TransactionsPage />} />
            <Route
              path="transactions/:transactionId"
              element={<TransactionDetailsPage />}
            />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
