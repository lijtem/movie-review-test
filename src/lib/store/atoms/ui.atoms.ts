import { atom } from 'jotai';

// ===== MOBILE MENU STATE =====
export const mobileMenuOpenAtom = atom(false);

export const toggleMobileMenuAtom = atom(
  (get) => get(mobileMenuOpenAtom),
  (get, set) => {
    set(mobileMenuOpenAtom, !get(mobileMenuOpenAtom));
  }
);

export const closeMobileMenuAtom = atom(
  null,
  (_get, set) => {
    set(mobileMenuOpenAtom, false);
  }
);

// ===== NOTIFICATION SYSTEM =====
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

// Notification queue
export const notificationsAtom = atom<Notification[]>([]);

// Add notification with auto-remove
export const addNotificationAtom = atom(
  null,
  (get, set, notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substring(7);
    const newNotification = { ...notification, id };
    set(notificationsAtom, [...get(notificationsAtom), newNotification]);

    // Auto-remove after duration (unless duration is 0)
    if (notification.duration !== 0) {
      setTimeout(() => {
        set(notificationsAtom, (prev) => prev.filter((n) => n.id !== id));
      }, notification.duration || 5000);
    }
  }
);

// Remove notification by id
export const removeNotificationAtom = atom(
  null,
  (get, set, id: string) => {
    set(notificationsAtom, get(notificationsAtom).filter((n) => n.id !== id));
  }
);

// ===== GLOBAL LOADING STATE =====
export interface GlobalLoadingState {
  isLoading: boolean;
  message?: string;
}

export const globalLoadingAtom = atom<GlobalLoadingState>({
  isLoading: false,
  message: undefined,
});

// Track active API requests
export const activeRequestCountAtom = atom(0);

// Derived atom: has active requests
export const hasActiveRequestsAtom = atom(
  (get) => get(activeRequestCountAtom) > 0
);

// Increment/decrement request count
export const incrementRequestsAtom = atom(
  null,
  (get, set) => {
    set(activeRequestCountAtom, get(activeRequestCountAtom) + 1);
  }
);

export const decrementRequestsAtom = atom(
  null,
  (get, set) => {
    set(activeRequestCountAtom, Math.max(0, get(activeRequestCountAtom) - 1));
  }
);

// Set global loading state
export const setGlobalLoadingAtom = atom(
  null,
  (_get, set, state: GlobalLoadingState) => {
    set(globalLoadingAtom, state);
  }
);

