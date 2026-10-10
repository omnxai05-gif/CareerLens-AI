import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircleCheck, FileText, Loader2, UploadCloud } from "lucide-react";
import useFetch from "../hooks/useFetch.js";
import { api, errorMessage } from "../api/index.js";
import { useToast } from "../context/ToastContext.jsx";
import Spinner from "../components/Spinner.jsx";
import PageTitle from "../components/PageTitle.jsx";

const MAX_MB = 5;
const ALLOWED = [".pdf", ".doc", ".docx", ".txt"];

export default function MyResume() {
  const navigate = useNavigate();
  const toast = useToast();
  const inputRef = useRef(null);
  const { data: resume, setData, loading } = useFetch(api.getResume);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    const ext = "." + file.name.split(".").pop().toLowerCase();
    if (!ALLOWED.includes(ext)) return toast("Please upload a PDF, DOC, DOCX or TXT file", "error");
    if (file.size > MAX_MB * 1024 * 1024) return toast(`File must be under ${MAX_MB} MB`, "error");

    setUploading(true);
    try {
      setData(await api.uploadResume(file));
      toast("Resume analysed successfully");
    } catch (e) {
      toast(errorMessage(e), "error");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  if (loading) return <Spinner />;

  return (
    <div className="mx-auto max-w-3xl">
      <PageTitle title="My Resume" subtitle="Upload your resume and AI will detect your skills." />

      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED.join(",")}
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {/* Drop zone */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`card flex cursor-pointer flex-col items-center border-2 border-dashed px-6 py-14 text-center transition ${
          dragging ? "border-brand-500 bg-brand-50" : "border-slate-200 hover:border-brand-500"
        }`}
      >
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          {uploading ? <Loader2 className="animate-spin" size={28} /> : <UploadCloud size={28} />}
        </div>
        <h3 className="text-lg font-bold">
          {uploading ? "AI is analysing your resume..." : resume ? "Upload a new resume" : "Drop your resume here"}
        </h3>
        <p className="mt-1 text-slate-500">
          {uploading ? "This takes a few seconds" : `or click to browse. PDF, DOC, DOCX, TXT up to ${MAX_MB} MB`}
        </p>
      </div>

      {/* Current resume */}
      {resume && (
        <div className="card mt-6 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FileText size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{resume.filename}</p>
              <p className="text-sm text-slate-500">
                Uploaded {new Date(resume.uploaded_at).toLocaleString()}
              </p>
            </div>
            <CircleCheck className="text-emerald-500" />
          </div>

          <h4 className="mb-3 mt-6 font-bold">Skills detected ({resume.skills.length})</h4>
          <div className="flex flex-wrap gap-3">
            {resume.skills.map((s) => (
              <span key={s} className="chip border-emerald-200 bg-emerald-50 text-emerald-700">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => navigate("/skill-gap")} className="btn-primary">
              See my skill gaps
            </button>
            <button onClick={() => navigate("/jobs")} className="btn-soft">
              View matching jobs
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
