import { Link } from "react-router-dom";
import { FileUp } from "lucide-react";

// Shown on Skill Gap / Jobs / Learning Path until a resume is uploaded
export default function NeedResume({ what }) {
  return (
    <div className="card flex flex-col items-center px-6 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <FileUp size={28} />
      </div>
      <h2 className="text-xl font-bold">Upload your resume first</h2>
      <p className="mt-2 max-w-md text-slate-500">
        We need your resume to find {what}. It only takes a few seconds.
      </p>
      <Link to="/resume" className="btn-primary mt-6">
        Upload resume
      </Link>
    </div>
  );
}
