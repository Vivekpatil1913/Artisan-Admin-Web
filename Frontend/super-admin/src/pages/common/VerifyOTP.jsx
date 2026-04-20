import { useState, useEffect } from "react";
import { verifyOTP, saveAuth } from "../../services/authService";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/auth.css";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const role = location.state?.role;

  // ✅ redirect if no email
  useEffect(() => {
    if (!email) {
      navigate("/admin/login");
    }
  }, [email, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      // ✅ FIX: SEND ROLE ALSO
      const res = await verifyOTP({ email, otp, role });

      // ✅ FIX: correct data structure
      saveAuth(res.data);

      setMessage("OTP Verified Successfully ✅");

      setTimeout(() => {
        const userRole = res.data.user.role; // ✅ USE BACKEND ROLE

        if (userRole === "ADMIN") {
          navigate("/admin/dashboard");
        } else if (userRole === "ARTISAN") {
          navigate("/artisan/dashboard");
        } else {
          navigate("/");
        }
      }, 1200);

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Invalid OTP ❌"
      );
    }
  };

  return (
    <div className="auth-container">

      {/* LEFT PANEL */}
      <div className="auth-left">
        <div className="logo">
          🟠 <span>ArtisanHub</span>
          <p>SECURITY VERIFICATION</p>
        </div>

        <h1>
          Verify your <span>account</span>
        </h1>

        <p className="subtext">
          We’ve sent a one-time password to your email for secure login.
        </p>

        <div className="features">
          <p>🔐 Two-factor authentication</p>
          <p>⚡ Fast & secure login</p>
          <p>🛡 Protect your account</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">

        <h2>Verify OTP 🔐</h2>
        <p className="subtitle">
          Enter the OTP sent to your email
        </p>

        {message && (
          <p className={message.includes("Success") ? "success" : "error"}>
            {message}
          </p>
        )}

        <form onSubmit={handleVerify}>
          <input
            type="text"
            placeholder="Enter OTP"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button type="submit" className="login-btn">
            Verify & Continue →
          </button>
        </form>

      </div>
    </div>
  );
}

export default VerifyOTP;