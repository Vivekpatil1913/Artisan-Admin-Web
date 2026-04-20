import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN"
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser(form);

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
        err.response?.data?.message || "Registration failed ❌"
      );
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
          <p>ADMIN PORTAL</p>
        </div>

        <h1>
          Start managing <span>your platform</span>
        </h1>

        <p className="subtext">
          Create your admin account to control users, orders and analytics.
        </p>

        <div className="stats">
          <div>1200+ <span>Users</span></div>
          <div>₹5Cr <span>Revenue</span></div>
          <div>500+ <span>Orders</span></div>
          <div>99.9% <span>Uptime</span></div>
        </div>

        <div className="features">
          <p>🔐 Secure Access</p>
          <p>📊 Analytics Dashboard</p>
          <p>⚙️ Full Control</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">

        <h2>Create Account ✨</h2>
        <p className="subtitle">
          Register as admin to access the dashboard
        </p>

        {message && (
          <p className={message.includes("OTP") ? "success" : "error"}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="link">
          Already have an account?{" "}
          <span onClick={() => navigate("/admin/login")}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;