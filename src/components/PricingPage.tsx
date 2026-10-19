import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle,
  PhoneCall,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import { faqs, plans } from "@/lib/content";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNavbar } from "@/components/SiteNavbar";

export function PricingPage() {
  return (
    <>
      <SiteNavbar />
      <main className="page-shell inner-page">
        <section className="pricing-hero">
          <div className="inner-orbit" aria-hidden="true" />
          <div className="shell pricing-hero-inner">
            <p className="section-kicker">Clear plans. Real conversations.</p>
            <h1>Choose the coverage your business needs today.</h1>
            <p>
              Every plan begins with a customized Jubala agent and free browser testing.
              Subscribe only when the voice, knowledge, and workflow feel right.
            </p>
            <div className="pricing-hero-notes">
              <span><CheckCircle size={17} weight="fill" /> No credit card to test</span>
              <span><CheckCircle size={17} weight="fill" /> Customized for your business</span>
              <span><CheckCircle size={17} weight="fill" /> Keep recordings and transcripts</span>
            </div>
          </div>
        </section>

        <section className="pricing-page-section">
          <div className="shell pricing-page-grid">
            {plans.map((plan) => (
              <article className={`pricing-full-card ${plan.featured ? "is-featured" : ""}`} key={plan.name}>
                {plan.featured && (
                  <span className="featured-note">
                    <Sparkle size={14} weight="fill" />
                    Most popular
                  </span>
                )}
                <div className="pricing-card-head">
                  <span className="pricing-plan-icon">
                    {plan.name === "Custom" ? (
                      <Image src="/jubala-mark.png" alt="" width={34} height={34} />
                    ) : (
                      <PhoneCall size={22} weight="fill" />
                    )}
                  </span>
                  <p className="plan-name">{plan.name}</p>
                </div>
                <p className="plan-description">{plan.description}</p>
                <div className={`plan-price ${plan.name === "Custom" ? "is-custom" : ""}`}>
                  <strong>{plan.price}</strong>
                  {plan.name !== "Custom" && <span>/mo</span>}
                </div>
                <p className="plan-minutes">{plan.minutes}</p>
                {plan.name !== "Custom" && (
                  <div className="overage-row">
                    <span>Overage</span>
                    <strong>$0.25/min</strong>
                  </div>
                )}
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={15} weight="bold" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  className={`button ${plan.featured ? "button-primary" : "button-outline"}`}
                  href={plan.name === "Custom" ? "/contact#demo" : "/contact#start"}
                >
                  {plan.cta}
                  <ArrowUpRight size={17} weight="bold" />
                </Link>
              </article>
            ))}
          </div>
          <p className="shell pricing-page-fineprint">
            Unused minutes expire at the end of each month. Additional one-time charges
            may apply for custom setup.
          </p>
        </section>

        <section className="section plan-includes">
          <div className="shell plan-includes-grid">
            <div>
              <p className="section-kicker">Included from the first call</p>
              <h2>Not a generic bot with your logo added.</h2>
            </div>
            <div className="include-list">
              {[
                ["A business-specific persona", "Built from your website, services, policies, and preferred tone."],
                ["Free live testing", "Call the agent in your browser and refine it before customers hear it."],
                ["A complete call record", "Review recordings, transcripts, summaries, usage, and outcomes."],
                ["Human handoff rules", "Transfer priority callers to the right person when it matters."],
              ].map(([title, body], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section pricing-faq">
          <div className="shell faq-layout">
            <div className="faq-intro">
              <p className="section-kicker">Questions before choosing</p>
              <h2>Start by hearing it for yourself.</h2>
              <Link className="button button-outline" href="/contact#start">
                Start your free test
                <ArrowUpRight size={17} weight="bold" />
              </Link>
            </div>
            <div className="faq-list">
              {faqs.slice(0, 4).map((faq) => (
                <details className="faq-item" key={faq.question}>
                  <summary>{faq.question}<span><ArrowRight size={18} weight="bold" /></span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta final-cta-compact">
          <div className="cta-orbit cta-orbit-one" aria-hidden="true" />
          <div className="shell final-cta-inner">
            <span className="cta-mark"><Image src="/jubala-mark.png" alt="" width={84} height={84} /></span>
            <h2>Meet the agent before you choose the plan.</h2>
            <p>Build your free test agent and make a real browser call.</p>
            <div>
              <Link className="button button-primary" href="/contact#start">
                Start your free test
                <ArrowUpRight size={18} weight="bold" />
              </Link>
              <Link className="button button-light" href="/contact#demo">
                Book a demo
                <ArrowRight size={18} weight="bold" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
