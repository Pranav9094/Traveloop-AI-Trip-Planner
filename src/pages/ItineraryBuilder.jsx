import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Badge, Button, PageHeader, Modal } from '../components/UI'
import { demoTrips, cities, generateActivities } from '../lib/mockData'
import { format } from 'date-fns'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { HiOutlinePlus, HiOutlineTrash, HiOutlineLocationMarker, HiOutlineSparkles, HiOutlineSwitchVertical, HiOutlineCalendar } from 'react-icons/hi'
import toast from 'react-hot-toast'

export default function ItineraryBuilder() {
  const { id } = useParams()
  const navigate = useNavigate()
  const trip = demoTrips.find(t => t.id === id) || demoTrips[0]
  const [stops, setStops] = useState(trip.stops)
  const [showCityModal, setShowCityModal] = useState(false)
  const [showActivityModal, setShowActivityModal] = useState(null)

  const onDragEnd = (result) => {
    if (!result.destination) return
    const items = Array.from(stops)
    const [moved] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, moved)
    setStops(items.map((s, i) => ({ ...s, position: i })))
    toast.success('Stop order updated')
  }

  const addCity = (city) => {
    const newStop = { id: `s-${Date.now()}`, tripId: trip.id, city, position: stops.length, arrivalDate: '', departureDate: '', activities: [] }
    setStops([...stops, newStop])
    setShowCityModal(false)
    toast.success(`${city.name} added!`)
  }

  const removeStop = (stopId) => {
    setStops(stops.filter(s => s.id !== stopId))
    toast.success('Stop removed')
  }

  const addActivity = (stopId, activity) => {
    setStops(stops.map(s => s.id === stopId ? { ...s, activities: [...s.activities, activity] } : s))
    setShowActivityModal(null)
    toast.success('Activity added!')
  }

  const removeActivity = (stopId, actId) => {
    setStops(stops.map(s => s.id === stopId ? { ...s, activities: s.activities.filter(a => a.id !== actId) } : s))
  }

  const handleAiOrder = () => {
    const sorted = [...stops].sort((a, b) => a.city.lat - b.city.lat)
    setStops(sorted.map((s, i) => ({ ...s, position: i })))
    toast.success('AI optimized city order by geography!')
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Itinerary Builder" subtitle={trip.name}
        actions={<>
          <Button variant="secondary" onClick={handleAiOrder}><HiOutlineSparkles size={16} /> AI Optimize Order</Button>
          <Button onClick={() => setShowCityModal(true)}><HiOutlinePlus size={16} /> Add City</Button>
        </>} />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="stops">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-4">
              {stops.map((stop, index) => (
                <Draggable key={stop.id} draggableId={stop.id} index={index}>
                  {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}
                      className={`bg-white rounded-xl border border-[var(--color-border)] overflow-hidden transition-shadow ${snapshot.isDragging ? 'shadow-xl' : ''}`}>
                      <div className="flex items-center gap-4 p-4 border-b border-[var(--color-border)]">
                        <div {...provided.dragHandleProps} className="cursor-grab text-[var(--color-muted)] hover:text-[var(--color-primary)]">
                          <HiOutlineSwitchVertical size={20} />
                        </div>
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={stop.city.coverImageUrl} alt={stop.city.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[var(--color-primary)]">{stop.city.name}, {stop.city.country}</h3>
                          <p className="text-xs text-[var(--color-muted)]">
                            {stop.arrivalDate && stop.departureDate ? `${format(new Date(stop.arrivalDate), 'MMM d')} — ${format(new Date(stop.departureDate), 'MMM d')}` : 'Dates not set'}
                          </p>
                        </div>
                        <Badge variant="accent">Stop {index + 1}</Badge>
                        <Button variant="ghost" size="sm" onClick={() => setShowActivityModal(stop.id)}><HiOutlinePlus size={14} /></Button>
                        <Button variant="ghost" size="sm" onClick={() => removeStop(stop.id)} className="!text-[var(--color-danger)]"><HiOutlineTrash size={14} /></Button>
                      </div>
                      {stop.activities.length > 0 && (
                        <div className="p-4 grid sm:grid-cols-2 gap-2">
                          {stop.activities.map(act => (
                            <div key={act.id} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 text-sm">
                              <Badge variant={act.category === 'food' ? 'warning' : act.category === 'adventure' ? 'danger' : 'accent'} className="text-[10px]">{act.category}</Badge>
                              <span className="flex-1 truncate text-[var(--color-primary)]">{act.name.split(' in ')[0]}</span>
                              <span className="font-mono text-xs text-[var(--color-muted)]">${act.cost}</span>
                              <button onClick={() => removeActivity(stop.id, act.id)} className="text-[var(--color-muted)] hover:text-[var(--color-danger)] text-xs">×</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {stops.length === 0 && (
        <Card hover={false} className="text-center py-12">
          <HiOutlineLocationMarker size={40} className="mx-auto text-[var(--color-muted)] mb-3" />
          <h3 className="font-semibold text-lg mb-1">No stops yet</h3>
          <p className="text-sm text-[var(--color-muted)] mb-4">Add cities to build your itinerary</p>
          <Button onClick={() => setShowCityModal(true)}><HiOutlinePlus size={16} /> Add First City</Button>
        </Card>
      )}

      {/* City Modal */}
      <Modal isOpen={showCityModal} onClose={() => setShowCityModal(false)} title="Add a City" size="lg">
        <div className="grid sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
          {cities.filter(c => !stops.find(s => s.city.id === c.id)).map(city => (
            <button key={city.id} onClick={() => addCity(city)}
              className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-border)] hover:bg-gray-50 hover:border-[var(--color-accent)] transition-all text-left">
              <img src={city.coverImageUrl} alt={city.name} className="w-12 h-12 rounded-lg object-cover" />
              <div className="min-w-0"><p className="font-medium text-sm truncate">{city.name}</p><p className="text-xs text-[var(--color-muted)]">{city.country}</p></div>
            </button>
          ))}
        </div>
      </Modal>

      {/* Activity Modal */}
      <Modal isOpen={!!showActivityModal} onClose={() => setShowActivityModal(null)} title="Add Activity" size="lg">
        {showActivityModal && (() => {
          const stop = stops.find(s => s.id === showActivityModal)
          if (!stop) return null
          const acts = generateActivities(stop.city)
          return (
            <div className="grid gap-2 max-h-96 overflow-y-auto">
              {acts.slice(0, 15).map(act => (
                <button key={act.id} onClick={() => addActivity(showActivityModal, act)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-[var(--color-border)] hover:bg-gray-50 transition-all text-left">
                  <Badge variant={act.category === 'food' ? 'warning' : act.category === 'adventure' ? 'danger' : 'accent'}>{act.category}</Badge>
                  <span className="flex-1 text-sm">{act.name.split(' in ')[0]}</span>
                  <span className="font-mono text-sm text-[var(--color-muted)]">${act.cost}</span>
                  <span className="text-xs text-[var(--color-muted)]">{act.durationMinutes}min</span>
                </button>
              ))}
            </div>
          )
        })()}
      </Modal>
    </div>
  )
}
