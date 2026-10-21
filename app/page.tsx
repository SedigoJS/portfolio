"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, ArrowRight } from "lucide-react";

/**
 * ───────────────────────────────────────────────────────────────────────────
 *  PORTFOLIO — single-file, dark, instrument-panel aesthetic
 * ───────────────────────────────────────────────────────────────────────────
 *  Customize me:
 *  - PROFILE: name, role, location, bio, links
 *  - WORK: your projects
 *  - CAPABILITIES: your skills
 *  Fonts (Fraunces / Inter / JetBrains Mono) load from Google Fonts below —
 *  swap the <style> @import block if you'd rather self-host them.
 * ───────────────────────────────────────────────────────────────────────────
 */

// ---------------------------------------------------------------------------
// CONTENT — edit this block, the layout below just renders it
// ---------------------------------------------------------------------------

const PROFILE = {
  name: "Joshua Sedigo",
  role: "Fullstack Web Developer | React, Next.js, TypeScript, PostgreSQL",
  location: "Rizal, Philippines",
  lat: 14.6030,
  lon: 121.3080,
  tagline:
    "I build full-stack web applications, from database schemas and API routes to responsive interfaces. I also build automation tools that cut manual work in real operations.",
  bio: "I work across web development, data management, and legal administration, creating user-friendly websites, maintaining accurate records, and assisting with legal documentation and administrative tasks. My focus is on delivering reliable, detail-oriented solutions that improve productivity and support business success.",
  email: "sedigojs@gmail.com",
  social: [
    { label: "GitHub", href: "https://github.com/SedigoJS" },
    { label: "CV Resume", href: "/Joshua_Sedigo_Resume.pdf", download: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/joshua-sedigo-463bb2341" },
  ],
};

const WORK = [
  {
    index: "01",
    year: "2026",
    title: "Lume E-Commerce",
    description:
      "Full-stack e-commerce store with product discovery, cart management, and Stripe Checkout, backed by Prisma and PostgreSQL.",
    tags: ["Online Store", "E-commerce", "Neon PostgreSQL", "Stripe"],
    href: "https://lume-ecommerce.vercel.app/",
  },
  {
    index: "02",
    year: "2024",
    title: "LMS x AAI",
    description:
      "Learning management system for courses, assignments, and quizzes, with REST APIs and role-based access for admins, teachers, and students.",
    tags: ["Role-Based Access", "Education Platform", "Full Stack"],
    href: "https://cwd-lms.vercel.app/",
  },
  {
    index: "03",
    year: "2024",
    title: "SurfxBini",
    description:
      "Promo platform where users submit entries and staff validate them in an admin CMS, with AWS cloud storage for media and file uploads.",
    tags: ["CMS", "Admin Panel", "User Submissions", "Full Stack"],
    href: "https://bini-con.vercel.app/",
  },
  {
    index: "04",
    year: "2026",
    title: "ALAW Projects",
    description:
      "Web apps and automation tools for document processing, PDF renaming, and Excel reporting, deployed on Vercel and Cloudflare.",
    tags: ["Web Apps", "Automation", "PDF Tools", "Excel"],
    links: [
      { label: "ALAW Compile", href: "https://alawcompile.vercel.app/" },
      { label: "ALAW iMail", href: "https://alawimail.vercel.app/" },
      { label: "ALAW FDL", href: "https://alaw-fdl.vercel.app/" },
      { label: "FDL Calc", href: "https://fdlcalc.vercel.app/" },
      { label: "ALAW Campaign", href: "https://alawcampaign.vercel.app/" },
      { label: "ALAW USDA", href: "https://alawusda.vercel.app/" },
    ],
  },
  {
    index: "05",
    year: "2024",
    title: "Randomizer",
    description:
      "A spin-wheel web app for random selection used in giveaways, decisions, and interactive activities.",
    tags: ["Animations", "Dynamic UI", "Web App", "Full Stack"],
    href: "https://randomizer-cwd.vercel.app/",
  },
  {
    index: "06",
    year: "2024",
    title: "CloudCast",
    description:
      "A weather app providing real-time forecasts and location-based weather data via API integration.",
    tags: ["API", "Weather App", "Music App", "Next.js", "Full Stack"],
    href: "https://cloudcast-sy.vercel.app/",
  },
];

  const CAPABILITIES = [
    {
      label: "Frontend Development",
      detail: "Building responsive, accessible interfaces with React, Next.js, TypeScript, and Tailwind CSS, with reusable components.",
    },
    {
      label: "Backend Development",
      detail: "Designing REST APIs and data models with Prisma and PostgreSQL, including authentication, role-based access, and payment integration with Stripe.",
    },
    {
      label: "Deployment and Tooling",
      detail: "Shipping projects through Git, GitHub, and CI/CD pipelines, with hosting on Vercel, Cloudflare, and AWS.",
    },
    {
      label: "Automation Tools",
      detail: "Building web tools and Windows scripts that process Excel, Word, and PDF files, including OCR and document generation.",
    },
    {
      label: "Data and Documentation",
      detail: "Accurate record management, spreadsheet organization, and structured document handling.",
    },
    {
      label: "Operations Support",
      detail: "Organizing case files, preparing documents, and managing office workflows with accuracy and deadline discipline.",
    },
  ];

// ---------------------------------------------------------------------------
// HOOKS
// ---------------------------------------------------------------------------

/** Reveals an element with a fade/rise once it enters the viewport. */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/** Live local time at PROFILE.lat/lon-ish — purely a stylistic instrument readout. */
function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ---------------------------------------------------------------------------
// SMALL PIECES
// ---------------------------------------------------------------------------

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em]"
      style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}
    >
      <span className="h-px w-6" style={{ background: "var(--accent)" }} />
      {children}
    </div>
  );
}

