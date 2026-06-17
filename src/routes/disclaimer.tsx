import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — ClinConnect" },
      { name: "description", content: "Important information about ClinConnect job listings, verification and limitations of liability." },
      { property: "og:title", content: "Disclaimer — ClinConnect" },
      { property: "og:description", content: "Read how ClinConnect handles job listings and what we don't guarantee." },
    ],
  }),
  component: Disclaimer,
});

function Disclaimer() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
        <ShieldAlert className="h-3.5 w-3.5 text-primary" /> Legal
      </span>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight">Disclaimer</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

      <div className="prose mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="font-display text-lg font-semibold text-foreground">1. Informational purpose only</h2>
          <p className="mt-2">
            ClinConnect is an independent platform that aggregates publicly available
            clinical research and healthcare job listings. Content on this website is
            provided for general informational purposes only and does not constitute
            professional, legal, medical, or career advice.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-foreground">2. No employment relationship</h2>
          <p className="mt-2">
            ClinConnect is <strong>not</strong> a recruiter, employer, employment
            agency, or representative of any organization listed on this site. We do
            not participate in hiring decisions and have no authority to make offers
            on behalf of any company.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-foreground">3. Verification & accuracy</h2>
          <p className="mt-2">
            While we make reasonable efforts to verify the existence and source of
            listed opportunities, we cannot guarantee that any posting is accurate,
            current, complete, or legitimate. Roles may be filled, modified, or
            withdrawn by the employer at any time without notice to us.
          </p>
          <p className="mt-2">
            Always independently verify the employer, application process, and any
            requested information directly with the hiring organization before
            sharing personal details, paying any fee, or accepting an offer.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-foreground">4. Beware of fraud</h2>
          <p className="mt-2">
            Genuine healthcare and clinical research employers will never ask
            candidates to pay money, share banking credentials, or purchase
            equipment as a condition of applying or being hired. If something feels
            wrong, do not proceed and report the listing to us.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-foreground">5. External links</h2>
          <p className="mt-2">
            Apply links and contact details on ClinConnect direct you to third-party
            websites. We are not responsible for the content, privacy practices, or
            terms of those external sites.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-foreground">6. Limitation of liability</h2>
          <p className="mt-2">
            To the maximum extent permitted by law, ClinConnect and its operators
            disclaim all liability for any loss, damage, or harm arising from your
            use of, or reliance on, information provided on this site, including
            but not limited to lost opportunities, financial loss, or harm caused
            by interactions with third parties listed here.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-foreground">7. Contact</h2>
          <p className="mt-2">
            Questions, corrections, or requests to remove a listing? Email{" "}
            <a className="text-primary underline" href="mailto:clinconnecthelp@gmail.com">
              clinconnecthelp@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
