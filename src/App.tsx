import { Route, Routes } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/login/LoginPage";
import TransactionPage from "./components/TransactionPage";
import ProfilePage from "./components/ProfilePage";
import TransactionDetails from "./components/TransactionDetails";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Pages not using the navbar layout */}
      <Route path="login" element={<LoginPage />} />

      {/* Pages using the navbar layout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="transactions" element={<TransactionPage />} />
          <Route
            path="transactions/:transactionId"
            element={<TransactionDetails />}
          />{" "}
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
