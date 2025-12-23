import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import './index.css'
import App from './App.tsx'
import { initInterceptors } from './lib/http/client'
import { addNotificationAtom } from './lib/store'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})


function AppWrapper() {
  const addNotification = useSetAtom(addNotificationAtom)

  useEffect(() => {
    initInterceptors(addNotification)
  }, [addNotification])

  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppWrapper />
    </QueryClientProvider>
  </StrictMode>,
)
