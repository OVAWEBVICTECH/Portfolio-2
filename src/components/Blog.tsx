import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { blogArticles } from '../data';
import { BlogArticle } from '../types';
import { Clock, User, Calendar, X, BookOpen, MessageSquare, Heart } from 'lucide-react';

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({});

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedArticles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="blog" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16">
          <div>
            <span className="text-xs font-bold text-blue-600 tracking-wider uppercase bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
              Latest Travel Articles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mt-4">
              Our Travel Guides
            </h2>
            <p className="text-sm sm:text-base text-slate-500 font-medium mt-2 max-w-xl">
              Equip yourself with expert luggage checklists, culinary routes, and flight hacking insights before flying out.
            </p>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogArticles.map((article, idx) => {
            const isLiked = !!likedArticles[article.id];
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => setSelectedArticle(article)}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer group overflow-hidden"
              >
                {/* Article Cover */}
                <div className="relative h-52 overflow-hidden shrink-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-blue-600 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg border border-blue-400/25">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Body */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta rows */}
                  <div className="flex items-center space-x-4 text-xs text-slate-400 font-semibold mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 tracking-tight mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium line-clamp-3 mb-6">
                    {article.summary}
                  </p>

                  {/* Bottom Author Row */}
                  <div className="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-bold border border-blue-100">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{article.author}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => toggleLike(article.id, e)}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          isLiked
                            ? 'bg-red-50 text-red-500 border-red-100'
                            : 'border-slate-100 text-slate-400 hover:text-red-500 hover:bg-red-50/50'
                        }`}
                        title="Like Article"
                      >
                        <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Blog Full Reading Modal View */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex justify-center items-start sm:items-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl border border-slate-100 my-4 sm:my-8 relative"
            >
              {/* Cover Banner */}
              <div className="relative h-64 sm:h-96">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/10 to-transparent" />
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-blue-600 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-lg border border-blue-400/20 mb-3 inline-block">
                    {selectedArticle.category}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-black tracking-tight leading-tight">
                    {selectedArticle.title}
                  </h3>
                </div>
              </div>

              {/* Text Layout */}
              <div className="p-6 sm:p-10 max-h-[50vh] overflow-y-auto">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 pb-5 mb-6 text-xs text-slate-500 font-semibold">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4 text-blue-500" />
                    <span className="font-bold text-slate-800">{selectedArticle.author}</span>
                    <span className="text-slate-300">|</span>
                    <span>Chief Travel Correspondent</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span>Published: {selectedArticle.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>

                {/* Article body paragraphs */}
                <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                  {selectedArticle.content.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                {/* Newsletter prompt in-line */}
                <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">Enjoyed this travel guide?</h4>
                    <p className="text-xs text-slate-500 font-semibold">Subscribe to receive our weekly itineraries and flight hacks directly in your inbox.</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedArticle(null);
                      const contactForm = document.querySelector('#contact');
                      contactForm?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shrink-0 transition-colors"
                  >
                    Subscribe Now
                  </button>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="bg-slate-50 px-6 sm:px-10 py-5 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-slate-500 font-semibold">
                  <button className="flex items-center space-x-1 hover:text-red-500 transition-colors cursor-pointer">
                    <Heart className="h-4 w-4" />
                    <span>Helpful (245)</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors cursor-pointer">
                    <MessageSquare className="h-4 w-4" />
                    <span>Comments (18)</span>
                  </button>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-6 py-2 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Close Guide
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
