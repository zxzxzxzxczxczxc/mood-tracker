import { BrowserRouter, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"

import HomePage from "./pages/HomePage"
import HistoryPage from "./pages/HistoryPage"
import StatsPage from "./pages/StatsPage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen text-white">
        <Navbar />

        <div className="px-6 pt-2 pb-6">
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route path="/history" element={<HistoryPage />} />

            <Route path="/stats" element={<StatsPage />} />

            <Route path="/login" element={<LoginPage />} />

            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}