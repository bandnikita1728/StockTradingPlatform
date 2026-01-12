import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:3002";
const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${API}/login`, form);
      localStorage.setItem("user", JSON.stringify({ name: res.data.name, email: res.data.email, token: res.data.token }));
      window.location.href = DASHBOARD_URL;
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 460, paddingTop: "80px" }}>
      <div className="text-center mb-4">
        <img src="/logo.svg" alt="StockTradingPlatform" style={{ width: 140 }} />
        <h4 className="mt-3 fw-semibold">Login to your account</h4>
      </div>
      <div className="card shadow-sm border-0 p-4">
        {error && <div className="alert alert-danger py-2 small">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-medium">Email</label>
            <input type="email" className="form-control" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="form-label fw-medium">Password</label>
            <input type="password" className="form-control" name="password" placeholder="Your password" value={form.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2" disabled={loading}>
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>
        <p className="text-center mt-3 mb-0 small text-muted">
          Don't have an account? <Link to="/signup" className="text-primary">Sign up free</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
