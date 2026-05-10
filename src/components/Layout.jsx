import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useUIStore } from '../store/useStore'
import { Toaster } from 'react-hot-toast'

export default function Layout() {
  const { sidebarOpen } = useUIStore()

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: 'var(--color-primary)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            padding: '12px 16px',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          },
        }}
      />
      <Sidebar />
      <main
        className={
          "transition-all duration-300 min-h-screen p-4 lg:p-8 " +
          (sidebarOpen ? "ml-0 lg:ml-64" : "ml-0 lg:ml-20")
        }
      >
        <div className="max-w-7xl mx-auto pt-16 lg:pt-0">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
