import React from 'react';
import { LayoutTemplate, Image, Type, GripVertical, Settings2, Plus, Eye, Globe, ChevronUp, ChevronDown } from 'lucide-react';
import { useCms } from '../../contexts/CmsContext';

export const AdminCMS = () => {
  const { 
    sections, 
    primaryColor, 
    fontFamily, 
    toggleSectionStatus, 
    moveSectionUp, 
    moveSectionDown,
    setPrimaryColor,
    setFontFamily
  } = useCms();

  const getIconForType = (type: string) => {
    if (type.includes('Image')) return Image;
    if (type.includes('Collection') || type.includes('Products')) return LayoutTemplate;
    return Type;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display tracking-tight">Website Builder (CMS)</h1>
          <p className="text-slate-500 text-sm mt-1">Drag and drop homepage sections, banners, and layout blocks.</p>
        </div>
        <div className="flex gap-2">
          <a href="/" target="_blank" className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
            <Eye className="w-4 h-4" /> Live Preview
          </a>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors flex items-center gap-2">
            <Globe className="w-4 h-4" /> Publish Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900">Homepage Layout</h2>
            <button className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1"><Plus className="w-4 h-4" /> Add Section</button>
          </div>
          
          <div className="space-y-3">
            {sections.map((section, index) => {
              const Icon = getIconForType(section.type);
              return (
                <div key={section.id} className={`bg-white border ${section.active ? 'border-slate-200' : 'border-slate-200 opacity-60'} rounded-xl p-4 shadow-sm flex items-center justify-between group hover:border-blue-300 transition-colors`}>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <button disabled={index === 0} onClick={() => moveSectionUp(index)} className="p-0.5 text-slate-300 hover:text-blue-600 disabled:opacity-30"><ChevronUp className="w-4 h-4" /></button>
                      <button disabled={index === sections.length - 1} onClick={() => moveSectionDown(index)} className="p-0.5 text-slate-300 hover:text-blue-600 disabled:opacity-30"><ChevronDown className="w-4 h-4" /></button>
                    </div>
                    <div className={`p-2 rounded-lg ${section.active ? 'bg-slate-50 text-slate-600' : 'bg-slate-50 text-slate-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className={`font-bold ${section.active ? 'text-slate-900' : 'text-slate-500'}`}>{section.name}</h3>
                      <p className="text-xs text-slate-500">{section.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleSectionStatus(section.id)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-full cursor-pointer transition-colors ${section.active ? 'bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100' : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'}`}
                    >
                      {section.active ? 'Active' : 'Hidden'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
            <h3 className="font-bold text-slate-900 mb-4">Theme Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Primary Brand Color</label>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg shadow-sm border border-slate-200 overflow-hidden cursor-pointer">
                    <input 
                      type="color" 
                      value={primaryColor} 
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="absolute -top-2 -left-2 w-14 h-14 cursor-pointer"
                    />
                  </div>
                  <span className="text-slate-600 font-mono text-sm">{primaryColor.toUpperCase()}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Typography</label>
                <select 
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Inter">Inter (Sans-serif)</option>
                  <option value="Outfit">Outfit (Display/Modern)</option>
                  <option value="Playfair Display">Playfair Display (Serif)</option>
                  <option value="Space Grotesk">Space Grotesk (Tech)</option>
                </select>
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Store Logo</label>
                 <div className="border border-dashed border-slate-300 rounded-lg p-4 text-center cursor-pointer hover:bg-slate-50 transition-colors">
                    <Image className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                    <span className="text-sm text-blue-600 font-medium">Upload Logo</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
