"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface MinecraftWindowProps {
  title: string
  children: ReactNode
  className?: string
  biome?: "nether" | "cherry" | "grassland" | "desert" | "ice" | "barren" | "caves"
  onClose?: () => void
}

const biomeStyles = {
  nether: "bg-red-900 border-red-700",
  cherry: "bg-pink-100 border-pink-400",
  grassland: "bg-green-100 border-green-500",
  desert: "bg-yellow-100 border-yellow-600",
  ice: "bg-blue-100 border-blue-400",
  barren: "bg-gray-200 border-gray-500",
  caves: "bg-stone-200 border-stone-600",
}

const biomeTitleStyles = {
  nether: "bg-red-800 border-red-900 text-red-100",
  cherry: "bg-pink-300 border-pink-500 text-pink-900",
  grassland: "bg-green-300 border-green-600 text-green-900",
  desert: "bg-yellow-300 border-yellow-700 text-yellow-900",
  ice: "bg-blue-300 border-blue-500 text-blue-900",
  barren: "bg-gray-400 border-gray-600 text-gray-900",
  caves: "bg-stone-400 border-stone-700 text-stone-900",
}

export function MinecraftWindow({ title, children, className, biome = "grassland", onClose }: MinecraftWindowProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn("border-4 shadow-lg font-mono text-base antialiased-off min-w-80", biomeStyles[biome], className)}
      style={{ imageRendering: "pixelated" }}
    >
      {/* Title bar */}
      <div className={cn("flex items-center justify-between p-4 border-b-4", biomeTitleStyles[biome])}>
        <span className="text-lg font-bold tracking-wide">{title}</span>
        {onClose && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="w-8 h-8 bg-gray-300 border-2 border-gray-600 flex items-center justify-center text-lg font-bold hover:bg-gray-200 transition-colors"
          >
            ×
          </motion.button>
        )}
      </div>

      {/* Content with proper alignment */}
      <div className="p-6 flex flex-col items-center justify-center space-y-4">{children}</div>
    </motion.div>
  )
}
