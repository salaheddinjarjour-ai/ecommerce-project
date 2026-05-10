import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Package, ShoppingCart, DollarSign, Activity, TrendingUp, Users, AlertTriangle, Search } from 'lucide-react';

const data = [
  { name: 'Mon', revenue: 4000, expenses: 2400 },
  { name: 'Tue', revenue: 3000, expenses: 1398 },
  { name: 'Wed', revenue: 2000, expenses: 9800 },
  { name: 'Thu', revenue: 2780, expenses: 3908 },
  { name: 'Fri', revenue: 1890, expenses: 4800 },
  { name: 'Sat', revenue: 2390, expenses: 3800 },
  { name: 'Sun', revenue: 3490, expenses: 4300 },
];

export const AdminOverview = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">Executive Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Here's what's happening with your store today.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-white border border-slate-200 text-slate-700 py-1.5 pl-3 pr-8 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium">Total Revenue</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">$24,592.00</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="flex items-center text-emerald-600 font-medium">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              12.5%
            </span>
            <span className="text-slate-400 ml-2">vs last week</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium">Orders Today</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">142</h3>
            </div>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="flex items-center text-emerald-600 font-medium">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              8.1%
            </span>
            <span className="text-slate-400 ml-2">vs last week</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium">Conversion Rate</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">3.24%</h3>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg">
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="flex items-center text-rose-600 font-medium">
              <ArrowDownRight className="w-4 h-4 mr-1" />
              1.2%
            </span>
            <span className="text-slate-400 ml-2">vs last week</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-500 text-sm font-medium">Active Visitors</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">842</h3>
            </div>
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <div className="flex items-center justify-center w-2 h-2 mr-2">
              <div className="absolute w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
              <div className="relative w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
            </div>
            <span className="text-slate-500">Live right now</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900">Revenue & Expenses</h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">View details</button>
          </div>
          <div className="h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontSize: '14px', fontWeight: 500 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl border border-slate-700 shadow-md text-white flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-lg font-display">Trendit AI Insights</h3>
          </div>
          
          <div className="space-y-4 flex-1">
            <div className="bg-white/10 p-4 rounded-lg border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:bg-white/15 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
              <h4 className="font-medium text-sm flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Sales Alert
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed text-balance">
                Sales dropped 12% today due to low stock in Electronics (specifically smartphones).
              </p>
              <button className="text-xs text-blue-300 font-medium mt-2 hover:underline">Restock now →</button>
            </div>

            <div className="bg-white/10 p-4 rounded-lg border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:bg-white/15 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
              <h4 className="font-medium text-sm flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Trending Product
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                "Ultra Wireless Headphones" visits are up 300%. Consider boosting this product to Homepage.
              </p>
              <button className="text-xs text-blue-300 font-medium mt-2 hover:underline">Apply Boost →</button>
            </div>
            
            <div className="bg-white/10 p-4 rounded-lg border border-white/5 backdrop-blur-sm relative overflow-hidden group hover:bg-white/15 transition-colors">
              <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
              <h4 className="font-medium text-sm flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-purple-400" />
                Customer Segments
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                We detected 45 abandoned carts in the last hour. Auto-recovery email sequence initialized.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-slate-900">Recent Orders (Pending)</h3>
            <button className="text-sm text-blue-600 font-medium hover:underline">View all</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-6 py-3 font-medium">Order ID</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: '#TRD-8429', name: 'Alain Kh.', amount: '$245.00', status: 'Processing' },
                  { id: '#TRD-8428', name: 'Sarah M.', amount: '$12.99', status: 'Pending' },
                  { id: '#TRD-8427', name: 'Jean P.', amount: '$890.50', status: 'Processing' },
                  { id: '#TRD-8426', name: 'Dana R.', amount: '$45.00', status: 'Pending' },
                  { id: '#TRD-8425', name: 'Ahmad S.', amount: '$1,299.00', status: 'Processing' },
                ].map((order) => (
                  <tr key={order.id} className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{order.id}</td>
                    <td className="px-6 py-4 text-slate-600">{order.name}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{order.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        order.status === 'Processing' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
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

        {/* Live Activity Feed */}
        <div className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              Live Activity Feed
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            </h3>
          </div>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            {[
              { time: 'Just now', user: 'Guest User', action: 'added', item: 'Sony Headphones', icon: ShoppingCart, color: 'text-blue-500', bg: 'bg-blue-100' },
              { time: '2 mins ago', user: 'Karim F.', action: 'purchased', item: 'Nike Air Max', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-100' },
              { time: '12 mins ago', user: 'Maya K.', action: 'searched for', item: '"iPhone 15 Pro Max"', icon: Search, color: 'text-purple-500', bg: 'bg-purple-100' },
              { time: '18 mins ago', user: 'System', action: 'low stock alert', item: 'Logitech Mouse', icon: Package, color: 'text-amber-500', bg: 'bg-amber-100' },
            ].map((log, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-4 border-white ${log.bg} ${log.color} shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10`}>
                  <log.icon className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-3 rounded-lg border border-slate-100 shadow-sm transition-shadow hover:shadow-md">
                  <div className="flex justify-between items-start mb-1 text-xs">
                    <span className="font-bold text-slate-900">{log.user}</span>
                    <span className="text-slate-400 font-medium">{log.time}</span>
                  </div>
                  <div className="text-sm text-slate-600">
                    {log.action} <span className="font-medium text-slate-900">{log.item}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
