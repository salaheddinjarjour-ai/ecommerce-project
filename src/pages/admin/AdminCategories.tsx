import React, { useState } from 'react';
import { Layers, Plus, Edit2, Trash2, ChevronRight, ChevronDown, Folder, FolderOpen, GripVertical, Search } from 'lucide-react';

export const AdminCategories = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ 'cat-1': true, 'cat-2': false });

  const toggle = (id: string) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const categories = [
    { id: 'cat-1', name: 'Electronics', count: 124, children: [
      { id: 'cat-1-1', name: 'Laptops & Computers', count: 42 },
      { id: 'cat-1-2', name: 'Audio & Headphones', count: 56 },
      { id: 'cat-1-3', name: 'Wearables', count: 26 },
    ]},
    { id: 'cat-2', name: 'Apparel & Fashion', count: 86, children: [] },
    { id: 'cat-3', name: 'Home & Garden', count: 64, children: [
      { id: 'cat-3-1', name: 'Kitchen Appliances', count: 22 },
    ]},
    { id: 'cat-4', name: 'Sports & Outdoors', count: 32, children: [] },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">Category Architecture</h1>
          <p className="text-slate-500 text-sm mt-1">Manage hierarchical product taxonomies and routing trees.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Root Category
        </button>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
         <div className="relative mb-6">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search categories..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
         </div>
         <div className="space-y-2">
            {categories.map(cat => (
               <div key={cat.id} className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition-colors">
                     <div className="flex items-center gap-3">
                        <GripVertical className="w-4 h-4 text-slate-400 cursor-move" />
                        <button onClick={() => toggle(cat.id)} className="p-1 hover:bg-slate-200 rounded text-slate-500">
                           {cat.children.length > 0 ? (expanded[cat.id] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />) : <span className="w-4 h-4 block" />}
                        </button>
                        {expanded[cat.id] && cat.children.length > 0 ? <FolderOpen className="w-5 h-5 text-blue-500" /> : <Folder className="w-5 h-5 text-blue-500" />}
                        <span className="font-bold text-slate-900">{cat.name}</span>
                        <span className="bg-slate-200 text-slate-600 text-xs py-0.5 px-2 rounded-full font-medium">{cat.count} items</span>
                     </div>
                     <div className="flex gap-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-100 rounded" title="Add Subcategory"><Plus className="w-4 h-4" /></button>
                        <button className="p-1.5 text-slate-600 hover:bg-slate-200 rounded" title="Edit"><Edit2 className="w-4 h-4" /></button>
                        <button className="p-1.5 text-rose-600 hover:bg-rose-100 rounded" title="Delete"><Trash2 className="w-4 h-4" /></button>
                     </div>
                  </div>
                  {expanded[cat.id] && cat.children.length > 0 && (
                    <div className="border-t border-slate-200 bg-white">
                       {cat.children.map(sub => (
                         <div key={sub.id} className="flex items-center justify-between p-3 pl-14 hover:bg-slate-50 border-b border-slate-100 last:border-0 transition-colors">
                            <div className="flex items-center gap-3">
                               <GripVertical className="w-4 h-4 text-slate-300 cursor-move" />
                               <Folder className="w-4 h-4 text-slate-400" />
                               <span className="font-medium text-slate-700">{sub.name}</span>
                               <span className="text-slate-500 text-xs">{sub.count} items</span>
                            </div>
                            <div className="flex gap-2">
                               <button className="p-1.5 text-slate-500 hover:bg-slate-200 rounded" title="Edit"><Edit2 className="w-4 h-4" /></button>
                               <button className="p-1.5 text-rose-500 hover:bg-rose-100 rounded" title="Delete"><Trash2 className="w-4 h-4" /></button>
                            </div>
                         </div>
                       ))}
                    </div>
                  )}
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};
