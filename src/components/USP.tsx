import { ShieldCheck, Trophy, Sparkles, Headphones } from 'lucide-react';
import { motion } from 'motion/react';

export default function USP() {
  const features = [
    {
      title: 'Best Price Guarantee',
      desc: 'We ensure the best price for your travel. Found cheaper? We match it instantly.',
      icon: ShieldCheck,
      color: 'bg-blue-50 text-blue-600',
      border: 'hover:border-blue-500/20'
    },
    {
      title: 'World Class Service',
      desc: 'Experience premium concierge services, vetted local hosts, and tailored custom activities.',
      icon: Trophy,
      color: 'bg-emerald-50 text-emerald-600',
      border: 'hover:border-emerald-500/20'
    },
    {
      title: 'Easy Booking Process',
      desc: 'Fast, secure, and intuitive booking in under 2 minutes with instant visual boardpasses.',
      icon: Sparkles,
      color: 'bg-amber-50 text-amber-600',
      border: 'hover:border-amber-500/20'
    },
    {
      title: '24/7 Global Support',
      desc: 'Our dedicated travel experts are standing by globally to support you at any hour.',
      icon: Headphones,
      color: 'bg-indigo-50 text-indigo-600',
      border: 'hover:border-indigo-500/20'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Why Choose Us
          </span>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-4">
            Unrivaled Travel Standards
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium mt-2">
            Every detail is meticulously crafted to ensure your trip is smooth, safe, and truly unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`bg-white rounded-3xl p-6 sm:p-8 border border-slate-100/80 shadow-sm transition-all duration-300 flex flex-col items-center text-center ${feat.border}`}
              >
                <div className={`p-4 rounded-2xl mb-6 ${feat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                  {feat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
