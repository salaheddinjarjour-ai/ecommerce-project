import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { LogOut, Package, Heart, Settings, User, ShoppingCart, Trash2, Minus, Plus } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../contexts/CartContext';
import { allProducts } from '../data/products';

export const Account = () => {
  const { user, logout } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();
  const { cart, cartCount, cartTotal, updateQuantity, removeFromCart } = useCart();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const wishlistedItems = allProducts.filter(p => wishlist.includes(Number(p.id)));

  const mockOrders = [
    { id: 'ORD-9842', date: '2023-10-15', total: 129.99, status: 'Delivered', items: 3 },
    { id: 'ORD-7591', date: '2023-09-02', total: 49.00, status: 'Shipped', items: 1 },
    { id: 'ORD-6332', date: '2023-08-20', total: 215.50, status: 'Delivered', items: 2 },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-[calc(100vh-16rem)]">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-xl uppercase">
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <h2 className="font-bold text-gray-900 truncate">{user.name}</h2>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors ${activeTab === 'overview' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <User className="w-5 h-5" /> Account Overview
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors ${activeTab === 'orders' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <Package className="w-5 h-5" /> My Orders
              </button>
              <button 
                onClick={() => setActiveTab('cart')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors ${activeTab === 'cart' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <ShoppingCart className="w-5 h-5" /> My Cart ({cartCount})
              </button>
              <button 
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors ${activeTab === 'wishlist' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <Heart className="w-5 h-5" /> Wishlist ({wishlist.length})
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors ${activeTab === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
              >
                <Settings className="w-5 h-5" /> Settings
              </button>
              <button 
                onClick={logout}
                className="w-full mt-4 flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 font-medium transition-colors"
              >
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              <div>
                <h1 className="text-3xl font-display font-bold text-gray-900 mb-6">Account Overview</h1>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
                      <Package className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{mockOrders.length}</div>
                    <div className="text-sm text-gray-500 font-medium">Total Orders</div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-3">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{wishlist.length}</div>
                    <div className="text-sm text-gray-500 font-medium">Wishlisted Items</div>
                  </div>
                  <div 
                    onClick={() => setActiveTab('cart')}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow group"
                  >
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{cartCount}</div>
                    <div className="text-sm text-gray-500 font-medium">Items in Cart</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900 font-display">Recent Orders</h2>
                  <button onClick={() => setActiveTab('orders')} className="text-sm text-blue-600 font-medium hover:underline focus:outline-none">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockOrders.slice(0, 2).map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">${order.total.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* Cart Tab */}
          {activeTab === 'cart' && (
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-6">My Cart</h1>
              {cart.length > 0 ? (
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Cart Items List */}
                  <div className="flex-1 space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 flex flex-col sm:flex-row gap-4 md:gap-6 items-start sm:items-center">
                        <Link to={`/product/${item.productId}`} className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 block">
                          <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply p-2 hover:scale-105 transition-transform" />
                        </Link>
                        <div className="flex-1 w-full">
                          <div className="flex justify-between items-start">
                            <Link to={`/product/${item.productId}`} className="font-bold text-gray-900 text-lg hover:text-blue-600 transition-colors line-clamp-2 pr-4">
                              {item.title}
                            </Link>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors p-2 -mr-2 -mt-2"
                              title="Remove"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          <div className="text-sm text-gray-500 mt-2 space-x-3 flex flex-wrap">
                            {item.selectedColor && <span>Color: <span className="font-medium text-gray-900">{item.selectedColor}</span></span>}
                            {item.selectedSize && <span>Size: <span className="font-medium text-gray-900">{item.selectedSize}</span></span>}
                          </div>
                          <div className="mt-4 flex items-end justify-between w-full">
                            <div className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</div>
                            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <div className="w-10 text-center font-bold text-gray-900">{item.quantity}</div>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Order Summary */}
                  <div className="w-full lg:w-80 flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
                      <h2 className="text-lg font-bold text-gray-900 mb-6 font-display">Order Summary</h2>
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-gray-600">
                          <span>Subtotal ({cartCount} items)</span>
                          <span className="font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Shipping</span>
                          <span className="font-medium text-green-600">Free</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t border-gray-100 font-display italic tracking-tight">
                          <span>Total</span>
                          <span>${cartTotal.toFixed(2)}</span>
                        </div>
                      </div>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors">
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet.</p>
                  <Link to="/" className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-6">My Orders</h1>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Order</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600 hover:text-blue-800 cursor-pointer">{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items} items</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-bold">${order.total.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-6">My Wishlist</h1>
              {wishlistedItems.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {wishlistedItems.map(item => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-md transition-shadow relative">
                      <button 
                        onClick={() => toggleWishlist(item.id)}
                        className="absolute top-2 right-2 p-1.5 bg-white text-red-500 rounded-full shadow-sm z-10 hover:bg-red-50 transition-colors"
                        title="Remove from wishlist"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                      <Link to={`/product/${item.id}`} className="aspect-square bg-gray-50 p-4 relative block">
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                      </Link>
                      <div className="p-4 flex-1 flex flex-col">
                        <Link to={`/product/${item.id}`} className="text-sm font-bold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">{item.title}</Link>
                        <div className="mt-auto pt-2 flex items-center justify-between">
                          <p className="text-sm text-gray-900 font-bold">${item.price}</p>
                          <Link to={`/product/${item.id}`} className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-md font-medium hover:bg-gray-800 transition-colors">
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto">Explore our products and tap the heart icon to save items you love.</p>
                  <Link to="/" className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h1 className="text-3xl font-display font-bold text-gray-900 mb-6">Account Settings</h1>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 font-display">Profile Information</h3>
                  <form className="max-w-md space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue={user.name} 
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow text-gray-900 bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue={user.email} 
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow text-gray-900 bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500">Contact support to update your profile details or change your password.</p>
                      <button type="button" className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        Contact Support
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </main>
  );
};
