import React, { useState } from 'react';
import { ShieldCheck, Search, Filter, Ban, CheckCircle2, TrendingUp, Store } from 'lucide-react';

export const AdminVendors = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const vendors = [
    { id: 'V-101', name: 'Beirut Tech Hub', owner: 'Amir S.', status: 'Active', commission: '8%', sales: 14200, products: 124 },
    { id: 'V-102', name: 'Urban Threads', owner: 'Lina M.', status: 'Active', commission: '12%', sales: 8400, products: 56 },
    { id: 'V-103', name: 'ElectroZone', owner: 'Hassan K.', status: 'Pending Approval', commission: '--', sales: 0, products: 0 },
    { id: 'V-104', name: 'Home Essentials', owner: 'Sara A.', status: 'Suspended', commission: '10%', sales: 3200, products: 44 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">Vendors & Sellers</h1>
          <p className="text-slate-500 text-sm mt-1">Manage the marketplace sellers, commissions, and approvals.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600 h-fit"><Store className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Vendors</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">42</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex gap-4">
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600 h-fit"><TrendingUp className="w-6 h-6" /></div>
          <div>
             <p className="text-sm font-medium text-slate-500">Platform Commission</p>
             <p className="text-2xl font-bold text-slate-900 mt-1">$12,450.00</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex gap-4">
          <div className="p-3 bg-amber-50 rounded-lg text-amber-600 h-fit"><ShieldCheck className="w-6 h-6" /></div>
          <div>
             <p className="text-sm font-medium text-slate-500">Awaiting Approval</p>
             <p className="text-2xl font-bold text-slate-900 mt-1">1</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4 justify-between items-center">
        <div className="relative w-96">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search vendors..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-medium">Store Info</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Products</th>
              <th className="px-6 py-4 font-medium">Total Sales</th>
              <th className="px-6 py-4 font-medium">Commission %</th>
              <th className="px-6 py-4 font-medium text-right">Admin Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {vendors.map((v) => (
              <tr key={v.id} className="hover:bg-slate-50">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900">{v.name}</div>
                  <div className="text-slate-500 text-xs">Owner: {v.owner} • {v.id}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    v.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                    v.status === 'Suspended' ? 'bg-rose-100 text-rose-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {v.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium">{v.products}</td>
                <td className="px-6 py-4 font-medium">${v.sales.toLocaleString()}</td>
                <td className="px-6 py-4 font-medium">{v.commission}</td>
                <td className="px-6 py-4 text-right">
                  {v.status === 'Pending Approval' ? (
                    <button className="text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-100">Approve Store</button>
                  ) : v.status === 'Active' ? (
                    <button className="text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-rose-100">Suspend</button>
                  ) : (
                    <button className="text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-100">Restore</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
