"use client";

import { useState, useEffect, useRef } from "react";

export default function EventsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const flipAudioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Battle of the Biomes",
      image: "/assets/battleofbiomes.png",
      description: "Face off in intense coding duels across the deserts, jungles, and snow biomes. Only the swift and skilled survive.",
      category: "Head-to-Head Coding"
    },
    {
      id: 2,
      title: "Blocksmith's Showcase",
      image: "/assets/blacksmithshowcase.png",
      description: "Show off your inner architect. Build something jaw-dropping — from cozy cottages to colossal castles — and let the blocks speak for themselves.",
      category: "Best Building Competition"
    },
    {
      id: 3,
      title: "Capture the Craft Table",
      image: "/assets/capturetheflag.png",
      description: "Defend your precious Crafting Table while trying to steal your opponent's. Cyber challenges await at every corner.",
      category: "CTF"
    },
    {
      id: 4,
      title: "Crafting the Interface",
      image: "/assets/craftingtheinterface.png",
      description: "Designs worth more than netherite. Create visually stunning and highly usable interfaces.",
      category: "UI/UX Design"
    },
    {
      id: 5,
      title: "Diamond Docs",
      image: "/assets/diamonddocs.png",
      description: "Only the rarest ideas get mined here. Participants must present innovative, research-backed concepts that can shine like diamonds in the rough.",
      category: "Paper Presentation"
    },
         {
       id: 6,
       title: "Lectern Lore",
       image: "/assets/lecternlore.png",
       description: "It's time to put your Minecraft brain to the test! Lectern & Lore is a technical quiz that challenges your knowledge of the game's mechanics, redstone logic, crafting recipes, mob behavior and rich lore. From obscure trivia to in-game problem solving, only the most knowledgeable crafters will stand tall at the end.",
       category: "Technical Quiz"
     },
    {
      id: 7,
      title: "Nether Quest 2.0",
      image: "/assets/netherquest.png",
      description: "Journey through clues and challenges while dodging more lava accidents than you'd like.",
      category: "Treasure Hunt"
    },
    {
      id: 8,
      title: "Mine your Ideas",
      image: "/assets/pitchcraft.png",
      description: "Build your empire block by block by pitching an innovative project or product idea to impress the creepers judges.",
      category: "Idea Pitching"
    }
  ]);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.includes(cardId)) {
      // If card is already flipped, open modal
      setSelectedCard(cardId);
    } else {
      // If card is not flipped, flip it first
      setFlippedCards(prev => [...prev, cardId]);
      if (flipAudioRef.current) {
        flipAudioRef.current.play();
      }
    }
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-flip cards back after 5 seconds
  useEffect(() => {
    if (flippedCards.length > 0) {
      const timer = setTimeout(() => {
        setFlippedCards([]);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [flippedCards]);

  // Video loading optimization
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Try to load the video
      video.load();
      
             // Set a timeout to show video even if events don't fire
       const timeout = setTimeout(() => {
         if (!videoLoaded && !videoError) {
           setVideoLoaded(true);
         }
       }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [videoLoaded, videoError]);

  return (
    <div className="min-h-screen relative">
      {/* Background Video Section */}
      <div className="h-[85vh] relative overflow-hidden">
                 <video
           ref={videoRef}
           autoPlay
           muted
           playsInline
           className="absolute inset-0 w-full h-full object-cover"
           preload="auto"
           poster="/assets/homebg.jpg"
           style={{
             willChange: 'transform',
             transform: 'translateZ(0)'
           }}
           onLoadedData={() => {
             setVideoLoaded(true);
           }}
           onCanPlay={() => {
             setVideoLoaded(true);
           }}
           onEnded={() => {
             setVideoEnded(true);
           }}
           onError={(e) => {
             setVideoError(true);
           }}
         >
          <source src="/assets/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
                 {/* Fallback background image - shown while video loads, if video fails, or after video ends */}
         <div 
           className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
             videoLoaded && !videoError && !videoEnded ? 'opacity-0' : 'opacity-100'
           }`}
           style={{
             backgroundImage: 'url("/assets/homebg.jpg")',
             backgroundSize: 'cover',
             backgroundPosition: 'center'
           }}
         />
        

        {/* Header */}
        <header 
          className="w-full py-4 px-3 sm:px-6 shadow-lg relative z-10"
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
              
              <a href="/events" className="text-white font-semibold">
                Events
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

        {/* Main Content - Centered */}
        <main className="relative z-10 flex-1 flex items-center justify-center py-5 px-3 sm:px-6 h-full">
          <div className="max-w-7xl mx-auto w-full">
            {/* Page Title */}
                         <div className="text-center mb-12">
                               <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 tracking-tight">
                  <span className={videoEnded ? 'bg-gradient-to-r from-gray-300 via-white to-gray-400 bg-clip-text text-transparent' : 'text-white'}>
                    {videoEnded ? 'Upcoming Events' : 'Xplore\'25'}
                  </span>
                </h2>
               <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto px-4 font-medium">
                 {videoEnded ? 'Discover exciting events, workshops, and competitions organized by the Department of CSE' : 'Department of CSE'}
               </p>
             </div>
          </div>
        </main>

        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      </div>

      {/* Bottom Section with #171615 Background */}
      <div 
        className="w-full py-16 px-3 sm:px-6"
        style={{ backgroundColor: '#171615' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 px-4">
              Discover our Events
            </h3>
            <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto px-4">
              Click on any card to reveal the event details
            </p>
          </div>

          {/* Events Grid/Slider */}
          <div className="relative mb-12">
            {/* Desktop Grid */}
            <div className="hidden sm:block">
              <div className="grid grid-cols-4 gap-6">
                {events.map((event, index) => {
                  const isFlipped = flippedCards.includes(event.id);
                  return (
                    <div 
                      key={event.id}
                      className="w-full"
                    >
                      <div className="max-w-xs mx-auto w-full">
                        <div 
                          className="relative cursor-pointer perspective-1000 h-[450px]"
                          onClick={() => handleCardClick(event.id)}
                        >
                          <div 
                            className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                              isFlipped ? 'rotate-y-180' : ''
                            }`}
                          >
                            {/* Front of card (hidden content) */}
                            <div className="absolute inset-0 w-full h-full backface-hidden">
                              <div className="bg-black rounded-lg p-4 shadow-lg h-full flex flex-col border-2 border-white">
                                <div className="h-48 mb-3 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center flex-shrink-0">
                                  {event.id === 1 ? (
                                    <img 
                                      src="/assets/1.jpg" 
                                      alt="Hidden Event"
                                      className="w-full h-full object-cover"
                                      style={{ imageRendering: 'pixelated' }}
                                    />
                                  ) : event.id === 2 ? (
                                    <img 
                                      src="/assets/2.jpg" 
                                      alt="Hidden Event"
                                      className="w-full h-full object-cover"
                                      style={{ imageRendering: 'pixelated' }}
                                    />
                                  ) : event.id === 3 ? (
                                    <img 
                                      src="/assets/3.jpg" 
                                      alt="Hidden Event"
                                      className="w-full h-full object-cover"
                                      style={{ imageRendering: 'pixelated' }}
                                    />
                                  ) : event.id === 4 ? (
                                    <img 
                                      src="/assets/4.jpg" 
                                      alt="Hidden Event"
                                      className="w-full h-full object-cover"
                                      style={{ imageRendering: 'pixelated' }}
                                    />
                                  ) : event.id === 5 ? (
                                    <img 
                                      src="/assets/5.jpg" 
                                      alt="Hidden Event"
                                      className="w-full h-full object-cover"
                                      style={{ imageRendering: 'pixelated' }}
                                    />
                                  ) : event.id === 6 ? (
                                    <img 
                                      src="/assets/6.jpg" 
                                      alt="Hidden Event"
                                      className="w-full h-full object-cover"
                                      style={{ imageRendering: 'pixelated' }}
                                    />
                                  ) : event.id === 7 ? (
                                    <img 
                                      src="/assets/7.jpg" 
                                      alt="Hidden Event"
                                      className="w-full h-full object-cover"
                                      style={{ imageRendering: 'pixelated' }}
                                    />
                                  ) : event.id === 8 ? (
                                    <img 
                                      src="/assets/8.jpg" 
                                      alt="Hidden Event"
                                      className="w-full h-full object-cover"
                                      style={{ imageRendering: 'pixelated' }}
                                    />
                                  ) : (
                                    <div className="text-center">
                                      <div className="w-12 h-12 bg-gray-700 rounded-full mx-auto mb-3 flex items-center justify-center">
                                        <span className="text-xl text-white">?</span>
                                      </div>
                                      <h3 className="text-sm font-bold text-white mb-2">
                                        Event #{event.id.toString().padStart(2, '0')}
                                      </h3>
                                      <p className="text-gray-300 text-xs">
                                        Click to reveal
                                      </p>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex-1 flex flex-col">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="px-2 py-1 bg-gray-700 rounded-full text-white text-xs font-medium">
                                      Mystery
                                    </span>
                                    <span className="text-gray-400 text-xs">
                                      #{event.id.toString().padStart(2, '0')}
                                    </span>
                                  </div>
                                  
                                  <h3 className="text-sm font-bold text-white mb-2 line-clamp-2">
                                    Hidden Event
                                  </h3>
                                  
                                  <p className="text-xs text-gray-300 line-clamp-2 mb-3 flex-1">
                                    Click to discover what's behind this card
                                  </p>
                                  
                                  <button className="w-full py-2 px-3 bg-white hover:bg-gray-200 text-black rounded-lg transition-colors font-medium text-xs">
                                    Reveal
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Back of card (revealed content) */}
                            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                              <div className="bg-white rounded-lg p-4 shadow-lg h-full flex flex-col">
                                <div className="h-48 mb-3 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                  <img 
                                    src={event.image} 
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                    style={{ imageRendering: 'pixelated' }}
                                  />
                                </div>
                                
                                <div className="flex-1 flex flex-col">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className={`px-2 py-1 bg-gray-200 rounded-full text-gray-700 text-xs font-medium ${
                                      event.id === 1 || event.id === 2 ? 'max-w-[120px] truncate' : ''
                                    }`}>
                                      {event.category}
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                      #{event.id.toString().padStart(2, '0')}
                                    </span>
                                  </div>
                                  
                                  <h3 className="text-sm font-bold text-gray-800 mb-2 overflow-hidden" style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    textOverflow: 'ellipsis'
                                  }}>
                                    {event.title}
                                  </h3>
                                  
                                  <p className="text-xs text-gray-600 mb-3 flex-1 overflow-hidden" style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    textOverflow: 'ellipsis'
                                  }}>
                                    {event.description}
                                  </p>
                                  
                                  <button 
                                    className="w-full py-2 px-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium text-xs"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedCard(event.id);
                                    }}
                                  >
                                    Learn More
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Slider */}
            <div className="sm:hidden">
              <div className="relative overflow-hidden rounded-lg">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {events.map((event, index) => {
                    const isFlipped = flippedCards.includes(event.id);
                    return (
                      <div 
                        key={event.id}
                        className="w-full flex-shrink-0 px-2"
                      >
                        <div className="max-w-xs mx-auto w-full">
                          <div 
                            className="relative cursor-pointer perspective-1000 h-[500px]"
                            onClick={() => handleCardClick(event.id)}
                          >
                            <div 
                              className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                                isFlipped ? 'rotate-y-180' : ''
                              }`}
                            >
                              {/* Front of card (hidden content) */}
                              <div className="absolute inset-0 w-full h-full backface-hidden">
                                <div className="bg-black rounded-lg p-3 shadow-lg h-full flex flex-col border-2 border-white">
                                  <div className="h-56 mb-3 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center flex-shrink-0">
                                    {event.id === 1 ? (
                                      <img 
                                        src="/assets/1.jpg" 
                                        alt="Hidden Event"
                                        className="w-full h-full object-cover"
                                        style={{ imageRendering: 'pixelated' }}
                                      />
                                    ) : event.id === 2 ? (
                                      <img 
                                        src="/assets/2.jpg" 
                                        alt="Hidden Event"
                                        className="w-full h-full object-cover"
                                        style={{ imageRendering: 'pixelated' }}
                                      />
                                    ) : event.id === 3 ? (
                                      <img 
                                        src="/assets/3.jpg" 
                                        alt="Hidden Event"
                                        className="w-full h-full object-cover"
                                        style={{ imageRendering: 'pixelated' }}
                                      />
                                    ) : event.id === 4 ? (
                                      <img 
                                        src="/assets/4.jpg" 
                                        alt="Hidden Event"
                                        className="w-full h-full object-cover"
                                        style={{ imageRendering: 'pixelated' }}
                                      />
                                    ) : event.id === 5 ? (
                                      <img 
                                        src="/assets/5.jpg" 
                                        alt="Hidden Event"
                                        className="w-full h-full object-cover"
                                        style={{ imageRendering: 'pixelated' }}
                                      />
                                    ) : event.id === 6 ? (
                                      <img 
                                        src="/assets/6.jpg" 
                                        alt="Hidden Event"
                                        className="w-full h-full object-cover"
                                        style={{ imageRendering: 'pixelated' }}
                                      />
                                    ) : event.id === 7 ? (
                                      <img 
                                        src="/assets/7.jpg" 
                                        alt="Hidden Event"
                                        className="w-full h-full object-cover"
                                        style={{ imageRendering: 'pixelated' }}
                                      />
                                    ) : event.id === 8 ? (
                                      <img 
                                        src="/assets/8.jpg" 
                                        alt="Hidden Event"
                                        className="w-full h-full object-cover"
                                        style={{ imageRendering: 'pixelated' }}
                                      />
                                    ) : (
                                      <div className="text-center">
                                        <div className="w-12 h-12 bg-gray-700 rounded-full mx-auto mb-3 flex items-center justify-center">
                                          <span className="text-xl text-white">?</span>
                                        </div>
                                        <h3 className="text-sm font-bold text-white mb-2">
                                          Event #{event.id.toString().padStart(2, '0')}
                                        </h3>
                                        <p className="text-gray-300 text-xs">
                                          Click to reveal
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className="px-2 py-1 bg-gray-700 rounded-full text-white text-xs font-medium">
                                        Mystery
                                      </span>
                                      <span className="text-gray-400 text-xs">
                                        #{event.id.toString().padStart(2, '0')}
                                      </span>
                                    </div>
                                    
                                    <h3 className="text-sm font-bold text-white mb-2 line-clamp-2">
                                      Hidden Event
                                    </h3>
                                    
                                    <p className="text-xs text-gray-300 line-clamp-2 mb-3 flex-1">
                                      Click to discover what's behind this card
                                    </p>
                                    
                                    <button className="w-full py-2 px-3 bg-white hover:bg-gray-200 text-black rounded-lg transition-colors font-medium text-xs">
                                      Reveal
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Back of card (revealed content) */}
                              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                                <div className="bg-white rounded-lg p-3 shadow-lg h-full flex flex-col">
                                  <div className="h-56 mb-3 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img 
                                      src={event.image} 
                                      alt={event.title}
                                      className="w-full h-full object-cover"
                                      style={{ imageRendering: 'pixelated' }}
                                    />
                                  </div>
                                  
                                  <div className="flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-2">
                                      <span className={`px-2 py-1 bg-gray-200 rounded-full text-gray-700 text-xs font-medium ${
                                        event.id === 1 || event.id === 2 ? 'max-w-[120px] truncate' : ''
                                      }`}>
                                        {event.category}
                                      </span>
                                      <span className="text-gray-500 text-xs">
                                        #{event.id.toString().padStart(2, '0')}
                                      </span>
                                    </div>
                                    
                                    <h3 className="text-sm font-bold text-gray-800 mb-2 overflow-hidden" style={{
                                      display: '-webkit-box',
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: 'vertical',
                                      textOverflow: 'ellipsis'
                                    }}>
                                      {event.title}
                                    </h3>
                                    
                                    <p className="text-xs text-gray-600 mb-3 flex-1 overflow-hidden" style={{
                                      display: '-webkit-box',
                                      WebkitLineClamp: 3,
                                      WebkitBoxOrient: 'vertical',
                                      textOverflow: 'ellipsis'
                                    }}>
                                      {event.description}
                                    </p>
                                    
                                    <button 
                                      className="w-full py-2 px-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium text-xs"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedCard(event.id);
                                      }}
                                    >
                                      Learn More
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Navigation Buttons */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Mobile Dots Indicator */}
              <div className="flex justify-center space-x-2 mt-6">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 border-t border-gray-700 pt-8">
            <div className="text-center">
              <h4 className="text-xl font-bold text-white mb-6">Student Coordinators</h4>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                  <h5 className="font-semibold text-white mb-2">Sairam</h5>
                  <p className="text-gray-300 text-sm">93421 99098</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
                  <h5 className="font-semibold text-white mb-2">Mathan Kumaar</h5>
                  <p className="text-gray-300 text-sm">99621 29234</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Modal for Selected Card */}
      {selectedCard && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="relative max-w-6xl w-full">
            <button 
              onClick={closeModal}
              className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-white rounded-full p-1.5 sm:p-2 text-black hover:bg-gray-200 transition-colors z-10"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
                         <div className="bg-white rounded-lg p-2 sm:p-4 shadow-xl max-h-[90vh] sm:max-h-[80vh] overflow-y-auto">
              {(() => {
                const event = events.find(e => e.id === selectedCard);
                if (!event) return null;
                
                return (
                                     <div className="flex flex-col lg:flex-row gap-2 sm:gap-6">
                    {/* Left Column - Existing Content */}
                    <div className="flex-1 flex flex-col justify-center">
                                             <div className="h-[400px] sm:h-[768px] mb-2 sm:mb-3 rounded-lg overflow-hidden bg-gray-100">
                         <img 
                           src={(() => {
                             const posterImages = {
                               1: "/assets/battle_of_biomes_poster.png",
                               2: "/assets/blocksmith_poster.png", 
                               3: "/assets/capture_the_craft_table_poster.png",
                               4: "/assets/crafting_the_interface_poster.png",
                               5: "/assets/diamond_docs_poster.png",
                               6: "/assets/lectern_lore_poster.png",
                               7: "/assets/nether_quest_poster.png",
                               8: "/assets/mine_your_ideas_poster.png"
                             };
                             return posterImages[event.id as keyof typeof posterImages] || `/assets/${event.id}.jpg`;
                           })()}
                           alt={event.title}
                           className="w-full h-full object-cover"
                           style={{ imageRendering: 'pixelated' }}
                         />
                       </div>
                      
                      <div className="flex items-center justify-between mb-1 sm:mb-2">
                        <span className={`px-1 sm:px-2 py-1 bg-gray-200 rounded-full text-gray-700 text-xs font-medium ${
                          event.id === 1 || event.id === 2 ? 'max-w-[100px] sm:max-w-[120px] truncate' : ''
                        }`}>
                          {event.category}
                        </span>
                        <span className="text-gray-500 text-xs">
                          #{event.id.toString().padStart(2, '0')}
                        </span>
                      </div>
                      
                      <h3 className="text-sm sm:text-lg font-bold text-gray-800 mb-1 sm:mb-2">
                        {event.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">
                        {event.description}
                      </p>
                      
                                             <button 
                         className="w-full py-2 px-2 sm:px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium text-xs sm:text-sm"
                         onClick={() => {
                           const registrationLinks = {
                             1: "https://forms.gle/8HK38gcdaHy8Gebs6", // Battle of Biomes
                             2: "https://forms.gle/cjoTAWxMSrGxndp58", // Blocksmith's Showcase
                             3: "https://forms.gle/ozxRQiJhUeUiQSjt9", // Capture the Craft Table
                             4: "https://forms.gle/DZqZS2xyvyrw9tbe8", // Crafting the Interface
                             5: "https://forms.gle/7AAzxRWfhURK2VRq7", // Diamond Docs
                             6: "https://forms.gle/jKoeZaBKyoqttG7r9", // Lectern Lore
                             7: "https://forms.gle/VfSioKBF7szRT3zk9", // Nether Quest
                             8: "https://forms.gle/2WKLLb8VfRpYwe3e6"  // Pitchcraft
                           };
                           const link = registrationLinks[event.id as keyof typeof registrationLinks];
                           if (link) {
                             window.open(link, '_blank');
                           }
                         }}
                       >
                         Register
                       </button>
                    </div>

                                                              {/* Right Column - Event Specific Rules */}
                      <div className="flex-1 lg:border-l lg:border-gray-200 lg:pl-6 pt-4 lg:pt-0">
                        <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-3">Event Details & Rules</h4>
                        
                        <div className="space-y-2 sm:space-y-3">
                          {/* Event Specific Content - Shown First */}
                          {event.id === 1 && (
                            <>
                              <div className="bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200">
                                <h5 className="font-semibold text-blue-700 mb-1 text-xs sm:text-sm">Battle Format</h5>
                                <ul className="text-xs text-blue-600 space-y-1">
                                  <li>• One-on-one coding matches with a set of problems</li>
                                  <li>• Limited time for each round</li>
                                  <li>• Winner advances to the next biome (round)</li>
                                </ul>
                              </div>
                              <div className="bg-green-50 p-2 sm:p-3 rounded-lg border border-green-200">
                                <h5 className="font-semibold text-green-700 mb-1 text-xs sm:text-sm">Winning Criteria</h5>
                                <ul className="text-xs text-green-600 space-y-1">
                                  <li>• Number of problems solved</li>
                                  <li>• Accuracy of solutions</li>
                                  <li>• Time taken</li>
                                </ul>
                              </div>
                            </>
                          )}

                          {event.id === 2 && (
                            <>
                              <div className="bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200">
                                <h5 className="font-semibold text-blue-700 mb-1 text-xs sm:text-sm">Building Rules</h5>
                                <ul className="text-xs text-blue-600 space-y-1">
                                  <li>• Solo or team participation allowed</li>
                                  <li>• Theme for the build announced at event start</li>
                                  <li>• Limited build time; must be done in survival or creative (as specified)</li>
                                </ul>
                              </div>
                              <div className="bg-green-50 p-2 sm:p-3 rounded-lg border border-green-200">
                                <h5 className="font-semibold text-green-700 mb-1 text-xs sm:text-sm">Winning Criteria</h5>
                                <ul className="text-xs text-green-600 space-y-1">
                                  <li>• Creativity and originality</li>
                                  <li>• Attention to detail</li>
                                  <li>• Overall aesthetic appeal</li>
                                </ul>
                              </div>
                            </>
                          )}

                          {event.id === 3 && (
                            <>
                              <div className="bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200">
                                <h5 className="font-semibold text-blue-700 mb-1 text-xs sm:text-sm">CTF Challenge</h5>
                                <ul className="text-xs text-blue-600 space-y-1">
                                  <li>• Solve cybersecurity puzzles and exploit vulnerabilities</li>
                                  <li>• Defend your Crafting Table while stealing opponent's</li>
                                  <li>• First to capture all flags wins</li>
                                </ul>
                              </div>
                              <div className="bg-green-50 p-2 sm:p-3 rounded-lg border border-green-200">
                                <h5 className="font-semibold text-green-700 mb-1 text-xs sm:text-sm">Winning Criteria</h5>
                                <ul className="text-xs text-green-600 space-y-1">
                                  <li>• Number of flags captured</li>
                                  <li>• Time taken</li>
                                </ul>
                              </div>
                            </>
                          )}

                          {event.id === 4 && (
                            <>
                              <div className="bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200">
                                <h5 className="font-semibold text-blue-700 mb-1 text-xs sm:text-sm">Design Process</h5>
                                <ul className="text-xs text-blue-600 space-y-1">
                                  <li>• Participants are given a design brief</li>
                                  <li>• Must submit final mockup or prototype within allotted time</li>
                                  <li>• Focus on visually stunning and highly usable interfaces</li>
                                </ul>
                              </div>
                              <div className="bg-green-50 p-2 sm:p-3 rounded-lg border border-green-200">
                                <h5 className="font-semibold text-green-700 mb-1 text-xs sm:text-sm">Winning Criteria</h5>
                                <ul className="text-xs text-green-600 space-y-1">
                                  <li>• Visual appeal</li>
                                  <li>• Usability and accessibility</li>
                                  <li>• Creativity</li>
                                </ul>
                              </div>
                            </>
                          )}

                          {event.id === 5 && (
                            <>
                              <div className="bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200">
                                <h5 className="font-semibold text-blue-700 mb-1 text-xs sm:text-sm">Presentation Rules</h5>
                                <ul className="text-xs text-blue-600 space-y-1">
                                  <li>• Presentations must be tech-oriented and under 8 minutes</li>
                                  <li>• Use of slides is mandatory</li>
                                  <li>• Questions from judges follow each presentation</li>
                                </ul>
                              </div>
                              <div className="bg-green-50 p-2 sm:p-3 rounded-lg border border-green-200">
                                <h5 className="font-semibold text-green-700 mb-1 text-xs sm:text-sm">Winning Criteria</h5>
                                <ul className="text-xs text-green-600 space-y-1">
                                  <li>• Originality of idea</li>
                                  <li>• Practicality & impact</li>
                                  <li>• Presentation clarity and engagement</li>
                                </ul>
                              </div>
                            </>
                          )}

                                                     {event.id === 6 && (
                             <>
                               <div className="bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200">
                                 <h5 className="font-semibold text-blue-700 mb-1 text-xs sm:text-sm">Quiz Format</h5>
                                 <ul className="text-xs text-blue-600 space-y-1">
                                   <li>• Multiple rounds including rapid-fire questions, puzzles and situational challenges</li>
                                   <li>• Participants can compete solo or in teams (limit decided by organizers)</li>
                                   <li>• Covers gameplay mechanics, technical features, crafting, mobs, and lore</li>
                                   <li>• No internet, books or guides during the quiz</li>
                                 </ul>
                               </div>
                               <div className="bg-green-50 p-2 sm:p-3 rounded-lg border border-green-200">
                                 <h5 className="font-semibold text-green-700 mb-1 text-xs sm:text-sm">Scoring & Rules</h5>
                                 <ul className="text-xs text-green-600 space-y-1">
                                   <li>• Points awarded for accuracy and speed</li>
                                   <li>• Tie breakers decided through special challenge rounds</li>
                                   <li>• Any cheating or disruptive conduct results in immediate disqualification</li>
                                   <li>• All disputes and scoring decisions are final</li>
                                 </ul>
                               </div>
                             </>
                           )}

                          {event.id === 7 && (
                            <>
                              <div className="bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200">
                                <h5 className="font-semibold text-blue-700 mb-1 text-xs sm:text-sm">Quest Format</h5>
                                <ul className="text-xs text-blue-600 space-y-1">
                                  <li>• Follow the clue chain to find hidden treasures</li>
                                  <li>• Some challenges may be coding or puzzle-based</li>
                                  <li>• Navigate through challenging environments</li>
                                </ul>
                              </div>
                              <div className="bg-green-50 p-2 sm:p-3 rounded-lg border border-green-200">
                                <h5 className="font-semibold text-green-700 mb-1 text-xs sm:text-sm">Winning Criteria</h5>
                                <ul className="text-xs text-green-600 space-y-1">
                                  <li>• First to complete the quest</li>
                                  <li>• Least penalties from wrong clues</li>
                                </ul>
                              </div>
                            </>
                          )}

                          {event.id === 8 && (
                            <>
                              <div className="bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200">
                                <h5 className="font-semibold text-blue-700 mb-1 text-xs sm:text-sm">Pitch Format</h5>
                                <ul className="text-xs text-blue-600 space-y-1">
                                  <li>• 5-minute pitch + 3-minute Q&A</li>
                                  <li>• Use of prototypes, slides, or demos encouraged</li>
                                  <li>• Present innovative project or product ideas</li>
                                </ul>
                              </div>
                              <div className="bg-green-50 p-2 sm:p-3 rounded-lg border border-green-200">
                                <h5 className="font-semibold text-green-700 mb-1 text-xs sm:text-sm">Winning Criteria</h5>
                                <ul className="text-xs text-green-600 space-y-1">
                                  <li>• Creativity</li>
                                  <li>• Feasibility</li>
                                  <li>• Presentation style</li>
                                </ul>
                              </div>
                            </>
                          )}

                          {/* General Rules Section - Shown After Event Specific */}
                          <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                            <h5 className="font-semibold text-gray-700 mb-1 text-xs sm:text-sm">General Rules</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• All participants must register before the event</li>
                              <li>• Valid student ID is mandatory for participation</li>
                              <li>• Follow all safety guidelines and instructions</li>
                              <li>• Respect other participants and organizers</li>
                            </ul>
                          </div>

                          <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                            <h5 className="font-semibold text-gray-700 mb-1 text-xs sm:text-sm">Event Specific</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• Arrive 15 minutes before the event starts</li>
                              <li>• Bring necessary equipment if required</li>
                              <li>• No external assistance during competitions</li>
                              <li>• Decisions of judges are final</li>
                            </ul>
                          </div>

                          <div className="bg-gray-50 p-2 sm:p-3 rounded-lg">
                            <h5 className="font-semibold text-gray-700 mb-1 text-xs sm:text-sm">Code of Conduct</h5>
                            <ul className="text-xs text-gray-600 space-y-1">
                              <li>• Maintain professional behavior throughout</li>
                              <li>• No use of unfair means or cheating</li>
                              <li>• Report any issues to event coordinators</li>
                              <li>• Help maintain a clean event environment</li>
                            </ul>
                          </div>
                                                    {/* Important Notes Section - Common for all events */}
                           <div className="bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200">
                             <h5 className="font-semibold text-blue-700 mb-1 text-xs sm:text-sm">Important Notes</h5>
                             <ul className="text-xs text-blue-600 space-y-1">
                               <li>• Winners will be announced at the closing ceremony</li>
                               <li>• Certificates will be provided to all participants</li>
                               <li>• Photos and videos may be taken during events</li>
                               <li>• Contact organizers for any special requirements</li>
                             </ul>
                           </div>
                         </div>
                       </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
      
      {/* Audio for flip sound */}
      <audio ref={flipAudioRef} src="/assets/flip.mp3" preload="auto" />
    </div>
  );
}
