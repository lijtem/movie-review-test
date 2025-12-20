import './App.css'
import {  BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ShowPage from './pages/ShowPage'
import CategoryCollectionPage from './pages/CategoryCollectionPage'
import NotFoundPage from './pages/NotFoundPage'
import { NavBar } from './components/NavBar'

function App() {

  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/show/:id" element={<ShowPage />} />
      <Route path="/category/:slug" element={<CategoryCollectionPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
