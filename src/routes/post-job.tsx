import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { z } from "zod";
import { submitJob } from "@/lib/airtable.functions";
import { Briefcase, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export const Route = createFileRoute("/post-job")({
  head: () => ({
    meta: [
      { title: "Post a job — ClinConnect for hiring managers" },
      { name: "description", content: "Share a clinical research or healthcare opportunity with the ClinConnect community. Reviewed before going live." },
      { property: "og:title", content: "Post a job on ClinConnect" },
      { property: "og:description", content: "Reach pharmacy, medical and clinical research candidates." },
    ],
  }),
  component: PostJob,
});

const formSchema = z.object({
  title: z.string().trim().min(2, "Role title is required").max(120),
  company: z.string().trim().min(1, "Organization is required").max(120),
  location: z.string().trim().min(1, "Location is required").max(120),
  category: z.string().trim().min(1, "Select a category").max(60),
  eligibility: z.string().trim().max(500).optional().default(""),
  stipend: z.string().trim().max(120).optional().default(""),
  applyUrl: z.string().trim().url("Must be a valid URL (https://…)").max(500),
  contactName: z.string().trim().min(1, "Your name is required").max(120),
  contactEmail: z.string().trim().email("Valid email required").max(200),
});

type FormValues = z.infer<typeof formSchema>;
const initial: FormValues = {
  title: "", company: "", location: "", category: "",
  eligibility: "", stipend: "", applyUrl: "",
  contactName: "", contactEmail: "",
};

function PostJob() {
  const router = useRouter();
  const submit = useServerFn(submitJob);
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (k: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = formSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormValues;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      await submit({ data: parsed.data });
      setStatus("success");
      setValues(initial);
      router.invalidate();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Submission failed");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-2xl px-5 py-20 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary-soft text-primary">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-bold">Thanks — submission received!</h1>
        <p className="mt-3 text-muted-foreground">
          Your role has been sent for review. We typically review within 24–48 hours,
          and you'll hear back at the email you provided once it's published.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex items-center rounded-lg border border-input bg-background px-5 py-2.5 text-sm font-medium hover:bg-secondary"
        >
          Submit another role
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
        <Briefcase className="h-3.5 w-3.5 text-primary" /> For hiring managers
      </span>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">Post a clinical opportunity</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Submissions are reviewed before they go live. Free for verified clinical research,
        healthcare and pharmacy roles.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
        <Field label="Role title *" error={errors.title}>
          <input type="text" value={values.title} onChange={set("title")} className={inputCls} placeholder="Clinical Research Intern" />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Organization *" error={errors.company}>
            <input type="text" value={values.company} onChange={set("company")} className={inputCls} placeholder="Acme Pharma" />
          </Field>
          <Field label="Location *" error={errors.location}>
            <input type="text" value={values.location} onChange={set("location")} className={inputCls} placeholder="Mumbai, India / Remote" />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Category *" error={errors.category}>
            <select value={values.category} onChange={set("category")} className={inputCls}>
              <option value="">Select…</option>
              <option>Intern</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Fellowship</option>
              <option>Residency</option>
              <option>Volunteer</option>
            </select>
          </Field>
          <Field label="Stipend / Salary" error={errors.stipend}>
            <input type="text" value={values.stipend} onChange={set("stipend")} className={inputCls} placeholder="₹25,000 / month" />
          </Field>
        </div>
        <Field label="Eligibility" error={errors.eligibility}>
          <textarea value={values.eligibility} onChange={set("eligibility")} rows={3} className={inputCls + " resize-y py-2"} placeholder="PharmD students, final-year preferred…" />
        </Field>
        <Field label="Apply URL or contact link *" error={errors.applyUrl}>
          <input type="url" value={values.applyUrl} onChange={set("applyUrl")} className={inputCls} placeholder="https://…" />
        </Field>

        <div className="rounded-xl border border-border bg-background/50 p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Your contact (kept private)</p>
          <div className="mt-3 grid gap-5 sm:grid-cols-2">
            <Field label="Your name *" error={errors.contactName}>
              <input type="text" value={values.contactName} onChange={set("contactName")} className={inputCls} />
            </Field>
            <Field label="Your email *" error={errors.contactEmail}>
              <input type="email" value={values.contactEmail} onChange={set("contactEmail")} className={inputCls} />
            </Field>
          </div>
        </div>

        {status === "error" && (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{errorMsg || "Something went wrong. Please try again."}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90 disabled:opacity-60"
        >
          {status === "submitting" ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : "Submit for review"}
        </button>
        <p className="text-center text-xs text-muted-foreground">
          By submitting, you confirm the role is genuine and that you're authorized to post it.
        </p>
      </form>
    </div>
  );
}

const inputCls =
  "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
