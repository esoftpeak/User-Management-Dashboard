"use client";

import * as React from "react";

export function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const t = window.setTimeout(() => setDebouncedValue(value), delayMs);
    return () => window.clearTimeout(t);
  }, [value, delayMs]);

  return debouncedValue;
}

