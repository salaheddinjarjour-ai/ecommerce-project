import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ShoppingBag, SlidersHorizontal, Grid, List as ListIcon } from 'lucide-react';
import { allProducts } from '../data/products';
import { motion } from 'motion/react';

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(lowerQuery) ||
        product.brand.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.categoryId.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-gray-100 pb-8">
        <div>
          <div className="flex items-center gap-2 text-gray-500 mb-2">
            <Search className="h-4 w-4" />
            <span className="text-sm font-medium tracking-wide uppercase">Search Results</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 font-display">
            {query ? (
              <>Results for <span className="text-blue-600">"{query}"</span></>
            ) : (
              "Type something to search"
            )}
          </h1>
          <p className="text-gray-500 mt-1">Found {results.length} products matching your search</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}
            >
              <ListIcon className="h-5 w-5" />
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>
      </div>

      {/* Grid */}
      {results.length > 0 ? (
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-6`}>
          {results.map((product) => (
            <motion.div
              layout
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={viewMode === 'grid' ? 'group' : 'flex gap-6 border-b border-gray-100 pb-6 group'}
            >
              <Link color="inherit" to={`/product/${product.id}`} className={viewMode === 'grid' ? 'block mb-3' : 'w-48 h-48 shrink-0 relative rounded-xl overflow-hidden'}>
                <div className={`${viewMode === 'grid' ? 'aspect-square mb-3' : 'w-full h-full'} relative rounded-2xl overflow-hidden bg-gray-100`}>
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.badgeLeft && (
                    <span className="absolute top-2 left-2 bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {product.badgeLeft}
                    </span>
                  )}
                  {product.badgeRight && (
                    <span className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {product.badgeRight}
                    </span>
                  )}
                </div>
              </Link>

              <div className="flex-grow py-2">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">{product.brand}</span>
                </div>
                
                <Link to={`/product/${product.id}`} className="block group-hover:text-blue-600 transition-colors mb-2">
                  <h3 className="font-bold text-gray-900 leading-tight line-clamp-2 text-lg">{product.title}</h3>
                </Link>
                
                {viewMode === 'list' && (
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2 max-w-2xl">{product.description}</p>
                )}

                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <ShoppingBag className="h-10 w-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            We couldn't find anything matching "{query}". Try checking for typos or using broader terms.
          </p>
          <Link 
            to="/categories" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-blue-100 inline-block"
          >
            Browse All Categories
          </Link>
        </div>
      )}
    </main>
  );
};
