"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { type TextareaHTMLAttributes, forwardRef } from "react"

interface MinecraftTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  biome?: "nether" | "cherry" | "grassland" | "desert" | "ice" | "barren" | "caves"
  label?: string
}

const biomeStyles = {
  nether:
    "bg-red-900/50 border-red-700 border-t-red-500 border-l-red-500 text-red-100 placeholder:text-red-300 focus:border-red-400",
  cherry:
    "bg-pink-900/30 border-pink-600 border-t-pink-400 border-l-pink-400 text-pink-100 placeholder:text-pink-300 focus:border-pink-300",
  grassland:
    "bg-green-900/40 border-green-600 border-t-green-400 border-l-green-400 text-green-100 placeholder:text-green-300 focus:border-green-300",
  desert:
    "bg-yellow-900/40 border-yellow-600 border-t-yellow-400 border-l-yellow-400 text-yellow-100 placeholder:text-yellow-300 focus:border-yellow-300",
  ice: "bg-blue-900/40 border-blue-600 border-t-blue-400 border-l-blue-400 text-blue-100 placeholder:text-blue-300 focus:border-blue-300",
  barren:
    "bg-gray-900/50 border-gray-600 border-t-gray-400 border-l-gray-400 text-gray-100 placeholder:text-gray-300 focus:border-gray-300",
  caves:
    "bg-stone-900/60 border-stone-600 border-t-stone-400 border-l-stone-400 text-stone-100 placeholder:text-stone-300 focus:border-stone-300",
}

const MinecraftTextarea = forwardRef<HTMLTextAreaElement, MinecraftTextareaProps>(
  ({ className, biome = "grassland", label, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <label className="block text-sm font-bold text-gray-200 font-mono">{label}</label>}
        <motion.textarea
          whileFocus={{ scale: 1.02 }}
          transition={{ duration: 0.1 }}
          className={cn(
            "w-full px-4 py-3 font-mono text-base border-4 transition-all duration-200 resize-none",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
            "antialiased-off min-h-24",
            biomeStyles[biome],
            className,
          )}
          style={{ imageRendering: "pixelated" }}
          ref={ref}
          {...props}
        />
      </div>
    )
  },
)

MinecraftTextarea.displayName = "MinecraftTextarea"

export { MinecraftTextarea }
