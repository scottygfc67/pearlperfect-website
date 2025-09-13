'use client';

import { motion } from 'framer-motion';
import { Star, Shield, Truck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
export default function Hero() {

  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/gradhero.jfif"
          alt="Smiling person with bright teeth"
          priority
          fill
          sizes="100vw"
          className="object-cover"
          quality={85}
          loading="eager"
        />
      </div>

      {/* Gradient + scrim for legibility */}
      <div className="absolute inset-0 -z-0 pointer-events-none bg-[radial-gradient(60%_60%_at_70%_20%,rgba(147,51,234,0.35),transparent)]" />
      <div className="absolute inset-0 -z-0 bg-gradient-to-t from-black/60 via-black/40 to-black/10" />

      {/* Floating blobs (subtle) - Reduced for performance */}
      <motion.div
        className="absolute top-16 right-16 w-64 h-64 bg-purple-500/25 rounded-full blur-3xl"
        animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'transform' }}
      />
      <motion.div
        className="absolute bottom-16 left-10 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl"
        animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'transform' }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.02 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs sm:text-sm text-white/90 ring-1 ring-white/20 backdrop-blur"
          >
            💜 Enamel‑safe • Sensitivity‑free • Clinically tested
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="mt-3 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
            style={{ fontFamily: 'var(--font-space-grotesk)' }}
          >
            Whiter teeth in <span className="text-yellow-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">14 days</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.08 }}
            className="mt-3 text-lg sm:text-xl text-white/90 max-w-2xl"
          >
            Professional‑grade whitening strips that deliver visible results in just <strong>14 minutes</strong> per session.
            Gentle on enamel. No sensitivity. Real, clinical results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.12 }}
            className="mt-8 flex flex-col items-center justify-center gap-6"
          >
            <Link href="/products/v34-teeth-whitening-strips" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.1 }}
                className="rounded-full px-8 py-4 text-lg font-semibold text-white
                           bg-black hover:bg-gray-800
                           shadow-lg hover:shadow-xl
                           transition-all duration-150"
              >
                Shop Now
              </motion.button>
            </Link>

            <p className="text-white/80 text-sm sm:text-base">
              30‑day money‑back guarantee • Free shipping
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
