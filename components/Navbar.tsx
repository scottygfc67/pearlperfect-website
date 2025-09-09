'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Shop', href: '#shop' },
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Results', href: '#results' },
    { name: 'Ingredients', href: '/ingredients' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      {/* Utility Bar */}
      <motion.div
        initial={{ y: -36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-pp-purple-700 text-white text-sm py-2 px-4 text-center relative overflow-hidden"
      >
        <div className="flex items-center justify-center space-x-6 animate-marquee">
          <span>Free shipping over $35</span>
          <span>•</span>
          <span>Enamel-safe & sensitivity free</span>
          <span>•</span>
          <span>30-day money-back guarantee</span>
        </div>
      </motion.div>

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="sticky top-0 z-50 h-18 border-b border-white/20 shadow-lg"
        style={{
          background: `
            linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%),
            linear-gradient(135deg, #5820E5 0%, #5820E5 100%)
          `,
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold font-heading text-white drop-shadow-lg">
                PearlPerfect
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-white/80 hover:text-white transition-colors duration-200 font-medium drop-shadow-sm"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button className="p-2 text-white/80 hover:text-white transition-colors drop-shadow-sm">
                <Search size={20} />
              </button>

              {/* Account */}
              <button className="p-2 text-white/80 hover:text-white transition-colors drop-shadow-sm">
                <User size={20} />
              </button>

              {/* Cart */}
              <button className="relative p-2 text-white/80 hover:text-white transition-colors drop-shadow-sm">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-white text-pp-purple-600 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg">
                  0
                </span>
              </button>

              {/* CTA Button */}
              <motion.button
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg drop-shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-white/80 hover:text-white transition-colors drop-shadow-sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-white/20"
              style={{
                background: `
                  linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%),
                  linear-gradient(135deg, #5820E5 0%, #5820E5 100%)
                `,
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              }}
            >
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-lg font-medium text-white/80 hover:text-white transition-colors drop-shadow-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                
                {/* Mobile CTA */}
                <div className="pt-4 border-t border-white/20">
                  <button className="w-full bg-white/20 backdrop-blur-sm text-white py-3 px-6 rounded-full font-semibold border border-white/30 shadow-lg">
                    Get My Strips
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
