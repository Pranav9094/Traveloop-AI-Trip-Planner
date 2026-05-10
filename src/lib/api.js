import axios from 'axios'
import { useAuthStore } from '../store/useStore'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
}

// Trips
export const tripsAPI = {
  getAll: (filter) => api.get('/trips', { params: { filter } }),
  getOne: (id) => api.get(`/trips/${id}`),
  create: (data) => api.post('/trips', data),
  update: (id, data) => api.patch(`/trips/${id}`, data),
  delete: (id) => api.delete(`/trips/${id}`),
}

// Stops
export const stopsAPI = {
  create: (tripId, data) => api.post(`/trips/${tripId}/stops`, data),
  update: (id, data) => api.patch(`/stops/${id}`, data),
  delete: (id) => api.delete(`/stops/${id}`),
  reorder: (tripId, stops) => api.patch(`/trips/${tripId}/stops/reorder`, { stops }),
}

// Cities
export const citiesAPI = {
  search: (params) => api.get('/cities', { params }),
}

// Activities
export const activitiesAPI = {
  getByCity: (cityId, params) => api.get(`/cities/${cityId}/activities`, { params }),
  addToStop: (stopId, activityId) => api.post(`/stops/${stopId}/activities`, { activityId }),
  removeFromStop: (stopId, activityId) => api.delete(`/stops/${stopId}/activities/${activityId}`),
}

// Budget
export const budgetAPI = {
  get: (tripId) => api.get(`/trips/${tripId}/budget`),
  update: (tripId, data) => api.patch(`/trips/${tripId}/budget`, data),
}

// Packing
export const packingAPI = {
  getAll: (tripId) => api.get(`/trips/${tripId}/packing`),
  create: (tripId, data) => api.post(`/trips/${tripId}/packing`, data),
  update: (id, data) => api.patch(`/packing/${id}`, data),
  delete: (id) => api.delete(`/packing/${id}`),
}

// Notes
export const notesAPI = {
  getAll: (tripId) => api.get(`/trips/${tripId}/notes`),
  create: (tripId, data) => api.post(`/trips/${tripId}/notes`, data),
  update: (id, data) => api.patch(`/notes/${id}`, data),
  delete: (id) => api.delete(`/notes/${id}`),
}

// Sharing
export const sharingAPI = {
  toggleShare: (tripId) => api.post(`/trips/${tripId}/share`),
  getPublic: (token) => api.get(`/share/${token}`),
  copyTrip: (token) => api.post(`/share/${token}/copy`),
}

// AI Agent
export const agentAPI = {
  ask: (action, context) => api.post('/agent', { action, context }),
}

export default api
