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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set volume to 30%
      audioRef.current.loop = true; // Loop the music
      
      // Try to autoplay the music
      const playMusic = async () => {
        try {
          await audioRef.current?.play();
        } catch (error) {
          console.log('Autoplay prevented by browser. User interaction required.');
        }
      };
      
      playMusic();
    }
  }, []);

  return <audio ref={audioRef} src="/assets/bgm.mp3" preload="auto" />;
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
         <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-900">
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
          
          {/* Button below the logo */}
          <div className="pointer-events-auto">
            <ImageButton onClick={handleExplore} />
          </div>
        </div>
      </div>
      <BackgroundMusic />
    </div>
  );
}