"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { type ButtonHTMLAttributes, forwardRef } from "react"

interface MinecraftButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "grass"
    | "stone"
    | "wood"
    | "dirt"
    | "cobblestone"
    | "nether"
    | "cherry"
    | "desert"
    | "ice"
    | "barren"
    | "caves"
  biome?: "nether" | "cherry" | "grassland" | "desert" | "ice" | "barren" | "caves"
}

const biomeStyles = {
  nether:
    "bg-gradient-to-b from-red-500 to-red-700 hover:from-red-400 hover:to-red-600 border-red-800 border-t-red-300 border-l-red-300 text-red-50",
  cherry:
    "bg-gradient-to-b from-pink-300 to-pink-500 hover:from-pink-200 hover:to-pink-400 border-pink-600 border-t-pink-100 border-l-pink-100 text-pink-900",
  grassland:
    "bg-gradient-to-b from-green-400 to-green-600 hover:from-green-300 hover:to-green-500 border-green-700 border-t-green-200 border-l-green-200 text-green-50",
  desert:
    "bg-gradient-to-b from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 border-yellow-700 border-t-yellow-200 border-l-yellow-200 text-yellow-900",
  ice: "bg-gradient-to-b from-blue-300 to-blue-500 hover:from-blue-200 hover:to-blue-400 border-blue-600 border-t-blue-100 border-l-blue-100 text-blue-900",
  barren:
    "bg-gradient-to-b from-gray-400 to-gray-600 hover:from-gray-300 hover:to-gray-500 border-gray-700 border-t-gray-200 border-l-gray-200 text-gray-50",
  caves:
    "bg-gradient-to-b from-stone-500 to-stone-700 hover:from-stone-400 hover:to-stone-600 border-stone-800 border-t-stone-300 border-l-stone-300 text-stone-50",
}

const MinecraftButton = forwardRef<HTMLButtonElement, MinecraftButtonProps>(
  ({ className, variant = "stone", biome = "grassland", children, ...props }, ref) => {
    return (
      <motion.button
        whileHover={{
          scale: 1.02,
          y: -2,
          boxShadow: "0 6px 12px rgba(0,0,0,0.3)",
        }}
        whileTap={{
          scale: 0.98,
          y: 0,
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
          duration: 0.15,
        }}
        className={cn(
          "px-6 py-3 min-h-12 font-mono text-base font-bold border-4 transition-all duration-150",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
          "antialiased-off cursor-pointer select-none relative overflow-hidden",
          biomeStyles[biome],
          className,
        )}
        style={{ imageRendering: "pixelated" }}
        ref={ref}
        {...props}
      >
        {children}
      </motion.button>
    )
  },
)

MinecraftButton.displayName = "MinecraftButton"

export { MinecraftButton }
