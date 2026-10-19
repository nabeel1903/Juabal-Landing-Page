"use client";

import {
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CaretRight,
  Check,
  CheckCircle,
  Clock,
  GlobeHemisphereWest,
  Lightning,
  ListChecks,
  Sparkle,
  UserSwitch,
  Waveform,
} from "@phosphor-icons/react";
import characterImage from "../../assets/images/hero-receptionist-smiling.png";
import { faqs, industries, plans, workflowSteps } from "@/lib/content";
import { HeroDimension } from "@/components/HeroDimension";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNavbar } from "@/components/SiteNavbar";
import { VoiceWave } from "@/components/VoiceWave";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const capabilities = [
  {
    number: "01",
    icon: Waveform,
    label: "Call intelligence",
    title: "Understand caller intent, urgency, and satisfaction.",
    body: "Jubala analyzes conversations to identify urgency, frustration, follow-up needs, and valuable opportunities.",
    items: ["Urgent requests", "Unresolved issues", "Sales opportunities"],
  },
  {
    number: "02",
    icon: UserSwitch,
    label: "Classification & routing",
    title: "Send every conversation to the right workflow.",
    body: "Call intent is classified in real time, then routed to booking, lead intake, support, or human escalation.",
    items: ["Appointment booking", "New lead", "Human escalation"],
  },
  {
    number: "03",
    icon: Lightning,
    label: "Workflow automation",
    title: "Turn conversations into completed business actions.",
    body: "Connect the call to the next useful step while keeping your team informed with a complete record.",
    items: ["CRM lead created", "Confirmation sent", "Summary recorded"],
  },
];

const trustItems = [
  { icon: Clock, value: "24/7", label: "Always available" },
  { icon: GlobeHemisphereWest, value: "Multi", label: "Language ready" },
  { icon: ListChecks, value: "Every call", label: "Recorded and summarized" },
];

