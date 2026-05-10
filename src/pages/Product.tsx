import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AIElevatorPitch } from '../components/AIElevatorPitch';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Star, 
  ChevronRight, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Minus,
  Plus
} from 'lucide-react';
import { allProducts, ProductType, vendors } from '../data/products';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../contexts/CartContext';

export const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  
  const product = allProducts.find(p => p.id.toString() === id) || allProducts[0]; // Fallback for 404
  const vendor = vendors.find(v => v.id === product.vendorId);

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const [reviewsList, setReviewsList] = useState([
    { id: 1, name: 'Alice M.', rating: 5, comment: 'Absolutely love this product! Highly recommended.', date: '2023-10-15' },
    { id: 2, name: 'John D.', rating: 4, comment: 'Great quality, but shipping took a little longer than expected.', date: '2023-10-10' }
  ]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  const isWishlisted = isInWishlist(product.id);

  // Reset states when product changes
  useEffect(() => {
    setMainImage(product.images[0]);
    setSelectedColor(product.colors?.[0] || '');
    setSelectedSize(product.sizes?.[0] || '');
    setQuantity(1);
    setActiveTab('description');
  }, [product]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    const review = {
      ...newReview,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    setReviewsList([review, ...reviewsList]);
    setNewReview({ name: '', rating: 5, comment: '' });
  };

  const relatedProducts = allProducts.filter(
    (p) => p.id !== product.id && (p.categoryId === product.categoryId || p.brand === product.brand)
  ).slice(0, 4);

  if (!product) return <div>Product not found</div>;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex text-sm text-gray-500 mb-8" aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1" />
              <Link to={`/category/${product.categoryId}`} className="hover:text-primary transition-colors capitalize">
                {product.categoryId.replace('-', ' ')}
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-gray-900 font-medium truncate max-w-[150px] sm:max-w-none">
                {product.title}
              </span>
            </div>
          </li>
        </ol>
      </motion.nav>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-8 mb-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Images */}
          <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-3">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-2 overflow-x-auto md:w-20 flex-shrink-0 hide-scrollbar">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onMouseEnter={() => setMainImage(img)}
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${mainImage === img ? 'border-primary ring-2 ring-primary/20 ring-offset-1' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div 
              className="w-full h-[350px] md:h-[450px] rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center relative group cursor-crosshair"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => {
                setIsZoomed(false);
                setZoomPosition({ x: 50, y: 50 });
              }}
              onMouseMove={handleMouseMove}
            >
              <img 
                src={mainImage} 
                alt={product.title} 
                className={`w-full h-full object-cover transition-transform duration-200 ease-out ${isZoomed ? 'scale-[2.5]' : 'scale-100 group-hover:scale-105'}`}
                style={{
                  transformOrigin: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center center'
                }}
              />
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-md transition-colors ${
                  isWishlisted ? 'text-red-500 bg-red-50' : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="mb-0.5">
              <span className="text-primary font-bold text-[10px] sm:text-xs uppercase tracking-widest">{product.brand}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-gray-900 leading-tight mb-1.5 uppercase tracking-tighter">
              {product.title}
            </h1>

            {vendor && (
              <div className="flex items-center gap-2 mb-3">
                <span className="text-gray-400 text-xs font-medium">Sold by</span>
                <Link to={`/vendor/${vendor.id}`} className="flex items-center gap-1.5 group">
                  <div className="w-4 h-4 rounded-full overflow-hidden shrink-0 border border-gray-100 group-hover:border-primary transition-colors">
                    <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-primary font-bold text-xs hover:underline">{vendor.name}</span>
                </Link>
              </div>
            )}
            
            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className={`h-3 w-3 ${star <= Math.round(product.rating) ? 'fill-current' : 'text-gray-200'}`} />
                  ))}
                </div>
                <span className="font-bold text-gray-900 text-xs ml-0.5">{product.rating}</span>
              </div>
              <div className="h-3 w-px bg-gray-200"></div>
              <Link to="#reviews" className="text-gray-400 hover:text-primary text-xs font-medium">
                {product.reviews.toLocaleString()} Reviews
              </Link>
              <div className="h-3 w-px bg-gray-200"></div>
              <button className="text-gray-400 hover:text-primary text-xs font-medium flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
            </div>

            {/* Price */}
            <div className="mb-5">
              <div className="flex items-end gap-2 mb-0.5">
                <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {product.oldPrice && product.oldPrice > product.price && (
                  <>
                    <span className="text-base text-gray-400 line-through mb-0.5">${product.oldPrice.toFixed(2)}</span>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded ml-1 mb-1">
                      Save ${(product.oldPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              <p className="text-[10px] text-gray-400">All prices include VAT.</p>
            </div>

            {/* AI ELEVATOR PITCH */}
            <AIElevatorPitch 
              productTitle={product.title}
              productDescription={product.description}
              brand={product.brand}
            />

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm border-gray-900 font-bold mb-3">Color: <span className="font-normal text-gray-600">{selectedColor}</span></h3>
                <div className="flex gap-3">
                  {product.colors.map((color, idx) => {
                    const colorMap: Record<string, string> = {
                      'Black': 'bg-gray-900',
                      'Silver': 'bg-gray-200',
                      'Midnight Blue': 'bg-blue-900',
                      'White': 'bg-white',
                      'Phantom Black': 'bg-gray-800',
                      'Green': 'bg-emerald-700',
                      'Space Gray': 'bg-gray-600',
                      'Gold': 'bg-yellow-200',
                      'Midnight': 'bg-blue-950',
                      'Starlight': 'bg-amber-50',
                      'Blue': 'bg-blue-500',
                      'Blue Wash': 'bg-blue-400',
                      'Light Blue': 'bg-blue-300',
                      'Navy': 'bg-blue-800',
                      'Red': 'bg-red-600',
                      'Nude': 'bg-orange-100',
                      'Gold/Green': 'bg-yellow-600',
                      'Silver/Black': 'bg-gray-400',
                      'Gray': 'bg-gray-400',
                      'Charcoal': 'bg-gray-700',
                      'Beige': 'bg-amber-100',
                      'Brass': 'bg-yellow-600',
                      'Yellow/White': 'bg-yellow-300',
                      'Navy/White': 'bg-blue-800',
                      'Ruby Red': 'bg-red-700',
                      'Nude Blush': 'bg-rose-200',
                      'Deep Berry': 'bg-fuchsia-900'
                    };
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${selectedColor === color ? 'border-primary ring-2 ring-primary/20 ring-offset-2' : 'border-transparent'}`}
                        title={color}
                      >
                        <span className={`w-8 h-8 rounded-full shadow-inner border border-gray-200 ${colorMap[color] || 'bg-gray-500'}`}></span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Size</h3>
                  <button className="text-sm text-blue-600 hover:underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] px-3 py-2 rounded-lg border font-medium transition-colors
                        ${selectedSize === size 
                          ? 'border-primary bg-primary text-white' 
                          : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm text-gray-900 font-bold mb-3">Quantity</h3>
              <div className="flex items-center w-32 bg-gray-50 border border-gray-200 rounded-lg p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="flex-1 text-center font-bold text-gray-900">{quantity}</div>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-md transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={() => addToCart({
                  productId: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.images[0],
                  selectedColor,
                  selectedSize,
                  quantity
                })}
                className="flex-1 bg-secondary hover:bg-secondary-hover text-white font-extrabold py-5 rounded-2xl shadow-xl shadow-secondary/20 transition-all transform hover:-translate-y-1 active:scale-95 text-xs uppercase tracking-widest font-display"
              >
                Add to Cart
              </button>
              <button 
                onClick={() => {
                  addToCart({
                    productId: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.images[0],
                    selectedColor,
                    selectedSize,
                    quantity
                  });
                }}
                className="flex-1 bg-blue-50 hover:bg-primary hover:text-white text-primary border border-blue-200 font-extrabold py-5 rounded-2xl transition-all shadow-xl shadow-blue-500/5 active:scale-95 text-xs uppercase tracking-widest font-display"
              >
                Buy Now
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
              <div className="flex gap-3">
                <Truck className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-extrabold text-[10px] text-gray-900 uppercase tracking-widest font-display">Free Delivery</h4>
                  <p className="text-xs text-gray-500 font-medium font-sans">2-3 days across Lebanon</p>
                </div>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-extrabold text-[10px] text-gray-900 uppercase tracking-widest font-display">1 Year Warranty</h4>
                  <p className="text-xs text-gray-500 font-medium font-sans">Official distributor</p>
                </div>
              </div>
              <div className="flex gap-3">
                <RotateCcw className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <h4 className="font-extrabold text-[10px] text-gray-900 uppercase tracking-widest font-display">Easy Returns</h4>
                  <p className="text-xs text-gray-500 font-medium font-sans">14-day return policy</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Details & Specs Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 flex overflow-x-auto hide-scrollbar">
          <button 
            onClick={() => setActiveTab('description')}
            className={`px-8 py-4 font-extrabold text-[10px] font-display uppercase tracking-widest whitespace-nowrap transition-all ${activeTab === 'description' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-gray-900'}`}>
            Product Description
          </button>
          <button 
            onClick={() => setActiveTab('specs')}
            className={`px-8 py-4 font-extrabold text-[10px] font-display uppercase tracking-widest whitespace-nowrap transition-all ${activeTab === 'specs' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-gray-900'}`}>
            Specifications
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`px-8 py-4 font-extrabold text-[10px] font-display uppercase tracking-widest whitespace-nowrap transition-all ${activeTab === 'reviews' ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-gray-900'}`}>
            Customer Reviews ({reviewsList.length})
          </button>
        </div>
        
        <div className="p-8">
          {activeTab === 'description' && (
            <div className="max-w-3xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-display">About this item</h3>
              <div className="prose prose-blue text-gray-600">
                <p className="mb-4 whitespace-pre-line">{product.description}</p>
                <ul className="list-disc pl-5 mt-4 space-y-2">
                  <li>Premium materials and high-quality build</li>
                  <li>Authentic product sourced directly from the manufacturer</li>
                  <li>Designed for maximum durability and daily use</li>
                  <li>100% satisfaction guaranteed</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-3xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-display">Technical Specifications</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(product.specs).map(([key, value], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 w-1/3 border-r border-gray-200">{key}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="grid md:grid-cols-2 gap-12">
              {/* Existing Reviews */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">Customer Reviews</h3>
                <div className="space-y-6">
                  {reviewsList.map(review => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-bold text-gray-900">{review.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{review.date}</div>
                        </div>
                        <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star key={star} className={`h-4 w-4 ${star <= review.rating ? 'fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-3 leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                  {reviewsList.length === 0 && (
                    <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                  )}
                </div>
              </div>

              {/* Review Form */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 h-fit">
                <h3 className="text-lg font-bold text-gray-900 mb-4 font-display">Write a Review</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className={`focus:outline-none ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                        >
                          <Star className="h-6 w-6 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={newReview.name}
                      onChange={e => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                    <textarea 
                      required
                      rows={4}
                      value={newReview.comment}
                      onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow resize-none"
                      placeholder="What did you like or dislike about this product?"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-sm"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl font-bold text-gray-900 font-display">Related Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <div key={prod.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow relative">
                {prod.badgeLeft && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded shadow-sm z-10">
                    {prod.badgeLeft}
                  </div>
                )}
                {prod.badgeRight && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded shadow-sm z-10">
                    {prod.badgeRight}
                  </div>
                )}
                <Link to={`/product/${prod.id}`} className="h-48 bg-gray-50 relative overflow-hidden group block pt-6">
                  <img src={prod.image} alt={prod.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" />
                </Link>
                <div className="p-4 flex flex-col flex-1">
                  <Link to={`/product/${prod.id}`} className="font-semibold text-gray-800 text-sm mb-1 hover:text-blue-600 line-clamp-2">{prod.title}</Link>
                  <p className="text-xs text-gray-500 mb-2">{prod.brand}</p>
                  <div className="font-bold text-gray-900 text-lg mb-2">${prod.price}</div>
                  <div className="flex items-center gap-1 mb-4 mt-auto">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className={`h-3 w-3 ${star <= prod.rating ? 'fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({prod.reviews})</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart({
                        productId: prod.id,
                        title: prod.title,
                        price: prod.price,
                        image: prod.image,
                        quantity: 1
                      });
                    }}
                    className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2 rounded-md text-sm transition-colors mt-auto"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
    </main>
  );
};
