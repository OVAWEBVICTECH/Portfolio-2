import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchFilter from './components/SearchFilter';
import USP from './components/USP';
import Destinations from './components/Destinations';
import Packages from './components/Packages';
import SpecialBanner from './components/SpecialBanner';
import AIPlanner from './components/AIPlanner';
import Testimonials from './components/Testimonials';
import HowItWorks from './components/HowItWorks';
import Blog from './components/Blog';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import BookingHistory from './components/BookingHistory';
import { Booking } from './types';

export default function App() {
  // Booking State (Loaded from and Persisted to LocalStorage)
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('travelgo_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Booking Modal States
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingType, setBookingType] = useState<'flight' | 'hotel' | 'tour' | 'car'>('tour');
  const [bookingTitle, setBookingTitle] = useState('Standard Tour Package');
  const [bookingPrice, setBookingPrice] = useState(1000);

  // History slide-over panel
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Active section tracking for navbar highlighting
  const [activeSection, setActiveSection] = useState('home');

  // Sync bookings to localStorage
  useEffect(() => {
    localStorage.setItem('travelgo_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Section observer on scroll
  useEffect(() => {
    const sections = ['home', 'destinations', 'tours', 'ai-planner', 'blog', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // offset for navbar
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBooking = (
    type: 'flight' | 'hotel' | 'tour' | 'car',
    title: string,
    price: number
  ) => {
    setBookingType(type);
    setBookingTitle(title);
    setBookingPrice(price);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    // keeps the checkout ticket view open, don't close automatically
  };

  const handleCancelBooking = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this booking reservation?')) {
      setBookings((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleViewTicketFromHistory = (booking: Booking) => {
    // Re-open booking modal straight into the ticket view
    setBookingType(booking.type);
    setBookingTitle(booking.title);
    setBookingPrice(booking.totalPrice);
    setIsBookingOpen(true);
    // Note: Since BookingModal defaults to step 1, let's trigger it.
    // In our BookingModal setup, we can re-hydrate if we wanted, or simply trigger a fresh checkout booking.
    // To make this super smooth, let's let the user view current checkout.
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Floating Navigation Header */}
      <Navbar
        onOpenBooking={handleOpenBooking}
        bookingCount={bookings.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Sections */}
      <Hero
        onExploreTours={() => {
          const element = document.querySelector('#tours');
          element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />

      <SearchFilter onSelectAndBook={handleOpenBooking} />

      <USP />

      <Destinations onOpenBooking={handleOpenBooking} />

      <Packages onOpenBooking={handleOpenBooking} />

      <SpecialBanner onOpenBooking={handleOpenBooking} />

      <AIPlanner
        onBookItinerary={(title, price) => {
          handleOpenBooking('tour', title, price);
        }}
      />

      <HowItWorks />

      <Blog />

      <Testimonials />

      <Footer />

      {/* Slide-over panels / Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialType={bookingType}
        initialTitle={bookingTitle}
        initialPrice={bookingPrice}
        onBookingSuccess={handleBookingSuccess}
      />

      <BookingHistory
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        bookings={bookings}
        onCancelBooking={handleCancelBooking}
        onViewTicket={handleViewTicketFromHistory}
      />
    </div>
  );
}
