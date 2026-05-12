<div align="center">
  <img src="apps/web/public/logo.svg" alt="Torop Logo" width="120" height="120">
  
  # Torop
  
  **Product analytics that knows your data.**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
  [![pnpm](https://img.shields.io/badge/pnpm-9.0-orange)](https://pnpm.io/)
  
  [Demo](https://torop.dev) · [Documentation](https://docs.torop.dev) · [Report Bug](https://github.com/torop/torop/issues) · [Request Feature](https://github.com/torop/torop/issues)
</div>

---

## 🚀 Overview

Torop is a modern, developer-first analytics platform built with Next.js 15, TypeScript, and shadcn/ui. This monorepo contains a premium landing page and analytics dashboard designed to rival industry leaders like Mixpanel, Linear, and Vercel.

### ✨ Key Features

- 🎨 **Premium Design System** - Monochrome-first palette with intentional accent colors
- 📱 **Fully Responsive** - Mobile-first design from 320px to 4K displays
- ⚡ **Blazing Fast** - Built on Next.js 15 with App Router and React Server Components
- 🎭 **Smooth Animations** - Premium Framer Motion animations throughout
- 🧩 **Component Library** - Shared UI components powered by shadcn/ui
- 📦 **Monorepo Architecture** - Turborepo for optimal build performance
- 🎯 **Type-Safe** - End-to-end TypeScript with strict mode
- 🎨 **Tailwind CSS** - Utility-first styling with custom design tokens

---

## 📸 Screenshots

<div align="center">
  <img src="docs/screenshots/hero.png" alt="Hero Section" width="800">
  <p><em>Cinematic hero section with asymmetrical layout</em></p>
  
  <img src="docs/screenshots/dashboard.png" alt="Dashboard Preview" width="800">
  <p><em>Interactive dashboard with real-time analytics</em></p>
</div>

---

## 🏗️ Architecture

This project uses a monorepo structure powered by Turborepo and pnpm workspaces:

```
torop/
├── apps/
│   └── web/                    # Next.js 15 application
│       ├── app/                # App Router pages
│       ├── components/         # App-specific components
│       │   └── landing/        # Landing page sections
│       ├── hooks/              # Custom React hooks
│       ├── lib/                # Utilities and constants
│       └── public/             # Static assets
├── packages/
│   ├── ui/                     # Shared UI component library
│   │   └── src/
│   │       ├── components/     # shadcn/ui components
│   │       ├── hooks/          # Shared hooks
│   │       ├── lib/            # Utilities (cn, etc.)
│   │       └── styles/         # Global styles & fonts
│   ├── eslint-config/          # Shared ESLint configurations
│   └── typescript-config/      # Shared TypeScript configurations
└── turbo.json                  # Turborepo pipeline configuration
```

---

## 🛠️ Tech Stack

### Core

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first styling

### UI & Animation

- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready animations
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components

### Tooling

- **[Turborepo](https://turbo.build/)** - High-performance build system
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

### Fonts

- **SF Pro Display** - Apple's premium system font

---

## 🚦 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **pnpm** 9.0 or later

```bash
# Install pnpm globally
npm install -g pnpm
```

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/torop/torop.git
cd torop
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Start the development server**

```bash
pnpm dev
```

4. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📦 Available Scripts

### Root Commands

```bash
# Start all apps in development mode
pnpm dev

# Build all apps and packages
pnpm build

# Run linting across all packages
pnpm lint

# Format code with Prettier
pnpm format

# Clean all build artifacts and node_modules
pnpm clean
```

### App-Specific Commands

```bash
# Run commands in specific workspace
pnpm --filter web dev
pnpm --filter web build
pnpm --filter ui build
```

---

## 🧩 Working with Components

### Adding shadcn/ui Components

To add new shadcn/ui components to your project:

```bash
# Add a component to the web app
pnpm dlx shadcn@latest add button -c apps/web

# Add a component to the shared UI package
pnpm dlx shadcn@latest add card -c packages/ui
```

Components are automatically placed in `packages/ui/src/components/` for sharing across apps.

### Using Components

Import components from the shared UI package:

```tsx
import { Button } from "@workspace/ui/components/button"
import { Card } from "@workspace/ui/components/card"

export function MyComponent() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  )
}
```

### Creating Custom Components

1. Create your component in `packages/ui/src/components/`
2. Export it from the package
3. Import it in your app using `@workspace/ui/components/[name]`

```tsx
// packages/ui/src/components/custom-button.tsx
export function CustomButton() {
  return <button className="...">Custom</button>
}

// apps/web/app/page.tsx
import { CustomButton } from "@workspace/ui/components/custom-button"
```

---

## 🎨 Design System

### Color Palette

```css
/* Background Colors */
--background: #050505 /* Primary background */ --surface: #0b0b0f
  /* Elevated surface */ --elevated: #101014 /* Highest elevation */
  /* Text Colors */ --primary-text: #f5f5f5 /* Primary text */
  --secondary-text: #a1a1aa /* Secondary text */ /* Accent Colors */
  --accent: #6366f1 /* Primary accent (Indigo) */ --accent-secondary: #8b5cf6
  /* Secondary accent (Purple) */ /* Borders */
  --border: rgba(255, 255, 255, 0.06) /* Subtle borders */;
```

### Typography Scale

```tsx
// Hero Heading
className="text-6xl lg:text-8xl tracking-tight leading-[0.92]"

// Section Heading
className="text-4xl lg:text-6xl"

// Body Text
className="text-zinc-400 leading-relaxed max-w-[600px]"
```

### Spacing System

```tsx
// Section Padding
className="py-32 lg:py-44"

// Container
className="max-w-7xl mx-auto px-6"

// Component Gaps
className="gap-8 lg:gap-20"
```

---

## 📱 Responsive Breakpoints

```tsx
// Mobile First Approach
sm: '640px'   // Small devices
md: '768px'   // Medium devices
lg: '1024px'  // Large devices
xl: '1280px'  // Extra large devices
2xl: '1536px' // 2X Extra large devices
```

### Example Usage

```tsx
<div className="text-2xl sm:text-4xl lg:text-6xl xl:text-8xl">
  Responsive Typography
</div>
```

---

## 🎭 Animation Guidelines

### Framer Motion Presets

```tsx
// Fade In Up
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}

// Scale In
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.6 }}

// Slide In
initial={{ x: -20, opacity: 0 }}
animate={{ x: 0, opacity: 1 }}
transition={{ duration: 0.4 }}
```

### Easing Curves

```tsx
// Premium easing (recommended)
ease: [0.22, 1, 0.36, 1]  // Smooth, elegant

// Quick interactions
ease: "easeOut"

// Bouncy (use sparingly)
type: "spring"
stiffness: 100
damping: 10
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in `apps/web/`:

```bash
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://api.torop.dev

# Analytics (optional)
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id

# Feature Flags (optional)
NEXT_PUBLIC_ENABLE_BETA_FEATURES=false
```

### Tailwind Configuration

Customize your design system in `packages/ui/src/styles/globals.css`:

```css
@theme inline {
  --font-sans: "SF Pro Display", system-ui, sans-serif;
  --color-primary: 99 102 241;
  --radius: 0.5rem;
}
```

---

## 📚 Project Structure Deep Dive

### Landing Page Components

```
apps/web/components/landing/
├── nav-bar.tsx              # Floating navbar with mobile menu
├── hero-section.tsx         # Cinematic hero with dashboard visual
├── trusted-by.tsx           # Logo strip
├── dashboard-preview.tsx    # Interactive dashboard showcase
├── features.tsx             # Asymmetrical feature grid
├── workflow.tsx             # Analytics workflow visualization
├── developer-api.tsx        # Code examples with syntax highlighting
├── stats.tsx                # Metrics section
├── testimonials-section.tsx # Customer testimonials
├── pricing.tsx              # Pricing CTA
└── footer.tsx               # Minimal footer
```

### Shared UI Package

```
packages/ui/src/
├── components/
│   ├── button.tsx           # Button component
│   ├── sheet.tsx            # Sheet/drawer component
│   └── [other-components]   # Add more as needed
├── hooks/
│   └── use-*.ts             # Shared hooks
├── lib/
│   └── utils.ts             # Utility functions (cn, etc.)
└── styles/
    └── globals.css          # Global styles & design tokens
```

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**

```bash
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Vercel auto-detects Next.js and Turborepo

3. **Configure Build Settings**
   - Root Directory: `apps/web`
   - Build Command: `pnpm build`
   - Output Directory: `.next`

### Other Platforms

```bash
# Build for production
pnpm build

# The output will be in apps/web/.next
# Deploy this directory to your hosting provider
```

---

## 🧪 Testing

```bash
# Run tests (when configured)
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run E2E tests
pnpm test:e2e
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow the existing code style
- Run `pnpm lint` before committing
- Write meaningful commit messages
- Add tests for new features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - For the amazing component library
- [Vercel](https://vercel.com/) - For Next.js and deployment platform
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - For smooth animations
- [Turborepo](https://turbo.build/) - For the monorepo build system

---

## 📞 Support

- 📧 Email: support@torop.dev
- 💬 Discord: [Join our community](https://discord.gg/torop)
- 🐦 Twitter: [@toropanalytics](https://twitter.com/toropanalytics)
- 📖 Documentation: [docs.torop.dev](https://docs.torop.dev)

---

## 🗺️ Roadmap

- [ ] Dashboard implementation
- [ ] Real-time analytics engine
- [ ] Session replay functionality
- [ ] Feature flags system
- [ ] API documentation
- [ ] Mobile app
- [ ] Self-hosted option
- [ ] Enterprise features

---

<div align="center">
  <p>Built with ❤️ by the Torop team</p>
  <p>
    <a href="https://torop.dev">Website</a> •
    <a href="https://docs.torop.dev">Docs</a> •
    <a href="https://github.com/torop/torop">GitHub</a> •
    <a href="https://twitter.com/toropanalytics">Twitter</a>
  </p>
</div>
