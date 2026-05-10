import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore, useUIStore } from '../store/useStore'
import {
  HiOutlineHome, HiOutlineGlobeAlt, HiOutlinePlusCircle,
  HiOutlineMap, HiOutlineChartBar, HiOutlineClipboardList,
  HiOutlinePencilAlt, HiOutlineUser, HiOutlineLogout,
  HiOutlineMenu, HiOutlineX
} from 'react-icons/hi'

const navItems = [
  { to: '/', icon: HiOutlineHome, label: 'Dashboard' },
  { to: '/trips', icon: HiOutlineMap, label: 'My Trips' },
  { to: '/trips/new', icon: HiOutlinePlusCircle, label: 'New Trip' },
  { to: '/cities/search', icon: HiOutlineGlobeAlt, label: 'Explore Cities' },
]

const tripSubNav = (tripId) => [
  { to: `/trips/${tripId}/build`, icon: HiOutlineMap, label: 'Itinerary' },
  { to: `/trips/${tripId}/view`, icon: HiOutlineClipboardList, label: 'View' },
  { to: `/trips/${tripId}/budget`, icon: HiOutlineChartBar, label: 'Budget' },
  { to: `/trips/${tripId}/packing`, icon: HiOutlineClipboardList, label: 'Packing' },
  { to: `/trips/${tripId}/notes`, icon: HiOutlinePencilAlt, label: 'Notes' },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { sidebarOpen, toggleSidebar } = useUIStore()

  // Extract tripId from URL
  const tripMatch = location.pathname.match(/\/trips\/([^/]+)/)
  const tripId = tripMatch && tripMatch[1] !== 'new' ? tripMatch[1] : null

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white rounded-xl p-2 shadow-md border border-[var(--color-border)] hover:bg-gray-50 transition-colors"
        id="sidebar-toggle"
      >
        {sidebarOpen ? <HiOutlineX size={20} /> : <HiOutlineMenu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={
          "fixed top-0 left-0 h-full bg-white border-r border-[var(--color-border)] z-40 transition-all duration-300 flex flex-col " +
          (sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:w-20 lg:translate-x-0")
        }
      >
        {/* Logo */}
        <div className="p-5 border-b border-[var(--color-border)]">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center flex-shrink-0">
              <HiOutlineGlobeAlt className="text-white" size={22} />
            </div>
            <span className={`font-display text-xl font-bold text-primary transition-opacity ${!sidebarOpen ? 'lg:opacity-0 lg:w-0' : ''}`}>
              Traveloop
            </span>
          </Link>
        </div>

        {/* Main Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <p className={`text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider px-3 mb-2 ${!sidebarOpen ? 'lg:hidden' : ''}`}>
            Menu
          </p>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all no-underline ${
                  isActive
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-[var(--color-muted)] hover:bg-gray-50 hover:text-primary'
                }`}
                title={item.label}
              >
                <item.icon size={20} className="flex-shrink-0" />
                <span className={`${!sidebarOpen ? 'lg:hidden' : ''}`}>{item.label}</span>
              </Link>
            )
          })}

          {/* Trip Sub-Navigation */}
          {tripId && (
            <>
              <div className="my-3 border-t border-[var(--color-border)]" />
              <p className={`text-xs font-semibold text-[var(--color-muted)] uppercase tracking-wider px-3 mb-2 ${!sidebarOpen ? 'lg:hidden' : ''}`}>
                Current Trip
              </p>
              {tripSubNav(tripId).map((item) => {
                const isActive = location.pathname === item.to
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all no-underline ${
                      isActive
                        ? 'bg-[var(--color-accent-light)] text-accent'
                        : 'text-[var(--color-muted)] hover:bg-gray-50 hover:text-primary'
                    }`}
                    title={item.label}
                  >
                    <item.icon size={18} className="flex-shrink-0" />
                    <span className={`${!sidebarOpen ? 'lg:hidden' : ''}`}>{item.label}</span>
                  </Link>
                )
              })}
            </>
          )}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-[var(--color-border)]">
          <Link
            to="/profile"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[var(--color-muted)] hover:bg-gray-50 hover:text-primary transition-all no-underline ${
              location.pathname === '/profile' ? 'bg-gray-50 text-primary' : ''
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center flex-shrink-0">
              <HiOutlineUser size={16} className="text-accent" />
            </div>
            <span className={`truncate ${!sidebarOpen ? 'lg:hidden' : ''}`}>
              {user?.name || 'Profile'}
            </span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-danger hover:bg-[var(--color-danger-light)] transition-all mt-1"
            id="logout-btn"
          >
            <HiOutlineLogout size={18} className="flex-shrink-0" />
            <span className={`${!sidebarOpen ? 'lg:hidden' : ''}`}>Log out</span>
          </button>
        </div>
      </aside>
    </>
  )
}
