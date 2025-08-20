# GenAI Portfolio

A modern, interactive portfolio showcasing GenAI projects with live demonstrations.

## 🚀 Features

- **Interactive Project Demos**: Live functionality for each GenAI project
- **Modern Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Analytics Tracking**: Plausible analytics for recruiter engagement
- **Responsive Design**: Mobile-first approach with beautiful UI
- **SEO Optimized**: Proper metadata and structure for search engines

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Analytics**: Plausible

### Backend (Per Project)
- **API**: FastAPI
- **Deployment**: AWS Lambda via Zappa
- **Database**: Supabase/Pinecone (project-specific)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Landing page
│   ├── project-one/        # Project 1 route
│   ├── project-two/        # Project 2 route
│   └── project-three/      # Project 3 route
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── Navbar.tsx          # Navigation component
│   ├── HeroSection.tsx     # Landing page hero
│   ├── ProjectCard.tsx     # Project showcase cards
│   └── Footer.tsx          # Site footer
└── utils/
    └── analytics.ts        # Analytics tracking utilities
```

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Analytics Events

The portfolio tracks key recruiter interactions:

- `resume_download` - Resume PDF downloads
- `project_card_click` - Project card interactions
- `try_project_click` - Live demo button clicks
- `github_click` - GitHub profile visits
- `contact_click` - Contact/LinkedIn clicks

## 🎯 Development Roadmap

### Phase 1: Foundation ✅
- [x] Next.js setup with TypeScript
- [x] UI components with shadcn/ui
- [x] Project routing structure
- [x] Analytics integration
- [x] Responsive design

### Phase 2: Project Development
- [ ] Build first GenAI project backend
- [ ] Deploy via Zappa to AWS Lambda  
- [ ] Connect frontend to live API
- [ ] Add interactive demo interface

### Phase 3: Scale & Polish
- [ ] Complete all three projects
- [ ] SEO optimization
- [ ] Performance tuning
- [ ] Production deployment

## 🌐 Deployment

### Frontend
- **Platform**: Vercel
- **Domain**: Custom domain setup
- **Auto-deploy**: Connected to Git repository

### Backend APIs
- **Platform**: AWS Lambda
- **Deployment**: Zappa
- **API Gateway**: Auto-configured per project

## 📝 Environment Variables

Create a `.env.local` file for local development:

```env
# Site URL (for metadata/canonical)
NEXT_PUBLIC_SITE_URL=https://your-site-url.com

# Analytics (Plausible)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com

# Live API Endpoints
NEXT_PUBLIC_RESEARCH_AGENT_API=https://subjective-martha-researchagent-ebdaf861.koyeb.app/api
NEXT_PUBLIC_CHATBOT_API=http://52.91.104.111
```

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome!

## 📄 License

MIT License - feel free to use this as inspiration for your own portfolio.

---

**Built with ❤️ using Next.js, TypeScript, and modern AI technologies.**
