import React, { useState, useEffect, useRef } from 'react';
import { Search, User, Package, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { allProducts } from '../data/products';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();

  const filteredProducts = allProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5); // Limit to top 5 suggestions

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (productId: number | string) => {
    setShowSuggestions(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50">
      <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl shadow-blue-900/10 rounded-2xl h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-all duration-300">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-tr-xl rounded-bl-xl bg-gradient-to-br from-blue-600 to-indigo-400 transform -rotate-12 flex items-center justify-center transition-transform group-hover:rotate-12">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <span className="font-display font-extrabold text-2xl tracking-tighter text-gray-900">Trendit</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-lg mx-6 hidden md:flex relative" ref={searchRef}>
          <form className="relative w-full flex items-center" onSubmit={handleSearchSubmit}>
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              className="block w-full pl-10 pr-3 py-2 bg-gray-100/50 border-none rounded-xl leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-sm transition-all"
              placeholder="Quick find..."
            />
          </form>

          {/* Autocomplete Dropdown */}
          {showSuggestions && searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 overflow-hidden z-50">
              {filteredProducts.length > 0 ? (
                <ul className="py-2">
                  {filteredProducts.map((product) => (
                    <li key={product.id}>
                      <button
                        onClick={() => handleSuggestionClick(product.id)}
                        className="w-full text-left px-4 py-2 hover:bg-primary/5 flex flex-col focus:bg-primary/5 focus:outline-none transition-colors"
                      >
                         <span className="text-sm font-extrabold text-gray-900 truncate font-display">{product.title}</span>
                         <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{product.brand}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500 font-medium">
                  No products found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs font-black uppercase tracking-widest text-gray-600 font-display">
          <Link to={user ? "/account" : "/login"} className="flex items-center gap-2 hover:text-primary transition-colors">
            <User className="h-5 w-5" />
            <span className="hidden lg:block">{user ? user.name.split(' ')[0] : 'Account'}</span>
          </Link>
          <Link to={user ? "/account" : "/login"} className="flex items-center gap-2 hover:text-primary transition-colors">
            <Package className="h-5 w-5" />
            <span className="hidden lg:block">Orders</span>
          </Link>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="group relative flex items-center p-3 bg-primary text-white rounded-2xl hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 active:scale-95"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-lg">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>

  );
};
