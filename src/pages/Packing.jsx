import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { PageHeader, Card, Button, Input } from '../components/UI'
import { demoPackingItems } from '../lib/mockData'
import { HiOutlinePlus, HiOutlineSparkles, HiOutlineCheck } from 'react-icons/hi'
import toast from 'react-hot-toast'

export default function Packing() {
  const { id } = useParams()
  const [items, setItems] = useState(demoPackingItems.filter(i => i.tripId === id || i.tripId === 'trip-1'))
  const [newItemLabel, setNewItemLabel] = useState('')
  const [loading, setLoading] = useState(false)

  const categories = ['documents', 'clothing', 'electronics', 'toiletries', 'other']

  const toggleItem = (itemId) => {
    setItems(items.map(i => i.id === itemId ? { ...i, isPacked: !i.isPacked } : i))
  }

  const addItem = (e, category) => {
    e.preventDefault()
    if (!newItemLabel.trim()) return
    const newItem = { id: Date.now().toString(), tripId: id, label: newItemLabel, category, isPacked: false }
    setItems([...items, newItem])
    setNewItemLabel('')
  }

  const handleAiGenerate = () => {
    setLoading(true)
    setTimeout(() => {
      toast.success('Smart checklist generated based on destination weather!')
      setLoading(false)
    }, 1500)
  }

  const getProgress = () => {
    if (items.length === 0) return 0
    return Math.round((items.filter(i => i.isPacked).length / items.length) * 100)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader 
        title="Packing Checklist" 
        subtitle={`${getProgress()}% packed`}
        actions={
          <Button variant="secondary" onClick={handleAiGenerate} loading={loading}>
            <HiOutlineSparkles size={16} /> Auto-Generate
          </Button>
        }
      />

      {/* Progress */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
        <div 
          className="h-full bg-[var(--color-accent)] transition-all duration-500"
          style={{ width: `${getProgress()}%` }}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 items-start">
        {categories.map(category => {
          const categoryItems = items.filter(i => i.category === category)
          if (categoryItems.length === 0 && category !== 'clothing') return null

          return (
            <Card key={category} hover={false} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold capitalize text-[var(--color-primary)]">{category}</h3>
                <span className="text-xs font-mono text-[var(--color-muted)]">
                  {categoryItems.filter(i => i.isPacked).length} / {categoryItems.length}
                </span>
              </div>
              
              <div className="space-y-2">
                {categoryItems.map(item => (
                  <button 
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors group text-left"
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${item.isPacked ? 'bg-[var(--color-success)] border-[var(--color-success)]' : 'border-gray-300 group-hover:border-[var(--color-accent)]'}`}>
                      {item.isPacked && <HiOutlineCheck size={14} className="text-white" />}
                    </div>
                    <span className={`text-sm flex-1 ${item.isPacked ? 'text-[var(--color-muted)] line-through' : 'text-[var(--color-primary)]'}`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              <form onSubmit={(e) => addItem(e, category)} className="pt-2 border-t border-[var(--color-border)] mt-4">
                <input 
                  type="text" 
                  placeholder="Add item..." 
                  className="w-full text-sm bg-transparent border-none focus:outline-none focus:ring-0 p-2 placeholder:text-[var(--color-muted-light)]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      setNewItemLabel(e.target.value)
                      addItem(e, category)
                      e.target.value = ''
                    }
                  }}
                />
              </form>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
