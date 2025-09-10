'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ShadeId = "A1"|"A2"|"A3"|"A3_5"|"A4"|"B1"|"B2"|"B3"|"B4"|"C1"|"C2"|"C3"|"C4"|"D1"|"D2"|"D3"|"D4";

const SHADES: {id: ShadeId; label: string; name: string; hex: string; order: number}[] = [
  // D Series (Grayish)
  { id:"D4",  label:"D4",  name:"Dark Gray",    hex:"#8B7D6B", order:0 },
  { id:"D3",  label:"D3",  name:"Medium Gray",  hex:"#A0957F", order:1 },
  { id:"D2",  label:"D2",  name:"Light Gray",   hex:"#B5A88F", order:2 },
  { id:"D1",  label:"D1",  name:"Pale Gray",    hex:"#C7BBA3", order:3 },
  
  // C Series (Grayish-Yellow)
  { id:"C4",  label:"C4",  name:"Dark Gray-Yellow", hex:"#9B8B6B", order:4 },
  { id:"C3",  label:"C3",  name:"Medium Gray-Yellow", hex:"#B19F7F", order:5 },
  { id:"C2",  label:"C2",  name:"Light Gray-Yellow", hex:"#C7B58F", order:6 },
  { id:"C1",  label:"C1",  name:"Pale Gray-Yellow", hex:"#D9C9A3", order:7 },
  
  // B Series (Yellowish)
  { id:"B4",  label:"B4",  name:"Dark Yellow",  hex:"#C2A264", order:8 },
  { id:"B3",  label:"B3",  name:"Medium Yellow", hex:"#D5B572", order:9 },
  { id:"B2",  label:"B2",  name:"Light Yellow", hex:"#E0C389", order:10 },
  { id:"B1",  label:"B1",  name:"Pale Yellow",  hex:"#EBD6A1", order:11 },
  
  // A Series (Reddish-Brown)
  { id:"A4",  label:"A4",  name:"Dark Red-Brown", hex:"#B8956B", order:12 },
  { id:"A3_5",label:"A3.5",name:"Medium Red-Brown", hex:"#D4B17F", order:13 },
  { id:"A3",  label:"A3",  name:"Light Red-Brown", hex:"#E8C89F", order:14 },
  { id:"A2",  label:"A2",  name:"Pale Red-Brown", hex:"#F2D9B5", order:15 },
  { id:"A1",  label:"A1",  name:"Pearl White",  hex:"#FFFFFF", order:16 },
];

interface FindYourFutureShadeProps {
  initialShade?: ShadeId;
  improvementSteps?: number;
  onChange?: (current: ShadeId, projected: ShadeId) => void;
}

