import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import useFetch from "../hooks/useFetch.js";
import { api } from "../api/index.js";
import Spinner from "../components/Spinner.jsx";
import ErrorBox from "../components/ErrorBox.jsx";
import NeedResume from "../components/NeedResume.jsx";
import PageTitle from "../components/PageTitle.jsx";
import ProgressRing from "../components/ProgressRing.jsx";

const priorityStyle = {
  High: "bg-rose-50 text-rose-600",
  Medium: "bg-amber-50 text-amber-600",
  Low: "bg-emerald-50 text-emerald-600",
};

export default function SkillGap() {
  const navigate = useNavigate();
  const { data, loading, error, reload } = useFetch(api.getSkillGap);

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} onRetry={reload} />;
  if (!data.has_resume) return <NeedResume what="your skill gaps" />;

  return (
    <div>
      <PageTitle
        title="Skill Gap"
        subtitle={`Skills you need to become a ${data.target_role}.`}
        action={
          <button onClick={() => navigate("/learning-path")} className="btn-primary">
            Build my learning path <ArrowRight size={17} />
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="card flex flex-col items-center p-6">
          <h3 className="self-start font-bold">Readiness for {data.target_role}</h3>
          <div className="my-5">
            <ProgressRing value={data.readiness} size={200} stroke={16} />
          </div>
          <p className="text-center text-sm text-slate-500">
            {data.skills.length} skills matched, {data.gaps.length} to learn.
          </p>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="mb-4 font-bold">Skills you have</h3>
            <div className="flex flex-wrap gap-3">
              {data.skills.map((s) => (
                <span key={s} className="chip border-emerald-200 bg-emerald-50 text-emerald-700">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="mb-5 font-bold">Skills to learn</h3>
            {data.gaps.length === 0 ? (
              <p className="text-slate-500">You have every skill for this role. 🎉</p>
            ) : (
              <div className="space-y-5">
                {data.gaps.map((g) => (
                  <div key={g.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{g.name}</span>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${priorityStyle[g.priority]}`}>
                          {g.priority} priority
                        </span>
                      </div>
                      <span className="text-sm text-slate-400">{g.progress}% learned</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-brand-500 to-fuchsia-500 transition-all duration-700"
                        style={{ width: `${Math.max(g.progress, 4)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
