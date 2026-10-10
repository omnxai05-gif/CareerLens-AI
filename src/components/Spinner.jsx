import { Loader2 } from "lucide-react";

export default function Spinner({ full = false, label = "Loading..." }) {
  return (
    <div
      className={`flex items-center justify-center gap-2 text-slate-500 ${
        full ? "min-h-screen" : "py-20"
      }`}
    >
      <Loader2 className="animate-spin text-brand-600" size={22} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
