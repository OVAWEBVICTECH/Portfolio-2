import React, { useState } from 'react';
import { Plane, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowUp } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 5000);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-slate-950 text-white pt-24 pb-12 relative overflow-hidden">
      {/* Scroll to Top Circle Button */}
      <div className="absolute top-8 right-8">
        <button
          onClick={handleScrollToTop}
          className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-1 cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Section: Branding & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/10 pb-16 mb-16 items-center">
          {/* Brand details */}
          <div className="lg:col-span-5 text-left">
            <div className="flex items-center space-x-2.5 mb-6">
              <div className="p-2 rounded-xl bg-blue-600 text-white">
                <Plane className="h-6 w-6 transform rotate-45" />
              </div>
              <span className="text-2xl font-black tracking-tight">
                Travel<span className="text-blue-500">Go</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold leading-relaxed max-w-sm mb-6">
              Explore the world with customized travel itineraries, curated five-star lodgings, and guided local tours. Your dream vacation is just a click away.
            </p>

            {/* Socials */}
            <div className="flex space-x-4">
              <a href="#" className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white transition-all">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white/5 hover:bg-blue-400 text-slate-300 hover:text-white transition-all">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white/5 hover:bg-pink-600 text-slate-300 hover:text-white transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-white/5 hover:bg-red-600 text-slate-300 hover:text-white transition-all">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 text-left w-full">
            <h3 className="text-lg font-bold text-white tracking-tight mb-2">Subscribe to our newsletter!</h3>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold mb-6 leading-relaxed">
              Sign up today and get an automatic 10% discount coupon in your inbox on your very first tour package purchase.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="Enter your personal email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-900 border border-white/15 rounded-2xl text-white font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all placeholder:text-slate-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 transition-all cursor-pointer text-sm shrink-0"
              >
                Sign Up Now
              </button>
            </form>

            {subscribed && (
              <div className="mt-4 text-xs font-semibold text-emerald-400">
                🎉 Awesome! Check your inbox for your 10% discount voucher details.
              </div>
            )}
          </div>
        </div>

        {/* Middle Section: Footer Links Lists */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-white/10 pb-16 mb-12">
          {/* Quick Links */}
          <div className="text-left">
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-4 text-xs sm:text-sm text-slate-400 font-semibold">
              <li><a href="#home" className="hover:text-blue-500 transition-colors">Home Base</a></li>
              <li><a href="#destinations" className="hover:text-blue-500 transition-colors">Destinations Catalogs</a></li>
              <li><a href="#tours" className="hover:text-blue-500 transition-colors">Tour Offers</a></li>
              <li><a href="#ai-planner" className="hover:text-blue-500 transition-colors">AI Itinerary Planner</a></li>
              <li><a href="#blog" className="hover:text-blue-500 transition-colors">Expert Blog Guides</a></li>
            </ul>
          </div>

          {/* Top Destinations */}
          <div className="text-left">
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-6">Top Destinations</h4>
            <ul className="space-y-4 text-xs sm:text-sm text-slate-400 font-semibold">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Europe Wonders</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Asia Temples & Beaches</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Australia Reefs</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">America Skylines</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Africa Safari Plains</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-left">
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-6">Support & Policy</h4>
            <ul className="space-y-4 text-xs sm:text-sm text-slate-400 font-semibold">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Help Center / FAQ</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Refund Protection</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Accessibility Standard</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="text-left col-span-2 md:col-span-1">
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-6">Contact Us</h4>
            <ul className="space-y-4 text-xs sm:text-sm text-slate-400 font-semibold">
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <a href="tel:+12345678900" className="hover:text-blue-500 transition-colors">+1 234 567 8900</a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <a href="mailto:info@travelgo.com" className="hover:text-blue-500 transition-colors">info@travelgo.com</a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <span>123 Travel Street, Manhattan, NY 10001, USA</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-bold gap-4">
          <div>
            © 2026 TravelGo Ltd. All Rights Reserved. Crafted with pristine web standards.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookie settings</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
