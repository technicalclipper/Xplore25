import { MinecraftWindow } from "./minecraft-window"
import { MinecraftButton } from "./minecraft-button"

const biomes = [
  { name: "Nether", biome: "nether" as const, description: "Fiery hellscape with lava and danger" },
  { name: "Cherry Grove", biome: "cherry" as const, description: "Pink paradise with cherry blossoms" },
  { name: "Grassland", biome: "grassland" as const, description: "Lush green plains perfect for building" },
  { name: "Desert", biome: "desert" as const, description: "Sandy dunes and ancient temples" },
  { name: "Ice Spikes", biome: "ice" as const, description: "Frozen wasteland with towering ice" },
  { name: "Barren Land", biome: "barren" as const, description: "Desolate rocky terrain" },
  { name: "Deep Caves", biome: "caves" as const, description: "Underground caverns full of mystery" },
]

export function BiomeShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {biomes.map((biome) => (
        <MinecraftWindow key={biome.biome} title={biome.name} biome={biome.biome} className="h-48">
          <div className="space-y-3">
            <p className="text-sm minecraft-ui">{biome.description}</p>
            <MinecraftButton biome={biome.biome} className="w-full">
              Explore {biome.name}
            </MinecraftButton>
          </div>
        </MinecraftWindow>
      ))}
    </div>
  )
}
