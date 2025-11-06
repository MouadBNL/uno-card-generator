import { useState } from "react";

export function useStorageState<T>(init: T, key: string) {
  let stored: T | undefined = undefined;
  try {
    stored = JSON.parse(localStorage.getItem(key) || "{}")?.value as
      | T
      | undefined;
  } catch (error) {
    console.error(error);
    localStorage.removeItem(key);
  }
  console.log(`GET [Stored:${key}: `, { value: stored });
  const [value, setValue] = useState(stored ?? init);

  const onSetValue = (v: T) => {
    console.log(`SET [Stored:${key}]:`, { value: v });
    localStorage.setItem(key, JSON.stringify({ value: v }));
    setValue(v);
  };

  return [value, onSetValue] as const;
}
