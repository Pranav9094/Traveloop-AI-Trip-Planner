import { useParams } from 'react-router-dom'
import { Card, Badge, PageHeader, Button } from '../components/UI'
import { demoTrips } from '../lib/mockData'
import { format, parseISO, isSameDay } from 'date-fns'
import { HiOutlineLocationMarker, HiOutlineClock, HiOutlineShare, HiOutlinePrinter } from 'react-icons/hi'

export default function ItineraryView() {
  const { id } = useParams()
  const trip = demoTrips.find(t => t.id === id) || demoTrips[0]
  
  // Sort stops by position
  const sortedStops = [...trip.stops].sort((a, b) => a.position - b.position)

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader 
        title={trip.name} 
        subtitle={`${format(new Date(trip.startDate), 'MMM d')} — ${format(new Date(trip.endDate), 'MMM d, yyyy')}`}
        actions={
          <>
            <Button variant="secondary"><HiOutlineShare size={16} /> Share</Button>
            <Button variant="secondary"><HiOutlinePrinter size={16} /> Print</Button>
          </>
        }
      />

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 lg:left-8 top-4 bottom-4 w-px bg-[var(--color-border)]" />
        
        <div className="space-y-8">
          {sortedStops.map((stop, stopIndex) => (
            <div key={stop.id} className="relative pl-14 lg:pl-20">
              {/* Timeline dot */}
              <div className="absolute left-6 lg:left-8 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--color-accent)] ring-4 ring-white" />
              
              <Card hover={false} className="overflow-hidden !p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3 h-40 sm:h-auto relative">
                    <img src={stop.city.coverImageUrl} alt={stop.city.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-display text-xl font-bold">{stop.city.name}</h3>
                      <p className="text-xs text-white/80 mt-1">
                        {stop.arrivalDate && format(parseISO(stop.arrivalDate), 'MMM d')} 
                        {stop.departureDate && ` - ${format(parseISO(stop.departureDate), 'MMM d')}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="sm:w-2/3 p-5">
                    {stop.activities.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-[var(--color-muted)] text-sm italic">
                        No activities planned yet
                      </div>
                    ) : (
                      <div className="space-y-4 relative">
                        {stop.activities.map((act, i) => (
                          <div key={act.id} className="flex gap-4">
                            <div className="flex flex-col items-center mt-1">
                              <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
                              {i < stop.activities.length - 1 && <div className="w-px h-full bg-[var(--color-border)] mt-1" />}
                            </div>
                            <div className="flex-1 pb-4">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h4 className="font-medium text-[var(--color-primary)] text-sm">{act.name}</h4>
                                  <div className="flex items-center gap-3 mt-1 text-xs text-[var(--color-muted)]">
                                    <span className="flex items-center gap-1"><HiOutlineClock size={12}/> {act.durationMinutes}m</span>
                                    <span className="font-mono text-[var(--color-primary)]">${act.cost}</span>
                                  </div>
                                </div>
                                <Badge variant={act.category === 'food' ? 'warning' : act.category === 'adventure' ? 'danger' : 'accent'}>
                                  {act.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
