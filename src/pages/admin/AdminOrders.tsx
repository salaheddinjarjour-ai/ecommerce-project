import React from 'react';
import { PackageOpen, Clock, Truck, CheckCircle, Search, Filter, MoreHorizontal } from 'lucide-react';

export const AdminOrders = () => {
  const orders = [
    { id: '#TRD-8429', date: 'Oct 24, 2024', customer: 'Alain Khoury', amount: 245.00, status: 'Processing', items: 3 },
    { id: '#TRD-8428', date: 'Oct 23, 2024', customer: 'Sarah Michel', amount: 12.99, status: 'Completed', items: 1 },
    { id: '#TRD-8427', date: 'Oct 23, 2024', customer: 'Jean Paul', amount: 890.50, status: 'Shipped', items: 2 },
    { id: '#TRD-8426', date: 'Oct 22, 2024', customer: 'Dana Rami', amount: 45.00, status: 'Pending', items: 1 }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">Orders Management</h1>
          <p className="text-slate-500 text-sm mt-1">Track, process, and manage customer orders.</p>
        </div>
        <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
          Export CSV
        </button>
      </div>

      {/* Status Pipeline */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Pending', count: 12, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Processing', count: 8, icon: PackageOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Shipped', count: 45, icon: Truck, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Completed', count: 1842, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' }
        ].map(stat => (
          <div key={stat.label} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className={`w-10 h-10 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.count}</p>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search by Order ID or Customer..." className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 w-full sm:w-auto justify-center">
          <Filter className="w-4 h-4" /> Filter Status
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-medium">Order ID</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Items</th>
              <th className="px-6 py-4 font-medium">Total</th>
              <th className="px-6 py-4 font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-slate-50 group cursor-pointer">
                <td className="px-6 py-4 font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{o.id}</td>
                <td className="px-6 py-4 text-slate-500">{o.date}</td>
                <td className="px-6 py-4 font-medium">{o.customer}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    o.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                    o.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                    o.status === 'Shipped' ? 'bg-purple-100 text-purple-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {o.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500">{o.items} items</td>
                <td className="px-6 py-4 font-bold text-slate-900">${o.amount.toFixed(2)}</td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg"><MoreHorizontal className="w-5 h-5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
