export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: 'live' | 'beta' | 'prototype' | 'coming-soon';
  apiEndpoint?: string;
  demoUrl?: string;
  githubUrl?: string;
  techStack: string[];
  features: string[];
  createdAt: string;
  updatedAt: string;
}

export const projects: Project[] = [
  {
    id: 'ai-chatbot',
    title: "AI Shopping Assistant",
    description: "Intelligent e-commerce chatbot with product recommendations and natural conversation. Features real-time chat, cart integration, and feedback system.",
    tags: ["Chatbot", "AI", "E-commerce", "Real-time"],
    status: "live",
    techStack: ["Next.js", "TypeScript", "Tailwind", "OpenAI", "EC2"],
    features: ["conversational-ai", "product-search", "cart-integration", "feedback-system"],
    apiEndpoint: process.env.NEXT_PUBLIC_CHATBOT_API,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15"
  },
  {
    id: 'research-agent',
    title: 'Agentic Research System',
    description: 'Autonomous research agent built with LangGraph + Gemini with planning, research, execution, reflection and dual memory.',
    tags: ['Agentic', 'Research', 'LangGraph', 'FastAPI'],
    status: 'live',
    techStack: ['FastAPI', 'LangGraph', 'Gemini', 'Pinecone', 'Neon', 'Python'],
    features: ['autonomous-planning', 'multi-step-reasoning', 'dynamic-tools', 'memory', 'reflection', 'status-api'],
    apiEndpoint: process.env.NEXT_PUBLIC_RESEARCH_AGENT_API,
    createdAt: '2025-08-16',
    updatedAt: '2025-08-16'
  }
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.status !== 'coming-soon');
}