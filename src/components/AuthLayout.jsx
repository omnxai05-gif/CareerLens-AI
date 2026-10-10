import { BriefcaseBusiness, Target, TrendingUp } from "lucide-react";
import Logo from "./Logo.jsx";

const features = [
  { icon: Target, text: "Find your exact skill gaps" },
  { icon: TrendingUp, text: "Get an AI-built learning roadmap" },
  { icon: BriefcaseBusiness, text: "Match with jobs that fit you" },
];

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#221d5c] via-[#3b34c4] to-[#5b5ee8] p-[60px] text-white lg:flex">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <Logo light />

        <div>
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight">
            See your career
            <br />
            with clarity.
          </h1>
          <p className="mt-5 max-w-md text-lg text-indigo-100">
            Upload your resume, let AI find what you are missing, and follow a
            clear path to your dream job.
          </p>
          <ul className="mt-8 space-y-4">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-4 text-lg">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <Icon size={20} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-indigo-200">© 2026 CareerLens AI</p>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center bg-slate-50 px-6 py-12">
        <div className="w-full max-w-[560px]">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight">{title}</h2>
          <p className="mb-8 mt-2 text-lg text-slate-500">{subtitle}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
