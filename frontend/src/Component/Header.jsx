import React from "react";
import "./style/Header.css"

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "About", href: "#about" },
];

export default function Header() {
  return (
    <header className="fc-header-wrap">
      <nav className="fc-header" aria-label="Main navigation">
        <a className="fc-brand" href="#home" aria-label="FitCheck AI home">
          <span className="fc-brand-fit">FitCheck</span>
          <span className="fc-brand-ai">AI</span>
        </a>

        <div className="fc-nav-links">
          {navItems.map((item) => (
            <a className="fc-nav-link" href={item.href} key={item.label}>
              {item.label}
            </a>
          ))}
        </div>

        <a className="fc-header-cta" href="sessionroom">
          Start Session <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
