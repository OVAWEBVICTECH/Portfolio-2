import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, MapPin, Tag, CheckCircle2, Ticket, Trash2, ShoppingBag } from 'lucide-react';
import { Booking } from '../types';

interface BookingHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (id: string) => void;
  onViewTicket: (booking: Booking) => void;
}

export default function BookingHistory({
  isOpen,
  onClose,
  bookings,
  onCancelBooking,
  onViewTicket,
}: BookingHistoryProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Panel wrapper */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-slate-100"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center space-x-2.5">
                <ShoppingBag className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-bold">My Saved Bookings</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 relative hover:border-blue-200/80 transition-colors flex flex-col space-y-3"
                  >
                    {/* Header badge */}
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
                        {booking.type}
                      </span>
                      <span className="flex items-center space-x-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Confirmed</span>
                      </span>
                    </div>

                    {/* Destination / Title */}
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm sm:text-base leading-tight">
                        {booking.title}
                      </h4>
                      <div className="flex items-center space-x-1 text-xs text-slate-400 mt-1 font-semibold">
                        <MapPin className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                        <span>{booking.destination}</span>
                      </div>
                    </div>

                    {/* Travel Dates */}
                    <div className="grid grid-cols-2 gap-2 text-xs border-t border-b border-slate-200/50 py-2.5">
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none mb-1">
                          check in / departure
                        </span>
                        <span className="text-slate-700 font-bold">{booking.checkIn}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none mb-1">
                          check out / return
                        </span>
                        <span className="text-slate-700 font-bold">{booking.checkOut}</span>
                      </div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="flex items-center justify-between text-xs font-bold pt-1">
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold block uppercase leading-none mb-0.5">
                          total cost
                        </span>
                        <span className="text-base font-black text-slate-800">${booking.totalPrice}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {/* Cancel Button */}
                        <button
                          onClick={() => onCancelBooking(booking.id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
                          title="Cancel Booking"
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>

                        {/* View Ticket button */}
                        <button
                          onClick={() => onViewTicket(booking)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-2 rounded-xl text-[11px] flex items-center space-x-1 cursor-pointer transition-colors"
                        >
                          <Ticket className="h-3.5 w-3.5" />
                          <span>View Pass</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-12 space-y-4">
                  <div className="p-4 rounded-full bg-slate-50 text-slate-400 border border-slate-100">
                    <ShoppingBag className="h-10 w-10 text-slate-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700 text-base">No active bookings yet</h4>
                    <p className="text-xs text-slate-400 font-semibold max-w-[240px] mt-1.5 leading-relaxed">
                      You haven't checked out any flights, hotels, or tours yet. Start planning above to log your journey.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {bookings.length > 0 && (
              <div className="p-6 bg-slate-50 border-t border-slate-100 shrink-0 text-center">
                <span className="text-xs text-slate-400 font-semibold block mb-4">
                  All dates list in UTC-8 standard zone. Present digital barcodes at airline gates or hotel reception.
                </span>
                <button
                  onClick={onClose}
                  className="w-full bg-slate-900 hover:bg-slate-850 text-white font-bold py-3 rounded-2xl text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
