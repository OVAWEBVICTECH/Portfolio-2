import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { testimonials as initialTestimonials } from '../data';
import { Testimonial } from '../types';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';

export default function Testimonials() {
  const [reviews, setReviews] = useState<Testimonial[]>(initialTestimonials);
  const [activeIndex, setActiveIndex] = useState(0);

  // Review submission state
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text || !location) return;

    // Static pool of cute avatars
    const avatars = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80'
    ];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

    const newReview: Testimonial = {
      id: `user-rev-${Date.now()}`,
      name,
      location,
      rating,
      text,
      avatar: randomAvatar,
      isUserSubmitted: true
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    setActiveIndex(updatedReviews.length - 1); // jump to newly added review

    // Reset fields
    setName('');
    setLocation('');
    setRating(5);
    setText('');
    setShowForm(false);
    setSuccessMsg(true);

    setTimeout(() => {
      setSuccessMsg(false);
    }, 4000);
  };

  const currentReview = reviews[activeIndex];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative details */}
      <div className="absolute top-1/2 left-4 w-64 h-64 bg-blue-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-80 h-80 bg-indigo-100/25 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            What Our Clients Say About Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mt-4">
            Our Happy Travelers
          </h2>
        </div>

        {/* Testimonials Slider Component */}
        <div className="relative bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-12 shadow-md">
          <Quote className="absolute top-6 left-6 h-12 w-12 text-blue-200/50" />

          <div className="relative overflow-hidden min-h-[220px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center flex flex-col items-center"
              >
                {/* Stars */}
                <div className="flex justify-center space-x-1 mb-6 text-amber-500">
                  {Array.from({ length: currentReview.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-lg text-slate-600 leading-relaxed font-semibold italic max-w-2xl mb-8">
                  "{currentReview.text}"
                </p>

                {/* Avatar & Author Info */}
                <div className="flex items-center space-x-4">
                  <img
                    src={currentReview.avatar}
                    alt={currentReview.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-sm"
                  />
                  <div className="text-left">
                    <div className="font-bold text-slate-800 text-sm sm:text-base">
                      {currentReview.name}
                    </div>
                    <div className="text-xs text-slate-400 font-semibold">
                      {currentReview.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-between mt-8 border-t border-slate-200/50 pt-6">
            {/* Pagination Dots */}
            <div className="flex space-x-1.5">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx ? 'w-6 bg-blue-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            {/* Previous / Next Arrows */}
            <div className="flex space-x-3">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-white text-slate-600 transition-colors cursor-pointer"
                title="Previous feedback"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-white text-slate-600 transition-colors cursor-pointer"
                title="Next feedback"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Write a Review Drawer Trigger */}
        <div className="text-center mt-12">
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-850 text-white font-bold px-6 py-3 rounded-2xl shadow-lg transition-all cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span>Share Your Experience</span>
            </button>
          )}

          <AnimatePresence>
            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-800 text-sm font-semibold max-w-md mx-auto"
              >
                🎉 Thank you! Your review has been added to our live feed.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Submit Review Interactive Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-12 bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-inner max-w-xl mx-auto"
            >
              <h3 className="text-lg font-bold text-slate-800 mb-6 text-center">We value your opinion!</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Connor"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Location</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Seattle, USA"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    />
                  </div>
                </div>

                {/* Stars Rating selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Your Rating</label>
                  <div className="flex items-center space-x-1.5">
                    {[1, 2, 3, 4, 5].map((starValue) => (
                      <button
                        key={starValue}
                        type="button"
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoveredStar(starValue)}
                        onMouseLeave={() => setHoveredStar(null)}
                        className="p-1 focus:outline-none cursor-pointer"
                      >
                        <Star
                          className={`h-7 w-7 transition-colors ${
                            starValue <= (hoveredStar ?? rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience Text */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Your Review</label>
                  <textarea
                    rows={4}
                    required
                    maxLength={250}
                    placeholder="Tell other travelers about your magical experience with us..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                  <span className="text-[10px] text-slate-400 font-medium flex justify-end">Max 250 characters</span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-5 py-2.5 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
