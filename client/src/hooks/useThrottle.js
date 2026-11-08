import { useState, useEffect, useRef } from "react";

/**
 * useThrottle hook
 * Throttles execution of value updates so it executes at most once every `limit` ms.
 */
export function useThrottle(value, limit = 200) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}
