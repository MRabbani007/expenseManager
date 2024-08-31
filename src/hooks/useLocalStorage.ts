import { useState, useEffect } from "react";

const getLocalValue = ({ key, initValue }: { key: string; initValue: any }) => {
  //SSR Next.js
  if (typeof window === "undefined") return initValue;

  // if a value is already store
  const stringValue = localStorage.getItem(key);

  if (stringValue) {
    return JSON.parse(stringValue);
  }

  // return result of a function
  if (initValue instanceof Function) return initValue();

  return initValue;
};

export default function useLocalStorage({
  key,
  initValue,
}: {
  key: string;
  initValue: Object;
}) {
  const [value, setValue] = useState<any | null>(() => {
    return getLocalValue({ key, initValue });
  });

  const handleValue = (value: any) => {
    setValue(value);
  };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, handleValue];
}
