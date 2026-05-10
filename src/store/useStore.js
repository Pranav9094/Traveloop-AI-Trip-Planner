import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      updateUser: (userData) => set((state) => ({ user: { ...state.user, ...userData } })),
    }),
    { name: 'traveloop-auth' }
  )
)

export const useTripsStore = create((set, get) => ({
  trips: [],
  currentTrip: null,
  loading: false,
  error: null,

  setTrips: (trips) => set({ trips }),
  setCurrentTrip: (trip) => set({ currentTrip: trip }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  addTrip: (trip) => set((state) => ({ trips: [trip, ...state.trips] })),
  updateTrip: (id, updates) => set((state) => ({
    trips: state.trips.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    currentTrip: state.currentTrip?.id === id ? { ...state.currentTrip, ...updates } : state.currentTrip,
  })),
  deleteTrip: (id) => set((state) => ({
    trips: state.trips.filter((t) => t.id !== id),
    currentTrip: state.currentTrip?.id === id ? null : state.currentTrip,
  })),
}))

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  modal: null,
  notification: null,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: null }),
  showNotification: (notification) => {
    set({ notification })
    setTimeout(() => set({ notification: null }), 4000)
  },
}))
