'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import MiniCart from './MiniCart';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'Shop', href: '/products/v34-teeth-whitening-strips' },
    { name: 'How it works', href: '/how-it-works' },
    { name: 'Results', href: '#results' },
    { name: 'Ingredients', href: '/ingredients' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <>
      {/* Utility Bar - Hidden */}
      {/* <motion.div
        initial={{ y: -36, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white text-black text-sm py-2 px-4 text-center relative overflow-hidden border-b border-gray-200"
      >
        <div className="flex items-center justify-center space-x-6 animate-marquee">
          <span>Free shipping over $35</span>
          <span>•</span>
          <span>Enamel-safe & sensitivity free</span>
          <span>•</span>
          <span>30-day money-back guarantee</span>
        </div>
      </motion.div> */}

      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="sticky top-0 z-50 h-16 sm:h-18 shadow-lg"
        style={{
          background: `
            linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%),
            linear-gradient(to top, #7712D1 0%, #B565FF 100%)
          `,
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="block">
                <Image 
                  src="/logo.png" 
                  alt="PearlPerfect" 
                  width={150} 
                  height={50} 
                  className="h-8 sm:h-10 lg:h-12 w-auto drop-shadow-lg"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-white/80 hover:text-white transition-colors duration-200 font-medium drop-shadow-sm"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Desktop Actions */}
              <div className="hidden sm:flex items-center space-x-2">
                {/* Search */}
                <button className="p-2 text-white/80 hover:text-white transition-colors drop-shadow-sm">
                  <Search size={18} />
                </button>

                {/* Account */}
                <button className="p-2 text-white/80 hover:text-white transition-colors drop-shadow-sm">
                  <User size={18} />
                </button>
              </div>

              {/* Cart */}
              <button 
                onClick={() => setIsMiniCartOpen(true)}
                className="relative p-2 text-white/80 hover:text-white transition-colors drop-shadow-sm"
              >
                <ShoppingCart size={18} />
                <span className="absolute -top-1 -right-1 bg-white text-purple-600 text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold shadow-lg text-[10px] sm:text-xs">
                  0
                </span>
              </button>

              {/* Desktop CTA Button */}
              <Link href="/products/v34-teeth-whitening-strips">
                <motion.button
                  className="hidden sm:block bg-white/20 backdrop-blur-sm text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg drop-shadow-lg text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Shop Now
                </motion.button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-white/80 hover:text-white transition-colors drop-shadow-sm touch-manipulation"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-t border-white/20"
              style={{
                background: `
                  linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%),
                  linear-gradient(135deg, #FF6B9D 0%, #C084FC 25%, #A855F7 50%, #8B5CF6 75%, #F3E8FF 100%)
                `,
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              }}
            >
              <div className="px-4 py-6 space-y-6">
                {/* Mobile Navigation Links */}
                <div className="space-y-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="block text-lg font-medium text-white/90 hover:text-white transition-colors drop-shadow-sm py-2 touch-manipulation"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                {/* Mobile Actions */}
                <div className="pt-4 border-t border-white/20 space-y-4">
                  {/* Mobile Search & Account */}
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors py-2">
                      <Search size={20} />
                      <span className="text-sm font-medium">Search</span>
                    </button>
                    <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors py-2">
                      <User size={20} />
                      <span className="text-sm font-medium">Account</span>
                    </button>
                  </div>
                  
                  {/* Mobile CTA Buttons */}
                  <div className="space-y-3">
                    <Link href="/products/v34-teeth-whitening-strips">
                      <motion.button 
                        className="w-full bg-white/20 backdrop-blur-sm text-white py-4 px-6 rounded-full font-semibold border border-white/30 shadow-lg text-base touch-manipulation"
                        whileTap={{ scale: 0.98 }}
                      >
                        Get My Strips
                      </motion.button>
                    </Link>
                    <Link href="/products/v34-teeth-whitening-strips">
                      <motion.button 
                        className="w-full bg-white text-purple-600 py-4 px-6 rounded-full font-semibold shadow-lg text-base touch-manipulation"
                        whileTap={{ scale: 0.98 }}
                      >
                        Shop Now
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mini Cart */}
      <MiniCart isOpen={isMiniCartOpen} onClose={() => setIsMiniCartOpen(false)} />
    </>
  );
}
