import { useEffect, useState } from 'react';
import { readStore, writeStore } from '../lib/storage';

/** useState que lembra o valor no localStorage (com validação opcional). */
export function usePersistentState<T>(key: string, initial: T, isValid?: (v: unknown) => v is T) {
  const [value, setValue] = useState<T>(() => {
    const stored = readStore<unknown>(key, initial);
    if (isValid) return isValid(stored) ? stored : initial;
    return stored as T;
  });

  useEffect(() => writeStore(key, value), [key, value]);

  return [value, setValue] as const;
}
