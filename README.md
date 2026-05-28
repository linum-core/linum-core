# 🧵 Linum Core - Portfolio Website

**Professional Portfolio for Linum Core - A Company Restoring Digital Connections**

![Status](https://img.shields.io/badge/Status-In%20Development-yellow?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=flat-square&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)

---

## 🎯 Project Overview

**Linum Core** (from Latin: "linen" - plant used to make threads and fabrics) is a modern portfolio website showcasing professional expertise in systems development, maintenance, and consulting.

### Core Message
> **"There's an unseen connection… We build it, not by creating systems but by restoring connections."**

### CEO
**Gabriel Gomes**

---

## 📚 Documentation

This repository contains comprehensive documentation for the Linum Core portfolio project:

### Core Documents
- **[PROJECT_SPEC.md](./PROJECT_SPEC.md)** - Complete project specification from Notion
- **[TECHNICAL_SETUP.md](./TECHNICAL_SETUP.md)** - Technical architecture and setup guide
- **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** - Design system, colors, typography, animations

### Information Sources
- **Primary Source:** [Notion Documentation](https://www.notion.so/Meu-Site-3512da5f14b2809ebcaac66b58a8a95b?source=copy_link)
- **Design Assets:** `/Users/gabrielgv/Desktop/linum core/designs`

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone repository
git clone <repository-url>
cd linum-core-portifolio

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Access the application at `http://localhost:3000`

---

## 📁 Project Structure

```
linum-core-portifolio/
├── PROJECT_SPEC.md                    # Full specification
├── TECHNICAL_SETUP.md                 # Technical documentation
├── DESIGN_SYSTEM.md                   # Design guidelines
├── README.md                          # This file
├── .env.example                       # Environment template
├── next.config.js                     # Next.js configuration
├── tailwind.config.js                 # Tailwind configuration
├── tsconfig.json                      # TypeScript configuration
├── package.json                       # Dependencies
│
├── public/                            # Static assets
│   ├── logos/                        # Logo variations
│   ├── images/                       # Optimized images
│   └── icons/                        # SVG icons
│
└── src/
    ├── app/                          # Next.js app directory
    │   ├── layout.tsx               # Root layout
    │   ├── page.tsx                 # Home page
    │   ├── portfolio/               # Portfolio section
    │   ├── about/                   # About/CEO section
    │   ├── competencies/            # Competencies section
    │   ├── contact/                 # Contact section
    │   ├── feedbacks/               # Feedbacks section
    │   └── ceo/                     # CEO profile
    │
    ├── components/                  # Reusable React components
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   ├── Hero.tsx
    │   ├── Navigation.tsx
    │   ├── PortfolioCard.tsx
    │   ├── SkillsRadar.tsx
    │   ├── FeedbackCarousel.tsx
    │   └── ...
    │
    ├── styles/                      # Global styles
    │   └── globals.css
    │
    ├── hooks/                       # Custom React hooks
    │   └── useScrollAnimation.ts
    │
    ├── lib/                         # Utility libraries
    │   ├── api/                    # API client & endpoints
    │   └── utils.ts
    │
    ├── types/                       # TypeScript type definitions
    │   └── index.ts
    │
    ├── i18n/                        # Internationalization
    │   ├── config.ts
    │   └── locales/
    │       ├── en-US.json
    │       ├── pt-BR.json
    │       └── es-ES.json
    │
    └── store/                       # State management (Zustand)
        └── appStore.ts
```

---

## 🎨 Design System

### Colors
- **Primary:** `#1a1a1a` (Dark Gray/Black)
- **Secondary:** `#d4af37` (Sophisticated Gold)
- **Accent:** `#00d9ff` (Modern Cyan)

### Fonts
- **Headlines:** Cinzel (serif)
- **Subtitles:** Jomolhari (serif)
- **Body:** Inter (sans-serif)
- **Code:** Fira Code (monospace)

### Animations
✨ Light 3D cube (Resend/ToDesktop style)
✨ Smooth page entrance (Superpower style)
✨ Dynamic section icons
✨ Smooth scroll reveals
✨ Luminous border effects
✨ Interaction feedback (hover/click)

*See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for complete design documentation*

---

## 🌍 Features

### ✅ Implemented
- [ ] Header with navigation
- [ ] Home/Hero section
- [ ] Portfolio showcase with filtering
- [ ] About/CEO section with skills radar
- [ ] Competencies section
- [ ] Feedbacks carousel
- [ ] Contact section
- [ ] Footer
- [ ] i18n support (EN, PT-BR, ES)
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Accessibility (WCAG)

### 🔄 In Progress
- Portfolio projects integration
- API connection layer
- Contact form submission
- Animation refinements

### 📋 Planned
- Admin dashboard
- Blog section
- Testimonials management
- Analytics integration

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 15
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript 5
- **Animations:** Framer Motion 11
- **State Management:** Zustand 4
- **i18n:** react-i18next 14
- **Charts:** Recharts 2
- **HTTP Client:** Axios 1

### Development
- **Code Quality:** ESLint, Prettier, Stylelint
- **Testing:** Jest, React Testing Library
- **Build:** Next.js built-in

### Deployment
- **Recommended:** Vercel (optimized for Next.js)
- **Alternative:** Netlify, AWS Amplify

---

## 🔐 Security & Performance

### Security Measures
- ✅ Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- ✅ CORS properly configured
- ✅ Rate limiting ready
- ✅ Environment variables protection

### Performance Optimization
- ✅ Image optimization (Next.js Image)
- ✅ Code splitting & lazy loading
- ✅ CSS minification (Tailwind)
- ✅ Font optimization
- ✅ Responsive images

### Accessibility
- ✅ WCAG 2.1 Level AA compliance target
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Color contrast compliance

---

## 📚 Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Build
npm run build            # Production build
npm start               # Start production server

# Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run format          # Format with Prettier
npm run type-check      # Check TypeScript types

# Testing
npm test                # Run Jest tests
npm test:watch         # Run tests in watch mode
npm test:coverage      # Generate coverage report
```

---

## 🌍 Internationalization

The website supports **three languages**:
- 🇺🇸 **English (USA)** - Primary language
- 🇧🇷 **Portuguese (Brazil)**
- 🇪🇸 **Spanish**

Language files are located in `src/i18n/locales/`

**Current Priority:** English (USA) - Portuguese and Spanish to follow

---

## 📱 Responsive Design

Optimized for all screen sizes:
- 📱 Mobile: 320px - 640px
- 📱 Tablet: 641px - 1024px
- 💻 Desktop: 1025px - 1440px
- 🖥️ Wide: 1441px - 1920px
- 🖥️ Ultra Wide: 1921px+

---

## 🔗 References & Inspiration

**Design Inspirations:**
- [Resend.com](https://resend.com/) - 3D cube, smooth animations
- [ToDesktop.com](https://www.todesktop.com/) - Modern design, 3D elements
- [Superpower.com/healthgap](https://superpower.com/healthgap) - Entrance animations
- [Mobbin - Rox](https://mobbin.com/) - UI/UX patterns
- [Monologue.to](https://www.monologue.to/) - Elegant design

**Documentation & Resources:**
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🤝 Contributing

### Development Workflow
1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "feat: your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

### Code Standards
- Follow ESLint rules
- Use TypeScript for type safety
- Write descriptive commit messages
- Update documentation as needed

---

## 🐛 Bug Reports & Feature Requests

- **Bug Report:** Open an issue with "bug:" prefix
- **Feature Request:** Open an issue with "feat:" prefix
- **Question:** Open an issue with "question:" prefix

Include:
- Clear description
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots if applicable

---

## 📞 Contact & Support

**Project Owner:** Gabriel Gomes (CEO)

**Repository Location:**
```
/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio
```

**Design Assets Location:**
```
/Users/gabrielgv/Desktop/linum core/designs
```

**Primary Documentation:**
```
https://www.notion.so/Meu-Site-3512da5f14b2809ebcaac66b58a8a95b
```

---

## 📄 License

All rights reserved © 2026 Linum Core. 

This project and its contents are proprietary and confidential.

---

## 🎯 Project Status

**Current Phase:** Planning & Initial Setup
- ✅ Specification complete
- ✅ Documentation created
- ⏳ Design system finalization
- ⏳ Initial implementation
- ⏳ Component development
- ⏳ Integration & refinement
- ⏳ Testing & optimization
- ⏳ Deployment

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-05-20 | Initial project specification and documentation |

---

## 💡 Key Design Principles

1. **Sophistication** - Professional, elegant, trustworthy
2. **Connection** - Visual metaphor of linked threads/wires
3. **Fluidity** - Smooth animations, seamless interactions
4. **Clarity** - Clear messaging, intuitive navigation
5. **Performance** - Fast, responsive, optimized
6. **Accessibility** - Inclusive for all users
7. **Modernity** - Contemporary design, modern tech stack

---

**Last Updated:** 2026-05-20
**Documentation Version:** 1.0
