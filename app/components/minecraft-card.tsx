"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { type HTMLAttributes, forwardRef } from "react"

interface MinecraftCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 
  'onAnimationStart' | 'onAnimationEnd' | 'onTransitionEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  title?: string
  icon?: string
  biome?: "nether" | "cherry" | "grassland" | "desert" | "ice" | "barren" | "caves"
  variant?: "default" | "elevated" | "flat"
}

const biomeStyles = {
  nether: "bg-red-950/90 border-red-700 border-t-red-500 border-l-red-500 text-red-100",
  cherry: "bg-pink-950/80 border-pink-600 border-t-pink-400 border-l-pink-400 text-pink-100",
  grassland: "bg-green-950/80 border-green-600 border-t-green-400 border-l-green-400 text-green-100",
  desert: "bg-yellow-950/80 border-yellow-600 border-t-yellow-400 border-l-yellow-400 text-yellow-100",
  ice: "bg-blue-950/80 border-blue-600 border-t-blue-400 border-l-blue-400 text-blue-100",
  barren: "bg-gray-950/90 border-gray-600 border-t-gray-400 border-l-gray-400 text-gray-100",
  caves: "bg-stone-950/95 border-stone-600 border-t-stone-400 border-l-stone-400 text-stone-100",
}

const variantStyles = {
  default: "shadow-lg",
  elevated: "shadow-2xl transform hover:scale-105",
  flat: "shadow-none",
}

const MinecraftCard = forwardRef<HTMLDivElement, MinecraftCardProps>(
  ({ title, icon, biome = "grassland", variant = "default", children, className, ...props }, ref) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: variant === "elevated" ? 1.02 : 1 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "border-4 p-6 backdrop-blur-sm font-mono",
          "antialiased-off transition-all duration-200",
          biomeStyles[biome],
          variantStyles[variant],
          className,
        )}
        style={{ imageRendering: "pixelated" }}
        ref={ref}
        {...props}
      >
        {title && (
          <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-current/30">
            {icon && <span className="text-xl">{icon}</span>}
            <h3 className="font-bold text-xl">{title}</h3>
          </div>
        )}
        {children}
      </motion.div>
    )
  },
)

MinecraftCard.displayName = "MinecraftCard"

export { MinecraftCard }
