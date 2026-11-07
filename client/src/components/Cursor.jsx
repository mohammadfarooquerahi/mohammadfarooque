import { useEffect, useRef, useCallback } from "react";

export default function Cursor() {
  const ref = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = useCallback(() => {
    pos.current.x = lerp(pos.current.x, target.current.x, 0.12);
    pos.current.y = lerp(pos.current.y, target.current.y, 0.12);
    if (ref.current) {
      ref.current.style.left = `${pos.current.x}px`;
      ref.current.style.top = `${pos.current.y}px`;
    }
    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const el = ref.current;
    const move = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };
    const grow = () => el?.classList.add("grow");
    const shrink = () => el?.classList.remove("grow");

    window.addEventListener("mousemove", move);
    raf.current = requestAnimationFrame(animate);

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a, button, .magnetic").forEach((n) => {
        n.removeEventListener("mouseenter", grow);
        n.removeEventListener("mouseleave", shrink);
        n.addEventListener("mouseenter", grow);
        n.addEventListener("mouseleave", shrink);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    // Initial bind
    document.querySelectorAll("a, button, .magnetic").forEach((n) => {
      n.addEventListener("mouseenter", grow);
      n.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
    };
  }, [animate]);

  return <div className="cursor" ref={ref} />;
}
