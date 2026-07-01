import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, Compass, MessageSquare, ArrowRight, BookOpen, Utensils, Lightbulb, MapPin, Search } from 'lucide-react';
import { itineraryTemplates } from '../data';

interface AIPlannerProps {
  onBookItinerary: (title: string, price: number) => void;
}

export default function AIPlanner({ onBookItinerary }: AIPlannerProps) {
  const [destination, setDestination] = useState('bali');
  const [style, setStyle] = useState('Adventure');
  const [days, setDays] = useState(4);

  // States
  const [status, setStatus] = useState<'idle' | 'thinking' | 'done'>('idle');
  const [thinkingStep, setThinkingStep] = useState(0);
  const [generatedItinerary, setGeneratedItinerary] = useState<any[]>([]);

  const thinkingMessages = [
    '🤖 Initiating TravelGo AI Core...',
    '🗺️ Inspecting regional maps & altitude paths...',
    '🍽️ Sourcing culinary hotspots & local street vendors...',
    '🌟 Aligning schedules to bypass high-congestion peak hours...',
    '✨ Optimizing daily budget and routing matrices...'
  ];

  const handleGenerate = () => {
    setStatus('thinking');
    setThinkingStep(0);

    // Staggered thinking step simulation
    const interval = setInterval(() => {
      setThinkingStep((prev) => {
        if (prev < thinkingMessages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          finalizeItinerary();
          return prev;
        }
      });
    }, 450);
  };

  const finalizeItinerary = () => {
    const key = destination.toLowerCase();
    const template = itineraryTemplates[key];

    if (template) {
      // If we have a handcrafted template, slice it to the requested days
      const sliced = template.itinerary.slice(0, days);
      setGeneratedItinerary(sliced);
    } else {
      // Generate a dynamic realistic itinerary for cities not in our template
      const mockActivities = {
        London: [
          'Visit the historic Tower of London and view the Crown Jewels',
          'Take a flight on the iconic London Eye giant ferris wheel',
          'Explore the world-famous British Museum treasures',
          'Enjoy high tea at a premium salon in Mayfair',
          'Walk across Tower Bridge and explore the Borough Market food stalls',
          'Stroll through royal Hyde Park and watch the Changing of the Guard at Buckingham Palace'
        ],
        Tokyo: [
          'Watch the neon lights and cross Shibuya Crossing',
          'Stroll through the historic Senso-ji temple in Asakusa',
          'Sample freshly rolled sushi at Tsukiji Outer Market',
          'Hike up the Mount Takao scenic trails',
          'Explore futuristic teamLab Planets digital art installations',
          'Shop anime culture in Akihabara or high-end fashion in Ginza'
        ],
        Rome: [
          'Walk the arena floors of the ancient Roman Colosseum',
          'Toss a coin into the spectacular Trevi Fountain',
          'Explore the massive ruins of the Roman Forum',
          'Admire Michelangelo\'s Sistine Chapel ceiling in the Vatican Museums',
          'Savor local Roman pasta like Carbonara in a cozy Trastevere alley',
          'Enjoy gelato sitting on the steps of the Spanish Steps'
        ]
      };

      const city = destination.charAt(0).toUpperCase() + destination.slice(1);
      const activitiesPool = (mockActivities as any)[city] || [
        'Explore local architectural markets and historical quarters',
        'Embark on a guided sightseeing stroll of top cultural monuments',
        'Dine at authentic, hidden culinary favorites vetted by locals',
        'Take in sweeping sunset panoramic views from a peak overlook',
        'Participate in a hands-on culinary cooking class or pottery workshop',
        'Stroll through green botanical reserves or relax at a beach'
      ];

      const dynamicItinerary = Array.from({ length: days }).map((_, index) => {
        const dayNum = index + 1;
        // Grab two activities
        const act1 = activitiesPool[index % activitiesPool.length];
        const act2 = activitiesPool[(index + 2) % activitiesPool.length];

        return {
          day: dayNum,
          title: `Day ${dayNum}: Exploring ${city} cultural hotspots`,
          activities: [act1, act2, `Relax and unwind with leisure evening exploration in downtown ${city}`],
          meals: [`Breakfast: Hotel panoramic continental buffet`, `Dinner: Local traditional cuisine tasting`],
          tip: `Avoid peak weekend hours for major landmarks. Consider purchasing a regional fast-pass voucher.`
        };
      });

      setGeneratedItinerary(dynamicItinerary);
    }

    setStatus('done');
  };

  const getEstimatedPrice = () => {
    let multiplier = 1;
    if (style === 'Luxury') multiplier = 1.6;
    if (style === 'Budget') multiplier = 0.6;
    return Math.floor(days * 180 * multiplier);
  };

  return (
    <section id="ai-planner" className="py-24 bg-white relative overflow-hidden border-t border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 flex items-center justify-center space-x-1.5 w-max mx-auto">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 animate-pulse" />
            <span>AI Travel Assistant</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mt-4">
            AI Itinerary Planner
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-medium mt-2">
            Input your preferences below to let our smart engine compile a customized, responsive daily travel itinerary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left panel: Form parameters */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-8">
            <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider mb-6 flex items-center space-x-2">
              <Compass className="h-5 w-5 text-blue-500" />
              <span>Configure My Trip</span>
            </h3>

            <div className="space-y-5">
              {/* Destination Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Choose Hotspot</label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  <option value="bali">Bali, Indonesia</option>
                  <option value="santorini">Santorini, Greece</option>
                  <option value="maldives">Maldives, Indian Ocean</option>
                  <option value="tokyo">Tokyo, Japan</option>
                  <option value="london">London, United Kingdom</option>
                  <option value="rome">Rome, Italy</option>
                </select>
              </div>

              {/* Style Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Travel Style</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                >
                  <option value="Adventure">🏃 Adventure & Trekking</option>
                  <option value="Luxury">👑 Premium Luxury VIP</option>
                  <option value="Budget">💰 Value & Hacking</option>
                  <option value="Family">👨‍👩‍👧‍👦 Kid-Friendly Family</option>
                </select>
              </div>

              {/* Duration Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-slate-500 uppercase">Duration (Days)</label>
                  <span className="text-sm font-extrabold text-blue-600">{days} Days</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={7}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1.5">
                  <span>2 Days</span>
                  <span>7 Days</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl shadow-xl hover:shadow-blue-500/10 hover:shadow-blue-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
              >
                <Sparkles className="h-4 w-4 text-amber-300" />
                <span>Generate Custom Plan</span>
              </button>
            </div>
          </div>

          {/* Right panel: Live Generated Itinerary view */}
          <div className="lg:col-span-8">
            <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-8 min-h-[400px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {/* IDLE VIEW */}
                {status === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center p-8 flex flex-col items-center"
                  >
                    <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4 border border-blue-100">
                      <Compass className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Your custom itinerary waits!</h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-semibold max-w-sm mt-1">
                      Configure your destination city, style and days on the left and tap generate to launch our travel itinerary engine.
                    </p>
                  </motion.div>
                )}

                {/* THINKING VIEW */}
                {status === 'thinking' && (
                  <motion.div
                    key="thinking"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6 text-center py-12 flex flex-col items-center"
                  >
                    {/* Pulsing loading sphere */}
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-blue-100 border border-blue-300 animate-ping opacity-75" />
                      <div className="relative rounded-2xl bg-blue-600 p-4 shadow-xl">
                        <Sparkles className="h-8 w-8 text-white animate-spin" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-slate-700 tracking-wider uppercase">AI Agent Processing</h4>
                      <div className="text-sm font-bold text-blue-600 font-mono">
                        {thinkingMessages[thinkingStep]}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* DONE VIEW */}
                {status === 'done' && (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-8"
                  >
                    {/* Header bar of Generated Itinerary */}
                    <div className="border-b border-slate-200/60 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="flex items-center space-x-2 text-xs text-blue-600 font-bold tracking-wider uppercase">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {destination.charAt(0).toUpperCase() + destination.slice(1)} • {style} Edition
                          </span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mt-1">
                          Your Handcrafted {days}-Day Escape
                        </h3>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none">Vetted Estimate cost</span>
                        <span className="text-2xl font-black text-slate-800 mt-1 inline-block">
                          ${getEstimatedPrice()} <span className="text-xs font-semibold text-slate-400">/ package</span>
                        </span>
                      </div>
                    </div>

                    {/* Day-by-Day Loop */}
                    <div className="space-y-6 h-[400px] overflow-y-auto pr-2">
                      {generatedItinerary.map((dayPlan, index) => (
                        <div
                          key={index}
                          className="bg-white border border-slate-200/60 rounded-2xl p-5 shadow-sm space-y-4"
                        >
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <span className="text-xs font-black bg-blue-50 text-blue-700 px-3 py-1 rounded-full uppercase tracking-wider">
                              Day {dayPlan.day}
                            </span>
                            <span className="text-xs font-bold text-slate-400">{dayPlan.title}</span>
                          </div>

                          {/* Sightseeing activities */}
                          <div className="space-y-2">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                              <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                              <span>Sightseeing Itinerary</span>
                            </div>
                            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 font-semibold pl-4 list-disc">
                              {dayPlan.activities.map((act: string, i: number) => (
                                <li key={i}>{act}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Meals & Tips */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                            <div className="space-y-1">
                              <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                                <Utensils className="h-3.5 w-3.5 text-amber-500" />
                                <span>Dining Guide</span>
                              </div>
                              {dayPlan.meals.map((meal: string, i: number) => (
                                <div key={i} className="text-xs text-slate-500 font-semibold">
                                  {meal}
                                </div>
                              ))}
                            </div>

                            <div className="space-y-1 bg-amber-50/50 border border-amber-100 p-3 rounded-xl">
                              <div className="text-[10px] font-black text-amber-700 uppercase tracking-wider flex items-center space-x-1">
                                <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
                                <span>Local Tip</span>
                              </div>
                              <p className="text-[11px] text-amber-800 leading-normal font-semibold">
                                {dayPlan.tip}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Book this AI Itinerary CTA */}
                    <div className="pt-4 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-xs text-slate-500 font-semibold text-center sm:text-left">
                        *Like what you see? Click book below to automatically load these days, rates, and hotels directly into our checkout wizard.
                      </p>
                      <button
                        onClick={() =>
                          onBookItinerary(
                            `${days}-Day Custom AI ${destination.toUpperCase()} Plan`,
                            getEstimatedPrice()
                          )
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-xl hover:shadow-blue-500/20 transition-all flex items-center space-x-2 shrink-0 cursor-pointer text-sm"
                      >
                        <span>Book This Itinerary</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
