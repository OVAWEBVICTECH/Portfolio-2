import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Star, Users, MapPin, Award, X, Volume2, VolumeX } from 'lucide-react';

interface HeroProps {
  onExploreTours: () => void;
}

export default function Hero({ onExploreTours }: HeroProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const stats = [
    { value: '15k+', label: 'Happy Travelers', icon: Users, color: 'text-blue-500 bg-blue-50' },
    { value: '500+', label: 'Destinations', icon: MapPin, color: 'text-emerald-500 bg-emerald-50' },
    { value: '4.9', label: 'Average Rating', icon: Star, color: 'text-amber-500 bg-amber-50' },
    { value: '12+', label: 'Years Experience', icon: Award, color: 'text-indigo-500 bg-indigo-50' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden">
      {/* Background Image with elegant overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
          alt="Tropical Beach Travel"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 backdrop-blur-md text-blue-200 border border-blue-500/30 mb-6 uppercase tracking-wider">
              ✨ Discover the Art of Travel
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6"
          >
            Explore The World <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
              Discover New Places
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-slate-200 font-medium mb-8 leading-relaxed max-w-xl"
          >
            Find awesome tour, explore exotic places and enjoy your dream vacation with us. Experience seamless booking and premium curated local guides.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5"
          >
            <button
              onClick={onExploreTours}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-blue-500/20 transition-all transform hover:-translate-y-1 text-center cursor-pointer"
            >
              Explore Tours
            </button>

            <button
              onClick={() => setShowVideo(true)}
              className="flex items-center justify-center space-x-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold px-8 py-4 rounded-2xl transition-all transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center animate-pulse">
                <Play className="h-4 w-4 fill-white text-white ml-0.5" />
              </div>
              <span>Watch Video</span>
            </button>
          </motion.div>
        </div>

        {/* Floating statistics grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 sm:mt-24 bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white shadow-xl max-w-4xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className={`p-3 rounded-2xl ${stat.color} shrink-0`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Watch Video Overlay Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Drone video of beach */}
              <video
                src="https://assets.mixkit.co/videos/preview/mixkit-beautiful-aerial-view-of-a-tropical-beach-and-sea-34282-large.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-6 right-6 flex items-center space-x-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-3 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-white/10 hover:bg-slate-800 transition-all cursor-pointer"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
              </div>

              <div className="absolute top-6 left-6 pointer-events-none">
                <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-950/80 backdrop-blur-md text-blue-300 border border-white/10">
                  📍 Maldives Aerial Drone Tour
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
