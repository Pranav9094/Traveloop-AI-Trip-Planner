import { v4 as uuidv4 } from 'uuid'

// ─── Cities ───────────────────────────────────────────────────
export const cities = [
  { id: uuidv4(), name: 'Paris', country: 'France', region: 'Europe', costIndex: 3.8, popularityScore: 98, lat: 48.8566, lng: 2.3522, description: 'City of lights, art, and romance.', coverImageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600' },
  { id: uuidv4(), name: 'Tokyo', country: 'Japan', region: 'Asia', costIndex: 3.5, popularityScore: 95, lat: 35.6762, lng: 139.6503, description: 'Vibrant metropolis blending tradition and innovation.', coverImageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600' },
  { id: uuidv4(), name: 'New York', country: 'USA', region: 'North America', costIndex: 4.2, popularityScore: 97, lat: 40.7128, lng: -74.006, description: 'The city that never sleeps.', coverImageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600' },
  { id: uuidv4(), name: 'Bali', country: 'Indonesia', region: 'Asia', costIndex: 1.5, popularityScore: 90, lat: -8.3405, lng: 115.092, description: 'Tropical paradise with ancient temples.', coverImageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600' },
  { id: uuidv4(), name: 'Barcelona', country: 'Spain', region: 'Europe', costIndex: 2.8, popularityScore: 92, lat: 41.3874, lng: 2.1686, description: 'Mediterranean charm meets Gaudí architecture.', coverImageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600' },
  { id: uuidv4(), name: 'Dubai', country: 'UAE', region: 'Middle East', costIndex: 4.0, popularityScore: 88, lat: 25.2048, lng: 55.2708, description: 'Futuristic desert city of superlatives.', coverImageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600' },
  { id: uuidv4(), name: 'Cape Town', country: 'South Africa', region: 'Africa', costIndex: 2.0, popularityScore: 85, lat: -33.9249, lng: 18.4241, description: 'Where mountains meet the ocean.', coverImageUrl: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600' },
  { id: uuidv4(), name: 'Kyoto', country: 'Japan', region: 'Asia', costIndex: 3.0, popularityScore: 89, lat: 35.0116, lng: 135.7681, description: 'Ancient capital of temples and geishas.', coverImageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600' },
  { id: uuidv4(), name: 'Rome', country: 'Italy', region: 'Europe', costIndex: 3.2, popularityScore: 94, lat: 41.9028, lng: 12.4964, description: 'Eternal city of history and gelato.', coverImageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600' },
  { id: uuidv4(), name: 'Santorini', country: 'Greece', region: 'Europe', costIndex: 3.5, popularityScore: 91, lat: 36.3932, lng: 25.4615, description: 'Iconic blue domes and sunset views.', coverImageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600' },
  { id: uuidv4(), name: 'Bangkok', country: 'Thailand', region: 'Asia', costIndex: 1.3, popularityScore: 87, lat: 13.7563, lng: 100.5018, description: 'Bustling street food capital of the world.', coverImageUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600' },
  { id: uuidv4(), name: 'Lisbon', country: 'Portugal', region: 'Europe', costIndex: 2.3, popularityScore: 86, lat: 38.7223, lng: -9.1393, description: 'Colorful hills and pastel de nata.', coverImageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600' },
  { id: uuidv4(), name: 'Marrakech', country: 'Morocco', region: 'Africa', costIndex: 1.8, popularityScore: 82, lat: 31.6295, lng: -7.9811, description: 'Sensory overload in the Red City.', coverImageUrl: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600' },
  { id: uuidv4(), name: 'Sydney', country: 'Australia', region: 'Oceania', costIndex: 3.7, popularityScore: 88, lat: -33.8688, lng: 151.2093, description: 'Harbour city with world-class beaches.', coverImageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600' },
  { id: uuidv4(), name: 'Reykjavik', country: 'Iceland', region: 'Europe', costIndex: 4.5, popularityScore: 78, lat: 64.1466, lng: -21.9426, description: 'Gateway to northern lights and glaciers.', coverImageUrl: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=600' },
  { id: uuidv4(), name: 'Cusco', country: 'Peru', region: 'South America', costIndex: 1.6, popularityScore: 80, lat: -13.532, lng: -71.9675, description: 'Gateway to Machu Picchu.', coverImageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600' },
  { id: uuidv4(), name: 'Istanbul', country: 'Turkey', region: 'Europe', costIndex: 2.1, popularityScore: 90, lat: 41.0082, lng: 28.9784, description: 'Where East meets West.', coverImageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600' },
  { id: uuidv4(), name: 'Maldives', country: 'Maldives', region: 'Asia', costIndex: 5.0, popularityScore: 93, lat: 3.2028, lng: 73.2207, description: 'Overwater villas in turquoise paradise.', coverImageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600' },
  { id: uuidv4(), name: 'Amsterdam', country: 'Netherlands', region: 'Europe', costIndex: 3.3, popularityScore: 89, lat: 52.3676, lng: 4.9041, description: 'Canals, culture, and creativity.', coverImageUrl: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600' },
  { id: uuidv4(), name: 'Singapore', country: 'Singapore', region: 'Asia', costIndex: 3.8, popularityScore: 87, lat: 1.3521, lng: 103.8198, description: 'Garden city with futuristic skyline.', coverImageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600' },
]

// ─── Activities Generator ─────────────────────────────────────
const activityTemplates = {
  sightseeing: [
    { name: 'Walking City Tour', cost: 25, duration: 180 },
    { name: 'Historic Landmark Visit', cost: 15, duration: 90 },
    { name: 'Museum Exploration', cost: 20, duration: 120 },
    { name: 'Viewpoint & Photography', cost: 10, duration: 60 },
    { name: 'Boat/River Cruise', cost: 45, duration: 120 },
  ],
  food: [
    { name: 'Street Food Tour', cost: 35, duration: 150 },
    { name: 'Fine Dining Experience', cost: 120, duration: 120 },
    { name: 'Cooking Class', cost: 65, duration: 180 },
    { name: 'Local Market Visit', cost: 15, duration: 90 },
    { name: 'Wine/Tea Tasting', cost: 50, duration: 90 },
  ],
  adventure: [
    { name: 'Hiking Trail', cost: 30, duration: 240 },
    { name: 'Snorkeling/Diving', cost: 80, duration: 180 },
    { name: 'Zip-lining', cost: 55, duration: 90 },
    { name: 'Kayaking', cost: 40, duration: 120 },
    { name: 'Paragliding', cost: 100, duration: 60 },
  ],
  culture: [
    { name: 'Temple/Church Visit', cost: 5, duration: 60 },
    { name: 'Traditional Show', cost: 40, duration: 120 },
    { name: 'Art Gallery Tour', cost: 18, duration: 90 },
    { name: 'Local Workshop', cost: 45, duration: 120 },
    { name: 'Historical Walk', cost: 20, duration: 90 },
  ],
  wellness: [
    { name: 'Spa & Massage', cost: 70, duration: 120 },
    { name: 'Yoga Session', cost: 25, duration: 90 },
    { name: 'Hot Springs Visit', cost: 35, duration: 120 },
    { name: 'Meditation Retreat', cost: 30, duration: 60 },
    { name: 'Beach Relaxation', cost: 0, duration: 180 },
  ],
}

export const generateActivities = (city) => {
  const activities = []
  Object.entries(activityTemplates).forEach(([category, templates]) => {
    templates.forEach((template) => {
      activities.push({
        id: uuidv4(),
        cityId: city.id,
        cityName: city.name,
        name: `${template.name} in ${city.name}`,
        category,
        cost: Math.round(template.cost * city.costIndex * 0.8),
        durationMinutes: template.duration,
        description: `Experience an amazing ${template.name.toLowerCase()} in the heart of ${city.name}, ${city.country}.`,
        imageUrl: city.coverImageUrl,
      })
    })
  })
  return activities
}

// ─── Demo Trips ───────────────────────────────────────────────
export const demoTrips = [
  {
    id: 'trip-1',
    userId: 'user-1',
    name: 'European Dream Tour',
    description: 'A romantic journey through Europe\'s most iconic cities.',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800',
    startDate: '2026-06-15',
    endDate: '2026-06-28',
    isPublic: true,
    shareToken: 'abc-123-share',
    createdAt: '2026-05-01',
    stops: [
      { id: 's1', tripId: 'trip-1', city: cities[0], position: 0, arrivalDate: '2026-06-15', departureDate: '2026-06-18', activities: generateActivities(cities[0]).slice(0, 4) },
      { id: 's2', tripId: 'trip-1', city: cities[4], position: 1, arrivalDate: '2026-06-18', departureDate: '2026-06-22', activities: generateActivities(cities[4]).slice(0, 3) },
      { id: 's3', tripId: 'trip-1', city: cities[8], position: 2, arrivalDate: '2026-06-22', departureDate: '2026-06-28', activities: generateActivities(cities[8]).slice(0, 5) },
    ],
    budget: { transportCost: 850, stayCost: 2200, activitiesCost: 600, mealsCost: 900, miscCost: 300, currency: 'USD', totalBudgetLimit: 5500 },
  },
  {
    id: 'trip-2',
    userId: 'user-1',
    name: 'Asian Adventure',
    description: 'Temples, street food, and tropical beaches.',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    startDate: '2026-08-01',
    endDate: '2026-08-14',
    isPublic: false,
    shareToken: null,
    createdAt: '2026-05-05',
    stops: [
      { id: 's4', tripId: 'trip-2', city: cities[1], position: 0, arrivalDate: '2026-08-01', departureDate: '2026-08-05', activities: generateActivities(cities[1]).slice(0, 4) },
      { id: 's5', tripId: 'trip-2', city: cities[7], position: 1, arrivalDate: '2026-08-05', departureDate: '2026-08-08', activities: generateActivities(cities[7]).slice(0, 3) },
      { id: 's6', tripId: 'trip-2', city: cities[3], position: 2, arrivalDate: '2026-08-08', departureDate: '2026-08-14', activities: generateActivities(cities[3]).slice(0, 5) },
    ],
    budget: { transportCost: 600, stayCost: 800, activitiesCost: 400, mealsCost: 350, miscCost: 200, currency: 'USD', totalBudgetLimit: 3000 },
  },
  {
    id: 'trip-3',
    userId: 'user-1',
    name: 'Island Escape',
    description: 'Ultimate relaxation in tropical paradises.',
    coverPhotoUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    startDate: '2026-12-20',
    endDate: '2026-12-30',
    isPublic: true,
    shareToken: 'xyz-789-share',
    createdAt: '2026-05-08',
    stops: [
      { id: 's7', tripId: 'trip-3', city: cities[17], position: 0, arrivalDate: '2026-12-20', departureDate: '2026-12-25', activities: generateActivities(cities[17]).slice(0, 3) },
      { id: 's8', tripId: 'trip-3', city: cities[3], position: 1, arrivalDate: '2026-12-25', departureDate: '2026-12-30', activities: generateActivities(cities[3]).slice(0, 4) },
    ],
    budget: { transportCost: 1200, stayCost: 3500, activitiesCost: 500, mealsCost: 800, miscCost: 400, currency: 'USD', totalBudgetLimit: 7000 },
  },
]

export const demoPackingItems = [
  { id: 'p1', tripId: 'trip-1', label: 'Passport', category: 'documents', isPacked: true },
  { id: 'p2', tripId: 'trip-1', label: 'Travel Insurance Docs', category: 'documents', isPacked: true },
  { id: 'p3', tripId: 'trip-1', label: 'Flight Tickets (printed)', category: 'documents', isPacked: false },
  { id: 'p4', tripId: 'trip-1', label: 'Hotel Confirmations', category: 'documents', isPacked: false },
  { id: 'p5', tripId: 'trip-1', label: 'T-shirts (5)', category: 'clothing', isPacked: true },
  { id: 'p6', tripId: 'trip-1', label: 'Jeans (2)', category: 'clothing', isPacked: false },
  { id: 'p7', tripId: 'trip-1', label: 'Light Jacket', category: 'clothing', isPacked: false },
  { id: 'p8', tripId: 'trip-1', label: 'Walking Shoes', category: 'clothing', isPacked: true },
  { id: 'p9', tripId: 'trip-1', label: 'Phone Charger', category: 'electronics', isPacked: true },
  { id: 'p10', tripId: 'trip-1', label: 'Power Bank', category: 'electronics', isPacked: false },
  { id: 'p11', tripId: 'trip-1', label: 'Camera', category: 'electronics', isPacked: false },
  { id: 'p12', tripId: 'trip-1', label: 'Universal Adapter', category: 'electronics', isPacked: false },
  { id: 'p13', tripId: 'trip-1', label: 'Toothbrush', category: 'toiletries', isPacked: true },
  { id: 'p14', tripId: 'trip-1', label: 'Sunscreen', category: 'toiletries', isPacked: false },
  { id: 'p15', tripId: 'trip-1', label: 'Medications', category: 'toiletries', isPacked: false },
]

export const demoNotes = [
  { id: 'n1', tripId: 'trip-1', stopId: 's1', content: '# Paris Day 1\n\nArrived at CDG. The Uber to the hotel was smooth. First stop: Café de Flore for espresso. The neighborhood vibe is incredible.', createdAt: '2026-05-01', updatedAt: '2026-05-01' },
  { id: 'n2', tripId: 'trip-1', stopId: 's2', content: '## Barcelona Notes\n\n- Book Sagrada Familia tickets EARLY\n- Try churros at Xurreria Trebol\n- Beach day on Barceloneta', createdAt: '2026-05-03', updatedAt: '2026-05-03' },
  { id: 'n3', tripId: 'trip-1', stopId: null, content: '### General Packing Reminder\n\nDon\'t forget the universal adapter! Also, download offline maps for all three cities.', createdAt: '2026-05-05', updatedAt: '2026-05-05' },
]

export const demoUser = {
  id: 'user-1',
  name: 'Pranav Chaudhari',
  email: 'pranav@traveloop.app',
  avatarUrl: null,
  language: 'en',
  createdAt: '2026-01-15',
}
