import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';
import { allProducts } from '../data/products';
import { motion, AnimatePresence } from 'motion/react';

// Initialize SDK — key comes from VITE_GEMINI_API_KEY env var (set in Cloudflare Pages dashboard)
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY as string ?? '' });

type Message = {
  id: string;
  role: 'user' | 'model';
  content: string;
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-msg',
      role: 'model',
      content: 'Hi there! I am the Trendit support assistant. How can I help you with our marketplace or products today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    
    // Add user message to UI
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: userMessage };
    setMessages((prev) => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      // Create condensed catalog string to save tokens while keeping contextual awareness
      const catalogData = allProducts.map(p => 
        `ID:${p.id} Name:"${p.title}" Price:$${p.price} Brand:"${p.brand}" Category:"${p.categoryId}"`
      ).join(' | ');

      const systemInstruction = `You are the official customer support chatbot for "Trendit OS", an elite modern multi-vendor marketplace.
      
      Personality: Professional, concise, warm, helpful, data-driven. Do NOT generate overly long massive paragraphs. Use lists where appropriate.
      
      You have access to the platform's current data.
      Our current vendors: Beirut Tech Hub, Urban Threads, ElectroZone (Pending), Home Essentials.
      Our products: ${catalogData}
      
      Rules:
      1. Answer questions about these specific products, vendors, and marketplace policies.
      2. If a customer asks for a product not in the catalog, let them know politely we don't have it currently.
      3. For questions about orders, pretend to check and say you need an Order ID, then ask them to email support@trendit.com.
      `;

      // Pass conversation history to API
      const conversationHistory = messages.map(msg => 
        `${msg.role === 'user' ? 'Customer' : 'Trendit Support'}: ${msg.content}`
      ).join('\n') + `\nCustomer: ${userMessage}\nTrendit Support:`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: conversationHistory,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.5,
        },
      });

      const modelReply = response.text || "I'm sorry, I encountered an error pulling up that information. Please try again.";

      setMessages((prev) => [
        ...prev, 
        { id: Date.now().toString() + 'bot', role: 'model', content: modelReply }
      ]);
    } catch (error) {
      console.error("Chat API Error:", error);
      setMessages((prev) => [
        ...prev, 
        { id: Date.now().toString() + 'err', role: 'model', content: "Sorry, I seem to be having network issues. Please contact our human support at support@trendit.com for immediate help!" }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-6 z-50 p-4 pt-4 mt-0 bg-blue-600 hover:bg-blue-700 text-white rounded-[1.5rem] shadow-2xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 transform hover:scale-110 active:scale-95 group"
        title="Chat with Support"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-28 right-6 w-80 sm:w-96 bg-white/80 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-50 flex flex-col overflow-hidden" 
            style={{ height: '550px', maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="bg-slate-900/95 text-white p-5 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center relative shadow-lg shadow-blue-600/20">
                  <Bot className="w-6 h-6 text-white" />
                  <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-bold text-sm font-display tracking-tight uppercase italic opacity-90">Trendit Assist.</h3>
                  <p className="text-[10px] text-slate-400 font-black tracking-widest leading-none">NEURAL SUPPORT v1.2</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 text-slate-500 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3`}
                >
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                  
                  <div className={`max-w-[85%] rounded-[1.5rem] p-4 text-sm shadow-xl shadow-slate-900/5 font-medium leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    ) : (
                      <div className="markdown-body">
                        <Markdown>{msg.content}</Markdown>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="bg-white border border-slate-100 text-slate-500 rounded-[1.5rem] rounded-tl-none p-4 shadow-xl shadow-slate-900/5 flex items-center gap-3">
                    <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Synthesizing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-5 pt-0 bg-transparent relative">
              <div className="absolute bottom-full left-0 right-0 h-8 bg-gradient-to-t from-white/90 to-transparent pointer-events-none"></div>
              <form onSubmit={handleSendMessage} className="flex gap-2 p-2 bg-slate-50 rounded-[1.5rem] border border-slate-100 shadow-inner">
                <input
                  type="text"
                  placeholder="Inquire products..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 bg-transparent border-none rounded-xl px-4 py-2 text-sm focus:outline-none placeholder-slate-400 font-medium"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white p-3 rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center shrink-0 active:scale-90"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
