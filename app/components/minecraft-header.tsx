export function MinecraftHeader() {
  return (
    <header className="bg-stone-800 border-b-4 border-stone-900 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500 border-2 border-green-400 border-t-green-300 border-l-green-300 border-r-green-700 border-b-green-700 pixelated"></div>
            <h1 className="text-2xl font-bold text-white pixelated">MinecraftSite</h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-stone-300 hover:text-white transition-colors pixelated">
              Home
            </a>
            <a href="#" className="text-stone-300 hover:text-white transition-colors pixelated">
              Servers
            </a>
            <a href="#" className="text-stone-300 hover:text-white transition-colors pixelated">
              Mods
            </a>
            <a href="#" className="text-stone-300 hover:text-white transition-colors pixelated">
              Community
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <span className="text-yellow-400 pixelated">⭐ 1,247</span>
            <span className="text-green-400 pixelated">👥 Online</span>
          </div>
        </div>
      </div>
    </header>
  )
}
