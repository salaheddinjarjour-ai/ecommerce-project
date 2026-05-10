import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, Save, Plus, Trash2, Box, 
  DollarSign, Image as ImageIcon, Tag, Activity, List
} from 'lucide-react';
import { allProducts } from '../../data/products';

export const AdminProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  
  const existingProduct = !isNew ? allProducts.find(p => p.id.toString() === id) : null;
  const [activeTab, setActiveTab] = useState('basic');
  
  // High-level complex state to handle dynamic attributes based on category
  const [category, setCategory] = useState(existingProduct?.categoryId || 'electronics');
  const [attributes, setAttributes] = useState(existingProduct?.specs || {});
  const [sizes, setSizes] = useState<string[]>(existingProduct?.sizes || []);
  const [colors, setColors] = useState<string[]>(existingProduct?.colors || []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally you'd submit to an API here
    alert('Product details saved successfully!');
    navigate('/admin/products');
  };

  const handleAddSpec = () => {
    setAttributes({ ...attributes, 'New Spec': 'Value' });
  };

  return (
    <form onSubmit={handleSave} className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link to="/admin/products" className="p-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">
              {isNew ? 'Create New Product' : `Edit Product: ${existingProduct?.title}`}
            </h1>
            <p className="text-slate-500 text-sm mt-1">Make sure to save your changes when finished.</p>
          </div>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            type="button" 
            onClick={() => navigate('/admin/products')}
            className="flex-1 sm:flex-none px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="flex-1 sm:flex-none px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" /> Save
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sub-Navigation Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <nav className="flex lg:flex-col gap-2 overflow-x-auto hide-scrollbar border-b lg:border-b-0 border-slate-200 pb-2 lg:pb-0">
            {[
              { id: 'basic', label: 'Basic Info', icon: Box },
              { id: 'inventory', label: 'Inventory & Pricing', icon: DollarSign },
              { id: 'attributes', label: 'Dynamic Attributes', icon: List },
              { id: 'media', label: 'Product Media', icon: ImageIcon },
              { id: 'analytics', label: 'Performance', icon: Activity },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* Tab 1: Basic Info */}
          {activeTab === 'basic' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Product Title</label>
                <input 
                  type="text" 
                  defaultValue={existingProduct?.title}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                  placeholder="e.g. Sony Wireless Headphones"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Brand</label>
                  <input 
                    type="text" 
                    defaultValue={existingProduct?.brand}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors appearance-none"
                  >
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home-living">Home & Living</option>
                    <option value="groceries">Groceries</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea 
                  rows={6}
                  defaultValue={existingProduct?.description}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors resize-y"
                  placeholder="Detailed product description..."
                />
              </div>
            </div>
          )}

          {/* Tab 2: Inventory & Pricing (Smart System) */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              {/* Pricing Rules */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Smart Pricing System</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Base Price ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      defaultValue={existingProduct?.price}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Compare at Price ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      defaultValue={existingProduct?.oldPrice || ''}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      placeholder="Show a strike-through price"
                    />
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-blue-900 flex items-center gap-2">
                      <Tag className="w-4 h-4" /> Scheduled Discount
                    </h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 opacity-50 pointer-events-none">
                    <input type="date" className="p-2 border border-slate-200 rounded text-sm bg-white" />
                    <input type="date" className="p-2 border border-slate-200 rounded text-sm bg-white" />
                  </div>
                </div>
              </div>

              {/* Inventory Management */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Inventory Management</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border border-slate-200 p-4 rounded-lg bg-slate-50">
                    <div>
                      <p className="font-medium text-slate-900">Track Quantity</p>
                      <p className="text-xs text-slate-500 mt-0.5">Automated stock monitoring</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Available Stock</label>
                      <input 
                        type="number" 
                        defaultValue={45} // mock
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Low Stock Threshold</label>
                      <input 
                        type="number" 
                        defaultValue={10} // mock
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Dynamic Attributes */}
          {activeTab === 'attributes' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="mb-6">
                <p className="text-sm text-slate-500">
                  Manage attributes depending on the selected category (<strong className="capitalize">{category.replace('-', ' ')}</strong>).
                </p>
              </div>

              {category === 'fashion' ? (
                <div className="space-y-8">
                  {/* Fashion: Sizes and Colors */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="block text-sm font-bold text-slate-900">Available Sizes</label>
                      <button type="button" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                        <Plus className="w-3 h-3" /> Add Size
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                       {['XS', 'S', 'M', 'L', 'XL'].map(sz => (
                         <div key={sz} className={`px-4 py-2 border rounded-md text-sm font-medium cursor-pointer ${sizes.includes(sz) ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600'}`}>
                           {sz}
                         </div>
                       ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="block text-sm font-bold text-slate-900">Available Colors</label>
                      <button type="button" className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                        <Plus className="w-3 h-3" /> Add Color
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(colors.length > 0 ? colors : ['Black', 'White', 'Blue']).map(col => (
                        <div key={col} className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-full text-sm font-medium flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: col.toLowerCase() }}></div>
                          {col}
                          <button type="button" className="text-slate-400 hover:text-rose-500 ml-1"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Electronics / Other: Specs List */}
                  <div className="flex justify-between items-end mb-4">
                    <label className="block text-sm font-bold text-slate-900">Technical Specifications</label>
                    <button type="button" onClick={handleAddSpec} className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Add Row
                    </button>
                  </div>
                  
                  {Object.entries(attributes).map(([key, value], idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <input 
                        type="text" 
                        defaultValue={key}
                        className="w-1/3 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium"
                      />
                      <input 
                        type="text" 
                        defaultValue={value as string}
                        className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                      />
                      <button type="button" className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  {Object.keys(attributes).length === 0 && (
                    <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-lg text-slate-500 text-sm">
                      No technical specifications added yet.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Media */}
          {activeTab === 'media' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-4">Product Images</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {existingProduct?.images?.map((img, i) => (
                    <div key={i} className="aspect-square rounded-lg border border-slate-200 overflow-hidden relative group">
                      <img src={img} className="w-full h-full object-cover" alt="Product" />
                      <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button type="button" className="p-2 bg-white rounded text-slate-900 hover:text-rose-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      {i === 0 && <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">Main</span>}
                    </div>
                  ))}
                  
                  <div className="aspect-square rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center text-slate-500 cursor-pointer">
                    <ImageIcon className="w-8 h-8 mb-2 text-slate-400" />
                    <span className="text-sm font-medium">Add Image</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Analytics */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {isNew ? (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center text-slate-500">
                  <Activity className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 mb-1">No Data Available</h3>
                  <p>Save this product and wait for shopper interactions to see performance metrics here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                     <p className="text-slate-500 text-sm font-medium mb-1">Total Views</p>
                     <h3 className="text-3xl font-bold text-slate-900">4,291</h3>
                     <p className="text-emerald-600 text-sm font-medium mt-2">↑ 12% this week</p>
                   </div>
                   <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                     <p className="text-slate-500 text-sm font-medium mb-1">Add to Carts</p>
                     <h3 className="text-3xl font-bold text-slate-900">384</h3>
                     <p className="text-emerald-600 text-sm font-medium mt-2">↑ 5% this week</p>
                   </div>
                   <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm border-b-4 border-b-blue-600">
                     <p className="text-slate-500 text-sm font-medium mb-1">Conversion Rate</p>
                     <h3 className="text-3xl font-bold text-slate-900">8.95%</h3>
                     <p className="text-slate-400 text-sm font-medium mt-2">Average performer</p>
                   </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </form>
  );
};
