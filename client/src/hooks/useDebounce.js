import { useState, useEffect } from "react";

/**
 * useDebounce hook
 * Delays updating the debounced value until after `delay` milliseconds
 * have elapsed since the last time the value changed.
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
