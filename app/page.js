"use client";
import { useEffect, useState } from "react";
import Field from "../components/Field";

const LINKS = [
  { name: "GitHub", href: "https://github.com/tribikram-byGit", note: "tribikram-byGit" },
  { name: "LinkedIn", href: "https://linkedin.com/in/tribikram-purkayastha", note: "tribikram-purkayastha" },
  { name: "Email", href: "mailto:purkayasthabiki06@gmail.com", note: "purkayasthabiki06@gmail.com" },
];

const CASES = [
  {
    title: "The Ring That Hid in Plain Sight",
    tag: "Anti-Money Laundering Fraud Graph Copilot",
    stack: ["Next.js", "FastAPI", "Neo4j", "Groq + Qwen", "react-force-graph-2d"],
    story: [
      "Millions move through a bank every day. Buried inside them, a handful of accounts pass the same money around in a circle, hop after hop, until it looks clean. No single transaction looks guilty. The crime only exists in the connections.",
      "Investigators needed to ask the data questions in plain English, but the answers lived in Neo4j, behind Cypher queries few people write. So I built a copilot that translates a sentence into a query, catches its own mistakes with a self-healing retry loop, and remembers the conversation so every follow-up goes deeper.",
      "Read-only guardrails keep the investigation safe, and a live network map lights up the suspicious rings. Execution reliability: close to 100%.",
    ],
    clue: "Question in English, suspects on a map.",
  },
  {
    title: "The Note That Was Never Late",
    tag: "MERN Full-Stack Notes App",
    stack: ["React", "Node", "Express", "MongoDB", "Socket.io", "Tailwind"],
    story: [
      "Two devices. One note. A half-second gap where one of them is lying about what you wrote. That gap is where work gets lost.",
      "I closed it with WebSockets, so every edit lands everywhere the instant it happens. Behind the scenes: JWT sessions that expire in 7 days, Helmet headers, rate limiting and custom error handling guard the door.",
      "Search debouncing keeps the API calm, while roles, tags, pagination and a dark/light theme that remembers you make it feel finished.",
    ],
    clue: "Real-time, secure, and quietly fast.",
  },
  {
    title: "The Store That Guarded Its Own Gates",
    tag: "Server-Side Rendered E-Commerce Platform",
    stack: ["Node", "Express", "EJS", "MongoDB", "Tailwind"],
    story: [
      "A shop is only as trustworthy as its weakest door. Admin panels, carts and customer profiles all sit behind the same front page, and someone is always testing the handle.",
      "I rendered every page on the server so it loads fast and gets found by search engines, then locked each door: JWT authentication, strict role-based access for Admins and Users, and rate limits that shut down API abuse.",
      "Inside: a live product catalog, individual profiles, persistent sessions and a cart that keeps its state through every transaction.",
    ],
    clue: "Fast to load. Hard to break into.",
  },
];

const JOURNEY = [
  { where: "BSERC", role: "AI & Software Development Intern", text: "Trained across advanced AI methods, then shipped the AML Fraud Graph Copilot as my capstone." },
  { where: "Internshala", role: "Web Development Intern (React)", text: "Built responsive React interfaces and tuned component rendering for speed." },
  { where: "IBM SkillBuild & Edunet", role: "Frontend Development Intern", text: "Learned scalable, component-based frontend practice the industry uses." },
];

const SKILLS = [
  ["Languages", "JavaScript, Python, C/C++, SQL, HTML/CSS"],
  ["Frontend", "React.js, Next.js, Tailwind CSS, EJS, Vite"],
  ["Backend", "Node.js, Express.js, FastAPI"],
  ["Data and infra", "MongoDB, MySQL, Neo4j, REST APIs, Socket.io"],
  ["Tools", "Git, GitHub, Postman, Linux"],
];

function spot(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", e.clientX - r.left + "px");
  e.currentTarget.style.setProperty("--y", e.clientY - r.top + "px");
}

export default function Home() {
  const [photoOk, setPhotoOk] = useState(true);
  const [open, setOpen] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Field />
      <nav className="nav">
        <a href="#top" className="brand">Tribikram Purkayastha</a>
        <div>
          <a href="#cases">Case files</a>
          <a href="#journey">Journey</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="heroText">
            <p className="kicker">Full-stack developer, Assam, India</p>
            <h1>Every system hides a story. I build the ones that tell it.</h1>
            <p className="lede">
              I'm Tribikram Purkayastha, a Computer Science student at Assam University who turns tangled data and
              messy ideas into fast, secure, real-time web apps.
            </p>
            <div className="cta">
              <a className="btn primary" href="#cases">Open the case files</a>
              <a className="btn" href="#contact">Get in touch</a>
            </div>
          </div>
          <div className="photo" onMouseMove={spot}>
            {photoOk ? (
              <img src="/photo.jpg" alt="Portrait of Tribikram Purkayastha" onError={() => setPhotoOk(false)} />
            ) : (
              <span className="initials">TP</span>
            )}
          </div>
        </section>

        <section id="cases" className="sec">
          <h2 className="rv">Case files</h2>
          <p className="sub rv">Three projects, each one a problem that needed solving. Pick a file to read it.</p>
          <div className="cases">
            {CASES.map((c, i) => (
              <article key={c.title} className="card rv" data-open={open === i} onMouseMove={spot}>
                <button className="cardHead" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  <span>
                    <span className="tag">{c.tag}</span>
                    <span className="ctitle">{c.title}</span>
                  </span>
                  <span className="plus" aria-hidden>{open === i ? "−" : "+"}</span>
                </button>
                <div className="body">
                  <div>
                    {c.story.map((p, k) => <p key={k}>{p}</p>)}
                    <p className="clue">{c.clue}</p>
                    <ul className="chips">{c.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="journey" className="sec">
          <h2 className="rv">The journey so far</h2>
          <div className="timeline">
            {JOURNEY.map((j) => (
              <div key={j.where} className="step rv" onMouseMove={spot}>
                <h3>{j.where}</h3>
                <p className="role">{j.role}</p>
                <p>{j.text}</p>
              </div>
            ))}
          </div>
          <p className="edu rv">B.Tech in Computer Science and Engineering, Assam University, Silchar, 2023 to 2027.</p>
        </section>

        <section id="skills" className="sec">
          <h2 className="rv">Toolkit</h2>
          <dl className="skills">
            {SKILLS.map(([k, v]) => (
              <div key={k} className="rv" onMouseMove={spot}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="contact" className="sec contact">
          <h2 className="rv">Have a mystery that needs solving?</h2>
          <p className="sub rv">I'm open to internships, collaborations and full-time roles. Pick the easiest way to reach me.</p>
          <div className="links">
            {LINKS.map((l) => (
              <a key={l.name} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="link rv" onMouseMove={spot}>
                <strong>{l.name}</strong>
                <span>{l.note}</span>
              </a>
            ))}
          </div>
        </section>
      </main>
      <footer>© {new Date().getFullYear()} Tribikram Purkayastha. Built with Next.js.</footer>
    </>
  );
}
