import { useAtomValue } from 'jotai';
import { Loader2 } from 'lucide-react';
import { globalLoadingAtom, hasActiveRequestsAtom } from '../../lib/store';

//Global loading overlay

export function GlobalLoading() {
  const loading = useAtomValue(globalLoadingAtom);
  const hasRequests = useAtomValue(hasActiveRequestsAtom);

  if (!loading.isLoading && !hasRequests) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm pointer-events-none">
      <div className="bg-neutral-900 border border-neutral-700 rounded-lg shadow-2xl p-6 flex items-center gap-4">
        <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
        <span className="text-white font-medium">
          {loading.message || 'Loading...'}
        </span>
      </div>
    </div>
  );
}

