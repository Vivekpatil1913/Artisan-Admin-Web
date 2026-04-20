import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "ADMIN"
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser(form);

      setMessage("OTP sent to your email ✅");

      setTimeout(() => {
        navigate("/verify-otp", {
          state: {
            email: form.email,
            role: "ADMIN"
          }
        });
      }, 1200);

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Login failed ❌"
      );
    }
  };

  return (
    <div className="auth-container">

      {/* LEFT PANEL (same as artisan) */}
      <div className="auth-left">
        <div className="logo">
          🟠 <span>ArtisanHub</span>
          <p>ADMIN PORTAL</p>
        </div>

        <h1>
          Manage platform <span>users & orders</span>
        </h1>

        <p className="subtext">
          Control sellers, monitor activity and manage the system efficiently.
        </p>

        <div className="stats">
          <div>1200+ <span>Active Users</span></div>
          <div>₹5Cr <span>Total Revenue</span></div>
          <div>500+ <span>Orders Daily</span></div>
          <div>99.9% <span>Uptime</span></div>
        </div>

        <div className="features">
          <p>🔐 Secure Admin Access</p>
          <p>📊 Real-time Analytics</p>
          <p>⚙️ Full Control Panel</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">

        <h2>Welcome back</h2>
        <p className="subtitle">
          Enter your credentials. We'll send a verification code.
        </p>

        {message && (
          <p className={message.includes("OTP") ? "success" : "error"}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <p className="forgot">Forgot password?</p>

          <div className="info-box">
            Two-factor verification on every login
          </div>

          <button type="submit" className="login-btn">
            Continue to verification →
          </button>
        </form>

        <p className="link">
          New admin?{" "}
          <span onClick={() => navigate("/admin/register")}>
            Create account
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;