"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { type FormHTMLAttributes, forwardRef } from "react"

interface MinecraftFormProps extends FormHTMLAttributes<HTMLFormElement> {
  biome?: "nether" | "cherry" | "grassland" | "desert" | "ice" | "barren" | "caves"
  title?: string
}

const biomeStyles = {
  nether: "bg-red-950/80 border-red-700 border-t-red-500 border-l-red-500",
  cherry: "bg-pink-950/60 border-pink-600 border-t-pink-400 border-l-pink-400",
  grassland: "bg-green-950/70 border-green-600 border-t-green-400 border-l-green-400",
  desert: "bg-yellow-950/70 border-yellow-600 border-t-yellow-400 border-l-yellow-400",
  ice: "bg-blue-950/70 border-blue-600 border-t-blue-400 border-l-blue-400",
  barren: "bg-gray-950/80 border-gray-600 border-t-gray-400 border-l-gray-400",
  caves: "bg-stone-950/90 border-stone-600 border-t-stone-400 border-l-stone-400",
}

const MinecraftForm = forwardRef<HTMLFormElement, MinecraftFormProps>(
  ({ className, biome = "grassland", title, children, ...props }, ref) => {
    return (
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={cn("p-6 border-4 space-y-6 backdrop-blur-sm", "antialiased-off", biomeStyles[biome], className)}
        style={{ imageRendering: "pixelated" }}
        ref={ref}
        {...props}
      >
        {title && (
          <h2 className="text-xl font-bold text-gray-100 font-mono text-center border-b-2 border-gray-600 pb-2">
            {title}
          </h2>
        )}
        {children}
      </motion.form>
    )
  },
)

MinecraftForm.displayName = "MinecraftForm"

export { MinecraftForm }
