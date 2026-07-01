import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { destinations } from '../data';
import { Destination } from '../types';
import { Star, MapPin, ChevronRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

interface DestinationsProps {
  onOpenBooking: (type: 'flight' | 'hotel' | 'tour' | 'car', title: string, price: number) => void;
}

export default function Destinations({ onOpenBooking }: DestinationsProps) {
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  return (
    <section id="destinations" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16">
          <div>
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
              Popular Destinations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mt-4">
              Explore Our Hotspots
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium mt-2 max-w-xl">
              From majestic volcanic calderas to serene overwater villas, choose your dream escape.
            </p>
          </div>
          <button
            onClick={() => {
              const element = document.querySelector('#tours');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="mt-4 sm:mt-0 inline-flex items-center space-x-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group cursor-pointer"
          >
            <span>View All Packages</span>
            <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative h-96 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedDest(dest)}
            >
              {/* Card Image */}
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/35 to-transparent transition-all duration-300 group-hover:via-slate-950/40" />

              {/* Badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                <span className="flex items-center space-x-1 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  <span>{dest.rating}</span>
                </span>
                <span className="bg-blue-600/90 backdrop-blur-md text-white text-xs font-extrabold px-3 py-1 rounded-full border border-blue-400/20">
                  From ${dest.price}
                </span>
              </div>

              {/* Text details */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white">
                <div className="flex items-center space-x-1 text-xs text-sky-200 font-bold tracking-wide uppercase mb-1">
                  <MapPin className="h-3 w-3" />
                  <span>{dest.country}</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight mb-2">{dest.name}</h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {dest.description}
                </p>

                {/* Explore Trigger Label */}
                <div className="mt-4 flex items-center justify-between text-xs font-bold text-blue-400 group-hover:text-blue-300 border-t border-white/10 pt-3">
                  <span>Quick Explore</span>
                  <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Destination Quick Explore Popover Modal */}
      <AnimatePresence>
        {selectedDest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-start sm:items-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-100 relative my-4 sm:my-8"
            >
              {/* Banner Cover Image */}
              <div className="relative h-64 sm:h-80">
                <img
                  src={selectedDest.image}
                  alt={selectedDest.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <button
                  onClick={() => setSelectedDest(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center space-x-1 text-xs text-sky-300 font-bold tracking-wider uppercase mb-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{selectedDest.country}</span>
                  </div>
                  <h3 className="text-3xl font-black tracking-tight">{selectedDest.name}</h3>
                </div>
              </div>

              {/* Details Content */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="flex items-center space-x-1 bg-amber-50 text-amber-700 font-bold px-2.5 py-1 rounded-lg">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span>{selectedDest.rating}</span>
                    </div>
                    <span className="text-slate-400 font-semibold">•</span>
                    <span className="text-slate-500 font-semibold">{selectedDest.reviewsCount} Active Reviews</span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400 font-bold block uppercase">Custom Package Starting At</span>
                    <span className="text-2xl font-black text-slate-800">${selectedDest.price} <span className="text-xs font-semibold text-slate-400">/ person</span></span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Sparkles className="h-4 w-4 text-blue-500" />
                    <span>Overview</span>
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                    {selectedDest.description}
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
                    ✨ Handcrafted Itinerary Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedDest.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start space-x-2 text-sm text-slate-600 font-semibold">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Actions */}
                <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={() => {
                      setSelectedDest(null);
                      onOpenBooking('tour', `Standard ${selectedDest.name} Package`, selectedDest.price);
                    }}
                    className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-xl hover:shadow-blue-500/20 transition-all text-center cursor-pointer"
                  >
                    Book This Destination
                  </button>
                  <button
                    onClick={() => {
                      setSelectedDest(null);
                      // Smooth scroll to planner
                      const element = document.querySelector('#ai-planner');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 px-6 rounded-2xl transition-all text-center cursor-pointer"
                  >
                    Build Custom Itinerary
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