interface ShadeChipProps {
  shade: typeof SHADES[0];
  isSelected: boolean;
  isProjected: boolean;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

function ShadeChip({ shade, isSelected, isProjected, onClick, onKeyDown }: ShadeChipProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 transition-all duration-200
        focus:outline-none focus:outline-2 focus:outline-offset-2 focus:outline-[#5B2EEA]
        ${isSelected ? 'border-[#5B2EEA] ring-2 ring-[#5B2EEA]/20' : 'border-white/30'}
        ${isProjected ? 'scale-125 shadow-2xl' : 'shadow-lg'}
      `}
      style={{
        background: `radial-gradient(circle at 30% 30%, ${shade.hex}, ${shade.hex}dd)`,
        boxShadow: isProjected 
          ? `0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px ${shade.hex}40`
          : `0 8px 16px rgba(0,0,0,0.15)`
      }}
      onClick={onClick}
      onKeyDown={onKeyDown}
      aria-pressed={isSelected}
      aria-label={`Select shade ${shade.label} ${shade.name}`}
    >
      {/* Enamel highlight */}
      <div className="absolute inset-0 rounded-full opacity-20 bg-gradient-to-br from-white/40 to-transparent" />
      
      {/* Sparkle effect for projected */}
      <AnimatePresence>
        {isProjected && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
              className="text-white text-2xl"
            >
              ✨
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export default function FindYourFutureShade({ 
  initialShade = "A3", 
  improvementSteps = 7,
  onChange 
}: FindYourFutureShadeProps) {
  const [currentShade, setCurrentShade] = useState<ShadeId>(initialShade);
  const [announcement, setAnnouncement] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  
  const currentShadeData = SHADES.find(s => s.id === currentShade)!;
  const projectedOrder = Math.min(currentShadeData.order + improvementSteps, 16);
  const projectedShade = SHADES.find(s => s.order === projectedOrder)!;
  const projectedShadeData = SHADES.find(s => s.id === projectedShade.id)!;

  // Announce projected shade changes
  useEffect(() => {
    setAnnouncement(`Projected shade: ${projectedShadeData.label} ${projectedShadeData.name}`);
  }, [projectedShadeData]);

  const handleShadeSelect = (shadeId: ShadeId) => {
    setCurrentShade(shadeId);
    onChange?.(shadeId, projectedShade.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, shadeId: ShadeId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleShadeSelect(shadeId);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const currentIndex = SHADES.findIndex(s => s.id === currentShade);
      const direction = e.key === 'ArrowLeft' ? -1 : 1;
      const newIndex = Math.max(0, Math.min(SHADES.length - 1, currentIndex + direction));
      handleShadeSelect(SHADES[newIndex].id);
    }
  };

  return (
    <section 
      className="py-16 px-6"
      style={{
        background: 'linear-gradient(180deg,#7814D4 0%, #8F11EC 50%, #B565FF 100%)'
      }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-heading text-white mb-4">
            Find Your Future Shade
          </h2>
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm font-medium mb-4">
            <span>Interactive tool</span>
          </div>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Select your current tooth shade to see your projected results after using PearlPerfect V34 strips for 7 DAYS.
          </p>
        </motion.div>

        {/* Shade Chips */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          {/* D Series */}
          <div className="mb-6">
            <h4 className="text-white/80 text-sm font-medium text-center mb-3">D Series (Grayish)</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {SHADES.filter(s => s.id.startsWith('D')).map((shade, index) => (
                <motion.div
                  key={shade.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex flex-col items-center space-y-1"
                >
                  <ShadeChip
                    shade={shade}
                    isSelected={shade.id === currentShade}
                    isProjected={shade.id === projectedShade.id}
                    onClick={() => handleShadeSelect(shade.id)}
                    onKeyDown={(e) => handleKeyDown(e, shade.id)}
                  />
                  <div className="text-center">
                    <div className="text-white font-semibold text-xs">{shade.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* C Series */}
          <div className="mb-6">
            <h4 className="text-white/80 text-sm font-medium text-center mb-3">C Series (Grayish-Yellow)</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {SHADES.filter(s => s.id.startsWith('C')).map((shade, index) => (
                <motion.div
                  key={shade.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * (index + 4) }}
                  className="flex flex-col items-center space-y-1"
                >
                  <ShadeChip
                    shade={shade}
                    isSelected={shade.id === currentShade}
                    isProjected={shade.id === projectedShade.id}
                    onClick={() => handleShadeSelect(shade.id)}
                    onKeyDown={(e) => handleKeyDown(e, shade.id)}
                  />
                  <div className="text-center">
                    <div className="text-white font-semibold text-xs">{shade.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* B Series */}
          <div className="mb-6">
            <h4 className="text-white/80 text-sm font-medium text-center mb-3">B Series (Yellowish)</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {SHADES.filter(s => s.id.startsWith('B')).map((shade, index) => (
                <motion.div
                  key={shade.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * (index + 8) }}
                  className="flex flex-col items-center space-y-1"
                >
                  <ShadeChip
                    shade={shade}
                    isSelected={shade.id === currentShade}
                    isProjected={shade.id === projectedShade.id}
                    onClick={() => handleShadeSelect(shade.id)}
                    onKeyDown={(e) => handleKeyDown(e, shade.id)}
                  />
                  <div className="text-center">
                    <div className="text-white font-semibold text-xs">{shade.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* A Series */}
          <div className="mb-6">
            <h4 className="text-white/80 text-sm font-medium text-center mb-3">A Series (Reddish-Brown)</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {SHADES.filter(s => s.id.startsWith('A')).map((shade, index) => (
                <motion.div
                  key={shade.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * (index + 12) }}
                  className="flex flex-col items-center space-y-1"
                >
                  <ShadeChip
                    shade={shade}
                    isSelected={shade.id === currentShade}
                    isProjected={shade.id === projectedShade.id}
                    onClick={() => handleShadeSelect(shade.id)}
                    onKeyDown={(e) => handleKeyDown(e, shade.id)}
                  />
                  <div className="text-center">
                    <div className="text-white font-semibold text-xs">{shade.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Your Projected Results
          </h3>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            {/* Current Shade */}
            <div className="flex flex-col items-center space-y-4">
              <div className="text-white/80 text-sm font-medium">Current</div>
              <div 
                className="w-24 h-24 rounded-full border-4 border-white/30 shadow-xl"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${currentShadeData.hex}, ${currentShadeData.hex}dd)`
                }}
              />
              <div className="text-center">
                <div className="text-white font-bold text-lg">{currentShadeData.label}</div>
                <div className="text-white/70 text-sm">{currentShadeData.name}</div>
              </div>
            </div>

            {/* Arrow */}
            <motion.div
              ref={arrowRef}
              className="text-white text-3xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              →
            </motion.div>

            {/* Projected Shade */}
            <motion.div 
              className="flex flex-col items-center space-y-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            >
              <div className="text-white/80 text-sm font-medium">Projected</div>
              <div 
                className="w-24 h-24 rounded-full border-4 border-[#5B2EEA] shadow-2xl relative"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${projectedShadeData.hex}, ${projectedShadeData.hex}dd)`,
                  boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px ${projectedShadeData.hex}40`
                }}
              >
                <div className="absolute inset-0 rounded-full opacity-20 bg-gradient-to-br from-white/40 to-transparent" />
              </div>
              <div className="text-center">
                <div className="text-white font-bold text-lg">{projectedShadeData.label}</div>
                <div className="text-white/70 text-sm">{projectedShadeData.name}</div>
                {projectedShadeData.order >= 12 && (
                  <div className="mt-2 inline-flex items-center space-x-1 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-semibold">
                    <span>✨</span>
                    <span>Amazing results</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-4 mt-8 mb-6"
        >
          {[
            { icon: "🛡️", text: "30-day money-back" },
            { icon: "✨", text: "Enamel-safe" },
            { icon: "🔒", text: "Secure checkout" }
          ].map((pill, index) => (
            <motion.div
              key={pill.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + 0.1 * index }}
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 text-sm font-medium"
            >
              <span>{pill.icon}</span>
              <span>{pill.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-white/60 text-sm text-center max-w-2xl mx-auto"
        >
          Individual results may vary. The shade finder is for reference only and does not guarantee specific results.
        </motion.p>

        {/* Screen reader announcements */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {announcement}
        </div>
      </div>
    </section>
  );
}
