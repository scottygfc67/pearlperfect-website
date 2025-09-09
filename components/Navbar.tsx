'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'h-14 bg-white/95 backdrop-blur-md shadow-sm' 
            : 'h-18 bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              animate={{ scale: isScrolled ? 0.9 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/" className="text-2xl font-bold font-heading text-pp-ink">
                PearlPerfect
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative text-pp-ink-soft hover:text-pp-ink transition-colors duration-200 font-medium"
                >
                  {item.name}
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-pp-purple-600"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button className="p-2 text-pp-ink-soft hover:text-pp-ink transition-colors">
                <Search size={20} />
              </button>

              {/* Account */}
              <button className="p-2 text-pp-ink-soft hover:text-pp-ink transition-colors">
                <User size={20} />
              </button>

              {/* Cart */}
              <button className="relative p-2 text-pp-ink-soft hover:text-pp-ink transition-colors">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-pp-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </button>

              {/* CTA Button */}
              <motion.button
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  isScrolled
                    ? 'bg-gradient-to-r from-pp-purple-600 to-pp-purple-400 text-white'
                    : 'bg-pp-purple-600 text-white hover:bg-pp-purple-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Shop Now
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-pp-ink-soft hover:text-pp-ink transition-colors"
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
              className="lg:hidden bg-white border-t border-gray-100"
            >
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-lg font-medium text-pp-ink-soft hover:text-pp-ink transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                
                {/* Mobile CTA */}
                <div className="pt-4 border-t border-gray-100">
                  <button className="w-full bg-pp-purple-600 text-white py-3 px-6 rounded-full font-semibold">
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
