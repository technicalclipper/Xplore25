"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

const Scene = () => {
  return (
    <>
      <OrbitControls
        enableZoom={!isMobile}
        enablePan={!isMobile}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={isMobile ? 1.2 : 3}
        target={[0, 0, 0]}
        maxPolarAngle={Math.PI * 0.6}
        minPolarAngle={Math.PI * 0.3}
        maxAzimuthAngle={Math.PI * 0.8}
        minAzimuthAngle={-Math.PI * 0.8}
      />

      <ambientLight intensity={isMobile ? 0.9 : 0.5} />
      <directionalLight position={[5, 5, 5]} intensity={isMobile ? 0.7 : 0.5} color="#ffffff" />
      <pointLight position={[0, 10, 0]} intensity={isMobile ? 0.5 : 0.3} color="#ffffff" />

      <Environment
        files="/assets/skie.jpg"
        background
        resolution={isMobile ? 256 : 512}
      />
    </>
  );
};

const ImageButton = ({ onClick }: { onClick: () => void }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      className="relative transition-transform duration-100 ease-in-out hover:scale-105 active:scale-95"
      style={{
        transform: isPressed ? 'scale(0.95)' : 'scale(1)',
        imageRendering: 'pixelated'
      }}
    >
      <img
        src="/assets/button.png"
        alt="EXPLORE"
        className="max-w-[200px] sm:max-w-[220px] md:max-w-[240px] lg:max-w-[260px] w-auto h-auto drop-shadow-2xl"
        style={{
          filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.6))',
          imageRendering: 'pixelated'
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <span className="text-black font-black text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-wider drop-shadow-lg" style={{
           textShadow: '2px 2px 0px #ffffff, 4px 4px 0px rgba(255,255,255,0.5)',
           fontFamily: 'var(--font-press-start-2p), "Press Start 2P", monospace',
           textTransform: 'uppercase',
           fontWeight: '900'
         }}>
          EXPLORE
        </span>
      </div>
    </button>
  );
};

const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set volume to 30%
      audioRef.current.loop = true; // Loop the music
      
      // Try to autoplay immediately
      const playMusic = async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
          console.log('Audio started automatically');
        } catch (error) {
          console.log('Autoplay prevented by browser. Waiting for user interaction.');
          setIsPlaying(false);
        }
      };
      
      playMusic();
    }
  }, []);

  // Listen for user interaction to enable audio
  useEffect(() => {
    const enableAudio = async () => {
      if (audioRef.current && !isPlaying && !hasUserInteracted) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setHasUserInteracted(true);
          console.log('Audio enabled after user interaction');
        } catch (error) {
          console.log('Failed to enable audio after user interaction');
        }
      }
    };

    const handleUserInteraction = () => {
      if (!hasUserInteracted) {
        setHasUserInteracted(true);
        enableAudio();
      }
    };

    // Add event listeners for various user interactions
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });
    document.addEventListener('scroll', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
    };
  }, [isPlaying, hasUserInteracted]);

  const toggleAudio = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Failed to play audio');
        }
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/assets/bgm.mp3" preload="auto" />
      
      {/* Audio Control Button */}
      <button
        onClick={toggleAudio}
        className="absolute top-4 right-4 z-30 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-16 z-30 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        )}
      </button>
    </>
  );
};

export default function SkyboxPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simple loading delay
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleExplore = () => {
    window.location.href = "/events";
  };

  return (
    <div 
      className="w-full h-screen bg-gray-900 relative overflow-hidden"
      style={{ touchAction: "none" }}
    >
             {isLoading && (
         <div 
           className="absolute inset-0 flex items-center justify-center z-50"
           style={{
             backgroundImage: 'url(/assets/dirt.jpg)',
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             backgroundRepeat: 'no-repeat'
           }}
         >
           <div className="text-white text-xl">Generating World...</div>
         </div>
       )}
      <div className="w-full h-full absolute inset-0">
        <Canvas 
          camera={{ 
            position: [12, 0, -20], 
            fov: isMobile ? 60 : 50,
            near: 0.1,
            far: 1000
          }}
          gl={{
            antialias: !isMobile,
            alpha: false,
            powerPreference: isMobile ? "high-performance" : "default",
            failIfMajorPerformanceCaveat: false
          }}
          dpr={isMobile ? 1 : [1, 2]}
          performance={{ min: isMobile ? 0.1 : 0.5 }}
          onCreated={({ gl }) => {
            gl.setClearColor('#000000', 1);
            if (!isMobile) {
              gl.toneMapping = THREE.ACESFilmicToneMapping;
              gl.toneMappingExposure = 1.2;
            }
          }}
        >
          <Scene />
        </Canvas>
      </div>
      
             {/* XPLORES Image Overlay */}
       <div className="absolute inset-0 flex items-center justify-center z-20 mt-16 pointer-events-none">
         <div className="relative flex flex-col items-center gap-2">
           {/* XPLORES Logo */}
           <img 
             src="/assets/logo.png" 
             alt="XPLORES" 
             className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl w-auto h-auto drop-shadow-2xl pointer-events-none"
             style={{
               filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
               imageRendering: 'pixelated'
             }}
           />
           
           {/* Button below the logo - only show when not loading */}
           {!isLoading && (
             <div className="pointer-events-auto">
               <ImageButton onClick={handleExplore} />
             </div>
           )}
         </div>
       </div>
      <BackgroundMusic />
    </div>
  );
}