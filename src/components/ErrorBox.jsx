import { AlertCircle } from "lucide-react";

export default function ErrorBox({ message, onRetry }) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <AlertCircle className="mb-3 text-rose-500" size={32} />
      <p className="font-semibold">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-soft mt-4">
          Try again
        </button>
      )}
    </div>
  );
}
