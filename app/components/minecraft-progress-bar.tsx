import { cn } from "@/lib/utils"

interface MinecraftProgressBarProps {
  value: number // 0-100
  color?: "red" | "green" | "blue" | "orange" | "purple"
  className?: string
}

export function MinecraftProgressBar({ value, color = "green", className }: MinecraftProgressBarProps) {
  const colors = {
    red: "bg-red-500 border-red-600",
    green: "bg-green-500 border-green-600",
    blue: "bg-blue-500 border-blue-600",
    orange: "bg-orange-500 border-orange-600",
    purple: "bg-purple-500 border-purple-600",
  }

  return (
    <div
      className={cn(
        "w-full h-4 bg-stone-600 border-2",
        "border-t-stone-700 border-l-stone-700 border-r-stone-400 border-b-stone-400",
        "pixelated overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "h-full border-2 transition-all duration-300",
          "border-t-white/20 border-l-white/20",
          colors[color],
        )}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  )
}
