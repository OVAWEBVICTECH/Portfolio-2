import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Plane, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (type: 'flight' | 'hotel' | 'tour' | 'car', title: string, price: number) => void;
  bookingCount: number;
  onOpenHistory: () => void;
  activeSection: string;
}

export default function Navbar({ onOpenBooking, bookingCount, onOpenHistory, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        isScrolled || setIsScrolled(true);
      } else {
        !isScrolled || setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Destinations', href: '#destinations' },
    { name: 'Tours', href: '#tours' },
    { name: 'AI Planner', href: '#ai-planner' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // height of navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md py-3 text-slate-800'
          : 'bg-gradient-to-b from-black/50 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => handleLinkClick('#home')} 
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className={`p-2 rounded-xl transition-all ${
              isScrolled ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
            }`}>
              <Plane className="h-6 w-6 transform rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Travel<span className="text-blue-500">Go</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className={`text-sm font-medium transition-colors hover:text-blue-500 relative py-1 cursor-pointer ${
                    isActive 
                      ? isScrolled ? 'text-blue-600' : 'text-blue-400' 
                      : isScrolled ? 'text-slate-600' : 'text-white/90'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="tel:+12345678900"
              className={`flex items-center space-x-2 text-sm font-semibold hover:text-blue-500 transition-colors ${
                isScrolled ? 'text-slate-700' : 'text-white'
              }`}
            >
              <Phone className="h-4 w-4 text-blue-500" />
              <span>+1 234 567 8900</span>
            </a>

            {/* Booking History Button */}
            <button
              onClick={onOpenHistory}
              className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-blue-500 cursor-pointer"
              title="My Bookings"
            >
              <ShoppingBag className="h-5 w-5" />
              {bookingCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {bookingCount}
                </span>
              )}
            </button>

            <button
              id="nav-book-now"
              onClick={() => onOpenBooking('tour', 'Custom Tour Package', 1000)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-lg hover:shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Book Now
            </button>
          </div>

          {/* Mobile menu and history icons */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Booking History Icon for Mobile */}
            <button
              onClick={onOpenHistory}
              className="relative p-2 rounded-lg text-blue-500"
              title="My Bookings"
            >
              <ShoppingBag className="h-5 w-5" />
              {bookingCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {bookingCount}
                </span>
              )}
            </button>

            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? 'hover:bg-slate-100 text-slate-800' : 'hover:bg-white/10 text-white'
              }`}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-slate-100 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-3">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <button
                    key={link.name}
                    onClick={() => handleLinkClick(link.href)}
                    className={`block w-full text-left px-4 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
              <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3">
                <a
                  href="tel:+12345678900"
                  className="flex items-center space-x-3 px-4 py-2 text-slate-600 font-semibold text-sm hover:text-blue-600"
                >
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span>+1 234 567 8900</span>
                </a>
                <button
                  id="mobile-book-now"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenBooking('tour', 'Custom Tour Package', 1000);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-center shadow-lg transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
