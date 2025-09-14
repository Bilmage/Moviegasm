/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";

export function mapObjectToUrlParams<T extends Record<string, any>>(
  obj: T
): string {
  const searchParams = new URLSearchParams();
  Object.keys(obj).forEach((key) => {
    const value = obj[key as keyof T];
    if (typeof value === "boolean") {
      searchParams.append(key, value);
      return;
    }
    if (value) {
      searchParams.append(key, value.toString());
    }
  });

  return searchParams.toString();
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).getFullYear();
};

export const useDebounce = (value: unknown, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounceValue;
};
