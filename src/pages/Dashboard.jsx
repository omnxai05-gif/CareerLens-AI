import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, CircleCheck, TriangleAlert, Upload } from "lucide-react";
import useFetch from "../hooks/useFetch.js";
import { api } from "../api/index.js";
import Spinner from "../components/Spinner.jsx";
import ErrorBox from "../components/ErrorBox.jsx";
import ProgressRing from "../components/ProgressRing.jsx";

function Stat({ icon: Icon, label, value, tone, to }) {
  const tones = {
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    indigo: "bg-brand-50 text-brand-600",
  };
  return (
    <Link to={to} className="card flex items-center gap-4 p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tones[tone]}`}>
        <Icon size={26} />
      </div>
      <div>
        <p className="text-slate-500">{label}</p>
        <p className="text-3xl font-extrabold">{value}</p>
      </div>
    </Link>
  );
}

const barColor = (p) =>
  p < 34 ? "from-amber-400 to-rose-500" : p < 67 ? "from-amber-400 to-orange-500" : "from-lime-400 to-emerald-500";

export default function Dashboard() {
  const navigate = useNavigate();
  const { data, loading, error, reload } = useFetch(api.getDashboard);

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} onRetry={reload} />;

  const { readiness, skills, gaps, job_matches, has_resume } = data;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        {/* Readiness */}
        <div className="card flex flex-col items-center p-8">
          <h3 className="self-start text-lg font-bold">Career Readiness</h3>
          <div className="my-6">
            <ProgressRing value={readiness} />
          </div>
          <p className="text-center text-slate-500">
            {!has_resume
              ? "Upload your resume to see your readiness score."
              : readiness >= 90
              ? "Amazing! You are ready for top roles."
              : "You are close! Close your top skill gaps to reach 90%+."}
          </p>
          <button onClick={() => navigate("/resume")} className="btn-soft mt-5">
            <Upload size={17} /> {has_resume ? "Upload new resume" : "Upload resume"}
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-3">
            <Stat icon={CircleCheck} label="Skills" value={skills.length} tone="green" to="/resume" />
            <Stat icon={TriangleAlert} label="Skill gaps" value={gaps.length} tone="amber" to="/skill-gap" />
            <Stat icon={BriefcaseBusiness} label="Job matches" value={job_matches} tone="indigo" to="/jobs" />
          </div>

          <div className="card p-6">
            <h3 className="mb-4 text-lg font-bold">Your Skills</h3>
            {skills.length ? (
              <div className="flex flex-wrap gap-3">
                {skills.map((s) => (
                  <span key={s} className="chip border-emerald-200 bg-emerald-50 text-emerald-700">
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-500">No skills yet. Upload a resume and we will detect them.</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        {/* Skill gap list */}
        <div className="card p-6">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-bold">Skill Gap</h3>
            <Link to="/skill-gap" className="text-sm font-semibold text-brand-600 hover:underline">
              See all
            </Link>
          </div>
          {gaps.length ? (
            <div className="space-y-5">
              {gaps.slice(0, 3).map((g) => (
                <div key={g.name}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-semibold">{g.name}</span>
                    <span className="text-slate-400">{g.progress}% learned</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${barColor(g.progress)} transition-all duration-700`}
                      style={{ width: `${Math.max(g.progress, 4)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">{has_resume ? "No gaps. Great work!" : "Upload a resume to find your gaps."}</p>
          )}
        </div>

        {/* Jobs promo */}
        <div className="flex flex-col justify-between rounded-2xl bg-gradient-to-br from-brand-600 to-fuchsia-600 p-6 text-white shadow-card">
          <h3 className="text-lg font-bold">Jobs for you</h3>
          <div className="my-6">
            <p className="text-6xl font-extrabold">{job_matches}</p>
            <p className="mt-2 text-lg text-indigo-100">matches based on your skills</p>
          </div>
          <Link
            to="/jobs"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-brand-700 transition hover:bg-indigo-50"
          >
            View jobs <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </div>
  );
}
