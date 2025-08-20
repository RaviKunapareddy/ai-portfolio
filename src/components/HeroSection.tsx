'use client';

import { Button } from '@/components/ui/button';
import { Download, Rocket, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { trackEvent } from '@/utils/analytics';

export default function HeroSection() {
  const handleTryProjectClick = () => {
    trackEvent.tryProjectClick('hero-cta');
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Enhanced Premium Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-gray-50 via-slate-50 to-gray-100"></div>
        
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-transparent to-violet-50/20"></div>
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Enhanced Animated Blobs with More Sophistication */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {/* Primary Blob - Larger and more prominent */}
        <motion.div 
          className="absolute w-[500px] h-[500px] bg-gradient-to-r from-slate-100/40 to-gray-100/30 rounded-full blur-3xl"
          style={{
            top: '15%',
            left: '8%',
          }}
          animate={{
            x: [0, 30, -20, 25, 0],
            y: [0, -25, 15, -10, 0],
            scale: [1, 1.1, 0.95, 1.05, 1],
            rotate: [0, 5, -3, 2, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Secondary Blob - Medium size */}
        <motion.div 
          className="absolute w-[350px] h-[350px] bg-gradient-to-r from-slate-100/30 to-gray-50/25 rounded-full blur-3xl"
          style={{
            top: '50%',
            right: '10%',
          }}
          animate={{
            x: [0, -25, 20, -15, 0],
            y: [0, 20, -30, 25, 0],
            scale: [1, 0.9, 1.15, 0.95, 1],
            rotate: [0, -8, 4, -2, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
        
        {/* Tertiary Blob - Smaller accent */}
        <motion.div 
          className="absolute w-[200px] h-[200px] bg-gradient-to-r from-gray-100/20 to-slate-50/15 rounded-full blur-2xl"
          style={{
            bottom: '20%',
            left: '15%',
          }}
          animate={{
            x: [0, 15, -10, 20, 0],
            y: [0, -15, 25, -20, 0],
            scale: [1, 1.2, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10,
          }}
        />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-slate-300/20 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 12}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Unified Hero Content - Single Storytelling Block */}
      <div className="container mx-auto max-w-5xl text-center relative px-6" style={{ zIndex: 1 }}>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Identity Block */}
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-800 tracking-tight">
              Ravi Kunapareddy
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3">
              <p className="text-base text-slate-600 font-medium">
                AI/ML Engineer
              </p>
              <div className="hidden md:block w-1 h-1 bg-slate-400 rounded-full"></div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center space-x-2 text-sm text-slate-500"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Open to new opportunities</span>
              </motion.div>
            </div>
          </div>

          {/* DOMINANT Hero Headlines */}
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.85] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              AI Tools in Development.
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 bg-clip-text text-transparent leading-[0.85]">
              Built to be used, not just shown.
            </h3>
          </div>



          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="
                text-lg px-8 py-4 rounded-xl font-semibold
                bg-gradient-to-r from-slate-900 to-slate-800 text-white 
                hover:from-slate-800 hover:to-slate-700
                hover:scale-105 transition-all duration-300 
                shadow-lg hover:shadow-xl hover:shadow-slate-900/25
                ring-1 ring-slate-900/10 hover:ring-slate-700
                backdrop-blur-sm
                min-w-[200px]
                relative overflow-hidden group
              "
              asChild
            >
              <Link href="#projects" onClick={handleTryProjectClick}>
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Rocket className="mr-2 h-5 w-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                Try a Project
              </Link>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="
                text-lg px-8 py-4 rounded-xl font-medium
                bg-white/80 hover:bg-slate-50 text-slate-700
                border-2 border-slate-200 hover:border-slate-300
                hover:scale-105 transition-all duration-300
                shadow-sm hover:shadow-lg hover:shadow-slate-200/50
                backdrop-blur-sm
                min-w-[180px]
                relative overflow-hidden group
              "
              asChild
            >
              <a href="/Raviteja_Kunapareddy_Resume.pdf" download>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Resume
              </a>
            </Button>
          </div>

          {/* Integrated Scroll Indicator */}
          <motion.div 
            className="pt-8 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-8 h-8 border-2 border-slate-400/50 rounded-full flex items-center justify-center hover:border-slate-500 transition-colors bg-white/50 backdrop-blur-sm mx-auto"
            >
              <ArrowDown className="w-4 h-4 text-slate-500 hover:text-slate-600 transition-colors" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Soft fade transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" style={{ zIndex: 1 }}></div>
    </section>
  );
} 