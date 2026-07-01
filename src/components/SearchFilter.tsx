import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plane, Hotel, Navigation, Car, MapPin, Calendar, Users, Search, ArrowRight, Star, DollarSign } from 'lucide-react';

interface SearchFilterProps {
  onSelectAndBook: (type: 'flight' | 'hotel' | 'tour' | 'car', title: string, price: number) => void;
}

export default function SearchFilter({ onSelectAndBook }: SearchFilterProps) {
  const [activeTab, setActiveTab] = useState<'flight' | 'hotel' | 'tour' | 'car'>('tour');
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('2026-07-15');
  const [checkOut, setCheckOut] = useState('2026-07-22');
  const [travelers, setTravelers] = useState(2);
  const [showTravelerDropdown, setShowTravelerDropdown] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Search results state
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);

  const tabs = [
    { id: 'flight', label: 'Flights', icon: Plane },
    { id: 'hotel', label: 'Hotels', icon: Hotel },
    { id: 'tour', label: 'Tours', icon: Navigation },
    { id: 'car', label: 'Cars', icon: Car },
  ] as const;

  const mockDb = {
    flight: [
      { id: 'fl-1', logo: '✈️', name: 'Singapore Airlines', route: 'Changi Intl (SIN) ➔ Male (MLE)', type: '1 Stop (SIN)', duration: '8h 15m', rating: 4.9, price: 850 },
      { id: 'fl-2', logo: '✈️', name: 'Emirates', route: 'London Heathrow (LHR) ➔ Dubai Intl (DXB)', type: 'Direct', duration: '6h 45m', rating: 4.8, price: 620 },
      { id: 'fl-3', logo: '✈️', name: 'Qatar Airways', route: 'JFK New York (JFK) ➔ Phuket Intl (HKT)', type: '1 Stop (DOH)', duration: '18h 30m', rating: 4.9, price: 1150 },
      { id: 'fl-4', logo: '✈️', name: 'Swiss Air', route: 'Zurich Intl (ZRH) ➔ Santorini Caldera (JTR)', type: 'Direct', duration: '2h 50m', rating: 4.7, price: 340 }
    ],
    hotel: [
      { id: 'ht-1', logo: '🏨', name: 'Ritz-Carlton Coral Resort', location: 'Santorini, Greece', type: 'Caldera View Double', rating: 4.9, price: 420 },
      { id: 'ht-2', logo: '🏨', name: 'Kandolhu Island Bungalows', location: 'Maldives', type: 'Overwater Sunset Villa', rating: 5.0, price: 650 },
      { id: 'ht-3', logo: '🏨', name: 'The Savoy Palace', location: 'London, UK', type: 'Deluxe Thames Room', rating: 4.8, price: 380 },
      { id: 'ht-4', logo: '🏨', name: 'Ubud Hanging Gardens Resort', location: 'Bali, Indonesia', type: 'Infinity Jungle Villa', rating: 4.9, price: 290 }
    ],
    tour: [
      { id: 'tr-1', logo: '🌴', name: 'Bali Spiritual & Adventure Escape', location: 'Bali, Indonesia', type: 'Cultural & Nature Guide', rating: 4.8, price: 800 },
      { id: 'tr-2', logo: '🏔️', name: 'Swiss Alps Luxury Scenic Journey', location: 'Zermatt, Switzerland', type: 'Scenic Mountain Trains', rating: 4.9, price: 1200 },
      { id: 'tr-3', logo: '⛵', name: 'Thailand Tropical Paradise Tour', location: 'Phuket, Thailand', type: 'Island Hopping Speedboat', rating: 4.7, price: 600 },
      { id: 'tr-4', logo: '🏙️', name: 'New York Skyline & Broadway Explorer', location: 'New York, USA', type: 'Broadway & Rooftops tour', rating: 4.9, price: 1500 }
    ],
    car: [
      { id: 'cr-1', logo: '🚗', name: 'Tesla Model Y Long Range', location: 'USA / Europe Airports', type: 'Electric • Autopilot • SUV', rating: 4.9, price: 85 },
      { id: 'cr-2', logo: '🚗', name: 'BMW 4 Series Convertible', location: 'Greece / France Locations', type: 'Automatic • Petrol • Cabriolet', rating: 4.8, price: 110 },
      { id: 'cr-3', logo: '🚗', name: 'Toyota RAV4 AWD Hybrid', location: 'Switzerland Mountains', type: 'AWD • Hybrid • Large SUV', rating: 4.7, price: 65 },
      { id: 'cr-4', logo: '🚗', name: 'Suzuki Jimny 4x4 Off-road', location: 'Bali / Thailand Resorts', type: 'Manual • 4WD • Mini SUV', rating: 4.6, price: 45 }
    ]
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setHasSearched(false);

    // Simulate database lookup
    setTimeout(() => {
      const db = mockDb[activeTab];
      let results = [...db];

      // Filter by destination search query if provided
      if (destination.trim()) {
        const query = destination.toLowerCase();
        results = results.filter(
          item =>
            item.name.toLowerCase().includes(query) ||
            (item as any).location?.toLowerCase().includes(query) ||
            (item as any).route?.toLowerCase().includes(query)
        );
      }

      setFilteredResults(results);
      setIsSearching(false);
      setHasSearched(true);
    }, 800);
  };

  const handleApplyTravelers = () => {
    setTravelers(adults + children);
    setShowTravelerDropdown(false);
  };

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 md:-mt-20">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-100">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setHasSearched(false);
                }}
                className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Search Form */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Destination */}
          <div className="relative">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Destination
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder={
                  activeTab === 'flight'
                    ? 'Where do you want to fly?'
                    : activeTab === 'hotel'
                    ? 'Where are you staying?'
                    : 'Search city or attraction...'
                }
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-2xl text-slate-800 font-semibold text-sm border border-slate-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Check-In / Start Date */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              {activeTab === 'flight' || activeTab === 'car' ? 'Departure Date' : 'Check In'}
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-2xl text-slate-800 font-semibold text-sm border border-slate-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* Check-Out / Return Date */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              {activeTab === 'flight' || activeTab === 'car' ? 'Return Date' : 'Check Out'}
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-2xl text-slate-800 font-semibold text-sm border border-slate-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all cursor-pointer"
              />
            </div>
          </div>

          {/* Guests / Travelers Multi-Selector */}
          <div className="relative">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Travelers / Guests
            </label>
            <button
              type="button"
              onClick={() => setShowTravelerDropdown(!showTravelerDropdown)}
              className="w-full flex items-center justify-between pl-4 pr-4 py-3 bg-slate-50 rounded-2xl text-slate-800 font-semibold text-sm border border-slate-200/60 hover:bg-slate-100/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-slate-400" />
                <span>{travelers} Guests</span>
              </div>
            </button>

            {/* Custom Multi-Selector Popover */}
            {showTravelerDropdown && (
              <div className="absolute right-0 bottom-full sm:bottom-auto sm:top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl p-5 border border-slate-100 z-30">
                <div className="space-y-4">
                  {/* Adults */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-800">Adults</div>
                      <div className="text-xs text-slate-400">Age 13+</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        disabled={adults <= 1}
                        onClick={() => setAdults(adults - 1)}
                        className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center font-bold text-slate-700 disabled:opacity-40"
                      >
                        -
                      </button>
                      <span className="font-bold text-slate-800 w-4 text-center">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(adults + 1)}
                        className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center font-bold text-slate-700"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-800">Children</div>
                      <div className="text-xs text-slate-400">Ages 2-12</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        disabled={children <= 0}
                        onClick={() => setChildren(children - 1)}
                        className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center font-bold text-slate-700 disabled:opacity-40"
                      >
                        -
                      </button>
                      <span className="font-bold text-slate-800 w-4 text-center">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren(children + 1)}
                        className="w-8 h-8 rounded-full border border-slate-200 hover:bg-slate-50 flex items-center justify-center font-bold text-slate-700"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleApplyTravelers}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-xs font-bold transition-colors"
                  >
                    Apply Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Submit Search Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSearch}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-xl hover:shadow-blue-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            {isSearching ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Search className="h-5 w-5" />
                <span>Search Now</span>
              </>
            )}
          </button>
        </div>

        {/* Dynamic Interactive Search Results List */}
        <AnimatePresence>
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 border-t border-slate-100 pt-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-2">
                  <span>✨ Smart Search Matches ({filteredResults.length})</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setHasSearched(false)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  Clear Results
                </button>
              </div>

              {filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {filteredResults.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-slate-50 hover:bg-blue-50/40 rounded-2xl p-5 border border-slate-200/60 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 text-2xl flex items-center justify-center shadow-inner">
                          {item.logo}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-base flex items-center space-x-2">
                            <span>{item.name}</span>
                            <span className="text-xs bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-500 font-medium">
                              {item.type}
                            </span>
                          </div>
                          <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                            {item.route || item.location} {item.duration && `• ${item.duration}`}
                          </div>
                          <div className="flex items-center space-x-1 mt-1.5 text-amber-500 text-xs font-bold">
                            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                            <span>{item.rating} Rating</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full md:w-auto md:space-x-6 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0 shrink-0">
                        <div className="text-left md:text-right">
                          <div className="text-xs text-slate-400 font-medium">Best Price</div>
                          <div className="text-2xl font-black text-slate-800 flex items-center">
                            <DollarSign className="h-5 w-5 text-emerald-500" />
                            <span>{item.price}</span>
                            <span className="text-xs font-medium text-slate-400 ml-1">
                              {activeTab === 'flight' || activeTab === 'tour' ? '/ person' : activeTab === 'hotel' ? '/ night' : '/ day'}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onSelectAndBook(activeTab, item.name, item.price)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl text-sm transition-all flex items-center space-x-1 cursor-pointer"
                        >
                          <span>Select & Book</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center text-slate-500 font-medium">
                  No exact matches found for your criteria. Try adjusting your destination keywords.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
