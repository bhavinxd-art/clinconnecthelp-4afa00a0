import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import logoAsset from "../assets/clinconnect-logo.png.asset.json";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent/30"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ClinConnect — Healthcare jobs & internships" },
      { name: "description", content: "Find verified healthcare roles, internships and clinical opportunities on ClinConnect." },
      { property: "og:title", content: "ClinConnect" },
      { property: "og:description", content: "Verified healthcare jobs and internships." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function Header() {
  const navLink = "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary";
  const activeNav = { className: "rounded-md px-3 py-2 text-sm font-semibold text-primary border-b-2 border-primary" };
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logoAsset.url} alt="ClinConnect" className="h-9 w-auto" />
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          <Link to="/" className={navLink} activeOptions={{ exact: true }} activeProps={activeNav}>Home</Link>
          <Link to="/jobs" className={navLink} activeProps={activeNav}>Browse Jobs</Link>
          <Link to="/about" className={navLink} activeProps={activeNav}>About</Link>
          <a href="mailto:clinconnecthelp@gmail.com" className={navLink}>Contact</a>
        </nav>
        <Link
          to="/jobs"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90"
        >
          Find Jobs
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  const linkCls = "block text-sm text-white/70 hover:text-white transition";
  return (
    <footer className="mt-0 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={logoAsset.url} alt="ClinConnect" className="h-9 w-auto brightness-0 invert" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              India's dedicated clinical research job platform for pharmacy and life sciences students.
            </p>
          </div>
          <div>
            <h4 className="font-display text-base font-bold">For Students</h4>
            <div className="mt-5 space-y-3">
              <Link to="/jobs" className={linkCls}>Browse Jobs</Link>
              <Link to="/jobs" className={linkCls}>Job Categories</Link>
              <Link to="/about" className={linkCls}>Career Guide</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display text-base font-bold">For Recruiters</h4>
            <div className="mt-5 space-y-3">
              <Link to="/post-job" className={linkCls}>Post a Job</Link>
              <Link to="/post-job" className={linkCls}>Pricing</Link>
              <a href="mailto:clinconnecthelp@gmail.com" className={linkCls}>Contact Us</a>
            </div>
          </div>
          <div>
            <h4 className="font-display text-base font-bold">Legal</h4>
            <div className="mt-5 space-y-3">
              <Link to="/disclaimer" className={linkCls}>Disclaimer</Link>
              <Link to="/disclaimer" className={linkCls}>Terms of Use</Link>
              <Link to="/disclaimer" className={linkCls}>Privacy Policy</Link>
            </div>
          </div>
        </div>
        <div className="mt-14 border-t border-white/10 pt-6 text-xs text-white/60">
          © {new Date().getFullYear()} ClinConnect. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1"><Outlet /></main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
