import { Brain, Compass, TrendingUp, Users, Wrench, type LucideIcon } from "lucide-react"

/** Icon shown in each skill-group header. */
export const groupIcons: Record<string, LucideIcon> = {
  Product: Compass,
  "AI & Data": Brain,
  "Leadership & Delivery": Users,
  "Growth & Platform": TrendingUp,
  Tools: Wrench,
}
