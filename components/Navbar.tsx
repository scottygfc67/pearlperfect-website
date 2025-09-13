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
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Detect scroll to tighten glass and add contrast after hero
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on outside click + lock body scroll
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
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
      <motion.header
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
        className="fixed inset-x-0 top-0 z-50"
        role="banner"
      >
        {/* Glass container */}
        <div
          className={[
            "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
            "transition-all duration-300",
          ].join(' ')}
        >
          <div
            className={[
              "mt-4 flex h-14 sm:h-16 items-center justify-between rounded-2xl",
              "backdrop-blur-xl",
              // base glass
              "bg-white/10 ring-1 ring-white/15 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]",
              // purple tint that matches hero + slightly stronger when scrolled
              isScrolled
                ? "bg-gradient-to-br from-purple-600/25 via-fuchsia-500/20 to-purple-700/25"
                : "bg-gradient-to-br from-purple-500/15 via-fuchsia-400/10 to-purple-700/15",
            ].join(' ')}
          >
            {/* Left: Brand */}
            <div className="pl-3 sm:pl-5">
              <Link href="/" className="flex items-center gap-2" aria-label="PearlPerfect home">
                <Image
                  src="/logo.png"
                  alt="PearlPerfect"
                  width={120}
                  height={40}
                  className="h-7 sm:h-8 w-auto drop-shadow"
                  priority
                />
              </Link>
            </div>

            {/* Center: Nav (desktop) */}
            <nav className="hidden lg:flex items-center gap-7">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-white/85 hover:text-white transition-colors font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Right: Actions */}
            <div className="pr-2 sm:pr-4 flex items-center gap-1 sm:gap-2">
              {/* Desktop actions */}
              <div className="hidden sm:flex items-center">
                <button
                  className="p-2 rounded-full text-white/85 hover:text-white hover:bg-white/10 transition"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>
                <button
                  className="p-2 rounded-full text-white/85 hover:text-white hover:bg-white/10 transition"
                  aria-label="Account"
                >
                  <User size={18} />
                </button>
              </div>

              {/* Cart */}
              <button
                onClick={() => setIsMiniCartOpen(true)}
                className="relative p-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition"
                aria-label="Open cart"
              >
                <ShoppingCart size={18} />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-white text-purple-700 text-[10px] flex items-center justify-center font-bold shadow">
                  0
                </span>
              </button>

              {/* Primary CTA (desktop) */}
              <Link href="/products/v34-teeth-whitening-strips" className="hidden md:block">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="rounded-full px-5 py-2.5 text-sm font-semibold text-white
                             bg-black hover:bg-gray-800
                             ring-1 ring-white/20 shadow-lg"
                >
                  Shop Now
                </motion.button>
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden p-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition touch-manipulation"
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.1 }}>
                  {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="lg:hidden"
            >
              <div
                className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
              >
                <div
                  className="mt-2 overflow-hidden rounded-2xl backdrop-blur-xl
                             bg-gradient-to-br from-white/15 via-white/10 to-white/8
                             ring-1 ring-white/15 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.45)]"
                >
                  <div className="bg-gradient-to-br from-purple-600/25 via-fuchsia-500/20 to-purple-800/25">
                    <div className="px-4 py-6 space-y-5">
                      {/* Links */}
                      <div className="space-y-2">
                        {navItems.map((item, idx) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.02 * idx }}
                          >
                            <Link
                              href={item.href}
                              className="block rounded-xl px-3 py-3 text-base font-medium text-white/90 hover:text-white hover:bg-white/10 transition"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </motion.div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="pt-3 border-t border-white/15 space-y-3">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-2 rounded-full px-3 py-2 text-white/85 hover:text-white hover:bg-white/10 transition">
                            <Search size={20} />
                            <span className="text-sm font-medium">Search</span>
                          </button>
                          <button className="flex items-center gap-2 rounded-full px-3 py-2 text-white/85 hover:text-white hover:bg-white/10 transition">
                            <User size={20} />
                            <span className="text-sm font-medium">Account</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          <Link href="/products/v34-teeth-whitening-strips" onClick={() => setIsMobileMenuOpen(false)}>
                            <motion.button
                              whileTap={{ scale: 0.98 }}
                              className="w-full rounded-full border border-white/30 bg-white/15 text-white px-6 py-3 font-semibold"
                            >
                              Get My Strips
                            </motion.button>
                          </Link>
                          <Link href="/products/v34-teeth-whitening-strips" onClick={() => setIsMobileMenuOpen(false)}>
                            <motion.button
                              whileTap={{ scale: 0.98 }}
                              className="w-full rounded-full bg-white text-purple-700 px-6 py-3 font-semibold shadow"
                            >
                              Shop Now
                            </motion.button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mini Cart */}
      <MiniCart isOpen={isMiniCartOpen} onClose={() => setIsMiniCartOpen(false)} />
    </>
  );
}
