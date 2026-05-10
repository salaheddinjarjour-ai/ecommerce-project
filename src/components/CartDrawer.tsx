import React, { useEffect, useRef } from 'react';
import { useCart } from '../contexts/CartContext';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    if (isCartOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md bg-white/80 backdrop-blur-2xl shadow-2xl h-full flex flex-col border-l border-white/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100/50">
              <div className="flex items-center gap-3 text-gray-900">
                <div className="p-2 bg-primary rounded-xl text-white shadow-xl shadow-primary/20">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black font-display italic tracking-tight">BAG.</h2>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {cart.reduce((ac, item) => ac + item.quantity, 0)} UNITS PREPPED
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-100/50 rounded-2xl transition-all active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center text-gray-200 relative mb-4">
                    <ShoppingBag className="w-12 h-12" />
                    <div className="absolute top-0 right-0 w-4 h-4 bg-primary rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-900 italic font-display">EMPTY.</h3>
                    <p className="text-gray-400 mt-2 max-w-[200px] mx-auto font-medium">Your curated list is currently devoid of goods.</p>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 px-8 py-4 bg-gray-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-primary transition-all shadow-xl shadow-gray-900/10 active:scale-95"
                  >
                    Start Curating
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={item.id} 
                      className="flex gap-5 group"
                    >
                      {/* Image */}
                      <Link to={`/product/${item.productId}`} onClick={() => setIsCartOpen(false)} className="w-24 h-24 bg-gray-50/50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100/50 p-2 group-hover:bg-white transition-colors relative">
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 flex flex-col py-1">
                        <div className="flex justify-between items-start mb-1">
                          <Link to={`/product/${item.productId}`} onClick={() => setIsCartOpen(false)}>
                            <h4 className="font-bold text-gray-900 text-sm line-clamp-2 hover:text-primary transition-colors leading-tight">{item.title}</h4>
                          </Link>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-secondary transition-all p-1 active:scale-75"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                          {item.selectedColor && <span className="mr-3">CLR / {item.selectedColor}</span>}
                          {item.selectedSize && <span>SZ / {item.selectedSize}</span>}
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="font-black text-gray-900">${item.price.toFixed(0)}</div>
                          
                          {/* Quantity Control */}
                          <div className="flex items-center bg-gray-100/50 rounded-xl p-1 border border-gray-200/50">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg transition-all disabled:opacity-30"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <div className="w-8 text-center text-xs font-black text-gray-900">{item.quantity}</div>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg transition-all"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Summary */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100/50 p-8 bg-white/40 backdrop-blur-xl">
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>Valuation</span>
                    <span className="text-gray-900">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>Logistics</span>
                    <span className="text-emerald-600">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black text-gray-900 pt-4 border-t border-gray-100 italic font-display tracking-tight">
                    <span>TOTAL.</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full bg-primary hover:bg-primary-hover text-white font-black text-xs uppercase tracking-[0.2em] py-6 rounded-[2rem] shadow-2xl shadow-primary/20 transition-all flex justify-center items-center gap-3 active:scale-[0.98]">
                  Finalize Order <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
