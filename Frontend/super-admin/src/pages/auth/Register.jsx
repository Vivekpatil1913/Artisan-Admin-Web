import { useState } from "react";
import { registerAdmin } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerAdmin(form);

      setMessage("OTP sent to your email ✅");

      // ✅ small delay before redirect
      setTimeout(() => {
        navigate("/verify-otp", { state: { email: form.email } });
      }, 1000);

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account ✨</h2>
        <p>Join ArtisanHub Admin</p>

        {message && (
          <p className={message.includes("✅") ? "success" : "error"}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            required
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Enter Email"
            required
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Enter Password"
            required
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="auth-switch">
          Don’t have an account?
          <Link to="/Login" className="highlight-link"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;