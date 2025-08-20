'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Download } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 20);
  });

  const handleGithubClick = () => {
    trackEvent.githubClick();
  };

  const handleLinkedinClick = () => {
    trackEvent.contactClick();
  };

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'border-b border-slate-200/80 shadow-xl shadow-slate-200/25 backdrop-blur-xl' 
          : 'border-b border-slate-200/40 backdrop-blur-sm'
      }`}
      style={{ 
        backgroundColor: isScrolled 
          ? "rgba(255, 255, 255, 0.95)" 
          : "rgba(255, 255, 255, 0.85)"
      }}
    >
      {/* Subtle top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/50 to-transparent transition-opacity duration-500 ${
        isScrolled ? 'opacity-100' : 'opacity-0'
      }`} />
      
      <div className="container mx-auto max-w-6xl">
        <div className="flex h-18 items-center justify-between px-6">
          {/* Minimal Logo/Brand */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              href="/" 
              className="flex items-center hover:opacity-90 transition-all duration-300 group"
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {/* Subtle shine effect on logo */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="text-lg font-bold text-white relative z-10">RK</span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <nav className="flex items-center space-x-8">
              <Link 
                href="/" 
                className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors relative group py-2"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-slate-600 to-slate-500 transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
              <Link 
                href="#about" 
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group py-2"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-slate-600 to-slate-500 transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
              <Link 
                href="#projects" 
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors relative group py-2"
              >
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-slate-600 to-slate-500 transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            </nav>
          </motion.div>

          {/* Right Actions */}
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Social Links */}
            <div className="hidden sm:flex items-center space-x-3">
              <motion.div whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleGithubClick}
                  className="hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 rounded-xl px-3 py-2 h-auto relative overflow-hidden group"
                  asChild
                >
                  <a href="https://github.com/RaviKunapareddy" target="_blank" rel="noopener noreferrer">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                    <div className="flex items-center space-x-2 relative z-10">
                      <Github className="h-4 w-4" />
                      <span className="text-xs font-medium">GitHub</span>
                    </div>
                  </a>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLinkedinClick}
                  className="hover:bg-slate-100 hover:text-slate-900 transition-all duration-200 rounded-xl px-3 py-2 h-auto relative overflow-hidden group"
                  asChild
                >
                  <a href="https://www.linkedin.com/in/ravi-kunapareddy/" target="_blank" rel="noopener noreferrer">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                    <div className="flex items-center space-x-2 relative z-10">
                      <Linkedin className="h-4 w-4" />
                      <span className="text-xs font-medium">LinkedIn</span>
                    </div>
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Resume Button */}
            <motion.div whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                className="
                  rounded-xl px-4 py-2 font-medium
                  bg-gradient-to-r from-slate-800 to-slate-700 text-white 
                  hover:from-slate-700 hover:to-slate-600
                  shadow-sm hover:shadow-lg transition-all duration-300
                  border border-slate-800/50 hover:border-slate-700
                  relative overflow-hidden group
                "
                asChild
              >
                <a href="/Raviteja_Kunapareddy_Resume.pdf" download onClick={() => trackEvent.resumeDownload()}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <Download className="mr-2 h-4 w-4 relative z-10" />
                  <span className="relative z-10">Resume</span>
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
} 