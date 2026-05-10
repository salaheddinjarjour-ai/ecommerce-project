import React, { useState, useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, ChevronDown, ChevronUp, Star, Filter, ShoppingCart, ArrowLeft } from 'lucide-react';
import { allProducts, ProductType } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence, Variants } from 'motion/react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const categoryMeta: Record<string, { title: string, subtitle: string, subcategories: string[] }> = {
  'electronics': { title: 'Electronics', subtitle: 'Shop the latest tech gadgets and electronics', subcategories: ['Smartphones', 'Laptops', 'Smartwatches', 'Headphones', 'TVs & Audio'] },
  'fashion': { title: 'Fashion', subtitle: 'Discover the latest trends in clothing and accessories', subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Accessories'] },
  'home-living': { title: 'Home & Living', subtitle: 'Everything you need for a comfortable home', subcategories: ['Furniture', 'Decor', 'Lighting', 'Kitchen'] },
  'groceries': { title: 'Groceries', subtitle: 'Fresh food and daily essentials', subcategories: ['Fruits & Vegetables', 'Beverages', 'Snacks', 'Pantry'] },
  'beauty': { title: 'Beauty', subtitle: 'Cosmetics, skincare, and fragrances', subcategories: ['Makeup', 'Skincare', 'Haircare', 'Fragrances'] },
};

