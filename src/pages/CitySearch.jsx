import { useState } from 'react'
import { Card, Badge, Button, PageHeader } from '../components/UI'
import { cities } from '../lib/mockData'
import { HiOutlineSearch, HiOutlineLocationMarker, HiOutlineSparkles, HiOutlineArrowRight } from 'react-icons/hi'
import toast from 'react-hot-toast'

export default function CitySearch() {
  const [search, setSearch] = useState('')
  const [regionFilter, setRegionFilter] = useState('All')

  const regions = ['All', ...new Set(cities.map(c => c.region))]

  const filteredCities = cities.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.country.toLowerCase().includes(search.toLowerCase())
    const matchesRegion = regionFilter === 'All' || c.region === regionFilter
    return matchesSearch && matchesRegion
  })

  return (
    <div className="space-y-8">
      <PageHeader 
        title="Explore Destinations" 
        subtitle="Find the perfect city for your next adventure"
      />

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <HiOutlineSearch size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by city or country..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-500 focus:bg-white transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide flex-1 items-center px-2">
          {regions.map(region => (
            <button
              key={region}
              onClick={() => setRegionFilter(region)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                regionFilter === region 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : 'bg-white border-2 border-gray-200 text-gray-500 hover:border-blue-500 hover:text-blue-600'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
        {filteredCities.map(city => (
          <Card key={city.id} className="group !p-0 overflow-hidden flex flex-col h-full border-none shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="relative h-56 overflow-hidden">
              <img 
                src={city.coverImageUrl} 
                alt={city.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
              <div className="absolute top-4 right-4 flex gap-2">
                <Badge className="bg-white/10 text-white backdrop-blur-md border border-white/20 shadow-xl font-bold">
                  {city.popularityScore}% Match
                </Badge>
              </div>
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-2xl font-black font-display tracking-wide">{city.name}</h3>
                <div className="flex items-center gap-1.5 text-sm font-medium text-white/90 mt-1">
                  <HiOutlineLocationMarker size={16} className="opacity-70" />
                  {city.country}
                </div>
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col bg-white">
              <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                {city.description}
              </p>
              
              <div className="bg-blue-50/50 rounded-xl p-4 mb-6 flex gap-3 items-start border border-blue-100/50">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                  <HiOutlineSparkles className="text-blue-600" size={14} />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  <span className="font-bold text-gray-900">AI Tip: </span>
                  {city.name === 'Paris' ? 'Visit the Louvre on Wednesday evenings for fewer crowds.' : 
                   city.name === 'Tokyo' ? 'Get a Pasmo card immediately upon arrival.' :
                   `Spring is the best time to visit for optimal weather.`}
                </p>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm font-bold text-gray-500">
                  <span>Cost</span>
                  <span className="font-mono tracking-widest text-gray-900 text-base">
                    {'$'.repeat(Math.ceil(city.costIndex))}
                    <span className="text-gray-300">{'$'.repeat(5 - Math.ceil(city.costIndex))}</span>
                  </span>
                </div>
                <Button size="sm" onClick={() => toast.success(`Start a trip to ${city.name} from the Dashboard!`)} variant="secondary" className="!bg-gray-50 !border-transparent hover:!border-blue-500 hover:!bg-blue-50">
                  Explore <HiOutlineArrowRight size={14} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
