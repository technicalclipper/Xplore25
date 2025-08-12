"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface MinecraftInventorySlotProps {
  item?: string
  count?: number
  className?: string
  biome?: "nether" | "cherry" | "grassland" | "desert" | "ice" | "barren" | "caves"
}

const biomeSlotStyles = {
  nether: "bg-red-800 border-t-red-600 border-l-red-600 border-r-red-900 border-b-red-900 hover:bg-red-700",
  cherry: "bg-pink-300 border-t-pink-200 border-l-pink-200 border-r-pink-500 border-b-pink-500 hover:bg-pink-200",
  grassland:
    "bg-green-400 border-t-green-300 border-l-green-300 border-r-green-600 border-b-green-600 hover:bg-green-300",
  desert:
    "bg-yellow-400 border-t-yellow-300 border-l-yellow-300 border-r-yellow-600 border-b-yellow-600 hover:bg-yellow-300",
  ice: "bg-blue-300 border-t-blue-200 border-l-blue-200 border-r-blue-500 border-b-blue-500 hover:bg-blue-200",
  barren: "bg-gray-400 border-t-gray-300 border-l-gray-300 border-r-gray-600 border-b-gray-600 hover:bg-gray-300",
  caves: "bg-stone-500 border-t-stone-400 border-l-stone-400 border-r-stone-700 border-b-stone-700 hover:bg-stone-400",
}

export function MinecraftInventorySlot({ item, count, className, biome = "grassland" }: MinecraftInventorySlotProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
      className={cn(
        "w-16 h-16 border-4 flex items-center justify-center relative font-mono cursor-pointer transition-colors",
        "antialiased-off select-none",
        biomeSlotStyles[biome],
        className,
      )}
      style={{ imageRendering: "pixelated" }}
    >
      {item && (
        <>
          <span className="text-xl font-bold">{item}</span>
          {count && count > 1 && (
            <span className="absolute -bottom-1 -right-1 text-xs font-bold text-white bg-black/80 px-1 rounded-sm border border-gray-600">
              {count}
            </span>
          )}
        </>
      )}
    </motion.div>
  )
}
