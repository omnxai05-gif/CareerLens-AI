import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import AuthLayout from "../components/AuthLayout.jsx";
import Field from "../components/Field.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { errorMessage } from "../api/index.js";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout title={<>Welcome back 👋</>} subtitle="Log in to continue your career journey.">
      <form onSubmit={submit}>
        <Field label="Email" icon={Mail} type="email" placeholder="you@example.com" required value={form.email} onChange={set("email")} />
        <Field label="Password" icon={Lock} type="password" placeholder="Your password" required value={form.password} onChange={set("password")} />

        {error && (
          <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">{error}</p>
        )}

        <button className="btn-primary w-full py-4" disabled={busy}>
          {busy ? "Logging in..." : "Log in"}
        </button>
        <p className="mt-5 text-center text-slate-500">
          New to CareerLens?{" "}
          <Link to="/signup" className="font-semibold text-brand-600 hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
