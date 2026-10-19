"use client";

import { FormEvent, useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  EnvelopeSimple,
  Phone,
  Sparkle,
} from "@phosphor-icons/react";
import { contactDetails } from "@/lib/content";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNavbar } from "@/components/SiteNavbar";

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SiteNavbar />
      <main className="page-shell inner-page contact-page">
        <section className="contact-hero">
          <div className="contact-glow" aria-hidden="true" />
          <div className="shell contact-hero-grid">
            <div className="contact-copy">
              <p className="section-kicker">Your calls, handled your way</p>
              <h1>Let&apos;s build the agent your callers deserve.</h1>
              <p>
                Tell us where calls are being missed and what a great conversation should
                accomplish. We&apos;ll help you turn that into a voice agent you can test.
              </p>
              <div className="contact-methods">
                <a href={contactDetails.phoneHref}>
                  <span><Phone size={21} weight="fill" /></span>
                  <div><small>Call us</small><strong>{contactDetails.phoneDisplay}</strong></div>
                  <ArrowRight size={17} weight="bold" />
                </a>
                <a href={`mailto:${contactDetails.email}`}>
                  <span><EnvelopeSimple size={21} weight="fill" /></span>
                  <div><small>Email us</small><strong>{contactDetails.email}</strong></div>
                  <ArrowRight size={17} weight="bold" />
                </a>
              </div>
            </div>

            <div className="contact-form-wrap" id="start">
              {submitted ? (
                <div className="contact-success" role="status">
                  <span><CheckCircle size={34} weight="fill" /></span>
                  <p className="section-kicker">Request received</p>
                  <h2>You&apos;re on the list.</h2>
                  <p>
                    Thanks for telling us about your business. A Jubala specialist will
                    follow up with the next steps for your free test.
                  </p>
                  <button className="button button-outline" type="button" onClick={() => setSubmitted(false)}>
                    Send another request
                  </button>
                </div>
              ) : (
                <>
                  <div className="form-heading">
                    <span><Sparkle size={19} weight="fill" /></span>
                    <div>
                      <p className="section-kicker">Start your free test</p>
                      <h2>Tell us about your business.</h2>
                    </div>
                  </div>
                  <form className="contact-form" onSubmit={submitForm}>
                    <div className="form-row">
                      <label>
                        Your name
                        <input name="name" autoComplete="name" placeholder="Alex Morgan" required />
                      </label>
                      <label>
                        Work email
                        <input name="email" type="email" autoComplete="email" placeholder="alex@company.com" required />
                      </label>
                    </div>
                    <label>
                      Company website
                      <input name="website" type="url" placeholder="https://yourcompany.com" required />
                    </label>
                    <label>
                      Business type
                      <select name="businessType" defaultValue="" required>
                        <option value="" disabled>Select your industry</option>
                        <option>Law firm</option>
                        <option>Clinic or med spa</option>
                        <option>Home services</option>
                        <option>Agency or advisory</option>
                        <option>Other professional service</option>
                      </select>
                    </label>
                    <label>
                      What should Jubala handle?
                      <textarea
                        name="goals"
                        placeholder="For example: qualify new leads, answer service questions, and book consultations."
                        rows={4}
                        required
                      />
                    </label>
                    <button className="button button-primary" type="submit">
                      Build my free test agent
                      <ArrowRight size={18} weight="bold" />
                    </button>
                    <p className="form-privacy">No credit card. Your information is used only to prepare your Jubala agent.</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="contact-next" id="demo">
          <div className="shell contact-next-grid">
            <div>
              <p className="section-kicker">Prefer a guided conversation?</p>
              <h2>Book a walkthrough with our team.</h2>
              <p>
                We&apos;ll map your current call flow, show where Jubala can take action,
                and answer the practical questions about going live.
              </p>
            </div>
            <div className="demo-card">
              <span><Clock size={26} weight="fill" /></span>
              <div>
                <small>Typical walkthrough</small>
                <h3>30 focused minutes</h3>
                <p>Use cases, agent setup, testing, plans, and your rollout path.</p>
              </div>
              <a className="button button-primary" href={`mailto:${contactDetails.email}?subject=Book a Jubala demo`}>
                Request a demo
                <ArrowRight size={17} weight="bold" />
              </a>
            </div>
          </div>
        </section>

        <section className="contact-assurance">
          <div className="shell">
            <p>Free browser testing</p><i />
            <p>Customized for your workflows</p><i />
            <p>Human transfer when needed</p><i />
            <p>Multiple languages</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
