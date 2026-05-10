import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/useStore'
import Layout from './components/Layout'

// Pages
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import MyTrips from './pages/MyTrips'
import CreateTrip from './pages/CreateTrip'
import ItineraryBuilder from './pages/ItineraryBuilder'
import ItineraryView from './pages/ItineraryView'
import Budget from './pages/Budget'
import Packing from './pages/Packing'
import Notes from './pages/Notes'
import CitySearch from './pages/CitySearch'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="trips" element={<MyTrips />} />
          <Route path="trips/new" element={<CreateTrip />} />
          <Route path="trips/:id/build" element={<ItineraryBuilder />} />
          <Route path="trips/:id/view" element={<ItineraryView />} />
          <Route path="trips/:id/budget" element={<Budget />} />
          <Route path="trips/:id/packing" element={<Packing />} />
          <Route path="trips/:id/notes" element={<Notes />} />
          <Route path="cities/search" element={<CitySearch />} />
          <Route path="profile" element={<div className="p-8">Profile settings coming soon...</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
