import { Sparkles } from "lucide-react";

export default function Logo({ light = false }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          light ? "bg-white/15 text-white" : "bg-brand-600 text-white"
        }`}
      >
        <Sparkles size={20} />
      </div>
      <span
        className={`text-xl font-bold tracking-tight ${
          light ? "text-white" : "text-brand-700"
        }`}
      >
        CareerLens AI
      </span>
    </div>
  );
}
