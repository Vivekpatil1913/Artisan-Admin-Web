import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// ✅ ADMIN
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";

// ✅ ARTISAN
import ArtisanLogin from "./pages/artisan/Login";
import ArtisanRegister from "./pages/artisan/Register";

// ✅ COMMON
import VerifyOTP from "./pages/common/VerifyOTP";

// ✅ DASHBOARD
import Orders from "./pages/order/Orders";
import Dashboard from "./pages/dashboard/Dashboard";
// import DashboardLayout from "./layout/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔥 ROOT FIX */}
        <Route path="/" element={<Navigate to="/admin/login" />} />

        {/* 🔐 ADMIN ROUTES */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />

        {/* 🔐 ARTISAN ROUTES */}
        <Route path="/artisan/login" element={<ArtisanLogin />} />
        <Route path="/artisan/register" element={<ArtisanRegister />} />
        <Route path="/artisan/dashboard" element={<Dashboard />} />

        {/* 🔐 COMMON */}
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* 📦 OTHER */}
        <Route path="/orders" element={<Orders />} />

        {/* ❌ DEFAULT */}
        <Route path="*" element={<h1>404 Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}
export default App;