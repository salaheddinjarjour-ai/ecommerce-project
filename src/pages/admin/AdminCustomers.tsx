import React, { useState } from 'react';
import { Search, Filter, Mail, MoreHorizontal, TrendingUp, Users as UsersIcon, Star, Clock } from 'lucide-react';

export const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [segment, setSegment] = useState('All');

  const customers = [
    { id: 'CUST-001', name: 'Alain Khoury', email: 'alain.k@example.com', orders: 12, spent: 1450.00, status: 'Active', segment: 'High Spender', lastActive: '2 hours ago' },
    { id: 'CUST-002', name: 'Sarah Michel', email: 'sarah.m@example.com', orders: 3, spent: 125.99, status: 'Active', segment: 'Frequent Buyer', lastActive: '1 day ago' },
    { id: 'CUST-003', name: 'Jean Paul', email: 'jean.p@example.com', orders: 1, spent: 890.50, status: 'Active', segment: 'New', lastActive: '3 days ago' },
    { id: 'CUST-004', name: 'Dana Rami', email: 'dana.r@example.com', orders: 0, spent: 0, status: 'Inactive', segment: 'Inactive', lastActive: '2 months ago' },
    { id: 'CUST-005', name: 'Karim Fares', email: 'karim.f@example.com', orders: 24, spent: 3200.00, status: 'Active', segment: 'VIP', lastActive: 'Just now' },
  ];

  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegment = segment === 'All' || c.segment === segment;
    return matchesSearch && matchesSegment;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">Customers Directory</h1>
          <p className="text-slate-500 text-sm mt-1">Manage users, view order histories, and segment audiences.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
          <Mail className="w-4 h-4" /> Send Campaign
        </button>
      </div>

      {/* Segments Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600"><UsersIcon className="w-5 h-5" /></div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Users</p>
            <p className="text-xl font-bold text-slate-900">4,291</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600"><Star className="w-5 h-5" /></div>
          <div>
             <p className="text-sm font-medium text-slate-500">VIP & High Spenders</p>
             <p className="text-xl font-bold text-slate-900">184</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 rounded-lg text-purple-600"><TrendingUp className="w-5 h-5" /></div>
          <div>
             <p className="text-sm font-medium text-slate-500">Frequent Buyers</p>
             <p className="text-xl font-bold text-slate-900">892</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-slate-100 rounded-lg text-slate-600"><Clock className="w-5 h-5" /></div>
          <div>
             <p className="text-sm font-medium text-slate-500">Inactive (&gt; 30 days)</p>
             <p className="text-xl font-bold text-slate-900">1,204</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex w-full sm:w-auto gap-4">
          <div className="relative flex-1 sm:flex-none sm:w-48">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select 
              value={segment}
              onChange={(e) => setSegment(e.target.value)}
              className="w-full pl-9 pr-8 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="All">All Segments</option>
              <option value="VIP">VIP</option>
              <option value="High Spender">High Spenders</option>
              <option value="Frequent Buyer">Frequent Buyers</option>
              <option value="New">New</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Status / Segment</th>
                <th className="px-6 py-4 font-medium">Orders</th>
                <th className="px-6 py-4 font-medium">Total Spent</th>
                <th className="px-6 py-4 font-medium">Last Active</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer">{c.name}</div>
                        <div className="text-slate-500 text-xs">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 items-start">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                        c.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {c.status}
                      </span>
                      <span className={`text-[10px] uppercase tracking-wider font-bold ${
                        c.segment === 'VIP' ? 'text-purple-600' : 
                        c.segment === 'High Spender' ? 'text-blue-600' : 'text-slate-500'
                      }`}>
                        {c.segment}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">{c.orders}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">${c.spent.toFixed(2)}</td>
                  <td className="px-6 py-4 text-slate-500">{c.lastActive}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-blue-600 rounded-lg transition-colors" title="Options">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No customers found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between text-sm text-slate-500">
          <div>Showing 1 to {filteredCustomers.length} of {filteredCustomers.length} results</div>
        </div>
      </div>
    </div>
  );
};
