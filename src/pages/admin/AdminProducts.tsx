import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Tag, AlertCircle, TrendingUp } from 'lucide-react';
import { allProducts } from '../../data/products';

export const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  // Mock stock data since original data doesn't have it
  const productsWithStock = allProducts.map((p, i) => ({
    ...p,
    stock: i % 5 === 0 ? (i % 3 === 0 ? 0 : 5) : 45 + i * 2, // some out of stock, some low stock
    status: (i % 5 === 0 && i % 3 === 0) ? 'Out of Stock' : 'Active',
    views: Math.floor(Math.random() * 5000) + 100,
  }));

  const filteredProducts = productsWithStock.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">Products</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your catalog, inventory, and pricing.</p>
        </div>
        <Link 
          to="/admin/products/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {/* Analytics Mini-bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600"><Tag className="w-5 h-5" /></div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Total Products</p>
            <p className="text-xl font-bold text-slate-900">{productsWithStock.length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-rose-50 rounded-lg text-rose-600"><AlertCircle className="w-5 h-5" /></div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Low Stock</p>
            <p className="text-xl font-bold text-slate-900">{productsWithStock.filter(p => p.stock > 0 && p.stock <= 10).length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-slate-100 rounded-lg text-slate-600"><Trash2 className="w-5 h-5" /></div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Out of Stock</p>
            <p className="text-xl font-bold text-slate-900">{productsWithStock.filter(p => p.stock === 0).length}</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600"><TrendingUp className="w-5 h-5" /></div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Top Performer</p>
            <p className="text-sm font-bold text-slate-900 truncate w-32">{productsWithStock.reduce((max, p) => p.views > max.views ? p : max, productsWithStock[0]).title}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search products by name or brand..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-colors"
          />
        </div>
        <div className="flex w-full sm:w-auto gap-4">
          <div className="relative flex-1 sm:flex-none sm:w-48">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-9 pr-8 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 appearance-none"
            >
              <option value="All">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home-living">Home & Living</option>
              <option value="groceries">Groceries</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Inventory</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg border border-slate-200 bg-white overflow-hidden flex-shrink-0 p-1">
                        <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <Link to={`/admin/products/${product.id}`} className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {product.title}
                        </Link>
                        <div className="text-slate-500 mt-0.5">{product.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`inline-flex w-fit items-center px-2 py-0.5 rounded text-xs font-medium ${
                        product.stock === 0 ? 'bg-rose-100 text-rose-700' : 
                        product.stock <= 10 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {product.stock === 0 ? 'Out of Stock' : `${product.stock} in stock`}
                      </span>
                      {product.stock <= 10 && product.stock > 0 && <span className="text-[10px] text-amber-600 font-bold ml-1">Low Stock Alert</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">${product.price.toFixed(2)}</div>
                    {product.oldPrice && <div className="text-xs text-slate-400 line-through">${product.oldPrice.toFixed(2)}</div>}
                  </td>
                  <td className="px-6 py-4 text-slate-600 capitalize">
                    {product.categoryId.replace('-', ' ')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => navigate(`/admin/products/${product.id}`)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination mock */}
        <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between text-sm text-slate-500">
          <div>Showing 1 to {Math.min(10, filteredProducts.length)} of {filteredProducts.length} results</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded text-slate-400 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1 border border-slate-200 rounded text-slate-700 hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
