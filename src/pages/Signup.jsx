import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Lock, Mail, User } from "lucide-react";
import AuthLayout from "../components/AuthLayout.jsx";
import Field from "../components/Field.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { errorMessage } from "../api/index.js";

export default function Signup() {
  const { user, signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) return setError("Password must be at least 6 characters");
    if (form.password !== form.confirm) return setError("Passwords do not match");

    setBusy(true);
    try {
      await signup({ name: form.name.trim(), email: form.email, password: form.password });
      navigate("/resume"); // new users start by uploading a resume
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout title={<>Create your account 🚀</>} subtitle="Start discovering your skill gaps in minutes.">
      <form onSubmit={submit}>
        <Field label="Full name" icon={User} placeholder="Your name" required value={form.name} onChange={set("name")} />
        <Field label="Email" icon={Mail} type="email" placeholder="you@example.com" required value={form.email} onChange={set("email")} />
        <Field label="Password" icon={Lock} type="password" placeholder="Min. 6 characters" required value={form.password} onChange={set("password")} />
        <Field label="Confirm password" icon={Lock} type="password" placeholder="Repeat password" required value={form.confirm} onChange={set("confirm")} />

        {error && (
          <p className="mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">{error}</p>
        )}

        <button className="btn-primary w-full py-4" disabled={busy}>
          {busy ? "Creating account..." : "Sign up"}
        </button>
        <p className="mt-5 text-center text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-brand-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
