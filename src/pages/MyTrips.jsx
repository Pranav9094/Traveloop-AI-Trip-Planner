import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Badge, Button, PageHeader, TabGroup, EmptyState } from '../components/UI'
import { demoTrips } from '../lib/mockData'
import { format, differenceInDays, isFuture, isPast } from 'date-fns'
import { HiOutlinePlusCircle, HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineTrash, HiOutlinePencil, HiOutlineEye, HiOutlineSearch, HiOutlineMap } from 'react-icons/hi'
import toast from 'react-hot-toast'

export default function MyTrips() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [trips, setTrips] = useState(demoTrips)

  const filteredTrips = trips.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase())
    if (filter === 'upcoming') return matchSearch && isFuture(new Date(t.startDate))
    if (filter === 'past') return matchSearch && isPast(new Date(t.endDate))
    return matchSearch
  })

  const handleDelete = (e, tripId) => {
    e.stopPropagation()
    setTrips(trips.filter((t) => t.id !== tripId))
    toast.success('Trip deleted')
  }

  const tabs = [
    { label: `All (${trips.length})`, value: 'all' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Past', value: 'past' },
  ]

  return (
    <div className="space-y-8">
      <PageHeader 
        title="My Trips" 
        subtitle={`${trips.length} trips planned`}
        actions={
          <Button onClick={() => navigate('/trips/new')} size="lg" className="shadow-lg shadow-blue-500/30">
            <HiOutlinePlusCircle size={20} />
            Plan New Trip
          </Button>
        } 
      />

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <TabGroup tabs={tabs} activeTab={filter} onTabChange={setFilter} />
        <div className="relative flex-1 max-w-sm ml-auto">
          <HiOutlineSearch size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search trips..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all" 
          />
        </div>
      </div>

      {filteredTrips.length === 0 ? (
        <EmptyState 
          icon={HiOutlineMap} 
          title="No trips found" 
          description={search ? "Try adjusting your search or filters." : "Start planning your next adventure today!"}
          action={
            <Button onClick={() => navigate('/trips/new')} size="lg">
              <HiOutlinePlusCircle size={20} /> Create First Trip
            </Button>
          } 
        />
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 stagger-children">
          {filteredTrips.map((trip) => {
            const totalBudget = trip.budget.transportCost + trip.budget.stayCost + trip.budget.activitiesCost + trip.budget.mealsCost + trip.budget.miscCost
            const days = differenceInDays(new Date(trip.endDate), new Date(trip.startDate))
            const isUpcoming = isFuture(new Date(trip.startDate))
            
            return (
              <Card key={trip.id} onClick={() => navigate(`/trips/${trip.id}/view`)} className="group overflow-hidden !p-0 border-none shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="relative h-48 overflow-hidden shrink-0">
                  <img src={trip.coverPhotoUrl} alt={trip.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge variant={isUpcoming ? 'accent' : 'default'} className="shadow-lg backdrop-blur-md">
                      {isUpcoming ? 'Upcoming' : 'Past'}
                    </Badge>
                    {trip.isPublic && <Badge variant="success" className="shadow-lg backdrop-blur-md border-none">Public</Badge>}
                  </div>
                  <div className="absolute bottom-4 left-5 text-white">
                    <h3 className="font-bold text-xl font-display tracking-wide">{trip.name}</h3>
                    <p className="text-sm font-medium text-white/90 mt-1.5 flex items-center gap-1.5">
                      <HiOutlineCalendar size={14} className="opacity-70" />
                      {format(new Date(trip.startDate), 'MMM d')} — {format(new Date(trip.endDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                
                <div className="p-5 flex flex-col h-full bg-white">
                  <p className="text-gray-600 line-clamp-2 mb-4 leading-relaxed flex-1">{trip.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-5">
                    {trip.stops.map((stop) => (
                      <Badge key={stop.id} variant="default" className="!bg-gray-50 !text-gray-600 !border-gray-200">
                        <HiOutlineLocationMarker size={12} className="mr-1 text-gray-400" />
                        {stop.city.name}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-4 text-sm font-bold text-gray-500">
                      <span>{trip.stops.length} <span className="font-medium text-gray-400">cities</span></span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span>{days} <span className="font-medium text-gray-400">days</span></span>
                    </div>
                    <span className="font-mono text-base font-black text-gray-900 tracking-tight">${totalBudget.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                    <Button variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); navigate(`/trips/${trip.id}/view`) }} className="flex-1 !bg-gray-50 !border-transparent hover:!border-blue-500 hover:!bg-blue-50 hover:!text-blue-700">
                      <HiOutlineEye size={16} /> View
                    </Button>
                    <Button variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); navigate(`/trips/${trip.id}/build`) }} className="flex-1 !bg-gray-50 !border-transparent hover:!border-blue-500 hover:!bg-blue-50 hover:!text-blue-700">
                      <HiOutlinePencil size={16} /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={(e) => handleDelete(e, trip.id)} className="!text-gray-400 hover:!text-red-600 hover:!bg-red-50 !px-3 shrink-0">
                      <HiOutlineTrash size={18} />
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
