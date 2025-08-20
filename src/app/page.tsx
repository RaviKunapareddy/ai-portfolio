'use client';

import HeroSection from '@/components/HeroSection';
import ProjectCard from '@/components/ProjectCard';
import { motion } from 'framer-motion';
import { getFeaturedProjects } from '@/data/projects';

const projects = getFeaturedProjects();

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50/30 via-white to-slate-50/20 relative">
      <HeroSection />
      
      {/* About Section - Personal Introduction */}
      <motion.section 
        id="about" 
        className="py-16 md:py-20 relative bg-gradient-radial from-slate-50 via-slate-50 to-slate-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        {/* Enhanced background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Primary floating orbs */}
          <motion.div 
            className="absolute top-20 right-0 w-80 h-80 bg-gradient-to-l from-slate-100/40 via-slate-100/30 to-transparent rounded-full blur-3xl"
            animate={{
              x: [0, 20, -10, 15, 0],
              y: [0, -15, 10, -8, 0],
              scale: [1, 1.05, 0.98, 1.02, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-to-r from-slate-100/30 via-slate-50/25 to-transparent rounded-full blur-3xl"
            animate={{
              x: [0, -20, 15, -10, 0],
              y: [0, 15, -20, 12, 0],
              scale: [1, 0.95, 1.08, 0.97, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5,
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-slate-50/20 to-transparent rounded-full blur-3xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          
          {/* Subtle geometric elements */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-2 h-2 bg-slate-300/20 rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            className="absolute top-3/4 right-1/4 w-1 h-1 bg-slate-400/25 rounded-full"
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>
        
        {/* Mesh gradient overlay matching hero */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 via-transparent to-slate-50/20"></div>

        {/* Centered container with balanced layout */}
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            
            {/* Streamlined Profile Sidebar */}
            <motion.div 
              className="lg:w-80 lg:sticky lg:top-8 lg:flex-shrink-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Profile Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-xl">RK</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 text-lg">Raviteja Kunapareddy</h3>
                  <p className="text-slate-600 text-sm">GenAI Engineer</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="text-center p-3 bg-white/40 rounded-lg border border-slate-200/30">
                    <div className="font-semibold text-slate-800 text-sm">22+</div>
                    <div className="text-xs text-slate-600">GitHub Repos</div>
                  </div>
                  <div className="text-center p-3 bg-white/40 rounded-lg border border-slate-200/30">
                    <div className="font-semibold text-slate-800 text-sm">AWS</div>
                    <div className="text-xs text-slate-600">ML Certified</div>
                  </div>
                </div>

                {/* Core Focus */}
                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 text-sm mb-3">Core Focus</h4>
                  <div className="space-y-2">
                    <div className="text-xs text-slate-700 bg-slate-50 rounded-lg px-3 py-2">
                      GenAI Applications
                    </div>
                    <div className="text-xs text-slate-700 bg-slate-50 rounded-lg px-3 py-2">
                      Multi-Agent Systems
                    </div>
                    <div className="text-xs text-slate-700 bg-slate-50 rounded-lg px-3 py-2">
                      Production AI
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 text-sm mb-3">Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-700">Location</span>
                      <span className="text-xs text-slate-600">Remote/Hybrid</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-700">Availability</span>
                      <span className="text-xs text-green-600 font-medium">Open to Work</span>
                    </div>
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="space-y-2 mb-6">
                  <motion.a
                    href="mailto:ravitejakunapareddy09@gmail.com"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full px-4 py-2 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors text-sm text-center"
                  >
                    Get In Touch
                  </motion.a>
                  <motion.a
                    href="/Raviteja_Kunapareddy_Resume.pdf"
                    download
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors text-sm text-center"
                  >
                    Download Resume
                  </motion.a>
                </div>

                {/* Certifications */}
                <div className="pt-6 border-t border-slate-200/50 mb-6">
                  <h4 className="font-semibold text-slate-900 text-sm mb-3">Certifications</h4>
                  <div className="space-y-3">
                    <a 
                      href="https://www.credly.com/badges/1b1da8df-bfac-4c95-9b46-79dd8c313b2d" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block bg-gradient-to-r from-slate-50 to-slate-50 p-3 rounded-lg border border-slate-200/50 hover:from-slate-100 hover:to-slate-100 hover:border-slate-300/60 transition-all duration-200 group"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-4 h-4 bg-gradient-to-r from-slate-600 to-slate-700 rounded-sm flex items-center justify-center group-hover:scale-105 transition-transform">
                          <span className="text-white text-xs font-bold">A</span>
                        </div>
                        <div className="font-medium text-slate-800 text-xs group-hover:text-slate-900">AWS Certified ML Engineer</div>
                      </div>
                      <div className="text-slate-600 text-xs ml-6 group-hover:text-slate-700">Associate Level • 2025 • View Credential →</div>
                    </a>
                  </div>
                </div>

                {/* Education */}
                <div className="pt-6 border-t border-slate-200/50">
                  <h4 className="font-semibold text-slate-900 text-sm mb-3">Education</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="font-medium text-slate-800 text-xs">M.S. Management Information Systems</div>
                      <div className="text-slate-600 text-xs">Northern Illinois University • 2024</div>
                    </div>
                    <div>
                      <div className="font-medium text-slate-800 text-xs">B.Tech Computer Science</div>
                      <div className="text-slate-600 text-xs">JNTU Hyderabad • 2020</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Main Content - Centered and balanced */}
            <div className="flex-1 max-w-4xl lg:max-w-3xl">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                  About Me
                </h2>
                <p className="text-slate-600 text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-6">
                  The person behind the AI systems — my journey, values, and what drives me to build practical, real-world applications.
                </p>
                
                {/* Power Hook - Single Line Quote */}
                <div className="bg-slate-800 text-white px-8 py-6 rounded-2xl max-w-4xl mx-auto mb-8 shadow-lg">
                  <p className="text-xl md:text-2xl font-bold text-center leading-relaxed">
                    <span className="text-slate-300">&ldquo;</span>
                    <span className="text-white">The best AI is invisible — it just works, and users forget it&apos;s there.</span>
                    <span className="text-slate-300">&rdquo;</span>
                  </p>
                </div>
              </motion.div>

              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:border-slate-300/50 ring-1 ring-slate-200/20"
                >
                  {/* Who I Am */}
                  <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">Who I Am</h3>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-lg font-medium mb-4">
                      I&apos;m <strong className="text-slate-900 font-bold">Raviteja Kunapareddy</strong>, a GenAI engineer who builds functional AI systems that people actually use. 
                      I&apos;ve developed <strong className="text-slate-800 font-semibold">healthcare RAG systems with Gemini, multi-agent sales workflows with CrewAI, and fine-tuned financial LLMs with QLoRA</strong> — all deployed and documented on GitHub. 
                      My background spans classical ML (XGBoost, SHAP) to modern GenAI, giving me a solid foundation for building robust AI applications.
                    </p>
                    
                    {/* Key Achievements - Scannable */}
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                          <span className="text-slate-700 font-medium">22+ AI projects on GitHub</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                          <span className="text-slate-700 font-medium">Full-Stack AI Development</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                          <span className="text-slate-700 font-medium">AWS ML Engineer certified</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* What I Specialize In */}
                  <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">What I Specialize In</h3>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-lg font-medium">
                      I build full-stack LLM applications with <strong className="text-slate-800 font-semibold">persistent memory, vector search, and multi-agent routing</strong> — deployed on cloud infrastructure with containerized architecture. 
                      My recent work includes a healthcare RAG system using FAISS for semantic search, a financial analysis tool with fine-tuned Llama models, and multi-agent workflows that coordinate between different AI specialists. 
                      I focus on making AI systems that are reliable, maintainable, and actually solve business problems.
                    </p>
                  </div>

                  {/* What Drives Me */}
                  <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">What Drives Me</h3>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-lg font-medium">
                      I&apos;m passionate about <strong className="text-slate-800 font-semibold">making AI accessible and practical</strong> for real-world applications. 
                      There&apos;s something incredibly rewarding about taking research and turning it into tools that people actually use and benefit from. 
                      I believe the future of AI lies not in impressive demos, but in reliable systems that seamlessly integrate into existing workflows.
                    </p>
                  </div>

                  {/* Where I'm Headed */}
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">Where I&apos;m Headed</h3>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-lg font-medium">
                      I want to join a team building <strong className="text-slate-800 font-semibold">production AI systems that scale</strong> — things like internal RAG copilots, agent-based customer support flows, or document processing pipelines. 
                      I&apos;m particularly interested in roles where I can architect the backend infrastructure for LLM applications, optimize vector search performance, and ensure AI systems are reliable enough for real business use. 
                      My goal is to help teams ship AI features that users actually depend on, not just impressive demos.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* Featured Projects Section - Moved to Third Position */}
      <section id="projects" className="py-16 md:py-20 relative border-t border-slate-200/40">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Featured Projects</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              AI systems showcasing real-world applications.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  status={project.status}
                  projectId={project.id}
                  githubUrl={project.githubUrl}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Matrix Section - Moved to Fourth Position */}
      <section className="py-12 md:py-16 bg-slate-50/30 relative overflow-hidden">
        {/* Subtle background decoration matching portfolio theme */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-slate-100/20 to-slate-100/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-slate-100/15 to-slate-100/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Technical Expertise</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-6">
              From classical ML to modern GenAI systems
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Machine Learning Foundations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-lg hover:border-slate-300/50 transition-all duration-300 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-slate-800">ML Foundations</h3>
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "XGBoost + LightGBM", context: "Gradient boosting for structured data" },
                    { name: "Scikit-Learn", context: "Classification, regression, clustering" },
                    { name: "SHAP Explainability", context: "Model interpretation and trust" },
                    { name: "Pandas + NumPy", context: "Data manipulation and analysis" }
                  ].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group/skill hover:bg-slate-50/50 rounded-lg p-2 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
                        <span className="font-medium text-slate-800 text-sm">{skill.name}</span>
                      </div>
                      <p className="text-xs text-slate-600 ml-4">{skill.context}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* GenAI & LLMs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-lg hover:border-slate-300/50 transition-all duration-300 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-slate-800">GenAI & LLMs</h3>
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "LangChain + LangGraph", context: "Agent frameworks and workflows" },
                    { name: "RAG Architecture", context: "FAISS, vector search, retrieval" },
                    { name: "QLoRA Fine-tuning", context: "Custom model training (FinGPT)" },
                    { name: "CrewAI + Multi-Agent", context: "Orchestrated AI systems" }
                  ].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group/skill hover:bg-slate-50/50 rounded-lg p-2 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                        <span className="font-medium text-slate-800 text-sm">{skill.name}</span>
                      </div>
                      <p className="text-xs text-slate-600 ml-4">{skill.context}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Full-Stack Development */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-slate-200/50 hover:shadow-lg hover:border-slate-300/50 transition-all duration-300 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg text-slate-800">Development & Deployment</h3>
                  <div className="w-8 h-8 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Python + FastAPI", context: "Backend APIs and services" },
                    { name: "Next.js + TypeScript", context: "Modern web applications" },
                    { name: "Docker + Cloud", context: "Containerized deployment" }
                  ].map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="group/skill hover:bg-slate-50/50 rounded-lg p-2 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-1.5 h-1.5 bg-slate-600 rounded-full"></div>
                        <span className="font-medium text-slate-800 text-sm">{skill.name}</span>
                      </div>
                      <p className="text-xs text-slate-600 ml-4">{skill.context}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
