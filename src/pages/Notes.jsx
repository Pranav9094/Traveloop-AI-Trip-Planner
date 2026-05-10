import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageHeader, Card, Button, Input, Textarea } from '../components/UI'
import { demoNotes, demoTrips } from '../lib/mockData'
import { format, parseISO } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { HiOutlinePlus, HiOutlineSparkles, HiOutlineTrash } from 'react-icons/hi'
import toast from 'react-hot-toast'

export default function Notes() {
  const { id } = useParams()
  const trip = demoTrips.find(t => t.id === id) || demoTrips[0]
  const [notes, setNotes] = useState(demoNotes.filter(n => n.tripId === id || n.tripId === 'trip-1'))
  const [isComposing, setIsComposing] = useState(false)
  const [newNote, setNewNote] = useState({ content: '', stopId: '' })
  const [aiLoading, setAiLoading] = useState(false)

  const handleSave = () => {
    if (!newNote.content.trim()) return
    const note = {
      id: Date.now().toString(),
      tripId: id,
      stopId: newNote.stopId || null,
      content: newNote.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setNotes([note, ...notes])
    setNewNote({ content: '', stopId: '' })
    setIsComposing(false)
    toast.success('Note saved')
  }

  const handleAiExpand = () => {
    if (!newNote.content.trim()) return
    setAiLoading(true)
    setTimeout(() => {
      setNewNote(prev => ({
        ...prev,
        content: prev.content + '\n\n*AI Expansion:*\nBased on your brief note, you might also want to consider bringing a portable power bank, as taking photos all day will drain your battery quickly. Also, double-check the voltage requirements for your electronics, as European outlets differ from US ones.'
      }))
      setAiLoading(false)
      toast.success('AI expanded your note!')
    }, 1500)
  }

  const deleteNote = (noteId) => {
    setNotes(notes.filter(n => n.id !== noteId))
    toast.success('Note deleted')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader 
        title="Trip Journal & Notes" 
        actions={
          !isComposing && (
            <Button onClick={() => setIsComposing(true)}>
              <HiOutlinePlus size={16} /> New Note
            </Button>
          )
        }
      />

      {isComposing && (
        <Card className="border-[var(--color-accent)] ring-1 ring-[var(--color-accent)] animate-fade-in">
          <div className="space-y-4">
            <select 
              value={newNote.stopId}
              onChange={(e) => setNewNote({...newNote, stopId: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-[var(--color-border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            >
              <option value="">General Trip Note</option>
              {trip.stops.map(stop => (
                <option key={stop.id} value={stop.id}>
                  {stop.city.name}
                </option>
              ))}
            </select>
            
            <Textarea 
              placeholder="Write your note here... (Markdown supported)"
              value={newNote.content}
              onChange={(e) => setNewNote({...newNote, content: e.target.value})}
              rows={6}
            />
            
            <div className="flex items-center justify-between pt-2">
              <Button variant="ghost" size="sm" onClick={handleAiExpand} loading={aiLoading} disabled={!newNote.content.trim()}>
                <HiOutlineSparkles size={16} className="text-[var(--color-accent)]" /> AI Expand
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => setIsComposing(false)}>Cancel</Button>
                <Button onClick={handleSave} disabled={!newNote.content.trim()}>Save Note</Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {notes.length === 0 ? (
          <div className="text-center py-12 text-[var(--color-muted)]">No notes yet.</div>
        ) : (
          notes.map(note => {
            const stop = note.stopId ? trip.stops.find(s => s.id === note.stopId) : null
            return (
              <Card key={note.id} hover={false} className="relative group">
                <div className="flex justify-between items-start mb-4 border-b border-[var(--color-border)] pb-3">
                  <div>
                    {stop ? (
                      <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded-md text-[var(--color-primary)]">
                        📍 {stop.city.name}
                      </span>
                    ) : (
                      <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded-md text-[var(--color-primary)]">
                        Trip General
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-[var(--color-muted)] font-mono">
                      {format(new Date(note.createdAt), 'MMM d, yyyy • h:mm a')}
                    </span>
                    <button 
                      onClick={() => deleteNote(note.id)}
                      className="text-[var(--color-muted)] hover:text-[var(--color-danger)] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <HiOutlineTrash size={16} />
                    </button>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none prose-headings:font-display prose-a:text-[var(--color-accent)]">
                  <ReactMarkdown>{note.content}</ReactMarkdown>
                </div>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
