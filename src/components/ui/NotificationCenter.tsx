import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { notificationsAtom } from '../../lib/store';

// Global notification center

export function NotificationCenter() {
  const notifications = useAtomValue(notificationsAtom);

  useEffect(() => {
    // Convert Jotai notifications to Sonner toasts
    notifications.forEach(({ id, type, title, message }) => {
      switch (type) {
        case 'success':
          toast.success(title, { description: message, id });
          break;
        case 'error':
          toast.error(title, { description: message, id });
          break;
        case 'warning':
          toast.warning(title, { description: message, id });
          break;
        default:
          toast.info(title, { description: message, id });
      }
    });
  }, [notifications]);

  return null;
}

