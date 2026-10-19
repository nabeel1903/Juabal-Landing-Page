import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  EnvelopeSimple,
  LinkedinLogo,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { contactDetails } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <Link className="footer-logo" href="/">
            <span>
              <Image src="/jubala-mark.png" alt="" width={48} height={48} />
            </span>
            jubala
          </Link>
          <p>
            The always-on voice that keeps your business available, helpful, and ready
            for the next opportunity.
          </p>
          <span className="finity-note">A product of Finity Systems Inc.</span>
        </div>

        <div className="footer-nav">
          <div>
            <strong>Explore</strong>
            <Link href="/#platform">Platform</Link>
            <Link href="/#industries">Industries</Link>
            <Link href="/#how-it-works">How it works</Link>
            <Link href="/pricing">Pricing</Link>
          </div>
          <div>
            <strong>Connect</strong>
            <Link href="/contact">Contact us</Link>
            <a href="https://app.jubala.ai">Client portal</a>
            <a href={contactDetails.phoneHref}>
              <Phone size={15} weight="fill" />
              {contactDetails.phoneDisplay}
            </a>
            <a href={`mailto:${contactDetails.email}`}>
              <EnvelopeSimple size={15} weight="fill" />
              {contactDetails.email}
            </a>
          </div>
        </div>

        <Link className="footer-start" href="/contact#start">
          <span>Start your free test</span>
          <ArrowUpRight size={24} weight="bold" />
        </Link>
      </div>

      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Jubala.ai. All rights reserved.</span>
        <div>
          <a href="mailto:legal@jubala.ai">Terms & Conditions</a>
          <a href="mailto:privacy@jubala.ai">Privacy Policy</a>
          <a aria-label="Jubala on LinkedIn" href="https://www.linkedin.com">
            <LinkedinLogo size={16} weight="fill" />
          </a>
        </div>
      </div>
    </footer>
  );
}
