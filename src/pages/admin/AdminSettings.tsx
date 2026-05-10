import React, { useState } from 'react';
import { Shield, CreditCard, Key, Store } from 'lucide-react';

export const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General Info', icon: Store },
    { id: 'payments', label: 'Payment Providers', icon: CreditCard },
    { id: 'security', label: 'Security & Roles', icon: Shield },
    { id: 'api', label: 'API Keys', icon: Key },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">System Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Configure global variables, roles, API keys, and platform behavior.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors">
           Save Changes
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-56 flex-shrink-0">
          <nav className="flex md:flex-col gap-1 overflow-x-auto border-b md:border-b-0 border-slate-200 pb-2 md:pb-0">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 min-w-0">
          {activeTab === 'general' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Store Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Store Name</label>
                  <input type="text" defaultValue="Trendit Marketplace" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Support Email</label>
                  <input type="email" defaultValue="support@trendit.com" className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50" />
                </div>
                <div className="md:col-span-2">
                   <label className="block text-sm font-medium text-slate-700 mb-2">Platform Description</label>
                   <textarea rows={3} defaultValue="The premier multi-vendor marketplace for the modern creator economy." className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"></textarea>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                 <h2 className="text-lg font-bold text-slate-900">Payment Gateways</h2>
                 <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded border border-emerald-200">Live Mode</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded flex items-center justify-center text-blue-600 font-bold font-display text-xl">S</div>
                    <div>
                      <h3 className="font-bold text-slate-900">Stripe Connect</h3>
                      <p className="text-sm text-slate-500">Credit cards, Apple Pay, Google Pay</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded hover:bg-slate-200 transition-colors">Manage</button>
                </div>
                <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-900 text-white rounded flex items-center justify-center font-bold font-display text-xl">P</div>
                    <div>
                      <h3 className="font-bold text-slate-900">PayPal Express</h3>
                      <p className="text-sm text-slate-500">PayPal wallet integrations</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded hover:bg-slate-200 transition-colors">Manage</button>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'security' || activeTab === 'api') && (
            <div className="bg-white p-12 rounded-xl border border-slate-200 shadow-sm text-center">
              <Shield className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">Restricted Access</h3>
              <p className="text-slate-500 max-w-sm mx-auto">You need Super Admin credentials to view or modify routing keys and security layers.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
