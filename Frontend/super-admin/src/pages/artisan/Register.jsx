import { useState } from "react";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";

function ArtisanRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ARTISAN"
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
      await registerUser(form);

      setMessage("OTP sent to your email ✅");

      setTimeout(() => {
        navigate("/verify-otp", {
          state: {
            email: form.email,
            role: "ARTISAN" // ✅ IMPORTANT
          }
        });
      }, 1200);

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Registration failed ❌"
      );
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
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">

        <h2>Artisan Registration 🧑‍🎨</h2>
        <p className="subtitle">Create your account</p>

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
            placeholder="Email Address"
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

          <button type="submit" className="login-btn">
            Register
          </button>
        </form>

        <p className="link" style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <span onClick={() => navigate("/artisan/login")}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default ArtisanRegister;