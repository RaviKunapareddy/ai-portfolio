'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/utils/analytics';
import { motion } from 'framer-motion';

export default function Footer() {
  const handleGithubClick = () => {
    trackEvent.githubClick();
  };

  const handleLinkedinClick = () => {
    trackEvent.contactClick();
  };

  const handleEmailClick = () => {
    trackEvent.contactClick();
  };

  return (
    <footer className="border-t border-slate-200/60 bg-gradient-to-b from-white to-slate-50/30 mt-24">
      <div className="container mx-auto max-w-6xl px-4 py-16">
        <motion.div 
          className="text-center space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Connect text */}
          <motion.h3 
            className="text-lg font-semibold text-slate-700 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Connect
          </motion.h3>

          {/* Social Icons */}
          <motion.div 
            className="flex justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                variant="ghost"
                size="lg"
                onClick={handleLinkedinClick}
                className="
                  rounded-2xl px-6 py-4 h-auto
                  hover:bg-slate-100 hover:shadow-lg
                  transition-all duration-300 group
                  border border-slate-200/60 hover:border-slate-300
                "
                asChild
              >
                <a href="https://www.linkedin.com/in/ravi-kunapareddy/" target="_blank" rel="noopener noreferrer">
                  <div className="flex flex-col items-center space-y-2">
                    <Linkedin className="h-6 w-6 text-slate-600 group-hover:text-slate-800 transition-colors" />
                    <span className="text-xs font-medium text-slate-600 group-hover:text-slate-800 transition-colors">LinkedIn</span>
                  </div>
                </a>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                variant="ghost"
                size="lg"
                onClick={handleEmailClick}
                className="
                  rounded-2xl px-6 py-4 h-auto
                  hover:bg-slate-100 hover:shadow-lg
                  transition-all duration-300 group
                  border border-slate-200/60 hover:border-slate-300
                "
                asChild
              >
                <a href="mailto:ravitejakunapareddy09@gmail.com">
                  <div className="flex flex-col items-center space-y-2">
                    <Mail className="h-6 w-6 text-slate-600 group-hover:text-slate-800 transition-colors" />
                    <span className="text-xs font-medium text-slate-600 group-hover:text-slate-800 transition-colors">Email</span>
                  </div>
                </a>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button
                variant="ghost"
                size="lg"
                onClick={handleGithubClick}
                className="
                  rounded-2xl px-6 py-4 h-auto
                  hover:bg-slate-100 hover:shadow-lg
                  transition-all duration-300 group
                  border border-slate-200/60 hover:border-slate-300
                "
                asChild
              >
                <a href="https://github.com/RaviKunapareddy" target="_blank" rel="noopener noreferrer">
                  <div className="flex flex-col items-center space-y-2">
                    <Github className="h-6 w-6 text-slate-600 group-hover:text-slate-800 transition-colors" />
                    <span className="text-xs font-medium text-slate-600 group-hover:text-slate-800 transition-colors">GitHub</span>
                  </div>
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Copyright */}
          <motion.div 
            className="pt-8 border-t border-slate-200/40"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="text-sm text-slate-500 font-medium">
              © 2025 Raviteja Kunapareddy
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
} 