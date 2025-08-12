import { cn } from "@/lib/utils"
import { MinecraftWindow } from "./minecraft-window"
import { MinecraftButton } from "./minecraft-button"

interface World {
  name: string
  gameMode: string
  lastPlayed: string
  size: string
  biome: "nether" | "cherry" | "grassland" | "desert" | "ice" | "barren" | "caves"
}

const worlds: World[] = [
  { name: "Sandstone Flat", gameMode: "Creative", lastPlayed: "8/6/18", size: "0.02MB", biome: "desert" },
  { name: "Cherry Grove Paradise", gameMode: "Survival", lastPlayed: "8/5/18", size: "1.2MB", biome: "cherry" },
  { name: "Nether Fortress", gameMode: "Hardcore", lastPlayed: "8/4/18", size: "0.8MB", biome: "nether" },
  { name: "Ice Spikes Tundra", gameMode: "Survival", lastPlayed: "8/3/18", size: "2.1MB", biome: "ice" },
]

export function MinecraftWorldSelector() {
  return (
    <div className="max-w-2xl mx-auto">
      <MinecraftWindow title="My Worlds">
        <div className="space-y-2">
          <MinecraftButton variant="stone" className="w-full">
            Create New
          </MinecraftButton>

          <div className="space-y-1">
            {worlds.map((world, index) => (
              <div
                key={index}
                className={cn(
                  "minecraft-ui p-2 border-2 cursor-pointer hover:bg-gray-300",
                  "border-gray-600 bg-gray-200 flex items-center justify-between",
                  `biome-${world.biome}`,
                )}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-600 border border-gray-600"></div>
                  <div>
                    <div className="font-bold text-sm">{world.name}</div>
                    <div className="text-xs text-gray-600">{world.gameMode}</div>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-600">
                  <div>{world.lastPlayed}</div>
                  <div>{world.size}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex mt-4 border-t-2 border-gray-600 pt-2">
          <MinecraftButton variant="stone" className="flex-1 mr-1">
            My Worlds
          </MinecraftButton>
          <MinecraftButton variant="stone" className="flex-1 mx-1">
            Friends & Realms
          </MinecraftButton>
          <MinecraftButton variant="stone" className="flex-1 ml-1">
            Servers
          </MinecraftButton>
        </div>
      </MinecraftWindow>
    </div>
  )
}
