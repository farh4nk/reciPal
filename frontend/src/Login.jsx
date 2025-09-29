import { useState } from "react";
import { Link } from "react-router-dom";
import {signin} from "../api_funcs/auth.js";

export default function Login() {
  const [form, setForm] = useState({ email: "", username: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async(e) => {
    e.preventDefault();
    result = await signin(form.username, form.password);
    if(result){
      window.location.href = ""
    }
    console.log("Logging in:", form);
  };

  return (
    <main className="page container" style={{ maxWidth: 480 }}>
      <h1 className="page__title">Login</h1>
      <p className="page__subtitle">Welcome back! Please enter your details.</p>

      <form className="card auth-form" onSubmit={handleSubmit}>
        <label className="auth-label">
          Email
          <input
            type="email"
            name="email"
            className="auth-input"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="auth-label">
          Username
          <input
            type="text"
            name="username"
            className="auth-input"
            value={form.username}
            onChange={handleChange}
            required
          />
        </label>

        <label className="auth-label">
          Password
          <input
            type="password"
            name="password"
            className="auth-input"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="btn btn--solid" onSubmit={handleSubmit} style={{ width: "100%" }}>
          Login
        </button>

        <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 14 }}>
          Don’t have an account?{" "}
          <Link to="/signup" style={{ color: "var(--accent)", fontWeight: 600 }}>
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
