"use client";

import { useEffect, useState, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";

const links = [
  { label: "Product", href: "/#platform" },
  { label: "Solutions", href: "/#industries" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Docs", href: "/#faq" },
];

export function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["platform", "industries", "pricing", "faq"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-32% 0px -55% 0px", threshold: [0, 0.1, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const movePrimary = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    event.currentTarget.style.setProperty("--magnetic-x", `${x * 0.1}px`);
    event.currentTarget.style.setProperty("--magnetic-y", `${y * 0.1}px`);
  };

  const resetPrimary = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.setProperty("--magnetic-x", "0px");
    event.currentTarget.style.setProperty("--magnetic-y", "0px");
  };

  const moveNavigationGlow = (event: ReactPointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      "--nav-glow-x",
      `${event.clientX - bounds.left}px`,
    );
  };

  return (
    <header className={`site-nav-wrap ${scrolled ? "is-scrolled" : ""}`}>
      <nav
        className="site-nav"
        aria-label="Main navigation"
        onPointerMove={moveNavigationGlow}
      >
        <Link className="nav-brand" href="/" aria-label="Jubala home">
          <span className="nav-brand-mark">
            <Image src="/jubala-mark.png" alt="" width={64} height={64} priority />
          </span>
          <span className="nav-brand-copy">
            <strong>Jubala</strong>
          </span>
        </Link>

        <div className="nav-center">
          {links.map((link) => (
            <Link
              className={link.href.includes(activeSection) && activeSection ? "is-active" : ""}
              href={link.href}
              key={link.label}
            >
              <span>{link.label}</span>
            </Link>
          ))}
        </div>

        <div className="nav-end">
          <a className="nav-signin" href="https://app.jubala.ai">
            Sign in
          </a>
          <Link
            className="nav-primary"
            href="/contact#start"
            onPointerMove={movePrimary}
            onPointerLeave={resetPrimary}
          >
            <span>Get started</span>
            <i><ArrowUpRight size={16} weight="bold" /></i>
          </Link>
          <button
            className="nav-menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <div className="mobile-menu-links">
          {links.map((link, index) => (
            <Link
              href={link.href}
              key={link.label}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: `${index * 45}ms` }}
            >
              <span>0{index + 1}</span>
              {link.label}
              <ArrowUpRight size={20} weight="bold" />
            </Link>
          ))}
        </div>
        <div className="mobile-menu-actions">
          <a href="https://app.jubala.ai">Sign in to Jubala</a>
          <Link href="/contact#start" onClick={() => setMenuOpen(false)}>
            Start your free test
            <ArrowUpRight size={18} weight="bold" />
          </Link>
        </div>
      </div>
    </header>
  );
}
