import { cn } from "@/lib/utils"

interface InventoryItem {
  icon: string
  count?: number
  name?: string
}

interface MinecraftInventoryGridProps {
  items?: (InventoryItem | null)[]
  rows?: number
  cols?: number
  biome?: "nether" | "cherry" | "grassland" | "desert" | "ice" | "barren" | "caves"
}

export function MinecraftInventoryGrid({ items = [], rows = 4, cols = 9, biome }: MinecraftInventoryGridProps) {
  const totalSlots = rows * cols
  const slots = Array.from({ length: totalSlots }, (_, i) => items[i] || null)

  return (
    <div
      className={cn("grid gap-1 p-2 minecraft-ui", biome && `biome-${biome}`)}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {slots.map((item, index) => (
        <div key={index} className="minecraft-slot">
          {item && (
            <>
              <span className="text-lg">{item.icon}</span>
              {item.count && item.count > 1 && (
                <span className="absolute bottom-0 right-0 text-xs font-bold text-white bg-black px-1">
                  {item.count}
                </span>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  )
}