function Coords() {
  const time = useClock();
  return (
    <div
      className="hidden lg:flex fixed left-6 top-0 bottom-0 z-10 flex-col items-center justify-between py-10 pointer-events-none select-none"
      aria-hidden="true"
    >
      <div
        className="text-[10px] tracking-[0.3em]"
        style={{
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          writingMode: "vertical-rl",
        }}
      >
        {PROFILE.lat.toFixed(4)}°N&nbsp;&nbsp;{Math.abs(PROFILE.lon).toFixed(4)}°W
      </div>
      <div
        className="h-24 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, var(--line), transparent)" }}
      />
      <div
        className="text-[10px] tracking-[0.3em]"
        style={{
          color: "var(--text-muted)",
          fontFamily: "var(--font-mono)",
          writingMode: "vertical-rl",
        }}
      >
        LOCAL&nbsp;{time}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SECTIONS
// ---------------------------------------------------------------------------

function Nav() {
  return (
    <header className="relative z-20 flex items-center justify-between px-6 sm:px-10 lg:px-16 py-7">
      <a
        href="#top"
        className="text-sm tracking-wide"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text)" }}
      >
        JS
      </a>
      <nav className="hidden md:flex items-center gap-9 text-sm" style={{ color: "var(--text-muted)" }}>
        <a href="#work" className="hover:[color:var(--text)] transition-colors">
          Work
        </a>
        <a href="#capabilities" className="hover:[color:var(--text)] transition-colors">
          Capabilities
        </a>
        <a href="#about" className="hover:[color:var(--text)] transition-colors">
          About
        </a>
      </nav>
      <a
        href={`mailto:${PROFILE.email}`}
        className="group flex items-center gap-1.5 text-sm border rounded-full px-4 py-2 transition-colors"
        style={{ borderColor: "var(--line)", color: "var(--text)" }}
      >
        Say hello
        <ArrowUpRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative px-6 sm:px-10 lg:px-16 pt-16 pb-28 sm:pt-20 sm:pb-36">
      <Reveal>
        <Eyebrow>{PROFILE.role} — {PROFILE.location}</Eyebrow>
      </Reveal>
      <Reveal delay={80}>
        <h1
          className="mt-7 max-w-4xl text-[13vw] sm:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
        >
          {PROFILE.name}
        </h1>
      </Reveal>
      <Reveal delay={160}>
        <p
          className="mt-8 max-w-xl text-lg sm:text-xl leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {PROFILE.tagline}
        </p>
      </Reveal>
      <Reveal delay={240}>
        <div className="mt-10 flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: "var(--verdigris)", boxShadow: "0 0 0 4px var(--accent-soft)" }}
          />
          Available for freelance & full-time opportunities
        </div>
      </Reveal>
    </section>
  );
}

