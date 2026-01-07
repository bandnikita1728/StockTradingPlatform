import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:3002";
const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:3001";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${API}/signup`, form);
      localStorage.setItem("user", JSON.stringify({ name: res.data.name, email: res.data.email, token: res.data.token }));
      window.location.href = DASHBOARD_URL;
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 460, paddingTop: "80px" }}>
      <div className="text-center mb-4">
        <img src="/logo.svg" alt="StockTradingPlatform" style={{ width: 140 }} />
        <h4 className="mt-3 fw-semibold">Open a free account</h4>
        <p className="text-muted small">Join 1.5 crore+ investors</p>
      </div>
      <div className="card shadow-sm border-0 p-4">
        {error && <div className="alert alert-danger py-2 small">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-medium">Full Name</label>
            <input type="text" className="form-control" name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Email</label>
            <input type="email" className="form-control" name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="mb-4">
            <label className="form-label fw-medium">Password</label>
            <input type="password" className="form-control" name="password" placeholder="Min. 6 characters" value={form.password} onChange={handleChange} minLength={6} required />
          </div>
          <button type="submit" className="btn btn-primary w-100 py-2" disabled={loading}>
            {loading ? "Creating account…" : "Create Account"}
          </button>
        </form>
        <p className="text-center mt-3 mb-0 small text-muted">
          Already have an account? <Link to="/login" className="text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
