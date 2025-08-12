"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface MinecraftBackgroundProps {
  biome?: "nether" | "cherry" | "grassland" | "desert" | "ice" | "barren" | "caves"
  animated?: boolean
}

const biomeBackgrounds = {
  nether: "bg-gradient-to-br from-red-900 via-red-800 to-orange-900",
  cherry: "bg-gradient-to-br from-pink-900 via-pink-700 to-purple-800",
  grassland: "bg-gradient-to-br from-green-900 via-green-700 to-blue-900",
  desert: "bg-gradient-to-br from-yellow-900 via-orange-800 to-red-900",
  ice: "bg-gradient-to-br from-blue-900 via-cyan-800 to-purple-900",
  barren: "bg-gradient-to-br from-gray-900 via-gray-700 to-stone-900",
  caves: "bg-gradient-to-br from-stone-900 via-gray-900 to-black",
}

const MinecraftBackground = ({ biome = "grassland", animated = true }: MinecraftBackgroundProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  useEffect(() => {
    if (animated) {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      }))
      setParticles(newParticles)
    }
  }, [animated])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient background */}
      <div className={`absolute inset-0 ${biomeBackgrounds[biome]}`} />

      {/* Pixelated overlay pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          imageRendering: "pixelated",
        }}
      />

      {/* Animated particles */}
      {animated &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/20 rounded-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              imageRendering: "pixelated",
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          imageRendering: "pixelated",
        }}
      />
    </div>
  )
}

export { MinecraftBackground }