function WorkRow({ item, delay }: { item: (typeof WORK)[number]; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={delay}>
      {/* CHANGED: outer <a> → <div> to avoid nested anchor error */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          if (item.href && !item.links) {
            window.open(item.href, "_blank");
          }
        }}
        className={`group relative grid grid-cols-[auto_1fr_auto] sm:grid-cols-[3rem_1fr_auto_auto] items-baseline gap-x-6 gap-y-2 py-8 border-t ${
          item.title === "ALAW Projects" ? "cursor-default" : "cursor-pointer"
        }`}
      >
        {/* INDEX */}
        <span
          className="text-sm"
          style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
        >
          {item.index}
        </span>

        {/* TITLE + DESCRIPTION */}
        <span className="flex flex-col">
          <span
            className="text-2xl sm:text-3xl transition-colors"
            style={{
              fontFamily: "var(--font-display)",
              color: hovered ? "var(--accent)" : "var(--text)",
            }}
          >
            {item.title}
          </span>

          {/* MOBILE */}
          <div className="mt-2 max-w-md text-sm leading-relaxed sm:hidden">
            {item.description}

            {item.links && (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] px-2 py-1 rounded-full border"
                    style={{
                      borderColor: "var(--line)",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* DESKTOP */}
          <div
            className="hidden sm:block overflow-hidden text-sm leading-relaxed"
            style={{
              color: "var(--text-muted)",
              maxWidth: "32rem",
              maxHeight: hovered ? "6rem" : "0px",
              marginTop: hovered ? "0.5rem" : "0px",
              opacity: hovered ? 1 : 0,
              transition: "all 0.35s ease",
            }}
          >
            {item.description}

            {item.links && (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[10px] px-2 rounded-full border hover:border-[var(--accent)] transition-colors"
                    style={{
                      borderColor: "var(--line)",
                      color: "var(--text-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </span>

        {/* TAGS */}
        <span className="hidden sm:flex flex-wrap gap-2 justify-end max-w-[14rem] text-right">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] uppercase tracking-wider px-2 py-1 rounded-full border"
              style={{
                borderColor: "var(--line)",
                color: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {tag}
            </span>
          ))}
        </span>

        {/* YEAR */}
        <span
          className="flex items-center gap-2 justify-self-end text-sm"
          style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
        >
          {item.year}
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: hovered ? "var(--accent)" : "var(--text-muted)" }}
          />
        </span>
      </div>
    </Reveal>
  );
}

function Work() {
  return (
    <section id="work" className="px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
      <Reveal>
        <Eyebrow>Selected work</Eyebrow>
      </Reveal>
      <div className="mt-10">
        {WORK.map((item, i) => (
          <WorkRow key={item.index} item={item} delay={i * 70} />
        ))}
        <div className="border-t" style={{ borderColor: "var(--line)" }} />
      </div>
    </section>
  );
}

function Capabilities() {
  return (
    <section
      id="capabilities"
      className="px-6 sm:px-10 lg:px-16 py-20 sm:py-28 border-t"
      style={{ borderColor: "var(--line)", background: "var(--bg-soft)" }}
    >
      <Reveal>
        <Eyebrow>Capabilities</Eyebrow>
      </Reveal>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--line)" }}>
        {CAPABILITIES.map((cap, i) => (
          <Reveal key={cap.label} delay={i * 60} className="h-full">
            <div className="h-full p-7" style={{ background: "var(--bg-soft)" }}>
              <h3
                className="text-lg"
                style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
              >
                {cap.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {cap.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function getExperience() {
  const startDate = new Date(2025, 3); // April 2025 (month is 0-indexed)
  const today = new Date();

  let months =
    (today.getFullYear() - startDate.getFullYear()) * 12 +
    (today.getMonth() - startDate.getMonth());

  const years = Math.floor(months / 12);
  months %= 12;

  if (years === 0) {
    return `${months} month${months !== 1 ? "s" : ""}`;
  }

  if (months === 0) {
    return `${years} year${years !== 1 ? "s" : ""}`;
  }

  return `${years} year${years !== 1 ? "s" : ""} ${months} month${months !== 1 ? "s" : ""}`;
}

function About() {
  return (
    <section id="about" className="px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
        <Reveal>
          <Eyebrow>About</Eyebrow>
          <div
            className="mt-8 aspect-[4/5] rounded-2xl bg-center bg-cover"
            style={{
              backgroundImage: "url('/profile.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </Reveal>

        <Reveal delay={100}>
          <p
            className="text-2xl sm:text-3xl leading-snug mt-10"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            {PROFILE.bio}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-6 max-w-sm text-sm">
            <div>
              <dt style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                Based in
              </dt>
              <dd className="mt-1" style={{ color: "var(--text)" }}>
                {PROFILE.location}
              </dd>
            </div>

            <div>
              <dt style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                Experience
              </dt>
              <dd className="mt-1" style={{ color: "var(--text)" }}>
                {getExperience()}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer
      className="px-6 sm:px-10 lg:px-16 py-20 sm:py-28 border-t"
      style={{ borderColor: "var(--line)" }}
    >
      <Reveal>
        <Eyebrow>Get in touch</Eyebrow>
        <a
          href={`mailto:${PROFILE.email}`}
          className="group mt-7 flex items-center gap-4 text-4xl sm:text-6xl"
          style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
        >
          Let&apos;s talk
          <ArrowRight
            size={36}
            className="transition-transform group-hover:translate-x-2"
            style={{ color: "var(--accent)" }}
          />
        </a>
      </Reveal>
      <Reveal delay={100}>
        <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 text-sm">
          <a
            href={`mailto:${PROFILE.email}`}
            className="flex items-center gap-2 transition-colors"
            style={{
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <Mail size={14} />
            {PROFILE.email}
          </a>
          <div className="flex items-center gap-6">
            {PROFILE.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                download={s.download ? "Joshua_Sedigo_CV.pdf" : undefined}
                target={!s.download && s.href.startsWith("http") ? "_blank" : undefined}
                rel={!s.download && s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="transition-colors"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {s.label}
              </a>
            ))}
          </div>
          <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
            © {new Date().getFullYear()} {PROFILE.name}
          </span>
        </div>
      </Reveal>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// ROOT
// ---------------------------------------------------------------------------

export default function Portfolio() {
  return (
    <div
      style={{
        ["--bg" as string]: "#0E0D12",
        ["--bg-soft" as string]: "#15141B",
        ["--text" as string]: "#F2EEE6",
        ["--text-muted" as string]: "#9A9588",
        ["--accent" as string]: "#D98E4C",
        ["--accent-soft" as string]: "rgba(217,142,76,0.18)",
        ["--verdigris" as string]: "#5B8C7B",
        ["--line" as string]: "#2A2832",
        ["--font-display" as string]: "'Fraunces', serif",
        ["--font-body" as string]: "'Inter', sans-serif",
        ["--font-mono" as string]: "'JetBrains Mono', monospace",
        background: "var(--bg)",
        color: "var(--text)",
        fontFamily: "var(--font-body)",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
        a:focus-visible, button:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }
      `}</style>

      <Coords />
      <Nav />
      <main>
        <Hero />
        <Work />
        <Capabilities />
        <About />
      </main>
      <Contact />
    </div>
  );
}
