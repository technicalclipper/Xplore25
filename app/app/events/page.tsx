"use client";

import { useState, useEffect, useRef } from "react";

export default function EventsPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const flipAudioRef = useRef<HTMLAudioElement>(null);
  
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Battle of Biomes",
      image: "/assets/battleofbiomes.png",
      description: "Compete in the ultimate biome-based challenge where different environments clash in an epic battle of survival and strategy.",
      category: "Competition"
    },
    {
      id: 2,
      title: "Black Smith's Showcase",
      image: "/assets/blacksmithshowcase.png",
      description: "Showcase your crafting skills and demonstrate the art of blacksmithing in this unique exhibition event.",
      category: "Showcase"
    },
    {
      id: 3,
      title: "Capture the Flag",
      image: "/assets/capturetheflag.png",
      description: "Join the classic capture the flag competition with a modern twist and strategic gameplay elements.",
      category: "Game"
    },
    {
      id: 4,
      title: "Crafting the Interface",
      image: "/assets/craftingtheinterface.png",
      description: "Learn and demonstrate the art of creating user interfaces through hands-on crafting workshops.",
      category: "Workshop"
    },
    {
      id: 5,
      title: "Diamond Docs",
      image: "/assets/diamonddocs.png",
      description: "Documentation excellence workshop focusing on creating clear, comprehensive, and valuable documentation.",
      category: "Workshop"
    },
    {
      id: 6,
      title: "Lectern Lore",
      image: "/assets/lecternlore.png",
      description: "Explore the ancient knowledge and share wisdom through interactive lectern presentations and storytelling.",
      category: "Presentation"
    },
    {
      id: 7,
      title: "Nether Quest",
      image: "/assets/netherquest.png",
      description: "Embark on an adventurous quest through challenging environments with unique obstacles and rewards.",
      category: "Adventure"
    },
    {
      id: 8,
      title: "Pitch Craft",
      image: "/assets/pitchcraft.png",
      description: "Master the art of pitching ideas and projects through structured workshops and practice sessions.",
      category: "Workshop"
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

  return (
    <div className="min-h-screen relative">
      {/* Background Image Section */}
      <div 
        className="h-[85vh] relative"
        style={{
          backgroundImage: 'url("/assets/homebg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Header */}
        <header 
          className="w-full py-4 px-3 sm:px-6 shadow-lg relative z-10"
          style={{ backgroundColor: '#252323' }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
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
            </nav>
          </div>
        </header>

        {/* Main Content - Centered */}
        <main className="relative z-10 flex-1 flex items-center justify-center py-5 px-3 sm:px-6 h-full">
          <div className="max-w-7xl mx-auto w-full">
            {/* Page Title */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-gray-300 via-white to-gray-400 bg-clip-text text-transparent">
                  Upcoming Events
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
                Discover exciting events, workshops, and competitions organized by the Department of CSE
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
                                    <span className="px-2 py-1 bg-gray-200 rounded-full text-gray-700 text-xs font-medium">
                                      {event.category}
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                      #{event.id.toString().padStart(2, '0')}
                                    </span>
                                  </div>
                                  
                                  <h3 className="text-sm font-bold text-gray-800 mb-2">
                                    {event.title}
                                  </h3>
                                  
                                  <p className="text-xs text-gray-600 mb-3 flex-1">
                                    {event.description}
                                  </p>
                                  
                                  <button 
                                    className="w-full py-2 px-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium text-xs"
                                    onClick={(e) => e.stopPropagation()}
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
                                      <span className="px-2 py-1 bg-gray-200 rounded-full text-gray-700 text-xs font-medium">
                                        {event.category}
                                      </span>
                                      <span className="text-gray-500 text-xs">
                                        #{event.id.toString().padStart(2, '0')}
                                      </span>
                                    </div>
                                    
                                    <h3 className="text-sm font-bold text-gray-800 mb-2">
                                      {event.title}
                                    </h3>
                                    
                                    <p className="text-xs text-gray-600 mb-3 flex-1">
                                      {event.description}
                                    </p>
                                    
                                    <button 
                                      className="w-full py-2 px-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium text-xs"
                                      onClick={(e) => e.stopPropagation()}
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

          {/* Call to Action */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium border border-white/20 text-sm sm:text-base">
                Register for Events
              </button>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium border border-white/20 text-sm sm:text-base">
                Contact Us
              </button>
            </div>
          </div>
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
            
            <div className="bg-white rounded-lg p-3 sm:p-4 shadow-xl max-h-[90vh] sm:max-h-[80vh] overflow-y-auto">
              {(() => {
                const event = events.find(e => e.id === selectedCard);
                if (!event) return null;
                
                return (
                  <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                    {/* Left Column - Existing Content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="h-48 sm:h-64 mb-3 rounded-lg overflow-hidden bg-gray-100">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-1 bg-gray-200 rounded-full text-gray-700 text-xs font-medium">
                          {event.category}
                        </span>
                        <span className="text-gray-500 text-xs">
                          #{event.id.toString().padStart(2, '0')}
                        </span>
                      </div>
                      
                      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">
                        {event.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-gray-600 mb-4">
                        {event.description}
                      </p>
                      
                      <button 
                        className="w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium text-sm"
                      >
                        Learn More
                      </button>
                    </div>

                    {/* Right Column - Rules and Regulations */}
                    <div className="flex-1 lg:border-l lg:border-gray-200 lg:pl-6 pt-4 lg:pt-0">
                      <h4 className="text-sm sm:text-base font-bold text-gray-800 mb-3">Rules & Regulations</h4>
                      
                      <div className="space-y-2 sm:space-y-3">
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
