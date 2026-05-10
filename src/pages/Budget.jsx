import { useParams } from 'react-router-dom'
import { Card, PageHeader, Badge } from '../components/UI'
import { demoTrips } from '../lib/mockData'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts'
import { HiOutlineLightBulb, HiOutlineCurrencyDollar } from 'react-icons/hi'

export default function Budget() {
  const { id } = useParams()
  const trip = demoTrips.find(t => t.id === id) || demoTrips[0]
  const b = trip.budget

  const data = [
    { name: 'Transport', value: b.transportCost, color: '#3B82F6' },
    { name: 'Stay', value: b.stayCost, color: '#10B981' },
    { name: 'Activities', value: b.activitiesCost, color: '#F59E0B' },
    { name: 'Meals', value: b.mealsCost, color: '#EF4444' },
    { name: 'Misc', value: b.miscCost, color: '#8B5CF6' },
  ]

  const totalSpent = data.reduce((sum, item) => sum + item.value, 0)
  const remaining = b.totalBudgetLimit - totalSpent
  const isOverBudget = remaining < 0

  return (
    <div className="space-y-6">
      <PageHeader title="Budget & Costs" subtitle={`Track expenses for ${trip.name}`} />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Summary & AI */}
        <div className="lg:col-span-1 space-y-6">
          <Card hover={false} className="bg-gradient-to-br from-gray-50 to-white">
            <h3 className="text-sm font-medium text-[var(--color-muted)] mb-1">Total Budget</h3>
            <p className="text-3xl font-mono font-bold text-[var(--color-primary)] mb-6">
              ${b.totalBudgetLimit.toLocaleString()}
            </p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--color-muted)]">Spent</span>
                <span className="font-mono font-medium">${totalSpent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-3 border-t border-[var(--color-border)]">
                <span className="text-[var(--color-muted)]">Remaining</span>
                <span className={`font-mono font-bold ${isOverBudget ? 'text-[var(--color-danger)]' : 'text-[var(--color-success)]'}`}>
                  ${remaining.toLocaleString()}
                </span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-6 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${isOverBudget ? 'bg-[var(--color-danger)]' : 'bg-[var(--color-success)]'}`}
                style={{ width: `${Math.min((totalSpent / b.totalBudgetLimit) * 100, 100)}%` }}
              />
            </div>
          </Card>

          <Card hover={false} className="border-[var(--color-accent)] bg-[var(--color-accent-light)]/30">
            <div className="flex items-center gap-2 mb-3">
              <HiOutlineLightBulb className="text-[var(--color-accent)]" size={20} />
              <h3 className="font-semibold text-[var(--color-accent-dark)]">AI Insights</h3>
            </div>
            <p className="text-sm text-[var(--color-accent-dark)] leading-relaxed">
              Based on your activities in {trip.stops[0]?.city?.name}, meal costs run slightly higher than average. Consider swapping one fine dining experience for a highly-rated street food tour to save ~$60 while maintaining a great culinary experience.
            </p>
          </Card>
        </div>

        {/* Right Column - Charts & Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          <Card hover={false} className="h-96 flex flex-col">
            <h3 className="font-semibold text-[var(--color-primary)] mb-4">Expense Breakdown</h3>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value) => `$${value}`}
                    contentStyle={{ borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid sm:grid-cols-2 gap-4">
            {data.map(item => (
              <Card key={item.name} hover={false} className="!p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-medium text-sm text-[var(--color-primary)]">{item.name}</span>
                </div>
                <span className="font-mono text-sm">${item.value.toLocaleString()}</span>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
