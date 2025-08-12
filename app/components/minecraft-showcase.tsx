"use client"

import { useState } from "react"
import { MinecraftWindow } from "./minecraft-window"
import { MinecraftButton } from "./minecraft-button"
import { MinecraftInput } from "./minecraft-input"
import { MinecraftTextarea } from "./minecraft-textarea"
import { MinecraftForm } from "./minecraft-form"
import { MinecraftCard } from "./minecraft-card"
import { MinecraftBubble } from "./minecraft-bubble"
import { MinecraftBackground } from "./minecraft-background"
import { MinecraftInventorySlot } from "./minecraft-inventory-slot"
import { motion } from "framer-motion"

const biomes = [
  { name: "Nether", biome: "nether" as const, icon: "🔥" },
  { name: "Cherry", biome: "cherry" as const, icon: "🌸" },
  { name: "Grassland", biome: "grassland" as const, icon: "🌱" },
  { name: "Desert", biome: "desert" as const, icon: "🏜️" },
  { name: "Ice", biome: "ice" as const, icon: "❄️" },
  { name: "Barren", biome: "barren" as const, icon: "🪨" },
  { name: "Caves", biome: "caves" as const, icon: "⛏️" },
]

export function MinecraftShowcase() {
  const [selectedBiome, setSelectedBiome] = useState<(typeof biomes)[0]["biome"]>("grassland")
  const [formData, setFormData] = useState({ name: "", message: "" })

  return (
    <div className="min-h-screen relative">
      <MinecraftBackground biome={selectedBiome} animated />

      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-6">
            <h1 className="text-5xl font-bold text-white font-mono drop-shadow-2xl">MINECRAFT UI COMPONENTS</h1>
            <div className="flex flex-wrap justify-center gap-3">
              {biomes.map((biome) => (
                <MinecraftBubble
                  key={biome.biome}
                  biome={biome.biome}
                  size="sm"
                  floating={selectedBiome === biome.biome}
                  className={`cursor-pointer transition-all ${
                    selectedBiome === biome.biome ? "scale-110" : "hover:scale-105"
                  }`}
                  onClick={() => setSelectedBiome(biome.biome)}
                >
                  {biome.icon} {biome.name}
                </MinecraftBubble>
              ))}
            </div>
          </motion.div>

          {/* Interactive Form Demo */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <MinecraftForm biome={selectedBiome} title="Interactive Form Demo">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MinecraftInput
                  biome={selectedBiome}
                  label="Player Name"
                  placeholder="Enter your Minecraft username"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <MinecraftInput biome={selectedBiome} label="Server IP" placeholder="play.example.com" />
              </div>
              <MinecraftTextarea
                biome={selectedBiome}
                label="Message"
                placeholder="Tell us about your Minecraft adventures..."
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <div className="flex gap-4">
                <MinecraftButton biome={selectedBiome} className="flex-1">
                  Join Server
                </MinecraftButton>
                <MinecraftButton biome={selectedBiome} className="flex-1">
                  Save Settings
                </MinecraftButton>
              </div>
            </MinecraftForm>
          </motion.div>

          {/* Component Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Buttons Showcase */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <MinecraftCard biome={selectedBiome} title="Buttons" icon="🔘" variant="elevated">
                <div className="space-y-3">
                  <MinecraftButton biome={selectedBiome} className="w-full">
                    Primary Action
                  </MinecraftButton>
                  <MinecraftButton biome={selectedBiome} className="w-full" disabled>
                    Disabled Button
                  </MinecraftButton>
                  <div className="grid grid-cols-2 gap-2">
                    <MinecraftButton biome={selectedBiome}>Small</MinecraftButton>
                    <MinecraftButton biome={selectedBiome}>Compact</MinecraftButton>
                  </div>
                </div>
              </MinecraftCard>
            </motion.div>

            {/* Inventory Showcase */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <MinecraftCard biome={selectedBiome} title="Inventory" icon="🎒" variant="elevated">
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2">
                    {["⚔️", "🛡️", "🏹", "🍖", "💎", "🪓", "⛏️", "🧪"].map((item, idx) => (
                      <MinecraftInventorySlot key={idx} item={item} biome={selectedBiome} />
                    ))}
                  </div>
                  <MinecraftButton biome={selectedBiome} className="w-full text-sm">
                    Organize Inventory
                  </MinecraftButton>
                </div>
              </MinecraftCard>
            </motion.div>

            {/* Bubbles Showcase */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <MinecraftCard biome={selectedBiome} title="Bubbles" icon="💬" variant="elevated">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <MinecraftBubble biome={selectedBiome} size="sm">
                      Small
                    </MinecraftBubble>
                    <MinecraftBubble biome={selectedBiome} size="md">
                      Medium
                    </MinecraftBubble>
                  </div>
                  <MinecraftBubble biome={selectedBiome} size="lg" floating className="w-full text-center">
                    Floating Bubble!
                  </MinecraftBubble>
                  <div className="flex justify-center">
                    <MinecraftBubble biome={selectedBiome} size="sm" floating>
                      ✨ Animated
                    </MinecraftBubble>
                  </div>
                </div>
              </MinecraftCard>
            </motion.div>

            {/* Input Fields */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <MinecraftCard biome={selectedBiome} title="Input Fields" icon="⌨️" variant="elevated">
                <div className="space-y-4">
                  <MinecraftInput biome={selectedBiome} placeholder="Username" />
                  <MinecraftInput biome={selectedBiome} type="password" placeholder="Password" />
                  <MinecraftTextarea biome={selectedBiome} placeholder="Comments..." rows={3} />
                </div>
              </MinecraftCard>
            </motion.div>

            {/* Window Demo */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <MinecraftWindow title="Nested Window" biome={selectedBiome}>
                <div className="space-y-3">
                  <p className="text-sm">This is a window component with authentic Minecraft styling!</p>
                  <div className="grid grid-cols-3 gap-1">
                    <MinecraftInventorySlot item="🧱" biome={selectedBiome} />
                    <MinecraftInventorySlot item="🪵" biome={selectedBiome} />
                    <MinecraftInventorySlot item="🪨" biome={selectedBiome} />
                  </div>
                  <MinecraftButton biome={selectedBiome} className="w-full text-sm">
                    Craft Item
                  </MinecraftButton>
                </div>
              </MinecraftWindow>
            </motion.div>

            {/* Stats Card */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <MinecraftCard biome={selectedBiome} title="Player Stats" icon="📊" variant="elevated">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Level:</span>
                    <MinecraftBubble biome={selectedBiome} size="sm">
                      42
                    </MinecraftBubble>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">XP:</span>
                    <MinecraftBubble biome={selectedBiome} size="sm">
                      1,337
                    </MinecraftBubble>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Blocks Mined:</span>
                    <MinecraftBubble biome={selectedBiome} size="sm">
                      9,999
                    </MinecraftBubble>
                  </div>
                  <MinecraftButton biome={selectedBiome} className="w-full text-sm">
                    View Full Stats
                  </MinecraftButton>
                </div>
              </MinecraftCard>
            </motion.div>
          </div>

          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <MinecraftCard biome={selectedBiome} title="Live Component Preview" className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-lg">
                    Current Biome: {biomes.find((b) => b.biome === selectedBiome)?.name}
                  </h4>
                  <p className="text-sm opacity-80">
                    All components automatically adapt to the selected biome theme with authentic colors and styling.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {formData.name && (
                      <MinecraftBubble biome={selectedBiome} size="sm">
                        Hello, {formData.name}!
                      </MinecraftBubble>
                    )}
                    {formData.message && (
                      <MinecraftBubble biome={selectedBiome} size="sm">
                        Message saved!
                      </MinecraftBubble>
                    )}
                  </div>
                </div>
                <div className="space-y-3">
                  <MinecraftButton biome={selectedBiome} className="w-full">
                    🎮 Start Game
                  </MinecraftButton>
                  <MinecraftButton biome={selectedBiome} className="w-full">
                    ⚙️ Settings
                  </MinecraftButton>
                  <MinecraftButton biome={selectedBiome} className="w-full">
                    🚪 Exit
                  </MinecraftButton>
                </div>
              </div>
            </MinecraftCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
