"use client";

import { MinecraftBackground } from "@/components/minecraft-background";
import { MinecraftWindow } from "@/components/minecraft-window";
import { MinecraftButton } from "@/components/minecraft-button";
import { MinecraftImageCarousel } from "@/components/minecraft-image-carousel";
import { motion, type HTMLMotionProps } from "framer-motion";

export default function NewPage() {
  return (
    <main className="relative min-h-screen">
      {/* Themed background */}
      <MinecraftBackground biome="grassland" animated />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold font-mono tracking-tight text-white">Capture the Crafting Table</h1>
          <p className="mt-2 text-gray-200 opacity-90">A fast-paced team event inspired by Capture the Flag — Minecraft style.</p>
        </div>

        {/* Big, separate sections */}
        <div className="flex justify-start">
          <div className="w-full md:w-[48rem]">
            <MinecraftWindow title="Introduction" biome="grassland" className="mb-8 text-stone-900">
              <div className="max-w-none">
                <p className="text-lg leading-relaxed">
                  Capture the Crafting Table is a fast‑paced team event inspired by classic Capture the Flag.
                  Two squads face off to steal the enemy crafting table and return it to their base—while
                  defending their own with smart building, traps, and teamwork.
                </p>
                <p className="text-lg leading-relaxed mt-4">
                  Expect tight rotations, resource control, and coordinated pushes. Every decision matters—
                  from when to craft to when to dive for the steal.
                </p>
              </div>
            </MinecraftWindow>
          </div>
        </div>

        <div className="flex justify-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
            whileHover={{ scale: 1.01 }}
            className="w-full md:w-[48rem]"
          >
            <MinecraftWindow title="How It Works" biome="grassland" className="mb-8 text-stone-900">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Match Format</h3>
                  <ul className="text-base space-y-1">
                    <li><strong>Teams</strong>: 5v5</li>
                    <li><strong>Series</strong>: Best of 3</li>
                    <li><strong>Map</strong>: Symmetric lanes with resource nodes</li>
                    <li><strong>Win</strong>: Secure enemy crafting table at your base</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Flow</h3>
                  <ol className="list-decimal list-inside space-y-1 text-base">
                    <li>Gather early resources and gear up</li>
                    <li>Coordinate split pushes and defenses</li>
                    <li>Break defenses, grab the table (must stay visible)</li>
                    <li>Rotate and secure at your base to score</li>
                  </ol>
                </div>
              </div>
            </MinecraftWindow>
          </motion.div>
        </div>

        <div className="flex justify-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="w-full md:w-[48rem]"
          >
            <MinecraftWindow title="Rules" biome="grassland" className="mb-8 text-stone-900">
              <ul className="list-disc list-inside text-base space-y-1">
                <li>No breaking bedrock or leaving the playable arena</li>
                <li>Crafting table carrier must keep it visible—no hiding exploits</li>
                <li>Respawn timers scale up with consecutive deaths</li>
                <li>No third‑party clients or mods that give competitive advantage</li>
              </ul>
            </MinecraftWindow>
          </motion.div>
        </div>

        <div className="flex justify-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
            whileHover={{ scale: 1.01 }}
            className="w-full md:w-[48rem]"
          >
            <MinecraftWindow title="Prizes" biome="grassland" className="mb-8 text-stone-900">
              <ul className="text-base space-y-1">
                <li>1st Place: Champion role + Homepage showcase</li>
                <li>2nd Place: Event MVP mention</li>
                <li>Best Play: Community highlight feature</li>
              </ul>
            </MinecraftWindow>
          </motion.div>
        </div>

        {/* Media & Registration */}
        <div className="flex justify-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            whileHover={{ scale: 1.01 }}
            className="w-full md:w-[48rem]"
          >
            <MinecraftWindow title="Arena Preview" biome="grassland" className="mb-8 text-stone-900">
              <MinecraftImageCarousel
                biome="grassland"
                images={[
                  {
                    src: "/globe.svg",
                    alt: "Arena layout",
                    title: "Arena Layout",
                    description: "Symmetric lanes, resource spawns, and mid control points.",
                  },
                  {
                    src: "/window.svg",
                    alt: "Base and crafting table",
                    title: "Base & Crafting Table",
                    description: "Protect your table with walls and traps. Coordinate defenses.",
                  },
                  {
                    src: "/file.svg",
                    alt: "Resource routes",
                    title: "Resource Routes",
                    description: "Plan rotations to gear up faster than your opponents.",
                  },
                ]}
              />
            </MinecraftWindow>
          </motion.div>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <a
            href="https://forms.gle/your-form-id"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <MinecraftButton biome="grassland">📝 Register on Google Forms</MinecraftButton>
          </a>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="inline-block">
            <MinecraftButton biome="grassland">← Back to Home</MinecraftButton>
          </a>
        </div>
      </div>
    </main>
  );
}


