import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ShowPage from './pages/ShowPage'
import CategoryCollectionPage from './pages/CategoryCollectionPage'
import NotFoundPage from './pages/NotFoundPage'
import { NavBar, ErrorBoundary } from './components/layout'

function App() {

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/show/:id" element={<ShowPage />} />
          <Route path="/category/:slug" element={<CategoryCollectionPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to='/404' replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
