import React from 'react';
import { ChevronLeft, ChevronRight, Info, ShieldCheck, Truck, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allProducts } from '../data/products';
import { useCart } from '../contexts/CartContext';

import { useCms } from '../contexts/CmsContext';

// Existing local components (Hero, Categories, FeaturedProducts, LocalStores, Banner, WhyShop) remain here
// We just need to modify the default export Home component

import { motion, Variants } from 'motion/react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Hero = () => {
  return (
    <section 
      className="overflow-hidden relative min-h-[calc(100vh-7rem)] sm:min-h-0 flex items-center pb-12 pt-0 bg-cover bg-center bg-no-repeat bg-[url('/hero-bg-mobile.png')] sm:bg-[url('/hero-bg.png')] -mt-[30px] mb-0"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative flex flex-col items-center z-10 w-full">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full max-w-3xl z-10"
        >
          <motion.h1 
            variants={itemVariants}
            className="font-display text-[32px] sm:text-[48px] font-bold text-slate-900 leading-[40px] sm:leading-[59px] mb-6 sm:mb-8 tracking-tight text-center"
          >
            Everything you <span className="text-primary">need.</span><br/>
            <span className="text-slate-500 font-medium text-center">Delivered fast.</span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-base sm:text-lg text-gray-500 mb-8 sm:mb-9 font-medium max-w-md leading-relaxed font-sans text-center px-4 sm:px-0 mx-auto">
            The largest refined marketplace in Lebanon. Curated quality products, delivered in record time to your doorstep.
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-4 justify-center">
            <Link 
              to="/categories"
              className="bg-primary hover:bg-primary-hover text-white font-black py-5 px-12 rounded-2xl shadow-2xl shadow-primary/20 transition-all transform hover:-translate-y-1 active:scale-95 text-xs uppercase tracking-widest inline-block font-display"
            >
              Enter Marketplace
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Categories = () => {
  const categories = [
    { name: 'Electronics', size: 'large', icon: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&fit=crop' },
    { name: 'Fashion', size: 'medium', icon: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&fit=crop' },
    { name: 'Home', size: 'small', icon: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&fit=crop' },
    { name: 'Groceries', size: 'medium', icon: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&fit=crop' },
    { name: 'Beauty', size: 'small', icon: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&fit=crop' },
  ];

  return (
    <section id="categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4"
      >
        <div className="space-y-1">
          <h2 className="text-5xl font-black text-gray-900 font-display uppercase tracking-tight">CATEGORIES.</h2>
          <p className="text-gray-600 font-medium font-sans">Explore everything you need, organized by department.</p>
        </div>
        <Link 
          to="/categories" 
          className="bg-primary hover:bg-primary-hover text-white font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 group px-8 py-4 rounded-2xl font-display shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 active:scale-95 shrink-0"
        >
          Browse All <ChevronRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 min-h-[500px] lg:h-[600px]"
      >
        {/* Fashion - Highlighted */}
        <motion.div variants={itemVariants} className="col-span-2 row-span-1 lg:row-span-2">
          <Link 
            to="/category/fashion" 
            className="relative h-full min-h-[180px] w-full block group overflow-hidden rounded-3xl sm:rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-white"
          >
            <img src={categories[1].icon} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Fashion" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent p-5 sm:p-8 flex flex-col justify-end">
              <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tighter font-display uppercase">FASHION</h3>
              <span className="text-white/70 font-black tracking-[0.2em] text-[8px] sm:text-[10px] uppercase font-display">01 / CURATED STYLE & APPAREL</span>
            </div>
          </Link>
        </motion.div>

        {/* Electronics - Highlighted */}
        <motion.div variants={itemVariants} className="col-span-2 lg:col-span-2 row-span-1">
          <Link 
            to="/category/electronics" 
            className="relative h-full min-h-[140px] w-full block group overflow-hidden rounded-3xl sm:rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-white"
          >
            <img src={categories[0].icon} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Electronics" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent p-5 sm:p-8 flex flex-col justify-end">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tighter font-display uppercase leading-none">ELECTRONICS</h3>
              <span className="text-white/70 font-black tracking-[0.2em] text-[8px] uppercase font-display">02 / NEXT-GEN TECHNOLOGY</span>
            </div>
          </Link>
        </motion.div>

        {/* Beauty - Highlighted */}
        <motion.div variants={itemVariants} className="col-span-2 lg:col-span-1 lg:row-span-1">
          <Link 
            to="/category/beauty" 
            className="relative h-full min-h-[120px] w-full block group overflow-hidden rounded-3xl sm:rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-white"
          >
            <img src={categories[4].icon} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Beauty" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent p-5 sm:p-6 flex flex-col justify-end">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-tighter font-display">Beauty</h3>
            </div>
          </Link>
        </motion.div>

        {/* Home */}
        <motion.div variants={itemVariants} className="col-span-1">
          <Link 
            to="/category/home-living" 
            className="relative h-full min-h-[120px] w-full block group overflow-hidden rounded-3xl sm:rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-white"
          >
            <img src={categories[2].icon} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Home" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent p-5 sm:p-6 flex flex-col justify-end">
              <h3 className="text-base sm:text-lg font-extrabold text-white uppercase tracking-tighter font-display">Living</h3>
            </div>
          </Link>
        </motion.div>

        {/* Groceries */}
        <motion.div variants={itemVariants} className="col-span-1">
          <Link 
            to="/category/groceries" 
            className="relative h-full min-h-[120px] w-full block group overflow-hidden rounded-3xl sm:rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-white"
          >
            <img src={categories[3].icon} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Groceries" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent p-5 sm:p-6 flex flex-col justify-end">
              <h3 className="text-base sm:text-lg font-extrabold text-white uppercase tracking-tighter font-display">Market</h3>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

const FeaturedProducts = () => {
  const products = allProducts.slice(0, 8);
  const { addToCart } = useCart();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"></div>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4"
      >
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-gray-900 font-display tracking-tight uppercase">FEATURED.</h2>
          <p className="text-gray-600 font-medium text-lg">Specially selected units from our premium catalog.</p>
        </div>
        <Link to="/categories" className="text-gray-900 font-black text-xs uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
          View Catalog <ChevronRight className="h-4 w-4" />
        </Link>
      </motion.div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((prod) => (
          <motion.div 
            key={prod.id} 
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group"
          >
            <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 relative h-full">
              {prod.badgeLeft && (
                <div className="absolute top-4 left-4 px-2 py-0.5 bg-red-600 text-white text-[8px] font-black uppercase tracking-widest rounded-md shadow-lg z-10">
                  {prod.badgeLeft}
                </div>
              )}
              {prod.badgeRight && (
                <div className="absolute top-4 right-4 px-2 py-0.5 bg-primary text-white text-[8px] font-black uppercase tracking-widest rounded-md shadow-lg z-10">
                  {prod.badgeRight}
                </div>
              )}
              
              <Link to={`/product/${prod.id}`} className="h-48 bg-slate-50/50 relative overflow-hidden block group-hover:bg-white transition-colors duration-500">
                <img 
                  src={prod.image} 
                  alt={prod.title} 
                  className="w-full h-full object-contain p-6 mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
                />
              </Link>
              
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1.5">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{prod.brand}</span>
                  <div className="flex text-yellow-400">
                    <Star className="h-2.5 w-2.5 fill-current" />
                    <span className="text-[9px] font-black text-slate-900 ml-1">{prod.rating}</span>
                  </div>
                </div>
                
                <Link to={`/product/${prod.id}`} className="font-extrabold text-gray-900 text-base mb-3 line-clamp-2 hover:text-primary transition-colors leading-tight">
                  {prod.title}
                </Link>
                
                <div className="mt-auto flex items-center justify-between gap-3">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Price</span>
                    <span className="font-black text-xl text-slate-900 tracking-tighter">${prod.price}</span>
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
                    className="h-10 w-10 bg-primary hover:bg-primary-hover text-white rounded-xl flex items-center justify-center transition-all shadow-xl shadow-blue-900/10 active:scale-95"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const LocalStores = () => {
  const stores = [
    { id: 'beirut-tech', name: 'Beirut Tech', cat: 'PREMIUM ELECTRONICS', rating: 4.8, bg: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&fit=crop', logo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&q=80' },
    { id: 'cedar-style', name: 'Cedar Style', cat: 'CURATED FASHION', rating: 4.6, bg: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&fit=crop', logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80' },
    { id: 'fresh-market', name: 'Fresh Market', cat: 'ORGANIC MARKET', rating: 4.7, bg: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&fit=crop', logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&q=80' },
  ];

  return (
    <section className="bg-gray-900 py-12 my-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6"
        >
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-primary font-black tracking-[0.3em] uppercase text-[9px]">Support Local</span>
            <h2 className="text-3xl font-black text-white font-display tracking-tight uppercase">FEATURED STORES.</h2>
            <p className="text-gray-400 font-medium text-sm max-w-md">Connecting you with the most reputable independent merchants across Lebanon.</p>
          </div>
          <button className="px-6 py-2.5 border border-white/10 bg-white/5 backdrop-blur-md text-white font-black text-[9px] uppercase tracking-widest rounded-xl hover:bg-white hover:text-gray-900 transition-all shadow-2xl shrink-0">
            View All Merchants
          </button>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stores.map((store, i) => (
            <motion.div 
              key={store.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link to={`/vendor/${store.id}`} className="block relative h-[280px] rounded-[2rem] overflow-hidden bg-gray-800">
                <img 
                  src={store.bg} 
                  alt={store.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75 brightness-[0.4]" 
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="flex items-center gap-1 mb-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <Star className="h-2.5 w-2.5 text-yellow-400 fill-current" />
                    <span className="text-white font-black text-[10px]">{store.rating}</span>
                  </div>
                  <h3 className="text-xl font-black text-white font-display tracking-tight mb-0.5 uppercase transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-[50ms]">
                    {store.name}
                  </h3>
                  <p className="text-primary font-black tracking-[0.2em] text-[8px] mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-[100ms]">
                    {store.cat}
                  </p>
                  
                  <div className="h-px bg-white/10 w-full mb-3"></div>
                  
                  <div className="flex justify-between items-center transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500 delay-[150ms]">
                    <span className="text-white/50 font-black text-[8px] uppercase tracking-widest">ENTER BOUTIQUE</span>
                    <div className="w-8 h-8 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                      <ChevronRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const Banner = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative overflow-hidden">
    <Link to="/product/3" className="block group">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-primary rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-500"
      >
        {/* Abstract Design Elements */}
        <div className="absolute top-0 right-0 w-1/4 h-full bg-white/5 skew-x-12 translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 text-center md:text-left">
          <div className="flex-1">
            <div className="inline-block px-3 py-0.5 bg-white/20 backdrop-blur-md rounded-full text-white text-[8px] font-black tracking-widest uppercase mb-4">
              FLASH PROMO
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white font-display leading-[0.9] tracking-tighter mb-4 uppercase group-hover:translate-x-1 transition-transform">
              FLASH<br/>DEALS.
            </h2>
            <p className="text-blue-100 text-sm font-medium mb-8 leading-relaxed max-w-[300px] mx-auto md:mx-0">
              Unbeatable valuations on premium gear. Ending soon.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <div className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary font-black text-[10px] uppercase tracking-widest rounded-xl shadow-xl shadow-blue-900/10 group-hover:scale-105 transition-all text-center">
                Claim Access
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-primary-hover/30 backdrop-blur-md border border-white/10 rounded-xl">
                <div className="text-white font-mono text-2xl font-black flex gap-1">
                  <span className="w-10 text-center">02</span>
                  <span className="opacity-50 animate-pulse">:</span>
                  <span className="w-10 text-center">15</span>
                </div>
                <span className="text-blue-200 text-[10px] font-black uppercase tracking-widest leading-none">HRS<br/>LEFT</span>
              </div>
            </div>
          </div>
          
          <div className="relative w-32 sm:w-48 md:w-64 shrink-0">
            <div className="relative aspect-square">
              <motion.img 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&fit=crop" 
                className="w-full h-full object-cover rounded-2xl shadow-2xl skew-y-2 group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute -bottom-4 -left-4 p-4 bg-white rounded-2xl shadow-2xl flex items-center gap-3 border border-blue-50">
                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <Truck className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-slate-900 font-black text-sm leading-none uppercase">Free Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  </section>
);

const WhyShop = () => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-gray-100">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex gap-8 group"
      >
        <div className="h-16 w-16 bg-blue-50 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-500">
          <Truck className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
        </div>
        <div>
          <h3 className="font-black text-gray-900 text-xl font-display tracking-tight mb-2 uppercase">RAPID DELIVERY.</h3>
          <p className="text-gray-600 font-medium leading-relaxed">Swift and secure logistics across the entire Lebanese territory.</p>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="flex gap-8 group"
      >
        <div className="h-16 w-16 bg-blue-50 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-500">
          <ShieldCheck className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
        </div>
        <div>
          <h3 className="font-black text-gray-900 text-xl font-display tracking-tight mb-2 uppercase">SECURE ESCROW.</h3>
          <p className="text-gray-600 font-medium leading-relaxed">Advanced encryption protocols safeguarding your every transaction.</p>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex gap-8 group"
      >
        <div className="h-16 w-16 bg-blue-50 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-500">
          <MapPin className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
        </div>
        <div>
          <h3 className="font-black text-gray-900 text-xl font-display tracking-tight mb-2 uppercase">LOCAL NETWORK.</h3>
          <p className="text-gray-600 font-medium leading-relaxed">Direct connection to premium independent Lebanese merchants.</p>
        </div>
      </motion.div>
    </div>
  </section>
);

export const Home = () => {
  const { sections } = useCms();

  const sectionMap: Record<string, React.ReactNode> = {
    'Hero': <Hero key="Hero" />,
    'Categories': <Categories key="Categories" />,
    'FeaturedProducts': <FeaturedProducts key="FeaturedProducts" />,
    'LocalStores': <LocalStores key="LocalStores" />,
    'Banner': <Banner key="Banner" />,
    'WhyShop': <WhyShop key="WhyShop" />
  };

  return (
    <main>
      {sections.filter(s => s.active).map(s => sectionMap[s.id])}
    </main>
  );
};
