import { motion } from 'motion/react';
import { Search, CalendarDays, ShieldCheck, SunDim } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Search Destination',
      desc: 'Explore or search through our vetted catalogs of tropical beaches, snowy Alps, and historical cities.',
      icon: Search,
      bg: 'bg-blue-100 text-blue-600',
    },
    {
      num: '02',
      title: 'Make Booking',
      desc: 'Pick your check-in dates, passenger numbers, and secure seats using our intuitive multi-step wizard.',
      icon: CalendarDays,
      bg: 'bg-emerald-100 text-emerald-600',
    },
    {
      num: '03',
      title: 'Secure Payment',
      desc: 'Complete payment with full SSL encryption. Receive instant email vouchers and real-time boarding passes.',
      icon: ShieldCheck,
      bg: 'bg-amber-100 text-amber-600',
    },
    {
      num: '04',
      title: 'Enjoy Your Trip',
      desc: 'Pack your bags, unlock exclusive resort credits, and explore with our handpicked local tour guides.',
      icon: SunDim,
      bg: 'bg-indigo-100 text-indigo-600',
    },
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
            Just 4 Simple Steps
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mt-4">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium mt-2">
            Going from dreaming of a sunny beach to walking on its white sand has never been easier.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-[68px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-blue-200/50 via-emerald-200/50 via-amber-200/50 to-indigo-200/50 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-45px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm relative z-10 flex flex-col items-center text-center group hover:shadow-md transition-shadow"
              >
                {/* Number Step Counter */}
                <div className="absolute top-4 right-6 text-2xl font-black font-mono text-slate-100 group-hover:text-slate-200 transition-colors">
                  {step.num}
                </div>

                {/* Styled Icon */}
                <div className={`p-4 rounded-2xl mb-6 shadow-inner ${step.bg}`}>
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-800 mb-3">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
