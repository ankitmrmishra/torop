# Torop

A modern Next.js application with authentication and a beautiful landing page.

## Features

- ⚡ Next.js 16 with Turbopack
- 🎨 Tailwind CSS v4
- 🔐 Better Auth for authentication
- 🎭 Framer Motion animations
- 🌙 Dark mode support
- 📱 Fully responsive design
- 🎯 TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

- `BETTER_AUTH_SECRET`: A random secret key for authentication
- `BETTER_AUTH_URL`: Your application URL (http://localhost:3000 for development)

4. Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm format` - Format code with Prettier

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── sign-in/          # Sign in page
│   ├── sign-up/          # Sign up page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── landing/          # Landing page components
│   ├── ui/               # UI components (Button, Input, Card, etc.)
│   └── theme-provider.tsx
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
│   ├── auth.ts          # Better Auth configuration
│   ├── auth-client.ts   # Auth client for frontend
│   └── utils.ts         # Utility functions
└── public/              # Static assets

```

## Authentication

This project uses [Better Auth](https://better-auth.com) for authentication. The default setup includes:

- Email/Password authentication
- SQLite database (can be changed in `lib/auth.ts`)
- Protected routes via middleware

## Customization

### Adding UI Components

UI components are built with Radix UI and Tailwind CSS. Add new components in `components/ui/`.

### Styling

Global styles are in `app/globals.css`. The project uses Tailwind CSS v4 with CSS variables for theming.

### Database

By default, the app uses SQLite. To use a different database, update `lib/auth.ts`:

```typescript
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: {
    // Your database configuration
  },
  // ... other config
});
```

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables
4. Deploy

Remember to set up a production database and update `BETTER_AUTH_URL` to your production URL.

## License

MIT
