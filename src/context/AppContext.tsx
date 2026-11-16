import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { DEFAULT_SHOP, STORAGE_KEYS } from '../config';
import { dayDiff } from '../lib/dates';
import { readStore, writeStore } from '../lib/storage';
import type { Booking, MgmtTab, NewBooking } from '../types';

interface Toast {
  id: number;
  message: string;
}

interface AppState {
  /** Nome exibido em toda a página (com fallback). */
  shop: string;
  /** Valor cru do campo "Apresentando para". */
  shopInput: string;
  setShopInput: (value: string) => void;
  bookings: Booking[];
  addBooking: (b: NewBooking) => Booking;
  toast: Toast | null;
  notify: (message: string) => void;
  mgmtTab: MgmtTab;
  setMgmtTab: (tab: MgmtTab) => void;
}

const AppContext = createContext<AppState | null>(null);

function loadBookings(): Booking[] {
  const stored = readStore<unknown>(STORAGE_KEYS.bookings, []);
  if (!Array.isArray(stored)) return [];
  return (stored as Booking[])
    .filter((b) => b && typeof b.date === 'string' && typeof b.time === 'string' && dayDiff(b.date) >= 0)
    .slice(-30);
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [shopInput, setShopInput] = useState(() => {
    const v = readStore<unknown>(STORAGE_KEYS.shop, '');
    return typeof v === 'string' ? v : '';
  });
  const [bookings, setBookings] = useState<Booking[]>(loadBookings);
  const [toast, setToast] = useState<Toast | null>(null);
  const [mgmtTab, setMgmtTab] = useState<MgmtTab>('agenda');
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => writeStore(STORAGE_KEYS.shop, shopInput), [shopInput]);
  useEffect(() => writeStore(STORAGE_KEYS.bookings, bookings), [bookings]);
  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const addBooking = useCallback((b: NewBooking): Booking => {
    const booking: Booking = { ...b, id: `bk-${Date.now().toString(36)}`, createdAt: Date.now() };
    setBookings((prev) => [...prev, booking].slice(-30));
    return booking;
  }, []);

  const notify = useCallback((message: string) => {
    window.clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message });
    toastTimer.current = window.setTimeout(() => setToast(null), 3200);
  }, []);

  const shop = shopInput.trim() || DEFAULT_SHOP;

  const value = useMemo<AppState>(
    () => ({ shop, shopInput, setShopInput, bookings, addBooking, toast, notify, mgmtTab, setMgmtTab }),
    [shop, shopInput, bookings, addBooking, toast, notify, mgmtTab],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp precisa estar dentro de <AppProvider>');
  return ctx;
}
