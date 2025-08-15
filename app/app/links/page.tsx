"use client";

export default function LinksPage() {
  const events = [
    {
      id: 1,
      title: "Diamond Docs",
      category: "Paper Presentation",
      registrationLink: "https://forms.gle/7AAzxRWfhURK2VRq7"
    },
    {
      id: 2,
      title: "Battle of Biomes",
      category: "Head-to-Head Coding",
      registrationLink: "https://forms.gle/8HK38gcdaHy8Gebs6"
    },
    {
      id: 3,
      title: "Nether Quest",
      category: "Treasure Hunt",
      registrationLink: "https://forms.gle/VfSioKBF7szRT3zk9"
    },
    {
      id: 4,
      title: "Crafting the Interface",
      category: "UI/UX Design",
      registrationLink: "https://forms.gle/DZqZS2xyvyrw9tbe8"
    },
    {
      id: 5,
      title: "Mine your Ideas",
      category: "Idea Pitching",
      registrationLink: "https://forms.gle/2WKLLb8VfRpYwe3e6"
    },
    {
      id: 6,
      title: "Capture the Craft Table",
      category: "Capture the Flag",
      registrationLink: "https://forms.gle/ozxRQiJhUeUiQSjt9"
    },
    {
      id: 7,
      title: "Blocksmith's Showcase",
      category: "Best Building Competition",
      registrationLink: "https://forms.gle/cjoTAWxMSrGxndp58"
    },
    {
      id: 8,
      title: "Lectern Lore",
      category: "Minecraft Themed Technical Quiz",
      registrationLink: "https://forms.gle/jKoeZaBKyoqttG7r9"
    }
  ];

  const handleRegistration = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#171615' }}>
      {/* Header */}
      <header 
        className="w-full py-4 px-3 sm:px-6 shadow-lg"
        style={{ backgroundColor: '#252323' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <img 
              src="/assets/licet.png" 
              alt="LICET Logo" 
              className="h-12 sm:h-16 w-auto"
              style={{ imageRendering: 'pixelated' }}
            />
            <img 
              src="/assets/logo.png" 
              alt="XPLORES Logo" 
              className="h-8 sm:h-12 w-auto"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </a>
            
            <a href="/events" className="text-gray-300 hover:text-white transition-colors">
              Events
            </a>
            
            <a href="/links" className="text-white font-semibold">
              Registration Links
            </a>
            
            <img 
              src="/assets/eicon.png" 
              alt="Department Logo" 
              className="h-12 sm:h-16 w-auto"
              style={{ imageRendering: 'pixelated' }}
            />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 px-3 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Registration Links
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Click on any event name to register
            </p>
          </div>

          {/* Events List */}
          <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-600 mb-8">
            <div className="space-y-4">
              {events.map((event) => (
                <div 
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors cursor-pointer border border-gray-600"
                  onClick={() => handleRegistration(event.registrationLink)}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400 text-sm font-mono">
                      #{event.id.toString().padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="text-lg font-semibold text-white hover:text-gray-200 transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {event.category}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">Register</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600">
            <h4 className="text-xl font-bold text-white mb-4 text-center">Contact Information</h4>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <h5 className="font-semibold text-white mb-2">Sairam</h5>
                <p className="text-gray-300 text-sm">93421 99098</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                <h5 className="font-semibold text-white mb-2">Mathan Kumaar</h5>
                <p className="text-gray-300 text-sm">99621 29234</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
