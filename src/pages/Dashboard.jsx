import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useStore'
import { Card, Badge, Button, PageHeader, Skeleton } from '../components/UI'
import { demoTrips, cities } from '../lib/mockData'
import { format, differenceInDays, isPast, isFuture } from 'date-fns'
import {
  HiOutlinePlusCircle, HiOutlineCalendar, HiOutlineLocationMarker,
  HiOutlineCurrencyDollar, HiOutlineSparkles, HiOutlineArrowRight,
  HiOutlineMap
} from 'react-icons/hi'

const aiSuggestions = [
  { city: cities[9], reason: 'Perfect weather in June with stunning sunsets you\'ll love.' },
  { city: cities[11], reason: 'Budget-friendly European gem with incredible food scene.' },
  { city: cities[16], reason: 'Rich cultural fusion at the crossroads of continents.' },
]

export default function Dashboard() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 600)
  }, [])

  const totalSpent = demoTrips.reduce((sum, t) => {
    const b = t.budget
    return sum + b.transportCost + b.stayCost + b.activitiesCost + b.mealsCost + b.miscCost
  }, 0)

  const upcomingTrips = demoTrips.filter((t) => isFuture(new Date(t.startDate)))

  const stats = [
    { label: 'Total Trips', value: demoTrips.length, icon: HiOutlineMap, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Cities Visited', value: demoTrips.reduce((s, t) => s + t.stops.length, 0), icon: HiOutlineLocationMarker, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Upcoming', value: upcomingTrips.length, icon: HiOutlineCalendar, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Total Budget', value: `$${totalSpent.toLocaleString()}`, icon: HiOutlineCurrencyDollar, color: 'text-purple-600', bg: 'bg-purple-50' },
  ]

  if (loading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <Skeleton className="h-28" count={4} />
        </div>
        <Skeleton className="h-56" count={3} />
      </div>
    )
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <PageHeader
        title={`Welcome back, ${user?.name?.split(' ')[0] || 'Traveler'} ✈️`}
        subtitle="Here's an overview of your travel plans"
        actions={
          <Button onClick={() => navigate('/trips/new')} size="lg" className="shadow-lg shadow-blue-500/30">
            <HiOutlinePlusCircle size={20} />
            Plan New Trip
          </Button>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 stagger-children">
        {stats.map((stat) => (
          <Card key={stat.label} hover={false} className="!p-5 sm:!p-6 flex items-center gap-4 border-none shadow-sm bg-white">
            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center shrink-0`}>
              <stat.icon size={24} className={stat.color} />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-gray-900 font-mono tracking-tight">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Trips */}
      <div>
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 font-display tracking-tight">Recent Trips</h2>
            <p className="text-gray-500 mt-1">Your latest adventures</p>
          </div>
          <Link to="/trips" className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors pb-1">
            View All <HiOutlineArrowRight size={16} />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 stagger-children">
          {demoTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <HiOutlineSparkles size={24} className="text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 font-display tracking-tight">AI Suggested Destinations</h2>
            </div>
            <p className="text-gray-500 mt-1">Curated places you might love based on your history</p>
          </div>
          <Badge variant="accent" className="w-max">Powered by Claude</Badge>
        </div>
        <div className="grid md:grid-cols-3 gap-6 stagger-children">
          {aiSuggestions.map((s, i) => (
            <Card key={i} onClick={() => navigate('/cities/search')} className="group overflow-hidden !p-0 border-none shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={s.city.coverImageUrl}
                  alt={s.city.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                <div className="absolute bottom-4 left-5 text-white">
                  <h3 className="font-bold text-xl font-display tracking-wide">{s.city.name}</h3>
                  <p className="text-sm text-white/80 font-medium flex items-center gap-1 mt-1">
                    <HiOutlineLocationMarker size={14} />
                    {s.city.country}
                  </p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 leading-relaxed mb-4">{s.reason}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                    <span className="font-mono tracking-widest text-gray-900">
                      {'$'.repeat(Math.ceil(s.city.costIndex))}
                      <span className="text-gray-300">{'$'.repeat(5 - Math.ceil(s.city.costIndex))}</span>
                    </span>
                    <span>•</span>
                    <span>Pop: {s.city.popularityScore}%</span>
                  </div>
                  <Button variant="ghost" size="sm" className="!p-0 text-blue-600 hover:text-blue-800 hover:bg-transparent">
                    Explore <HiOutlineArrowRight size={14} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function TripCard({ trip }) {
  const navigate = useNavigate()
  const totalBudget = trip.budget.transportCost + trip.budget.stayCost + trip.budget.activitiesCost + trip.budget.mealsCost + trip.budget.miscCost
  const days = differenceInDays(new Date(trip.endDate), new Date(trip.startDate))
  const isUpcoming = isFuture(new Date(trip.startDate))

  return (
    <Card onClick={() => navigate(`/trips/${trip.id}/view`)} className="group overflow-hidden !p-0 border-none shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={trip.coverPhotoUrl}
          alt={trip.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
        <div className="absolute top-4 right-4">
          <Badge variant={isUpcoming ? 'accent' : 'default'} className="shadow-lg backdrop-blur-md">
            {isUpcoming ? 'Upcoming' : 'Past'}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-5 text-white">
          <h3 className="font-bold text-xl font-display tracking-wide">{trip.name}</h3>
          <p className="text-sm font-medium text-white/90 mt-1.5 flex items-center gap-1.5">
            <HiOutlineCalendar size={14} className="opacity-70" />
            {format(new Date(trip.startDate), 'MMM d')} — {format(new Date(trip.endDate), 'MMM d, yyyy')}
          </p>
        </div>
      </div>
      <div className="p-5 flex flex-col h-full">
        <p className="text-gray-600 line-clamp-2 mb-5 leading-relaxed">{trip.description}</p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm font-bold text-gray-500">
            <span className="flex items-center gap-1.5">
              <HiOutlineLocationMarker size={16} className="text-gray-400" />
              {trip.stops.length} <span className="font-medium text-gray-400">cities</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1.5">
              <HiOutlineCalendar size={16} className="text-gray-400" />
              {days} <span className="font-medium text-gray-400">days</span>
            </span>
          </div>
          <Badge variant={totalBudget > trip.budget.totalBudgetLimit ? 'danger' : 'success'} className="!px-3 !py-1.5">
            <span className="font-mono text-sm tracking-tight">${totalBudget.toLocaleString()}</span>
          </Badge>
        </div>
      </div>
    </Card>
  )
}
