import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/useStore'
import { Button, Input } from '../components/UI'
import { HiOutlineGlobeAlt } from 'react-icons/hi'
import { demoUser } from '../lib/mockData'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      login(demoUser, 'demo-jwt-token')
      toast.success(`Welcome${isSignup ? '' : ' back'}, ${demoUser.name}!`)
      navigate('/')
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden flex-col items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute bottom-32 right-16 w-48 h-48 rounded-full bg-white animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-white animate-float" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative z-10 text-center text-white flex flex-col items-center">
          <div className="w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20 shadow-2xl">
            <HiOutlineGlobeAlt size={48} className="text-white" />
          </div>
          <h1 className="text-5xl font-black font-display mb-6 tracking-tight">Traveloop</h1>
          <p className="text-xl text-blue-100 max-w-md font-medium leading-relaxed">
            Plan your perfect trip with AI-powered itineraries, smart budgeting, and shareable travel plans.
          </p>
          <div className="mt-12 flex items-center gap-8 justify-center text-sm text-blue-200 font-semibold tracking-wide uppercase">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>AI Suggestions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Smart Budget</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Share Plans</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side — form */}
      <div className="flex-1 flex flex-col justify-center p-6 lg:p-12 bg-white relative">
        <div className="w-full max-w-[440px] mx-auto animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <HiOutlineGlobeAlt className="text-white" size={26} />
            </div>
            <span className="font-display text-2xl font-black text-gray-900 tracking-tight">Traveloop</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-2 font-display tracking-tight">
              {isSignup ? 'Create an account' : 'Welcome back'}
            </h2>
            <p className="text-base text-gray-500 font-medium">
              {isSignup ? 'Start planning your next adventure today' : 'Sign in to continue your travels'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignup && (
              <Input
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                id="signup-name"
              />
            )}
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              id="auth-email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              id="auth-password"
            />

            {!isSignup && (
              <div className="flex justify-end pt-1">
                <button type="button" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            <div className="pt-4">
              <Button type="submit" className="w-full" size="lg" loading={loading}>
                {isSignup ? 'Create Account' : 'Sign In'}
              </Button>
            </div>
          </form>

          <p className="text-base text-center text-gray-600 mt-8 font-medium">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-blue-600 font-bold hover:text-blue-800 transition-colors ml-1"
            >
              {isSignup ? 'Sign in' : 'Sign up'}
            </button>
          </p>

          <div className="mt-12 p-5 bg-blue-50 border border-blue-100 rounded-2xl text-center shadow-sm">
            <p className="text-sm text-blue-800 font-medium">
              🚀 <strong className="font-bold">Demo Mode:</strong> Click sign in with any credentials to explore
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
