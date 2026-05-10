import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Textarea, PageHeader, Card } from '../components/UI'
import { cities } from '../lib/mockData'
import { HiOutlineSparkles, HiOutlinePhotograph, HiOutlineArrowRight, HiOutlineArrowLeft } from 'react-icons/hi'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'

export default function CreateTrip() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name: '', description: '', startDate: '', endDate: '', coverPhotoUrl: ''
  })
  const [aiLoading, setAiLoading] = useState(false)

  const coverOptions = [
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800',
    'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800',
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
    'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?w=800',
  ]

  const handleAiSuggest = () => {
    setAiLoading(true)
    setTimeout(() => {
      setForm(f => ({
        ...f,
        name: f.name || 'Mediterranean Escape',
        description: f.description || 'A sun-drenched journey through coastal Europe, blending ancient history with modern cuisine and breathtaking scenery.'
      }))
      setAiLoading(false)
      toast.success('AI suggestions applied!')
    }, 1000)
  }

  const handleSubmit = () => {
    const newTrip = { id: uuidv4(), ...form, stops: [], budget: { transportCost: 0, stayCost: 0, activitiesCost: 0, mealsCost: 0, miscCost: 0, currency: 'USD', totalBudgetLimit: 5000 } }
    toast.success('Trip created!')
    navigate(`/trips/${newTrip.id}/build`)
  }

  const steps = [
    { title: 'Name & Description', subtitle: 'Give your trip a memorable name' },
    { title: 'Travel Dates', subtitle: 'When are you going?' },
    { title: 'Cover Photo', subtitle: 'Pick a cover image for your trip' },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader title="Create New Trip" subtitle="Plan your next adventure in 3 simple steps" />
      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={i} className="flex-1 flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${i <= step ? 'bg-[var(--color-accent)] text-white' : 'bg-gray-100 text-[var(--color-muted)]'}`}>{i + 1}</div>
            <span className={`text-xs hidden sm:block ${i <= step ? 'text-[var(--color-primary)]' : 'text-[var(--color-muted)]'}`}>{s.title}</span>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? 'bg-[var(--color-accent)]' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <Card hover={false} className="animate-fade-in">
        <h2 className="text-lg font-semibold mb-1">{steps[step].title}</h2>
        <p className="text-sm text-[var(--color-muted)] mb-6">{steps[step].subtitle}</p>

        {step === 0 && (
          <div className="space-y-4">
            <Input label="Trip Name" placeholder="e.g. European Dream Tour" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} id="trip-name" />
            <Textarea label="Description" placeholder="Describe your trip..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} id="trip-desc" />
            <Button variant="secondary" onClick={handleAiSuggest} loading={aiLoading}><HiOutlineSparkles size={16} /> AI Suggest</Button>
          </div>
        )}

        {step === 1 && (
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} id="trip-start" />
            <Input label="End Date" type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} id="trip-end" />
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {coverOptions.map((url, i) => (
              <button key={i} onClick={() => setForm({ ...form, coverPhotoUrl: url })}
                className={`relative rounded-xl overflow-hidden h-28 border-2 transition-all ${form.coverPhotoUrl === url ? 'border-[var(--color-accent)] ring-2 ring-[var(--color-accent)]/30' : 'border-transparent hover:border-gray-300'}`}>
                <img src={url} alt={`Cover ${i+1}`} className="w-full h-full object-cover" />
                {form.coverPhotoUrl === url && <div className="absolute inset-0 bg-[var(--color-accent)]/20 flex items-center justify-center"><div className="w-6 h-6 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center text-xs">✓</div></div>}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-8 pt-4 border-t border-[var(--color-border)]">
          <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}><HiOutlineArrowLeft size={16} /> Back</Button>
          {step < 2 ? (
            <Button onClick={() => setStep(step + 1)}> Next <HiOutlineArrowRight size={16} /></Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!form.name}>Create Trip <HiOutlineArrowRight size={16} /></Button>
          )}
        </div>
      </Card>
    </div>
  )
}