export const Category = () => {
  const { id } = useParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const { addToCart } = useCart();
  
  const currentCategoryKey = id && categoryMeta[id] ? id : 'electronics';
  const meta = categoryMeta[currentCategoryKey];
  
  // Filtering & Sorting State
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('popular');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Reset subcategory when main category changes
  useEffect(() => {
    setSelectedSubcategory(null);
    setSelectedBrands([]);
    setSelectedShipping([]);
    setMinPrice('');
    setMaxPrice('');
    setMinRating(null);
    setCurrentPage(1);
  }, [currentCategoryKey]);

  // Reset to first page when any filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubcategory, minPrice, maxPrice, minRating, sortBy, selectedBrands, selectedShipping]);

  // Derive available brands for this category
  const availableBrands = useMemo(() => {
    const brands = allProducts
      .filter(p => p.categoryId === currentCategoryKey)
      .map(p => p.brand);
    return Array.from(new Set(brands)).sort();
  }, [currentCategoryKey]);

  const products = useMemo(() => {
    let filtered = allProducts.filter(p => p.categoryId === currentCategoryKey);

    // Apply Brands Filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    // Apply Shipping Filter (Mock logic)
    if (selectedShipping.includes('Fast Delivery')) {
      filtered = filtered.filter(p => p.badgeRight === 'Fast' || p.badgeLeft === 'Fast');
    }

    // Apply Subcategory Filter based on soft string matching
    if (selectedSubcategory) {
      const sub = selectedSubcategory.toLowerCase();
      filtered = filtered.filter(p => {
        const text = (p.title + ' ' + p.description).toLowerCase();
        
        // Manual explicit overrides for better mock data matching
        if (sub === 'smartphones') return text.includes('phone');
        if (sub === 'smartwatches') return text.includes('watch');
        if (sub === 'tvs & audio') return text.includes('tv') || text.includes('audio') || text.includes('speaker');
        if (sub === "men's clothing") return text.includes('men');
        if (sub === "women's clothing") return text.includes('women');
        
        // Generic fallback split word match
        const words = sub.split(/[\s&]+/).filter(w => w.length > 3);
        if (words.length > 0) return words.some(w => text.includes(w));
        return text.includes(sub);
      });
    }

    // Apply Price Filter
    if (minPrice) filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
    if (maxPrice) filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));

    // Apply Rating Filter
    if (minRating !== null) filtered = filtered.filter(p => p.rating >= minRating);

    // Apply Sorting
    filtered.sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'popular') return b.reviews - a.reviews;
      return 0; // default / newest 
    });

    return filtered;
  }, [currentCategoryKey, selectedSubcategory, minPrice, maxPrice, minRating, sortBy]);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return products.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [products, currentPage, ITEMS_PER_PAGE]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Breadcrumbs */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex text-sm text-slate-500 mb-6" aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          <li className="inline-flex items-center">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-gray-900 font-medium capitalize">
                {meta.title}
              </span>
            </div>
          </li>
        </ol>
      </motion.nav>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 font-display mb-3 capitalize tracking-tight">
          {meta.title}.
        </h1>
        <p className="text-gray-600 font-medium max-w-2xl">{meta.subtitle}</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Mobile Filter Button */}
        <button 
          className="lg:hidden flex items-center justify-center gap-2 font-bold text-slate-700 bg-white/80 backdrop-blur-md border border-white/40 py-3 px-4 rounded-2xl shadow-xl active:scale-95 transition-all"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <Filter className="w-5 h-5 text-primary" />
          {showMobileFilters ? 'Hide Filters' : 'Filter & Sort'}
        </button>

        {/* Sidebar Filters */}
        <aside className={`w-full lg:w-64 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white/60 backdrop-blur-2xl border border-white/40 p-6 rounded-[2rem] shadow-2xl shadow-blue-900/5 space-y-8 sticky top-32">
            
            {/* Category Filter */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-[10px] font-display">Department</h3>
                <ChevronUp className="w-4 h-4 text-slate-400" />
              </div>
              <div className="space-y-1">
                {Object.entries(categoryMeta).map(([key, cat]) => (
                  <div key={key} className="mb-2">
                    <Link 
                      to={`/category/${key}`}
                      className={`block px-3 py-2 rounded-xl text-sm font-black transition-all font-display uppercase tracking-widest ${currentCategoryKey === key ? 'bg-primary text-white shadow-lg shadow-blue-200 ml-1' : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'}`}
                    >
                      {cat.title}
                    </Link>
                    {/* Subcategories (only show for currently active top-level category) */}
                    {currentCategoryKey === key && (
                      <ul className="mt-2 space-y-1 pl-4 border-l-2 border-blue-100 ml-3">
                        <li>
                          <button 
                            onClick={() => setSelectedSubcategory(null)}
                            className={`text-sm w-full text-left px-2 py-1.5 rounded-lg transition-colors ${selectedSubcategory === null ? 'font-bold text-primary bg-blue-50/50' : 'text-gray-400 hover:text-gray-900'}`}
                          >
                            All Arrivals
                          </button>
                        </li>
                        {cat.subcategories.map(sub => (
                          <li key={sub}>
                            <button 
                              onClick={() => setSelectedSubcategory(sub)}
                              className={`text-sm w-full text-left px-2 py-1.5 rounded-lg transition-colors ${selectedSubcategory === sub ? 'font-bold text-primary bg-blue-50/50' : 'text-gray-400 hover:text-gray-900'}`}
                            >
                              <span>{sub}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-100/50" />

            {/* Price Filter */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-slate-900 uppercase tracking-widest text-[10px] font-display">Price Range</h3>
                {(minPrice || maxPrice) && (
                  <button onClick={() => { setMinPrice(''); setMaxPrice(''); }} className="text-primary text-[10px] font-extrabold uppercase tracking-widest hover:underline font-display">Clear</button>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="w-1/2 relative group">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                    <input 
                      type="number" 
                      placeholder="Min" 
                      className="w-full pl-7 pr-2 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 placeholder-slate-300 transition-all" 
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <span className="text-slate-300">-</span>
                  <div className="w-1/2 relative group">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                    <input 
                      type="number" 
                      placeholder="Max" 
                      className="w-full pl-7 pr-2 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100 placeholder-slate-300 transition-all" 
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-slate-100/50" />

            {/* Rating Filter */}
            <div>
              <div className="flex justify-between items-center mb-4 text-[10px] font-extrabold text-slate-900 uppercase tracking-widest font-display">
                <h3>Rating</h3>
                {minRating !== null && (
                   <button onClick={() => setMinRating(null)} className="text-primary font-extrabold hover:underline normal-case">Clear</button>
                )}
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                {[4, 3, 2, 1].map(rating => (
                  <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="ratingFilter"
                      checked={minRating === rating}
                      onChange={() => setMinRating(rating)}
                      className="w-4 h-4 text-primary focus:ring-primary cursor-pointer" 
                    />
                    <div className="flex items-center gap-1 group-hover:text-slate-900 transition-colors">
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'fill-current' : 'text-slate-200'}`} />
                        ))}
                      </div>
                      <span className="text-xs font-medium">& Up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button 
              onClick={() => {
                setSelectedSubcategory(null);
                setSelectedBrands([]);
                setSelectedShipping([]);
                setMinPrice('');
                setMaxPrice('');
                setMinRating(null);
                setShowMobileFilters(false);
              }}
              className="w-full py-4 px-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all active:scale-95 shadow-xl shadow-gray-900/10 font-display"
            >
              Reset Filters
            </button>

          </div>
        </aside>

        {/* Main Content (Products Grid) */}
        <section className="flex-1 w-full">
          {/* Top Bar Sort & View */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-white/40 backdrop-blur-xl p-4 rounded-[2rem] border border-white/40 shadow-xl shadow-blue-900/5">
            <p className="text-slate-500 text-sm font-medium pl-2">
              <span className="font-black text-slate-900">{products.length} </span>Curated Finds
            </p>
            <div className="flex gap-3 text-sm">
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/80 border-none text-slate-700 py-2 pl-4 pr-10 rounded-xl focus:ring-2 focus:ring-blue-100 appearance-none shadow-sm cursor-pointer font-black transition-all text-[10px] uppercase tracking-widest font-display"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Grid */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {paginatedProducts.map(product => (
              <motion.div 
                key={product.id} 
                variants={itemVariants}
                className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white p-5 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-primary/10 transition-all group relative flex flex-col"
              >
                {/* Image Section */}
                <Link to={`/product/${product.id}`} className="block h-56 bg-slate-50/50 rounded-[2rem] relative overflow-hidden flex items-center justify-center p-8 group-hover:bg-white transition-colors duration-500">
                  {/* Glass Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {product.badgeLeft && (
                      <div className="bg-white/90 backdrop-blur-md text-red-600 text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-red-200/20 border border-white">
                        {product.badgeLeft.toUpperCase()}
                      </div>
                    )}
                    {product.badgeRight && (
                      <div className="bg-white/90 backdrop-blur-md text-emerald-600 text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-emerald-200/20 border border-white">
                        {product.badgeRight.toUpperCase()}
                      </div>
                    )}
                  </div>

                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 mix-blend-multiply drop-shadow-2xl" 
                  />
                  
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart({
                            productId: product.id,
                            title: product.title,
                            price: product.price,
                            image: product.image,
                            quantity: 1
                          });
                        }}
                        className="bg-primary text-white p-3 rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary-hover transition-colors"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                    </div>
                </Link>

                {/* Content */}
                <div className="pt-6 px-2 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                <Link to={`/product/${product.id}`} className="font-extrabold text-gray-900 text-lg hover:text-primary leading-tight line-clamp-1 transition-colors font-display">
                  {product.title}
                </Link>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map(star => (
                         <Star key={star} className={`w-3 h-3 ${star <= Math.floor(product.rating) ? 'fill-current' : 'text-slate-200'}`} />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">({product.reviews} REVIEWS)</span>
                  </div>

                  <div className="mt-auto flex items-end justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-black uppercase tracking-tighter mb-0.5">{product.brand}</span>
                      <div className="flex items-baseline gap-2">
                        <span className={`font-black text-2xl ${product.oldPrice ? 'text-secondary' : 'text-gray-900'}`}>
                          ${product.price.toFixed(0)}
                        </span>
                        {product.oldPrice && (
                          <span className="text-xs text-slate-400 line-through font-bold">
                            ${product.oldPrice.toFixed(0)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          {products.length > ITEMS_PER_PAGE && (
            <div className="flex justify-center items-center mt-16 gap-3 mb-10">
              {/* Previous Page */}
              <button 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${currentPage === 1 ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:bg-white hover:text-slate-900 font-bold'}`}
              >
                <ArrowLeft className="w-5 h-5 rotate-180 scale-x-[-1]" />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }).map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-12 h-12 flex items-center justify-center rounded-2xl font-black transition-all ${currentPage === i + 1 ? 'text-primary bg-blue-50 border border-blue-100 shadow-xl shadow-blue-500/5' : 'text-gray-400 hover:bg-white hover:text-gray-900 font-bold'}`}
                >
                  {i + 1}
                </button>
              ))}

              {/* Next Page */}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${currentPage === totalPages ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:bg-white hover:text-gray-900 font-bold'}`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
          
          {products.length === 0 && (
            <div className="text-center py-20 text-gray-500">
                No products found for this category.
            </div>
          )}

        </section>
      </div>
    </main>
  );
};
