import axios from "axios";

const API = "http://localhost:5001/api/auth";

// ✅ REGISTER (ADMIN / ARTISAN)
export const registerUser = (data) => {
  return axios.post(`${API}/register`, data);
};

// ✅ LOGIN (ADMIN / ARTISAN)
export const loginUser = (data) => {
  return axios.post(`${API}/login`, data);
};

// ✅ VERIFY OTP
export const verifyOTP = (data) => {
  return axios.post(`${API}/verify-otp`, data);
};

// ✅ SAVE TOKEN + ROLE
export const saveAuth = (data) => {
  const token = data.token;

  // decode token expiry
  const payload = JSON.parse(atob(token.split(".")[1]));

  localStorage.setItem("token", token);
  localStorage.setItem("role", data.user.role);
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("expiry", payload.exp * 1000); // 🔥 important
};

// ✅ GET TOKEN
export const getToken = () => localStorage.getItem("token");

// ✅ GET ROLE
export const getRole = () => localStorage.getItem("role");

// ✅ LOGOUT
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
export const isTokenExpired = () => {
  const expiry = localStorage.getItem("expiry");
  if (!expiry) return true;

  return Date.now() > expiry;
};