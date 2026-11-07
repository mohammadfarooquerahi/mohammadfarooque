import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook — reveal elements on scroll with GSAP ScrollTrigger.
 * Attach the returned ref to a container, and all `.reveal-up`, `.reveal-left`,
 * `.reveal-right`, `.reveal-scale` children will animate into view.
 */
export function useScrollReveal(deps = []) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = containerRef.current;
      if (!el) return;

      // Reveal up
      gsap.utils.toArray(el.querySelectorAll(".reveal-up")).forEach((item) => {
        gsap.to(item, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      // Reveal left
      gsap.utils.toArray(el.querySelectorAll(".reveal-left")).forEach((item) => {
        gsap.to(item, {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      // Reveal right
      gsap.utils.toArray(el.querySelectorAll(".reveal-right")).forEach((item) => {
        gsap.to(item, {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      // Reveal scale
      gsap.utils.toArray(el.querySelectorAll(".reveal-scale")).forEach((item) => {
        gsap.to(item, {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}

/**
 * Staggered entrance for a list of elements.
 */
export function useStaggerReveal(selector = ".stagger-item", deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = ref.current?.querySelectorAll(selector);
      if (!items?.length) return;

      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/**
 * Text split-line entrance animation.
 */
export function useTextReveal(deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = ref.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/**
 * Parallax effect for images / sections.
 */
export function useParallax(speed = 0.15, deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = ref.current;
      if (!el) return;

      gsap.to(el, {
        yPercent: -speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

/**
 * Counter animation — animate a number from 0 to target.
 */
export function useCounterAnimation(deps = []) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = ref.current;
      if (!el) return;

      const counters = el.querySelectorAll("[data-count]");
      counters.forEach((counter) => {
        const target = parseInt(counter.dataset.count, 10);
        const suffix = counter.dataset.suffix || "";
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
          },
          onUpdate: () => {
            counter.textContent = Math.round(obj.val) + suffix;
          },
        });
      });
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
