'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Play, Loader2 } from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

import { trackEvent } from '@/utils/analytics';
import type React from 'react';
import { useState } from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  status: 'live' | 'coming-soon' | 'beta' | 'prototype';
  projectId: string;
  githubUrl?: string;
}

const techDescriptions: Record<string, string> = {
  'LLM': 'Large Language Models for AI reasoning',
  'RAG': 'Retrieval-Augmented Generation for context-aware responses',
  'FastAPI': 'Modern Python web framework for APIs',
  'Next.js': 'React framework for production applications',
  'OpenAI': 'GPT models and AI services',
  'Vector DB': 'Database optimized for similarity search',
  'TypeScript': 'Type-safe JavaScript for better code quality',
  'AWS': 'Amazon Web Services cloud platform',
  'Pinecone': 'Vector database for AI applications',
  'Supabase': 'Open-source Firebase alternative',
  'LangChain': 'Framework for building LLM applications',
  'Agents': 'Autonomous AI systems that can take actions',
  'Python': 'Programming language for AI and backend development',
  'Zappa': 'Serverless Python deployment framework',
  'LangGraph': 'Framework for building stateful, multi-actor applications',
  'AutoGen': 'Multi-agent conversation framework'
};

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'live':
      return {
        text: 'Live',
        className: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 hover:from-green-200 hover:to-emerald-200',
        icon: '🟢',
        metrics: { users: '1.2K', uptime: '99.9%', queries: '10K+' }
      };
    case 'beta':
      return {
        text: 'Beta',
        className: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200 hover:from-blue-200 hover:to-indigo-200',
        icon: '🔵',
        metrics: { users: '50+', uptime: '98.5%', queries: '500+' }
      };
    case 'prototype':
      return {
        text: 'Prototype',
        className: 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-700 border-slate-200 hover:from-slate-200 hover:to-gray-200',
        icon: '⚪',
        metrics: { progress: '70%', stage: 'Testing', status: 'Active' }
      };
    default:
      return {
        text: 'Deploying',
        className: 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-200 hover:from-amber-200 hover:to-orange-200',
        icon: '🚧',
        metrics: { progress: '85%', eta: '2 weeks', tests: 'Passing' }
      };
  }
};

// Removed unused project metrics helper to satisfy ESLint

export default function ProjectCard({ 
  title, 
  description, 
  tags, 
  status,
  projectId,
  githubUrl,
}: ProjectCardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const statusConfig = getStatusConfig(status);

  // Advanced hover effects
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleCardClick = () => {
    trackEvent.projectCardClick(projectId);
    router.push(`/projects/${projectId}`);
  };

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    trackEvent.tryProjectClick(projectId);
    router.push(`/projects/${projectId}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -16, scale: 1.02 }}
      className="h-full perspective-1000"
      style={{ perspective: 1000 }}
      onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="h-full"
      >
        <Card 
          className="h-full group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-700 rounded-3xl bg-gradient-to-br from-white via-slate-50/50 to-white dark:from-slate-900 dark:to-slate-800/80 overflow-hidden relative backdrop-blur-sm"
          onClick={handleCardClick}
        >
        {/* Multiple layered backgrounds for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/60 via-transparent to-slate-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200" />
        
        {/* Enhanced border glow */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-slate-200/30 via-slate-100/20 to-slate-200/30 blur-sm" />
          <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-r from-white via-slate-50/80 to-white" />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <CardTitle className="text-xl font-bold tracking-tight group-hover:text-slate-800 transition-colors duration-300 mb-2">
                  {title}
                </CardTitle>
                

              </div>
              
              <Badge className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 group-hover:scale-105 ml-4 ${statusConfig.className}`}>
                {statusConfig.icon} {statusConfig.text}
              </Badge>
            </div>
            
            <CardDescription className="text-base leading-relaxed text-muted-foreground group-hover:text-slate-700 transition-colors duration-300">
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {/* Enhanced Technology Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, y: -2 }}
                >
                  <Badge 
                    variant="outline" 
                    className="
                      text-xs px-3 py-1.5 rounded-full 
                      hover:bg-slate-100 hover:border-slate-400 hover:text-slate-800
                      transition-all duration-300 cursor-help 
                      relative group/tooltip
                      border-slate-200 bg-slate-50/80 backdrop-blur-sm
                      hover:shadow-md
                    "
                    title={techDescriptions[tag] || tag}
                  >
                    {tag}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 shadow-xl">
                      {techDescriptions[tag] || tag}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                    </div>
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={handlePreviewClick}
                size="sm" 
                className="
                  flex-1 rounded-xl hover:scale-105 transition-all duration-300
                  bg-gradient-to-r from-slate-800 to-slate-700 text-white 
                  hover:from-slate-700 hover:to-slate-600
                  shadow-lg hover:shadow-xl font-medium
                  group-hover:shadow-slate-500/30
                  relative overflow-hidden
                  disabled:from-slate-400 disabled:to-slate-300
                "
                disabled={status === 'coming-soon' || isLoading}
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                    {status === 'coming-soon' ? 'Preview UI' : 'Try It Live'}
                  </>
                )}
              </Button>
              {githubUrl && (
                <a 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title="View source code" 
                  onClick={(e: React.MouseEvent) => { e.stopPropagation(); trackEvent.projectSource(projectId); }}
                  className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium rounded-xl border-2 border-slate-200 hover:bg-slate-50 shadow-lg hover:shadow-xl hover:border-slate-400 group-hover:shadow-slate-500/25 backdrop-blur-sm px-4 py-2 transition-all duration-300"
                >
                  <ExternalLink className="h-4 w-4 transition-transform hover:rotate-12" />
                </a>
              )}
            </div>
            
            {/* Progress indicator for coming-soon projects */}
            {status === 'coming-soon' && (
              <motion.div 
                className="mt-4 pt-4 border-t border-slate-200/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span>Development Progress</span>
                  <span className="font-semibold">85%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-slate-600 to-slate-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            )}
          </CardContent>
        </div>
      </Card>
      </motion.div>
    </motion.div>
  );
} 