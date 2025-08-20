'use client';

import { getProjectById } from '@/data/projects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LiveDemoInterface } from '@/components/LiveDemoInterface';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Import all demo components for standalone rendering
import ChatbotDemo from '@/components/project-demos/ChatbotDemo';
import ResearchAgentDemo from '@/components/project-demos/ResearchAgentDemo';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const project = getProjectById(params.id as string);

  // Client-safe 404 redirect when project id is invalid
  useEffect(() => {
    if (!project) {
      router.replace('/404');
    }
  }, [project, router]);
 
  // Ensure page starts at top on mount unless deep-linking with a hash
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, []);
  if (!project) return null;
  
  // Route all projects as standalone apps
  switch (project.id) {
    case 'ai-chatbot':
      return <ChatbotDemo apiEndpoint={project.apiEndpoint} />;
    case 'research-agent':
      return <ResearchAgentDemo apiEndpoint={project.apiEndpoint} />;
    default:
      // Fallback to original project page layout for any unexpected ids
      break;
  }
  
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Navigation */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Link>
          </Button>
        </div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl font-bold">{project.title}</h1>
            <Badge variant="outline">{project.status}</Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            {project.description}
          </p>
        </motion.div>

        {/* Tech Stack - Hidden for chatbot */}
        {project.id !== 'ai-chatbot' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-semibold mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}

        {/* Live Demo Interface - Clean for chatbot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={project.id === 'ai-chatbot' ? '' : 'mb-12'}
        >
          {project.id !== 'ai-chatbot' && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Live Demo</h2>
              <p className="text-muted-foreground">
                Try out {project.title} with real functionality. This demo connects to live backend APIs.
              </p>
            </div>
          )}
          <LiveDemoInterface project={project} />
        </motion.div>

        {/* Project Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature) => (
                      <Badge key={feature} variant="outline">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {project.githubUrl && (
                  <div>
                    <Button asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        View Source Code
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
 