export function LandingPage() {
  const root = useRef<HTMLElement>(null);
  const heroVisual = useRef<HTMLDivElement>(null);
  const [activeIndustry, setActiveIndustry] = useState(0);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        const navigation = document.querySelector<HTMLElement>(".site-nav-wrap");

        intro.fromTo(
          ".v2-dimensional-shell",
          { opacity: 0, scale: 1.08, filter: "blur(28px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.45 },
        );

        if (navigation) {
          intro.fromTo(
            navigation,
            { y: -28, opacity: 0, filter: "blur(12px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.7,
              ease: "power4.out",
              clearProps: "transform,filter",
            },
            0.15,
          );
        }

        intro
          .fromTo(
            ".v2-character-stage",
            { x: 58, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.05,
              clearProps: "transform,filter",
            },
            0.28,
          )
          .fromTo(
            ".v2-hero-copy > *",
            { y: 34, opacity: 0, filter: "blur(16px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.9,
              stagger: 0.1,
            },
            0.35,
          )
          .fromTo(
            ".v2-float-card",
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.12,
              ease: "power3.out",
              clearProps: "transform,filter",
            },
            0.9,
          )
          .fromTo(
            ".v2-hero-proof",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.65 },
            1.1,
          );

        gsap.to(".v2-orbit-layer", {
          rotate: 24,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".v2-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.utils.toArray<HTMLElement>(".v2-scene-reveal").forEach((element) => {
          gsap.from(element, {
            y: 58,
            opacity: 0,
            scale: 0.975,
            filter: "blur(16px)",
            duration: 0.92,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".v2-stagger-group").forEach((group) => {
          const children = Array.from(group.children);
          gsap.from(children, {
            y: 28,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.72,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 74%",
              toggleActions: "play none none reverse",
            },
          });
        });

      });

      media.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        const journeyCards = gsap.utils.toArray<HTMLElement>(".v2-journey-card");
        gsap.set(journeyCards, { yPercent: 125, opacity: 0, scale: 0.94 });
        gsap.set(journeyCards[0], { yPercent: 0, opacity: 1, scale: 1 });

        const journeyTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".v2-journey",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.85,
          },
        });

        journeyCards.forEach((card, index) => {
          if (index === 0) return;
          journeyTimeline
            .to(
              journeyCards[index - 1],
              {
                y: -18 * index,
                scale: 1 - index * 0.018,
                opacity: 0.32,
                duration: 0.45,
                ease: "power2.inOut",
              },
              index - 0.6,
            )
            .to(
              card,
              {
                yPercent: 0,
                opacity: 1,
                scale: 1,
                duration: 0.62,
                ease: "power3.out",
              },
              index - 0.48,
            );
        });
      });

      return () => media.revert();
    },
    { scope: root },
  );

  const moveHero = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!heroVisual.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const bounds = heroVisual.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    gsap.to(".v2-dimensional-shell", {
      x: x * 8,
      y: y * 5,
      rotateY: x * 2.5,
      duration: 1,
      ease: "power2.out",
    });
    gsap.to(".v2-orbit-layer", {
      rotateY: x * 10,
      rotateX: y * -8,
      x: x * -18,
      y: y * -14,
      duration: 0.9,
      ease: "power2.out",
    });
  };

  const resetHero = () => {
    gsap.to(".v2-dimensional-shell, .v2-orbit-layer", {
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      duration: 0.9,
      ease: "power2.out",
    });
  };

  return (
    <>
      <SiteNavbar />
      <main ref={root} className="v2-page">
        <section className="v2-hero">
          <div
            className="v2-hero-visual"
            ref={heroVisual}
            onPointerMove={moveHero}
            onPointerLeave={resetHero}
          >
            <div className="v2-dimensional-shell">
              <HeroDimension />
              <div className="v2-dimensional-grid" aria-hidden="true" />
            </div>
            <div className="v2-hero-atmosphere" aria-hidden="true" />
            <div className="v2-orbit-layer" aria-hidden="true">
              <span className="v2-orbit v2-orbit-one" />
              <span className="v2-orbit v2-orbit-two" />
              <span className="v2-orbit v2-orbit-three" />
              <i className="v2-orbit-node v2-node-one" />
              <i className="v2-orbit-node v2-node-two" />
              <i className="v2-orbit-node v2-node-three" />
            </div>

            <div className="v2-character-stage">
              <span className="v2-character-shadow" aria-hidden="true" />
              <span className="v2-character-rim" aria-hidden="true" />
              <Image
                src={characterImage}
                alt="Jubala's professional AI receptionist"
                fill
                priority
                unoptimized
                sizes="(max-width: 900px) 88vw, 54vw"
              />
            </div>

            <div className="v2-float-card v2-call-card">
              <div className="v2-card-bar">
                <span><i /> Live · Jubala</span>
                <span>00:42</span>
              </div>
              <VoiceWave compact />
              <p className="v2-call-transcript">
                <strong>Jubala:</strong> Hi Sarah, would Thursday at 2pm work for your
                consultation?
              </p>
            </div>

            <div className="v2-float-card v2-booked-card">
              <span className="v2-booked-label">Appointment booked</span>
              <strong className="v2-booked-value">Thu · 3:30 PM</strong>
              <small className="v2-booked-status">
                <CheckCircle size={15} weight="fill" /> Confirmation sent
              </small>
            </div>

            <div className="v2-float-card v2-language-card">
              <GlobeHemisphereWest size={17} weight="fill" />
              English <i /> Español
            </div>
          </div>

          <div className="v2-hero-layout">
            <div className="v2-hero-copy">
              <p className="v2-eyebrow"><span /> AI voice agent for service businesses</p>
              <h1>Turn every call into <em>actionable data.</em></h1>
              <p className="v2-hero-body">
                Capture caller details, send them to your CRM or database, and keep your
                team informed in real time.
              </p>
              <div className="v2-hero-actions">
                <Link className="v2-button v2-button-primary" href="/contact#start">
                  Start your free test
                  <ArrowUpRight size={18} weight="bold" />
                </Link>
                <Link className="v2-button v2-button-ghost" href="/contact#demo">
                  Book a demo
                  <ArrowRight size={18} weight="bold" />
                </Link>
              </div>
              <p className="v2-hero-note">
                <CheckCircle size={17} weight="fill" />
                Test real conversations in your browser. No credit card required.
              </p>
            </div>
          </div>

          <div className="shell v2-hero-proof v2-stagger-group">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label}>
                  <span><Icon size={18} weight="fill" /></span>
                  <strong>{item.value}</strong>
                  <small>{item.label}</small>
                </div>
              );
            })}
          </div>

          <a className="v2-scroll-hint" href="#platform">
            Explore the platform
            <ArrowDown size={15} weight="bold" />
          </a>
        </section>

        <section id="platform" className="v2-scene v2-scene-missed">
          <div className="v2-scene-glow" aria-hidden="true" />
          <div className="shell v2-scene-shell v2-scene-reveal">
            <div className="v2-scene-heading">
              <div>
                <p className="v2-eyebrow">Always available</p>
                <h2>
                  Your business is missing calls.
                  <em>Jubala keeps the line open.</em>
                </h2>
              </div>
              <p>
                Customers call when they are ready to book, buy, or get help. Jubala
                answers immediately, even when staff are busy or the office is closed.
              </p>
            </div>

            <div className="v2-call-console">
              <div className="v2-console-call">
                <div className="v2-console-top">
                  <span><i /> Call connected</span>
                  <span>Harris & Cole · 01:48</span>
                </div>
                <div className="v2-console-center">
                  <span className="v2-agent-mark">
                    <Image src="/jubala-mark.png" alt="" width={72} height={72} />
                    <i /><i />
                  </span>
                  <h3>“I need to move tomorrow’s consultation to Friday.”</h3>
                  <VoiceWave />
                  <span className="v2-listening"><Sparkle size={15} weight="fill" /> Understanding request</span>
                </div>
              </div>

              <div className="v2-console-result">
                <div className="v2-result-heading">
                  <span><CheckCircle size={18} weight="fill" /> Action complete</span>
                  <small>Just now</small>
                </div>
                <h3>Consultation rescheduled</h3>
                <p>
                  Caller identity confirmed. Friday availability checked and a new time
                  booked. Confirmation sent automatically.
                </p>
                <div className="v2-result-data v2-stagger-group">
                  <span><small>Intent</small><strong>Reschedule</strong></span>
                  <span><small>Sentiment</small><strong>Positive</strong></span>
                  <span><small>Outcome</small><strong>Booked</strong></span>
                </div>
                <div className="v2-result-checks">
                  <span><Check size={14} weight="bold" /> Calendar updated</span>
                  <span><Check size={14} weight="bold" /> Summary recorded</span>
                  <span><Check size={14} weight="bold" /> Confirmation sent</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="v2-scene v2-scene-capabilities">
          <div className="shell v2-scene-shell v2-scene-reveal">
            <div className="v2-scene-heading v2-heading-light">
              <div>
                <p className="v2-eyebrow">Core capabilities</p>
                <h2>
                  Intelligence that moves the
                  <em>conversation forward.</em>
                </h2>
              </div>
              <p>
                Jubala understands what callers need, routes the request, and completes
                the next useful action using your business rules.
              </p>
            </div>

            <div className="v2-capability-grid v2-stagger-group">
              {capabilities.map((capability) => {
                const Icon = capability.icon;
                return (
                  <article key={capability.number}>
                    <div className="v2-cap-card-top">
                      <span>{capability.number}</span>
                      <i><Icon size={22} weight="fill" /></i>
                    </div>
                    <p>{capability.label}</p>
                    <h3>{capability.title}</h3>
                    <div className="v2-cap-details">
                      <span>{capability.body}</span>
                      <ul>
                        {capability.items.map((item) => (
                          <li key={item}><Check size={13} weight="bold" />{item}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="industries" className="v2-scene v2-scene-industries">
          <div className="shell v2-scene-shell v2-scene-reveal">
            <div className="v2-scene-heading">
              <div>
                <p className="v2-eyebrow">Built for service businesses</p>
                <h2>
                  Professional service, in the
                  <em>language of your industry.</em>
                </h2>
              </div>
              <p>
                Every agent is configured around the intake questions, appointment
                logic, FAQs, and urgent moments that make your business different.
              </p>
            </div>

            <div className="v2-industry-accordion">
              {industries.map((industry, index) => (
                <button
                  className={`v2-industry-panel ${activeIndustry === index ? "is-active" : ""}`}
                  key={industry.name}
                  type="button"
                  aria-expanded={activeIndustry === index}
                  onMouseEnter={() => setActiveIndustry(index)}
                  onFocus={() => setActiveIndustry(index)}
                  onClick={() => setActiveIndustry(index)}
                >
                  <Image
                    src={industry.image}
                    alt={`${industry.name} team handling customer calls`}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 760px) 100vw, 65vw"
                  />
                  <span className="v2-industry-shade" />
                  <span className="v2-industry-index">0{index + 1}</span>
                  <span className="v2-industry-label">{industry.name}</span>
                  <span className="v2-industry-content">
                    <strong>{industry.headline}</strong>
                    <span>{industry.description}</span>
                    <i>
                      {industry.bullets.map((bullet) => (
                        <span key={bullet}><Check size={13} weight="bold" />{bullet}</span>
                      ))}
                    </i>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="v2-journey">
          <div className="v2-journey-stage">
            <div className="shell v2-journey-layout">
              <div className="v2-journey-copy v2-scene-reveal">
                <p className="v2-eyebrow">From your website to your phone line</p>
                <h2>
                  Go live without turning it into
                  <em>a project.</em>
                </h2>
                <p>
                  You bring the business knowledge. Jubala turns it into a voice agent
                  you can test, trust, and improve.
                </p>
                <Link className="v2-text-link" href="/contact#start">
                  Build your agent <ArrowUpRight size={17} weight="bold" />
                </Link>
              </div>

              <div className="v2-journey-deck">
                {workflowSteps.map((item, index) => (
                  <article className="v2-journey-card" key={item.step}>
                    <span className="v2-journey-number">0{index + 1}</span>
                    <div>
                      <p>{item.step}</p>
                      <h3>{item.title}</h3>
                      <span>{item.description}</span>
                    </div>
                    <CaretRight size={22} weight="bold" />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="v2-scene v2-scene-pricing">
          <div className="shell v2-scene-shell v2-scene-reveal">
            <div className="v2-scene-heading">
              <div>
                <p className="v2-eyebrow">Simple monthly plans</p>
                <h2>
                  Start with the calls you have.
                  <em>Scale with the calls you earn.</em>
                </h2>
              </div>
              <div className="v2-heading-action">
                <p>
                  Every plan includes a customized agent, recordings, transcripts, and
                  free browser testing before you go live.
                </p>
                <Link className="v2-text-link" href="/pricing">
                  Compare all plans <ArrowRight size={17} weight="bold" />
                </Link>
                <p className="v2-pricing-note">
                  Unused minutes expire monthly. Overage is $0.25/min. Custom setup
                  charges may apply.
                </p>
              </div>
            </div>

            <div className="v2-pricing-grid v2-stagger-group">
              {plans.slice(0, 3).map((plan) => (
                <article className={plan.featured ? "is-featured" : ""} key={plan.name}>
                  {plan.featured && <span className="v2-plan-badge">Most popular</span>}
                  <p className="v2-plan-name">{plan.name}</p>
                  <p className="v2-plan-description">{plan.description}</p>
                  <div className="v2-plan-price"><strong>{plan.price}</strong><span>/mo</span></div>
                  <p className="v2-plan-minutes">{plan.minutes}</p>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}><CheckCircle size={16} weight="fill" />{feature}</li>
                    ))}
                  </ul>
                  <Link
                    className={`v2-button ${plan.featured ? "v2-button-mint" : "v2-button-outline"}`}
                    href="/contact#start"
                  >
                    {plan.cta}<ArrowUpRight size={16} weight="bold" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="v2-scene v2-scene-faq">
          <div className="shell v2-faq-layout v2-scene-reveal">
            <div className="v2-faq-copy">
              <p className="v2-eyebrow">Frequently asked questions</p>
              <h2>
                Clear before you
                <em>hand over the phone.</em>
              </h2>
              <p>Find answers to common questions about our AI platform and services.</p>
              <Link className="v2-button v2-button-outline" href="/contact#demo">
                Test a real conversation <ArrowUpRight size={17} weight="bold" />
              </Link>
            </div>
            <div className="v2-faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}<span><CaretRight size={18} weight="bold" /></span></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="v2-final">
          <div className="v2-final-field" aria-hidden="true">
            <span /><span /><span />
          </div>
          <div className="shell v2-final-content v2-scene-reveal">
            <span className="v2-final-mark"><Image src="/jubala-mark.png" alt="" width={78} height={78} /></span>
            <p className="v2-eyebrow">Ready when your next caller is</p>
            <h2>Ready to automate your business phone calls?</h2>
            <p>
              Launch an AI voice agent that answers calls, books appointments, captures
              leads, and keeps your team focused on higher-value work.
            </p>
            <div>
              <Link className="v2-button v2-button-primary" href="/contact#start">
                Start your free test <ArrowUpRight size={18} weight="bold" />
              </Link>
              <Link className="v2-button v2-button-dark" href="/contact#demo">
                Book a demo <ArrowRight size={18} weight="bold" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
