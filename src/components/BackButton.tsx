import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show the back button on the homepage
  if (location.pathname === '/') {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, x: -20, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        className="fixed bottom-6 left-6 z-50 flex"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center bg-white/90 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-2xl border border-blue-100 shadow-blue-500/10 text-slate-700 hover:text-blue-600 font-bold text-sm transition-all group active:scale-95"
          id="global-back-button"
        >
          <ChevronLeft className="h-5 w-5 mr-1 transition-transform group-hover:-translate-x-1" />
          <span className="hidden sm:inline">Back</span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
