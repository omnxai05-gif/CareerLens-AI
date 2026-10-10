import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Bell,
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  Target,
  X,
} from "lucide-react";
import Logo from "./Logo.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/resume", label: "My Resume", icon: FileText },
  { to: "/skill-gap", label: "Skill Gap", icon: Target },
  { to: "/jobs", label: "Jobs", icon: BriefcaseBusiness },
  { to: "/learning-path", label: "Learning Path", icon: Map },
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sidebar = (
    <aside className="flex h-full w-72 flex-col border-r border-slate-100 bg-white">
      <div className="flex items-center justify-between p-6">
        <Logo />
        <button className="lg:hidden" onClick={() => setOpen(false)}>
          <X size={22} />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-4">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-semibold transition ${
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`
            }
          >
            <Icon size={19} />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="m-4 flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-semibold text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
      >
        <LogOut size={19} />
        Log out
      </button>
    </aside>
  );

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <div className="sticky top-0 hidden h-screen lg:block">{sidebar}</div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setOpen(false)} />
          <div className="relative h-full w-72">{sidebar}</div>
        </div>
      )}

      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setOpen(true)}>
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-xl font-extrabold">
                Hello, {user?.name?.split(" ")[0]} <span>👋</span>
              </h1>
              <p className="text-sm text-slate-500">Here is your career snapshot for today.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-100">
              <Bell size={19} />
            </button>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-fuchsia-500 font-bold uppercase text-white">
              {user?.name?.[0]}
            </div>
          </div>
        </header>

        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
