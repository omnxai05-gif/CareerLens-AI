import { useMemo } from "react";
import { Check, Clock, ExternalLink } from "lucide-react";
import useFetch from "../hooks/useFetch.js";
import { api, errorMessage } from "../api/index.js";
import { useToast } from "../context/ToastContext.jsx";
import Spinner from "../components/Spinner.jsx";
import ErrorBox from "../components/ErrorBox.jsx";
import NeedResume from "../components/NeedResume.jsx";
import PageTitle from "../components/PageTitle.jsx";

export default function LearningPath() {
  const toast = useToast();
  const { data, setData, loading, error, reload } = useFetch(api.getLearningPath);

  const groups = useMemo(() => {
    const map = new Map();
    (data?.steps || []).forEach((s) => {
      if (!map.has(s.skill)) map.set(s.skill, []);
      map.get(s.skill).push(s);
    });
    return [...map.entries()];
  }, [data]);

  const toggle = async (step) => {
    const done = !step.done;
    const prev = data;
    setData({ ...data, steps: data.steps.map((s) => (s.id === step.id ? { ...s, done } : s)) });
    try {
      await api.setStepDone(step.id, done);
      if (done) toast("Step completed 🎉");
    } catch (e) {
      setData(prev);
      toast(errorMessage(e), "error");
    }
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} onRetry={reload} />;
  if (!data.has_resume) return <NeedResume what="your learning path" />;

  const total = data.steps.length;
  const doneCount = data.steps.filter((s) => s.done).length;
  const pct = total ? Math.round((doneCount / total) * 100) : 100;

  return (
    <div className="mx-auto max-w-4xl">
      <PageTitle
        title="Learning Path"
        subtitle={`Your step-by-step roadmap to become a ${data.target_role}.`}
      />

      <div className="card mb-6 p-6">
        <div className="mb-3 flex items-end justify-between">
          <h3 className="font-bold">Overall progress</h3>
          <span className="text-sm font-semibold text-slate-500">
            {doneCount} / {total} steps
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-fuchsia-500 transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {groups.length === 0 ? (
        <div className="card py-16 text-center text-slate-500">Nothing to learn. You have every skill! 🎉</div>
      ) : (
        <div className="space-y-6">
          {groups.map(([skill, steps], gi) => {
            const done = steps.filter((s) => s.done).length;
            return (
              <div key={skill} className="card p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-sm font-bold text-brand-700">
                      {gi + 1}
                    </span>
                    <h3 className="text-lg font-bold">{skill}</h3>
                  </div>
                  <span className="text-sm text-slate-400">
                    {done}/{steps.length} done
                  </span>
                </div>

                <ul className="space-y-3">
                  {steps.map((s) => (
                    <li
                      key={s.id}
                      className={`flex items-center gap-4 rounded-xl border p-4 transition ${
                        s.done ? "border-emerald-200 bg-emerald-50/60" : "border-slate-100 hover:border-brand-100"
                      }`}
                    >
                      <button
                        onClick={() => toggle(s)}
                        aria-label="Mark step done"
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition ${
                          s.done
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-slate-300 text-transparent hover:border-brand-500"
                        }`}
                      >
                        <Check size={15} strokeWidth={3} />
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className={`font-semibold ${s.done ? "text-slate-400 line-through" : ""}`}>{s.title}</p>
                        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-slate-400">
                          <Clock size={14} /> {s.duration}
                        </p>
                      </div>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:underline"
                      >
                        Learn <ExternalLink size={14} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
