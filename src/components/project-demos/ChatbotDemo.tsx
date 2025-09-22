'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Bot, User, ShoppingCart, Send, Search, ArrowLeft, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ChatbotClient, Product, HealthCheckResponse } from '@/lib/api-clients/chatbot';

interface ChatbotDemoProps {
  apiEndpoint?: string;
}

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  intent?: string;
  products?: Product[];
  suggestions?: string[];
}

export default function ChatbotDemo({ apiEndpoint }: ChatbotDemoProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [, setError] = useState<string | null>(null);
  const [, setIsOnline] = useState<boolean | null>(null);
  const [, setBackendInfo] = useState<HealthCheckResponse | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Initialize client with the provided API endpoint
  const client = useMemo(() => new ChatbotClient(apiEndpoint), [apiEndpoint]);

  // Check backend health on mount
  useEffect(() => {
    const checkHealth = async () => {
      if (!apiEndpoint) {
        return;
      }
      
      try {
        const result = await client.healthCheck();
        setIsOnline(result.success);
        if (result.success && result.data) {
          setBackendInfo(result.data);
        }
      } catch (err) {
        void err;
        setIsOnline(false);
      }
    };

    checkHealth();
  }, [apiEndpoint, client]);

  // Smooth scroll to bottom of messages container only
  useEffect(() => {
    if (messages.length > 0 && messagesContainerRef.current) {
      // Small delay to ensure content is rendered
      const timeoutId = setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || !apiEndpoint || isLoading) {
      return;
    }

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    // Show typing indicator with realistic delay
    setTimeout(() => setIsTyping(true), 300);

    try {
      const result = await client.sendMessage(input.trim(), sessionId);
      
      // Simulate realistic thinking time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (result.success && result.data) {
        const botMessage: Message = {
          id: `bot_${Date.now()}`,
          type: 'bot',
          content: result.data.response,
          timestamp: new Date(),
          intent: result.data.intent,
          products: result.data.products,
          suggestions: result.data.suggestions,
        };
        
        setMessages(prev => [...prev, botMessage]);
      } else {
        setError('Failed to get response');
      }
    } catch (err) {
      void err;
      setError('Network error occurred');
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleQuickReply = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        // If item already exists, increase quantity (if we had quantity field)
        return prev;
      } else {
        // Add new item to cart
        const newCart = [...prev, { ...product, cartId: Date.now() }];
        setCartCount(newCart.length);
        return newCart;
      }
    });
    
    // Show visual feedback
    setTimeout(() => {
      // Could add toast notification here
    }, 100);
  };

  const handleRemoveFromCart = (cartId: number) => {
    setCartItems(prev => {
      const newCart = prev.filter(item => item.cartId !== cartId);
      setCartCount(newCart.length);
      return newCart;
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Allow Shift+Enter for new line
        return;
      } else {
        // Send message on Enter
        e.preventDefault();
        handleSendMessage();
      }
    }
  };

  if (!apiEndpoint) {
    return (
      <div className="w-full relative">
        {/* Background for consistency */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50/80 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50/20 via-transparent to-slate-50/20 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <Card className="border border-slate-200/60 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shadow-lg">
                <Bot className="h-10 w-10 text-slate-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900 mb-2">
                Alex - Shopping Assistant
              </CardTitle>
              <CardDescription className="text-slate-600 text-lg max-w-md mx-auto leading-relaxed">
                Find products and get recommendations with AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 border border-slate-200/60 mb-6">
                  <h3 className="font-semibold text-slate-800 mb-3">🚀 Demo Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-2 shadow-sm">
                        <MessageCircle className="h-6 w-6 text-slate-600" />
                      </div>
                      <span className="font-medium text-slate-700">Smart Chat</span>
                      <span className="text-slate-500 text-xs">Natural conversations</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-2 shadow-sm">
                        <Search className="h-6 w-6 text-green-500" />
                      </div>
                      <span className="font-medium text-slate-700">Product Search</span>
                      <span className="text-slate-500 text-xs">AI-powered discovery</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-2 shadow-sm">
                        <ShoppingCart className="h-6 w-6 text-purple-500" />
                      </div>
                      <span className="font-medium text-slate-700">Smart Cart</span>
                      <span className="text-slate-500 text-xs">Seamless shopping</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">⚡</span>
                    </div>
                    <h4 className="font-semibold text-amber-800">Backend Connection Required</h4>
                  </div>
                  <p className="text-amber-700 text-sm mb-4">
                    To experience the full interactive demo, please connect your chatbot backend API endpoint.
                  </p>
                  <div className="bg-white rounded-lg p-3 text-left">
                    <code className="text-xs text-slate-600">
                      NEXT_PUBLIC_CHATBOT_API=https://your-api-endpoint.com
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/60 via-white to-slate-50/40 relative">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/20 via-transparent to-slate-50/10 pointer-events-none"></div>
              {/* Minimal Navigation */}
        <div className="bg-white/95 backdrop-blur-sm border-b border-slate-200/80 px-6 py-2 relative z-10">
        <div className="max-w-4xl mx-auto">
                      <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Portfolio</span>
          </Link>
        </div>
      </div>

      {/* Simple Clean Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-slate-200/80 px-6 py-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h1 className="text-2xl font-bold text-slate-900">Alex - Shopping Assistant</h1>
              <p className="text-slate-600 mt-1">Find products and get recommendations</p>
            </div>
            
            {/* Simple Cart Counter */}
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-lg">
              <ShoppingCart className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Cart: {cartCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto p-4 relative z-10">
                 <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-slate-200/60 h-[600px] flex flex-col">
          
          {/* Bot Identity Header */}
          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Alex • Your Shopping Buddy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={messagesContainerRef}>
            {messages.map((message) => (
              <div key={message.id} className={`flex items-start gap-3 mb-4 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' ? 'bg-slate-700' : 'bg-slate-700'
                }`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                
                <div className={`flex-1 ${message.type === 'user' ? 'flex justify-end' : 'flex justify-start'}`}>
                  <div className="max-w-2xl">
                    <div className={`inline-block p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-slate-700 text-white' 
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      <p>{message.content}</p>
                    </div>
                    
                    {/* Products - Compact Chat-friendly Layout */}
                    {message.products && message.products.length > 0 && (
                      <div className="mt-3 grid grid-cols-3 gap-3 max-w-xl">
                        {message.products.map((product, index) => {
                          const discount = product.discountPercentage ?? 0;
                          const rating = typeof product.rating === 'number' ? product.rating : undefined;
                          return (
                          <div key={product.id || index} className="group bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                            {/* Compact Product Image */}
                            <div className="relative">
                                  {product.thumbnail && (
                                <Image
                                  src={product.thumbnail}
                                  alt={product.title || 'Product'}
                                  width={320}
                                  height={112}
                                  unoptimized
                                  className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                              )}
                              
                              {/* Compact Badges */}
                              {discount > 0 && (
                                <div className="absolute top-1 right-1 bg-slate-700 text-white text-xs px-1 py-0.5 rounded text-[10px]">
                                  {Math.round(discount)}% OFF
                                </div>
                              )}
                              
                              {/* Compact Favorite Button */}
                              <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white rounded-full p-1 shadow-sm hover:bg-gray-50">
                                <Heart className="h-3 w-3 text-gray-600" />
                              </button>
                            </div>
                            
                            {/* Compact Product Info */}
                            <div className="p-2">
                              {/* Compact Title */}
                              <h4 className="font-medium text-gray-900 text-xs mb-1 overflow-hidden" style={{display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical'}}>{product.title || 'Product'}</h4>
                              
                              {/* Compact Rating */}
                              {rating !== undefined && (
                                <div className="flex items-center gap-1 mb-1">
                                  <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                      <span
                                        key={i}
                                        className={`text-xs ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                      >
                                        ★
                                      </span>
                                    ))}
                                  </div>
                                  <span className="text-[10px] text-gray-500">{rating}</span>
                                </div>
                              )}
                              
                              {/* Compact Price */}
                              <div className="flex items-center gap-1 mb-2">
                                {product.price && (
                                  <span className="font-semibold text-gray-900 text-sm">${product.price}</span>
                                )}
                                {discount > 0 && product.price && (
                                  <span className="text-[10px] text-gray-500 line-through">
                                    ${(product.price / (1 - (discount / 100))).toFixed(2)}
                                  </span>
                                )}
                              </div>
                              
                              {/* Compact Add to Cart Button - Updated Theme */}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToCart(product);
                                }}
                                disabled={product.stock === 0}
                                className={`w-full flex items-center justify-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors duration-200 ${
                                  product.stock === 0 
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                    : 'bg-slate-700 hover:bg-slate-800 text-white'
                                }`}
                              >
                                <ShoppingCart className="h-3 w-3" />
                                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                              </button>
                            </div>
                          </div>
                          );
                        })}
                      </div>
                    )}
                    
                    {/* Quick Replies */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickReply(suggestion)}
                            className="bg-white border border-slate-200 px-3 py-1.5 rounded text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-xs text-slate-500 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Removed duplicate suggestions */}
            
            {/* Typing Indicator */}
            {(isLoading || isTyping) && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-slate-100 rounded-lg p-3 max-w-fit">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Removed messagesEndRef sentinel */}
          </div>
          
          {/* Input Area */}
                     <div className="border-t border-slate-200 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about products, get recommendations..."
                className="flex-1 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-slate-700 hover:bg-slate-800 disabled:bg-slate-300 text-white px-4 py-2 rounded-lg"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            
            {/* Removed duplicate suggestions */}
          </div>
        </div>
      </div>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="absolute inset-0 bg-black/20"
            onClick={() => setShowCart(false)}
          ></div>
          
                     <div className="ml-auto w-full max-w-sm bg-white shadow-xl border-l border-slate-200 relative">
            <div className="h-full flex flex-col">
                              <div className="p-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                                     <h3 className="text-lg font-semibold text-slate-900">Shopping Cart</h3>
                  <button 
                    onClick={() => setShowCart(false)}
                                         className="text-slate-400 hover:text-slate-600"
                  >
                    ×
                  </button>
                </div>
                                 <p className="text-sm text-slate-600 mt-1">{cartCount} items in your cart</p>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                                         <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                     <p className="text-slate-600">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item, index) => (
                                             <div key={`cart-${index}`} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                                                 <div className="w-12 h-12 bg-slate-200 rounded flex items-center justify-center flex-shrink-0">
                           <ShoppingCart className="h-5 w-5 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                                                     <h4 className="font-medium text-slate-900 text-sm truncate">{item.name || 'Product'}</h4>
                           <p className="text-xs text-slate-600 truncate">{item.description || 'No description'}</p>
                          {item.price && (
                            <p className="font-semibold text-green-600 text-sm mt-1">${item.price}</p>
                          )}
                        </div>
                        <button 
                          onClick={() => handleRemoveFromCart(item.cartId!)}
                          className="text-slate-500 hover:text-slate-700 text-sm"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cartItems.length > 0 && (
                                 <div className="p-4 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-3">
                                         <span className="font-semibold text-slate-900">Total:</span>
                    <span className="font-bold text-lg text-green-600">
                      ${cartItems.reduce((total, item) => total + (item.price || 0), 0).toFixed(2)}
                    </span>
                  </div>
                  <button className="w-full bg-slate-700 hover:bg-slate-800 text-white py-2 rounded-lg">
                    Checkout ({cartCount} items)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 