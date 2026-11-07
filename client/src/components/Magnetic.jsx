import { useRef } from "react";

export default function Magnetic({ children, strength = 0.3, className = "", ...props }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const n = ref.current;
    if (!n) return;
    const r = n.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    n.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  return (
    <span
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ display: "inline-block", transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)" }}
      {...props}
    >
      {children}
    </span>
  );
}
