"use client";
import { useEffect, useRef } from "react";

// Lightweight particle web that reacts to the cursor. Mouse moves never trigger React renders.
export default function Field() {
  const canvas = useRef(null);
  const glow = useRef(null);

  useEffect(() => {
    const c = canvas.current, g = c.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w, h, raf, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const m = { x: -999, y: -999, gx: -999, gy: -999 };
    const N = window.innerWidth < 700 ? 32 : 68;
    const pts = [];
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      c.width = w * dpr; c.height = h * dpr; c.style.width = w + "px"; c.style.height = h + "px";
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    for (let i = 0; i < N; i++)
      pts.push({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35 });

    const move = (e) => { m.x = e.clientX; m.y = e.clientY; };
    const leave = () => { m.x = m.y = -999; };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerleave", leave);
    window.addEventListener("resize", resize);

    const tick = () => {
      g.clearRect(0, 0, w, h);
      m.gx += (m.x - m.gx) * 0.12; m.gy += (m.y - m.gy) * 0.12;
      if (glow.current) glow.current.style.transform = `translate3d(${m.gx - 200}px,${m.gy - 200}px,0)`;
      for (const p of pts) {
        const dx = p.x - m.x, dy = p.y - m.y, d = Math.hypot(dx, dy);
        if (d < 140) { p.x += (dx / d) * 1.4; p.y += (dy / d) * 1.4; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      for (let i = 0; i < N; i++) {
        const a = pts[i];
        g.fillStyle = "#90B800"; g.globalAlpha = .7;
        g.beginPath(); g.arc(a.x, a.y, 1.8, 0, 6.283); g.fill();
        for (let j = i + 1; j < N; j++) {
          const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) { g.globalAlpha = (1 - d / 120) * .35; g.strokeStyle = "#90B800"; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke(); }
        }
        const md = Math.hypot(a.x - m.x, a.y - m.y);
        if (md < 190) { g.globalAlpha = (1 - md / 190) * .8; g.strokeStyle = "#E1E100"; g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(m.x, m.y); g.stroke(); }
      }
      g.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div ref={glow} className="glow" aria-hidden />
      <canvas ref={canvas} className="field" aria-hidden />
    </>
  );
}
