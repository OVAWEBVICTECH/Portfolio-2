import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Mail, Phone, User, CheckCircle, CreditCard, ChevronRight, ChevronLeft, Sparkles, AlertCircle, Eye, Armchair, HelpCircle } from 'lucide-react';
import { Booking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType: 'flight' | 'hotel' | 'tour' | 'car';
  initialTitle: string;
  initialPrice: number;
  onBookingSuccess: (booking: Booking) => void;
  viewingBooking?: Booking | null;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialType,
  initialTitle,
  initialPrice,
  onBookingSuccess,
  viewingBooking,
}: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [type, setType] = useState(initialType);
  const [title, setTitle] = useState(initialTitle);
  const [basePrice, setBasePrice] = useState(initialPrice);

  // Form Fields
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('2026-07-15');
  const [checkOut, setCheckOut] = useState('2026-07-22');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const [passengerName, setPassengerName] = useState('');
  const [passengerEmail, setPassengerEmail] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');

  // Step 3 Addons / Customizers
  const [classType, setClassType] = useState('Economy'); // or Business/First Class
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [extraOptions, setExtraOptions] = useState<string[]>([]);

  // Payment simulated credit cards
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCVC] = useState('');

  // Validation warnings
  const [warning, setWarning] = useState<string | null>(null);

  // Load parent choices on trigger open
  useEffect(() => {
    if (isOpen) {
      if (viewingBooking) {
        setType(viewingBooking.type);
        setTitle(viewingBooking.title);
        setBasePrice(viewingBooking.totalPrice);
        setDestination(viewingBooking.destination);
        setCheckIn(viewingBooking.checkIn);
        setCheckOut(viewingBooking.checkOut);
        setAdults(viewingBooking.travelers.adults);
        setChildren(viewingBooking.travelers.children);
        setPassengerName(viewingBooking.passengerName);
        setPassengerEmail(viewingBooking.passengerEmail);
        setPassengerPhone(viewingBooking.passengerPhone);
        if (viewingBooking.classType) {
          setClassType(viewingBooking.classType);
        }
        if (viewingBooking.extraOptions) {
          setExtraOptions(viewingBooking.extraOptions);
        } else {
          setExtraOptions([]);
        }
        setStep(5); // Jumps straight to digital voucher
        setWarning(null);
      } else {
        setType(initialType);
        setTitle(initialTitle);
        setBasePrice(initialPrice);
        setDestination(initialTitle.replace(' Standard', '').replace(' Package', '').replace(' Standard', ''));
        setStep(1);
        // reset custom fields
        setPassengerName('');
        setPassengerEmail('');
        setPassengerPhone('');
        setSelectedSeat(null);
        setExtraOptions([]);
        setCardNumber('');
        setCardExpiry('');
        setCardCVC('');
        setWarning(null);
      }
    }
  }, [isOpen, initialType, initialTitle, initialPrice, viewingBooking]);

  const handleNextStep = () => {
    setWarning(null);
    if (step === 1) {
      if (!destination.trim()) {
        setWarning('Please fill out the destination field.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!passengerName.trim() || !passengerEmail.trim() || !passengerPhone.trim()) {
        setWarning('Please provide complete passenger details.');
        return;
      }
      if (!passengerEmail.includes('@')) {
        setWarning('Please enter a valid email address.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      // Customizers done, go to payment (Step 4)
      setStep(4);
    }
  };

  const handlePrevStep = () => {
    setWarning(null);
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const calculateAddonsCost = () => {
    let cost = 0;
    if (classType === 'Business') cost += 250;
    if (classType === 'First Class') cost += 500;
    if (extraOptions.includes('Full Insurance')) cost += 50;
    if (extraOptions.includes('Ocean View Upgrade')) cost += 150;
    if (extraOptions.includes('Catamaran Sunset Excursion')) cost += 80;
    if (extraOptions.includes('Breakfast Included')) cost += 30;
    return cost;
  };

  const totalPrice = basePrice + calculateAddonsCost();

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCvc) {
      setWarning('Please provide your payment card details.');
      return;
    }

    const newBooking: Booking = {
      id: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
      type,
      title,
      destination,
      checkIn,
      checkOut,
      travelers: { adults, children },
      totalPrice,
      status: 'confirmed',
      passengerName,
      passengerEmail,
      passengerPhone,
      classType: type === 'flight' ? classType : undefined,
      extraOptions: extraOptions.length > 0 ? extraOptions : undefined,
      bookingDate: new Date().toLocaleDateString(),
    };

    onBookingSuccess(newBooking);
    setStep(5); // Show Ticket screen!
  };

  const handleCheckboxOption = (option: string) => {
    if (extraOptions.includes(option)) {
      setExtraOptions(extraOptions.filter((item) => item !== option));
    } else {
      setExtraOptions([...extraOptions, option]);
    }
  };

  // Seating map row helper
  const seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatRows = [12, 14, 15, 16, 17, 18];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex justify-center items-start sm:items-center p-4 overflow-y-auto">
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col relative my-4 sm:my-8"
        >
          {/* Header */}
          <div className="bg-slate-900 text-white p-6 flex justify-between items-center shrink-0">
            <div>
              <span className="text-[10px] bg-blue-600 font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-md">
                Secure Checkout
              </span>
              <h3 className="text-xl font-bold tracking-tight mt-2 flex items-center space-x-2">
                <span>Book your {type}</span>
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Checkout Steps bar */}
          {step <= 4 && (
            <div className="bg-slate-50 border-b border-slate-100 py-4 px-6 shrink-0">
              <div className="flex items-center justify-between text-xs font-black text-slate-400 uppercase tracking-wider max-w-md mx-auto">
                <span className={step >= 1 ? 'text-blue-600 font-bold' : ''}>01 details</span>
                <ChevronRight className="h-4 w-4" />
                <span className={step >= 2 ? 'text-blue-600 font-bold' : ''}>02 passengers</span>
                <ChevronRight className="h-4 w-4" />
                <span className={step >= 3 ? 'text-blue-600 font-bold' : ''}>03 customize</span>
                <ChevronRight className="h-4 w-4" />
                <span className={step >= 4 ? 'text-blue-600 font-bold' : ''}>04 payment</span>
              </div>
            </div>
          )}

          {/* Main content body */}
          <div className="p-6 sm:p-8 flex-grow max-h-[60vh] overflow-y-auto">
            {warning && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-2xl text-xs font-bold flex items-center space-x-2 mb-6">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{warning}</span>
              </div>
            )}

            {/* STEP 1: Details and Dates */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
                    Confirm Destination
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter destination..."
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
                      Check-In / Departure
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-850 font-semibold text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
                      Check-Out / Return
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-850 font-semibold text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
                      Adult Guests
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-850 font-semibold text-sm focus:outline-none"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} Adults
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
                      Children (Ages 2-12)
                    </label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-850 font-semibold text-sm focus:outline-none"
                    >
                      {[0, 1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num} Children
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Passengers Info */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
                    Lead Passenger Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus Vance"
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
                    Contact Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. marcus@travelgo.com"
                      value={passengerEmail}
                      onChange={(e) => setPassengerEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium block mt-1.5 pl-1">
                    *Your printable ticket voucher and QR check-in codes will be sent here.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
                    Contact Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 019-2834"
                      value={passengerPhone}
                      onChange={(e) => setPassengerPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-semibold text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Customize Options & Airplane Seating Map */}
            {step === 3 && (
              <div className="space-y-6">
                {/* FLIGHT SEATING CUSTOMIZER */}
                {type === 'flight' && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center space-x-2">
                      <Armchair className="h-4 w-4 text-blue-500" />
                      <span>Select Flight Class & Seats</span>
                    </h4>

                    {/* Flight Class Selection */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {['Economy', 'Business (+$250)', 'First Class (+$500)'].map((cls) => {
                        const label = cls.split(' (')[0];
                        const isActive = classType === label;
                        return (
                          <button
                            key={label}
                            type="button"
                            onClick={() => setClassType(label)}
                            className={`px-4 py-3 rounded-2xl border text-xs font-bold transition-all ${
                              isActive
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10'
                                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {cls}
                          </button>
                        );
                      })}
                    </div>

                    {/* Airplane Cabin seats */}
                    <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 text-center max-w-sm mx-auto">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-4">
                        ✈️ Boeing 737 Seat Selection
                      </div>

                      <div className="grid grid-cols-6 gap-2 text-center justify-center max-w-[240px] mx-auto">
                        {seatLetters.map((letter) => (
                          <div key={letter} className="text-[10px] font-bold text-slate-400">
                            {letter}
                          </div>
                        ))}

                        {seatRows.map((row) =>
                          seatLetters.map((letter) => {
                            const id = `${row}${letter}`;
                            const isTaken = id === '12B' || id === '14E' || id === '16A' || id === '17C';
                            const isSelected = selectedSeat === id;

                            return (
                              <button
                                key={id}
                                type="button"
                                disabled={isTaken}
                                onClick={() => setSelectedSeat(id)}
                                className={`h-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer ${
                                  isTaken
                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                                    : isSelected
                                    ? 'bg-emerald-500 text-white shadow-md border border-emerald-600 animate-pulse'
                                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300'
                                }`}
                                title={isTaken ? `${id} (Taken)` : isSelected ? `${id} (Selected)` : `${id} (Available)`}
                              >
                                {row}
                                {letter}
                              </button>
                            );
                          })
                        )}
                      </div>

                      <div className="flex items-center justify-center space-x-4 mt-5 text-[10px] font-semibold text-slate-500">
                        <div className="flex items-center space-x-1">
                          <span className="w-3 h-3 rounded bg-white border border-slate-200 block" />
                          <span>Available</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="w-3 h-3 rounded bg-slate-200 border border-slate-300 block" />
                          <span>Taken</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="w-3 h-3 rounded bg-emerald-500 block animate-pulse" />
                          <span>Selected</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* HOTEL CUSTOMIZER */}
                {type === 'hotel' && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
                      Choose Room Upgrades & Addons
                    </h4>
                    <div className="space-y-3.5">
                      <div
                        onClick={() => handleCheckboxOption('Ocean View Upgrade')}
                        className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                          extraOptions.includes('Ocean View Upgrade')
                            ? 'bg-blue-50/50 border-blue-500 shadow-sm'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-slate-800 text-sm">Ocean View Room Upgrade</div>
                          <div className="text-xs text-slate-400">Upgrade to a high-floor panoramic oceanfront suite</div>
                        </div>
                        <span className="text-sm font-extrabold text-blue-600 shrink-0">+$150</span>
                      </div>

                      <div
                        onClick={() => handleCheckboxOption('Breakfast Included')}
                        className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                          extraOptions.includes('Breakfast Included')
                            ? 'bg-blue-50/50 border-blue-500 shadow-sm'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-slate-800 text-sm">Luxury Buffet Breakfast Included</div>
                          <div className="text-xs text-slate-400">All-inclusive gourmet morning buffet with beach views</div>
                        </div>
                        <span className="text-sm font-extrabold text-blue-600 shrink-0">+$30</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* TOUR CUSTOMIZER */}
                {type === 'tour' && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
                      Add Curated Excursions & Protection
                    </h4>
                    <div className="space-y-3.5">
                      <div
                        onClick={() => handleCheckboxOption('Catamaran Sunset Excursion')}
                        className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                          extraOptions.includes('Catamaran Sunset Excursion')
                            ? 'bg-blue-50/50 border-blue-500 shadow-sm'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-slate-800 text-sm">Guided Sunset Catamaran Cruise</div>
                          <div className="text-xs text-slate-400">Half-day luxury cruise with snorkeling, open bar & BBQ</div>
                        </div>
                        <span className="text-sm font-extrabold text-blue-600 shrink-0">+$80</span>
                      </div>

                      <div
                        onClick={() => handleCheckboxOption('Full Insurance')}
                        className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                          extraOptions.includes('Full Insurance')
                            ? 'bg-blue-50/50 border-blue-500 shadow-sm'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-slate-800 text-sm">Full Cancelation Protection</div>
                          <div className="text-xs text-slate-400">Cancel for any reason up to 24h before departure with 100% refund</div>
                        </div>
                        <span className="text-sm font-extrabold text-blue-600 shrink-0">+$50</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* CAR CUSTOMIZER */}
                {type === 'car' && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
                      Select Rental Protection
                    </h4>
                    <div className="space-y-3.5">
                      <div
                        onClick={() => handleCheckboxOption('Full Insurance')}
                        className={`flex items-center justify-between p-4 border rounded-2xl cursor-pointer transition-all ${
                          extraOptions.includes('Full Insurance')
                            ? 'bg-blue-50/50 border-blue-500 shadow-sm'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-slate-800 text-sm">Full Collision Damage Protection (LDW)</div>
                          <div className="text-xs text-slate-400">Zero deductible full insurance cover for peaceful driving</div>
                        </div>
                        <span className="text-sm font-extrabold text-blue-600 shrink-0">+$50</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: Secure Payment simulation */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none">Total Secure Cost</span>
                    <span className="text-3xl font-black text-slate-800 mt-1 inline-block">${totalPrice}</span>
                  </div>
                  <div className="text-xs text-slate-500 text-right">
                    <span className="font-bold block">Items Summary:</span>
                    <span>1x {type} Booking</span> <br />
                    <span>{extraOptions.length} Added Customizers</span>
                  </div>
                </div>

                <form onSubmit={handleCompleteBooking} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
                      Credit / Debit Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                      <input
                        type="text"
                        required
                        maxLength={19}
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-semibold text-sm focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">
                        CVC Security Code
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        placeholder="***"
                        value={cardCvc}
                        onChange={(e) => setCardCVC(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-850 font-semibold text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 5: Digital Boarding Pass / Success Voucher */}
            {step === 5 && (
              <div className="space-y-8 flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-200 shadow-inner">
                  <CheckCircle className="h-8 w-8" />
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-black text-slate-800 tracking-tight">Booking Confirmed!</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-1.5 max-w-sm">
                    Thank you, {passengerName}! Your boarding pass and dynamic barcodes have been authorized successfully.
                  </p>
                </div>

                {/* Printable Boarding Ticket */}
                <div className="w-full bg-slate-50 border border-slate-200/80 rounded-3xl overflow-hidden shadow-inner flex flex-col relative max-w-md">
                  {/* Ticket Header */}
                  <div className="bg-blue-600 text-white p-5 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-blue-200">digital voucher</span>
                      <h4 className="text-lg font-bold tracking-tight">TravelGo Authorized</h4>
                    </div>
                    <span className="text-xs bg-white/20 px-3 py-1 rounded-full border border-white/15 font-bold">
                      #{Math.floor(10000 + Math.random() * 90000)}
                    </span>
                  </div>

                  {/* Ticket Body */}
                  <div className="p-6 space-y-4 text-xs sm:text-sm text-slate-600 font-semibold border-b border-dashed border-slate-300">
                    <div className="flex justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase mb-0.5">passenger</span>
                        <span className="text-slate-800 font-bold text-base">{passengerName}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase mb-0.5">booking date</span>
                        <span className="text-slate-800 font-semibold">
                          {viewingBooking ? viewingBooking.bookingDate : new Date().toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase mb-0.5">destination</span>
                        <span className="text-slate-800 font-bold">{destination}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase mb-0.5">booking category</span>
                        <span className="text-slate-800 font-bold uppercase text-blue-600">{type}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase mb-0.5">check in</span>
                        <span className="text-slate-800 font-bold">{checkIn}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase mb-0.5">check out</span>
                        <span className="text-slate-800 font-bold">{checkOut}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold block uppercase mb-0.5">travelers</span>
                        <span className="text-slate-800 font-bold">{adults + children} pax</span>
                      </div>
                      {type === 'flight' && (
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold block uppercase mb-0.5">class</span>
                          <span className="text-slate-800 font-bold">{classType}</span>
                        </div>
                      )}
                      {type === 'flight' && selectedSeat && (
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold block uppercase mb-0.5">assigned seat</span>
                          <span className="text-emerald-600 font-black text-base">{selectedSeat}</span>
                        </div>
                      )}
                    </div>

                    {extraOptions.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[10px] text-slate-400 font-bold block uppercase mb-1">addons selection</span>
                        <div className="flex flex-wrap gap-1.5">
                          {extraOptions.map((opt, i) => (
                            <span key={i} className="bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5 rounded-full border border-blue-100">
                              {opt}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Barcode details */}
                  <div className="p-6 bg-slate-100/70 flex flex-col items-center">
                    {/* Simulated barcode layout using bars */}
                    <div className="flex items-stretch h-10 w-64 space-x-0.5 bg-white p-1 border border-slate-200">
                      {[
                        2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 1, 2, 4, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 1, 2, 4, 1, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 1, 2, 4, 1, 2
                      ].map((barSize, index) => (
                        <div
                          key={index}
                          className={`flex-grow bg-slate-900`}
                          style={{ marginRight: `${barSize}px` }}
                        />
                      ))}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-widest font-semibold">
                      *AU-9824-MLE-F*
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 w-full max-w-sm">
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="flex-1 bg-slate-900 hover:bg-slate-850 text-white font-bold py-3 rounded-2xl text-xs sm:text-sm transition-all text-center cursor-pointer"
                  >
                    Download Ticket (PDF)
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-2xl text-xs sm:text-sm transition-all text-center cursor-pointer"
                  >
                    Finish Checkout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation Buttons */}
          {step <= 4 && (
            <div className="bg-slate-50 border-t border-slate-100 p-6 flex justify-between items-center shrink-0">
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-slate-400 font-bold uppercase leading-none">Total Cost</span>
                <span className="text-xl font-black text-slate-800 mt-1">${totalPrice}</span>
              </div>

              <div className="flex items-center space-x-3">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-5 py-3 border border-slate-200 hover:bg-slate-100 rounded-2xl text-xs font-bold text-slate-600 transition-colors cursor-pointer flex items-center space-x-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-2xl text-xs transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Continue</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCompleteBooking}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-2xl text-xs shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/25 transition-all flex items-center space-x-1.5 cursor-pointer animate-pulse"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Authorize Payment</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
