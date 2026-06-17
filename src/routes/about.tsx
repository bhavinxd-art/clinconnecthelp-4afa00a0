import { createFileRoute, Link } from "@tanstack/react-router";
import { Stethoscope, Target, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ClinConnect — Our story & vision" },
      { name: "description", content: "ClinConnect was built to bring scattered clinical research opportunities into one place for students and professionals." },
      { property: "og:title", content: "About ClinConnect" },
      { property: "og:description", content: "Our mission: make clinical research opportunities easy to find." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
        <Heart className="h-3.5 w-3.5 text-primary" /> About ClinConnect
      </span>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Bringing clinical opportunities into one place.
      </h1>

      <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
        <p>
          ClinConnect was created to make finding clinical research opportunities easier.
          As a pharmacy student interested in clinical research, I found that jobs and
          internships were scattered across many websites, LinkedIn posts, WhatsApp
          groups, and company pages.
        </p>
        <p>
          ClinConnect brings these opportunities together in one place so that students
          and professionals can find them more easily — without endlessly hopping
          between tabs and groups.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary">
            <Target className="h-5 w-5" />
          </span>
          <h2 className="mt-4 font-display text-lg font-semibold">Our mission</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Reduce the friction of discovering clinical research roles so candidates
            can spend their time preparing, not searching.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-6">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary">
            <Stethoscope className="h-5 w-5" />
          </span>
          <h2 className="mt-4 font-display text-lg font-semibold">Our vision</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A trusted, community-driven hub where every verified clinical opportunity
            — internship, residency or full-time — is one search away.
          </p>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-card p-8 text-center">
        <h3 className="font-display text-xl font-semibold">Hiring? Share your role.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Post a clinical opportunity in minutes — we review every submission before it goes live.
        </p>
        <Link
          to="/post-job"
          className="mt-5 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Post a job
        </Link>
      </div>
    </div>
  );
}
