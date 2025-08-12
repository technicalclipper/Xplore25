"use client"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

interface MinecraftImageCarouselProps {
  images: Array<{
    src: string
    alt: string
    title?: string
    description?: string
  }>
  biome?: "nether" | "cherry" | "grassland" | "desert" | "ice" | "barren" | "caves"
  className?: string
}

const biomeStyles = {
  nether: "bg-gradient-to-br from-red-400 to-red-600 border-red-700 border-t-red-200 border-l-red-200",
  cherry: "bg-gradient-to-br from-pink-200 to-pink-400 border-pink-500 border-t-pink-100 border-l-pink-100",
  grassland: "bg-gradient-to-br from-green-300 to-green-500 border-green-600 border-t-green-200 border-l-green-200",
  desert: "bg-gradient-to-br from-yellow-300 to-yellow-500 border-yellow-600 border-t-yellow-200 border-l-yellow-200",
  ice: "bg-gradient-to-br from-blue-200 to-blue-400 border-blue-500 border-t-blue-100 border-l-blue-100",
  barren: "bg-gradient-to-br from-gray-300 to-gray-500 border-gray-600 border-t-gray-200 border-l-gray-200",
  caves: "bg-gradient-to-br from-stone-400 to-stone-600 border-stone-700 border-t-stone-300 border-l-stone-300",
}

export function MinecraftImageCarousel({ images, biome = "grassland", className }: MinecraftImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative border-6 p-4 font-mono",
        "min-h-[400px] max-w-2xl mx-auto",
        biomeStyles[biome],
        className,
      )}
      style={{ imageRendering: "pixelated" }}
    >
      {/* Header */}
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold mb-2">{images[currentIndex]?.title || "Image Gallery"}</h3>
        <div className="flex justify-center gap-2">
          {images.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-3 h-3 border-2 border-black",
                index === currentIndex ? "bg-white" : "bg-gray-400 hover:bg-gray-300",
              )}
              style={{ imageRendering: "pixelated" }}
            />
          ))}
        </div>
      </div>

      {/* Image Container */}
      <div className="relative h-64 mb-4 border-4 border-black bg-gray-800 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]?.src}
            alt={images[currentIndex]?.alt}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
            style={{ imageRendering: "pixelated" }}
          />
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.button
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevImage}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-2 border-2 border-white hover:bg-opacity-90"
          style={{ imageRendering: "pixelated" }}
        >
          <ChevronLeft size={20} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextImage}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white p-2 border-2 border-white hover:bg-opacity-90"
          style={{ imageRendering: "pixelated" }}
        >
          <ChevronRight size={20} />
        </motion.button>
      </div>

      {/* Description */}
      {images[currentIndex]?.description && (
        <motion.div
          key={`desc-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-3 bg-black bg-opacity-30 border-2 border-black text-white"
        >
          <p className="text-sm font-bold">{images[currentIndex].description}</p>
        </motion.div>
      )}

      {/* Counter */}
      <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 border-2 border-white text-xs font-bold">
        {currentIndex + 1} / {images.length}
      </div>
    </motion.div>
  )
}
