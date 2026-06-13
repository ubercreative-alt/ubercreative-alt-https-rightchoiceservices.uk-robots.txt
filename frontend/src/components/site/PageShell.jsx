import { TopBar } from "@/components/site/TopBar";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

/**
 * Shared page chrome: TopBar + Header + main + Footer.
 * Pass a `testId` for the page wrapper and children for the main content.
 */
export const PageShell = ({ testId, children }) => (
  <div data-testid={testId} className="rc-site">
    <TopBar />
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

/**
 * Indigo banner used at the top of every inner page so the fixed
 * header has a dark backdrop and the page has a consistent intro.
 */
export const PageHero = ({ label, title, description, testId = "page-hero" }) => (
  <section data-testid={testId} className="relative bg-[var(--rc-indigo-900)] overflow-hidden">
    <div className="absolute -right-24 -top-28 w-96 h-96 rounded-full bg-white/[0.05]" />
    <div className="absolute left-1/3 -bottom-32 w-72 h-72 rounded-full bg-white/[0.04]" />
    <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-44 pb-20">
      {label && (
        <p className="rc-label text-[var(--rc-lavender)]">
          <span className="rc-label-line bg-[var(--rc-lavender)]" />
          {label}
        </p>
      )}
      <h1
        className="mt-5 font-heading font-bold text-white text-4xl sm:text-5xl lg:text-6xl"
        data-testid={`${testId}-title`}
      >
        {title}
      </h1>
      {description && (
        <p className="mt-6 max-w-2xl text-white/75 leading-relaxed">{description}</p>
      )}
    </div>
  </section>
);
