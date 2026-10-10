import { useMemo, useState } from "react";
import { Bookmark, BookmarkCheck, MapPin, Search, Wallet } from "lucide-react";
import useFetch from "../hooks/useFetch.js";
import { api, errorMessage } from "../api/index.js";
import { useToast } from "../context/ToastContext.jsx";
import Spinner from "../components/Spinner.jsx";
import ErrorBox from "../components/ErrorBox.jsx";
import NeedResume from "../components/NeedResume.jsx";
import PageTitle from "../components/PageTitle.jsx";

const matchTone = (m) =>
  m >= 75 ? "bg-emerald-50 text-emerald-700" : m >= 50 ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600";

export default function Jobs() {
  const toast = useToast();
  const { data, setData, loading, error, reload } = useFetch(api.getJobs);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [onlySaved, setOnlySaved] = useState(false);

  const jobs = data?.jobs || [];
  const types = useMemo(() => ["All", ...new Set(jobs.map((j) => j.type))], [jobs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter(
      (j) =>
        (type === "All" || j.type === type) &&
        (!onlySaved || j.saved) &&
        (!q ||
          `${j.title} ${j.company} ${j.location} ${j.skills.join(" ")}`.toLowerCase().includes(q))
    );
  }, [jobs, query, type, onlySaved]);

  const toggleSave = async (job) => {
    // update UI instantly, then tell the server
    const next = jobs.map((j) => (j.id === job.id ? { ...j, saved: !j.saved } : j));
    setData({ ...data, jobs: next });
    try {
      await api.toggleSaveJob(job.id);
      toast(job.saved ? "Removed from saved jobs" : "Job saved");
    } catch (e) {
      setData(data);
      toast(errorMessage(e), "error");
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} onRetry={reload} />;
  if (!data.has_resume) return <NeedResume what="jobs that fit you" />;

  return (
    <div>
      <PageTitle title="Jobs for you" subtitle={`${filtered.length} jobs matched to your resume skills.`} />

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className="input"
            placeholder="Search title, company, skill..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-brand-500"
        >
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <button
          onClick={() => setOnlySaved((s) => !s)}
          className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
            onlySaved ? "bg-brand-600 text-white" : "border border-slate-200 bg-white text-slate-600"
          }`}
        >
          Saved only
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="card py-16 text-center text-slate-500">No jobs match your filters.</div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {filtered.map((j) => (
            <div key={j.id} className="card flex flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold">{j.title}</h3>
                  <p className="text-slate-500">{j.company}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-bold ${matchTone(j.match)}`}>
                  {j.match}% match
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><MapPin size={15} /> {j.location}</span>
                <span className="flex items-center gap-1.5"><Wallet size={15} /> {j.salary}</span>
                <span>{j.type}</span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {j.matched_skills.map((s) => (
                  <span key={s} className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    ✓ {s}
                  </span>
                ))}
                {j.missing_skills.map((s) => (
                  <span key={s} className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex gap-3 pt-1">
                <button
                  className="btn-primary flex-1 py-2.5"
                  onClick={() => toast(`Application started for ${j.company}`)}
                >
                  Apply
                </button>
                <button
                  onClick={() => toggleSave(j)}
                  className="btn-soft px-3.5"
                  aria-label="Save job"
                >
                  {j.saved ? <BookmarkCheck size={19} /> : <Bookmark size={19} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
