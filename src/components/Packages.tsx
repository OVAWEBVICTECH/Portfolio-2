import { motion } from 'motion/react';
import { tourPackages } from '../data';
import { Clock, Star, MapPin, Tag } from 'lucide-react';

interface PackagesProps {
  onOpenBooking: (type: 'flight' | 'hotel' | 'tour' | 'car', title: string, price: number) => void;
}

export default function Packages({ onOpenBooking }: PackagesProps) {
  return (
    <section id="tours" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Special Offer Packages
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mt-4">
            Our Popular Tour Packages
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium mt-2">
            Fully organized vacation packages bundled with elite accommodations, active guides, and private transport.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tourPackages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100/80 transition-all duration-300 flex flex-col h-full group"
            >
              {/* Cover Image & Discount Tag */}
              <div className="relative h-56 overflow-hidden shrink-0">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Floating Discount Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-full flex items-center space-x-1 shadow-md border border-red-400/20">
                    <Tag className="h-3.5 w-3.5" />
                    <span>{pkg.discountText}</span>
                  </span>
                </div>

                {/* Duration Tag */}
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center space-x-1 border border-white/10">
                    <Clock className="h-3.5 w-3.5 text-blue-400" />
                    <span>{pkg.duration}</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Location and Rating */}
                <div className="flex items-center justify-between mb-3 text-xs">
                  <div className="flex items-center space-x-1 text-slate-400 font-semibold">
                    <MapPin className="h-3.5 w-3.5 text-blue-500" />
                    <span className="truncate max-w-[120px]">{pkg.location}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-500 font-bold">
                    <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                    <span>{pkg.rating}</span>
                    <span className="text-slate-300 font-normal">({pkg.reviewsCount})</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {pkg.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-500 font-medium line-clamp-3 leading-relaxed mb-6">
                  {pkg.description}
                </p>

                {/* Bottom line: Pricing & CTA */}
                <div className="mt-auto border-t border-slate-100 pt-5 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none">Starting From</span>
                    <div className="flex items-baseline space-x-1.5 mt-1">
                      <span className="text-2xl font-black text-slate-800">${pkg.price}</span>
                      <span className="text-xs text-slate-400 line-through font-semibold">${pkg.oldPrice}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenBooking('tour', pkg.name, pkg.price)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all cursor-pointer shrink-0"
                  >
                    Book Tour
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
