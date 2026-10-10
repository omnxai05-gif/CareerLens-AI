import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// Input with a left icon (and a show/hide toggle for passwords)
export default function Field({ label, icon: Icon, type = "text", ...props }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <label className="mb-5 block">
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      <div className="relative">
        <Icon
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type={isPassword && show ? "text" : type}
          className="input"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            aria-label="Toggle password visibility"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </label>
  );
}
