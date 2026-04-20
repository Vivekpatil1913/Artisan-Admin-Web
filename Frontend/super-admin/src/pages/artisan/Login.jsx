import { useState } from "react";
import "../../styles/auth.css"; // ✅ FIX PATH
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

function ArtisanLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "ARTISAN" // ✅ required for backend
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("Please fill all fields ❌");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await loginUser(form);

      // ✅ store email for OTP fallback
      localStorage.setItem("email", form.email);
      localStorage.setItem("role", "ARTISAN");

      // ✅ navigate to OTP
      navigate("/verify-otp", {
        state: {
          email: form.email,
          role: "ARTISAN"
        }
      });

    } catch (err) {
      setError(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      {/* LEFT PANEL */}
      <div className="auth-left">
        <div className="logo">
          🟠 <span>ArtisanHub</span>
          <p>SELLER PORTAL</p>
        </div>

        <h1>
          Sell your craft to <span>India & beyond</span>
        </h1>

        <p className="subtext">
          Join thousands of artisans earning fair income directly from buyers.
        </p>

        <div className="stats">
          <div><strong>12,400+</strong><span> Active Sellers</span></div>
          <div><strong>₹2.4Cr</strong><span> Paid Last Month</span></div>
          <div><strong>340+</strong><span> Districts</span></div>
          <div><strong>4.8★</strong><span> Rating</span></div>
        </div>

        <div className="features">
          <p>🔐 Dual-factor login security</p>
          <p>💳 Bank-grade encryption</p>
          <p>🛡 Government-backed</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">

        <h2>Welcome back</h2>
        <p className="subtitle">
          Enter your credentials. We'll send a verification code.
        </p>

        <p className="link">
          New seller?{" "}
          <span onClick={() => navigate("/artisan/register")}>
            Create your account
          </span>
        </p>

        <div className="social">
          <button type="button">Google</button>
          <button type="button">Apple</button>
        </div>

        <div className="divider">or continue with credentials</div>

        {/* ❗ ERROR MESSAGE */}
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          name="email"
          placeholder="Mobile number or email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <p className="forgot">Forgot password?</p>

        <div className="info-box">
          Two-factor verification on every login
        </div>

        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Processing..." : "Continue to verification →"}
        </button>

      </div>
    </div>
  );
}

export default ArtisanLogin;