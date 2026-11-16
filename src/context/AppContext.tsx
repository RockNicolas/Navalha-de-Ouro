import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { SHOP, STORAGE_KEYS } from '../config';
import { dayDiff } from '../lib/dates';
import { readStore, writeStore } from '../lib/storage';
import { scrollToId } from '../lib/whatsapp';
import type { Booking, BookingIntent, MgmtTab, NewBooking } from '../types';

interface Toast {
  id: number;
  message: string;
}

interface AppState {
  shop: string;
  bookings: Booking[];
  addBooking: (b: NewBooking) => Booking;
  toast: Toast | null;
  notify: (message: string) => void;
  /** Pedido de agendamento com serviço/barbeiro pré-escolhido. */
  bookingIntent: BookingIntent | null;
  requestBooking: (intent?: Omit<BookingIntent, 'nonce'>) => void;
  /** Aba aberta no painel de gestão. */
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
  const [bookings, setBookings] = useState<Booking[]>(loadBookings);
  const [toast, setToast] = useState<Toast | null>(null);
  const [bookingIntent, setBookingIntent] = useState<BookingIntent | null>(null);
  const [mgmtTab, setMgmtTab] = useState<MgmtTab>('agenda');
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => writeStore(STORAGE_KEYS.bookings, bookings), [bookings]);
  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  /* Site e painel em abas diferentes: um agendamento feito no site aparece no painel na hora. */
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.bookings) setBookings(loadBookings());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

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

  const requestBooking = useCallback((intent: Omit<BookingIntent, 'nonce'> = {}) => {
    setBookingIntent({ ...intent, nonce: Date.now() });
    scrollToId('agendar');
  }, []);

  const value = useMemo<AppState>(
    () => ({
      shop: SHOP.name,
      bookings,
      addBooking,
      toast,
      notify,
      bookingIntent,
      requestBooking,
      mgmtTab,
      setMgmtTab,
    }),
    [bookings, addBooking, toast, notify, bookingIntent, requestBooking, mgmtTab],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp precisa estar dentro de <AppProvider>');
  return ctx;
}
