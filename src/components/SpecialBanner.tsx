import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Timer, Percent } from 'lucide-react';

interface SpecialBannerProps {
  onOpenBooking: (type: 'tour', title: string, price: number) => void;
}

export default function SpecialBanner({ onOpenBooking }: SpecialBannerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  // Ticking countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { hours: prev.hours, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer to keep it alive for demo
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => (num < 10 ? `0${num}` : num);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Cover Parallax */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1600&q=80"
          alt="Summer Vacation Special"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Promo Text */}
          <div className="lg:col-span-7 text-white text-center lg:text-left">
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/20 backdrop-blur-md text-amber-300 border border-amber-500/30 mb-6 uppercase tracking-wider">
              <Percent className="h-4 w-4" />
              <span>Limited Flash Offer</span>
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-6">
              Summer Vacation Special <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-400">
                Get Up To 30% Off
              </span>
            </h2>
            <p className="text-sm sm:text-lg text-slate-300 font-semibold mb-8 max-w-xl leading-relaxed">
              Book your dream package today to unlock an automatic 30% discount. Includes private boat transfers, wellness spa credits, and flexible cancelation protection.
            </p>

            <button
              onClick={() => onOpenBooking('tour', 'Summer Special Promo Tour', 750)}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-amber-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-2 mx-auto lg:mx-0 cursor-pointer"
            >
              <span>Book Discounted Package</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Countdown Clock Widget */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl w-full max-w-sm text-center text-white"
            >
              <div className="flex items-center justify-center space-x-2 text-amber-400 mb-6 font-bold uppercase tracking-wider text-xs">
                <Timer className="h-4 w-4 animate-bounce" />
                <span>Offer expires in:</span>
              </div>

              {/* Countdown Numbers Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {/* Hours */}
                <div className="bg-slate-900/60 rounded-2xl p-4 border border-white/5 relative shadow-inner">
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono text-amber-300">
                    {formatNumber(timeLeft.hours)}
                  </div>
                  <div className="text-[10px] text-slate-300 font-bold uppercase mt-1">Hours</div>
                </div>

                {/* Minutes */}
                <div className="bg-slate-900/60 rounded-2xl p-4 border border-white/5 relative shadow-inner">
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono text-amber-300">
                    {formatNumber(timeLeft.minutes)}
                  </div>
                  <div className="text-[10px] text-slate-300 font-bold uppercase mt-1">Mins</div>
                </div>

                {/* Seconds */}
                <div className="bg-slate-900/60 rounded-2xl p-4 border border-white/5 relative shadow-inner">
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono text-amber-300">
                    {formatNumber(timeLeft.seconds)}
                  </div>
                  <div className="text-[10px] text-slate-300 font-bold uppercase mt-1">Secs</div>
                </div>
              </div>

              <div className="text-xs text-slate-300 font-semibold">
                *Prices reset back to standard rates once the counter hits 0. Cancel anytime up to 48h.
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
