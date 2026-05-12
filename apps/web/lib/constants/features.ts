import {
  BarChart3,
  Play,
  Flag,
  GitBranch,
  Database,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

export const features: Feature[] = [
  {
    icon: BarChart3,
    title: "Product Analytics",
    description:
      "Funnels, retention, user paths. See exactly where users drop off.",
  },
  {
    icon: Play,
    title: "Session Replay",
    description: "Watch real user sessions tied to your analytics.",
  },
  {
    icon: Flag,
    title: "Feature Flags",
    description: "Ship features safely with flags and A/B tests.",
  },
  {
    icon: GitBranch,
    title: "Metric Trees",
    description: "Visualise how KPIs connect and what drives growth.",
  },
  {
    icon: Database,
    title: "Data Warehouse Sync",
    description: "Query your own database or connect to BigQuery, Snowflake.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description: "Ask questions in natural language and get instant answers.",
  },
]
