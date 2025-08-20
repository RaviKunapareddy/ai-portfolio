'use client';

import { Project } from '@/data/projects';
import ChatbotDemo from './project-demos/ChatbotDemo';
import ResearchAgentDemo from './project-demos/ResearchAgentDemo';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench } from 'lucide-react';

// Treat only real, deployable URLs as "connected"
function isValidApiEndpoint(url?: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (!/^https?:\/\//i.test(trimmed)) return false;
  const lower = trimmed.toLowerCase();
  // Filter out placeholders and local/dev hosts
  if (lower.includes('your-')) return false;
  if (lower.includes('example.com')) return false;
  if (lower.includes('localhost')) return false;
  return true;
}

interface LiveDemoInterfaceProps {
  project: Project;
}

export function LiveDemoInterface({ project }: LiveDemoInterfaceProps) {
  // Route to appropriate demo component based on project ID
  const renderDemoComponent = () => {
    switch (project.id) {
      case 'ai-chatbot':
        return <ChatbotDemo apiEndpoint={project.apiEndpoint} />;
      case 'research-agent':
        return <ResearchAgentDemo apiEndpoint={project.apiEndpoint} />;
      
      default:
        return (
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                {project.title} - Demo Interface
              </CardTitle>
              <CardDescription>
                Custom demo interface for {project.title} is being developed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Wrench className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="mb-2">Demo interface coming soon!</p>
                <p className="text-sm">
                  This project&apos;s interactive demo is currently under development.
                </p>
                {isValidApiEndpoint(project.apiEndpoint) && (
                  <p className="text-sm mt-4 text-green-600">
                    ✓ Backend API connected and ready
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Live Demo</h2>
        <p className="text-muted-foreground">
          Try out {project.title} with real functionality. This demo connects to live backend APIs.
        </p>
      </div>
      
      {renderDemoComponent()}
    </div>
  );
} 