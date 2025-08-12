"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";

const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

const BoxWithEdges = ({
  position,
}: {
  position: THREE.Vector3;
}) => {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color="#4a4a4a"
          transparent={true}
          opacity={0.9}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(0.5, 0.5, 0.5)]} />
        <lineBasicMaterial color="#1a1a1a" />
      </lineSegments>
    </group>
  );
};

type LetterShape = (0 | 1)[][];

const BoxLetter = ({
  letter,
  position,
}: {
  letter: string;
  position: THREE.Vector3;
}) => {
  const group = useRef<THREE.Group>(null);

  const getLetterShape = (letter: string): LetterShape => {
    const shapes: Record<string, LetterShape> = {
      X: [
        [1, 0, 1],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [1, 0, 1],
      ],
      P: [
        [1, 1, 0],
        [1, 0, 1],
        [1, 1, 0],
        [1, 0, 0],
        [1, 0, 0],
      ],
      L: [
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1],
      ],
      O: [
        [0, 1, 0],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [0, 1, 0],
      ],
      R: [
        [1, 1, 0],
        [1, 0, 1],
        [1, 1, 0],
        [1, 0, 1],
        [1, 0, 1],
      ],
      E: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 0],
        [1, 0, 0],
        [1, 1, 1],
      ],
      "2": [
        [0, 1, 0],
        [1, 0, 1],
        [0, 0, 1],
        [0, 1, 0],
        [1, 1, 1],
      ],
      "5": [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
        [1, 1, 1],
      ],
    };
    return shapes[letter] || shapes["X"];
  };

  const letterShape = getLetterShape(letter);

  return (
    <group ref={group} position={position}>
      {letterShape.map((row, i) =>
        row.map((cell, j) => {
          if (cell) {
            let xOffset = j * 0.5 - 0.75;

            return (
              <BoxWithEdges
                key={`${i}-${j}`}
                position={new THREE.Vector3(xOffset, (4 - i) * 0.5 - 1, 0)}
              />
            );
          }
          return null;
        })
      )}
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <group position={[0, 0, 0]} rotation={[0, Math.PI / 1.5, 0]}>
        <BoxLetter letter="X" position={new THREE.Vector3(-7, 0, 0)} />
        <BoxLetter letter="P" position={new THREE.Vector3(-5, 0, 0)} />
        <BoxLetter letter="L" position={new THREE.Vector3(-3, 0, 0)} />
        <BoxLetter letter="O" position={new THREE.Vector3(-1, 0, 0)} />
        <BoxLetter letter="R" position={new THREE.Vector3(1, 0, 0)} />
        <BoxLetter letter="E" position={new THREE.Vector3(3, 0, 0)} />
        <BoxLetter letter="2" position={new THREE.Vector3(5, 0, 0)} />
        <BoxLetter letter="5" position={new THREE.Vector3(7, 0, 0)} />
      </group>
      
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

const ArcadeButton = ({ onClick }: { onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && !isMobile) {
      interval = setInterval(() => {
        setIsAnimating((prev) => !prev);
      }, 200);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered]);

  return (
    <div className="pixel-button-container">
      <div className="scanlines"></div>
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
          setIsAnimating(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        className={`
          pixel-button
          ${isPressed ? "pixel-button-pressed" : ""}
          ${isHovered && isAnimating && !isMobile ? "pixel-button-blink" : ""}
        `}
      >
        <span className="pixel-text">EXPLORE</span>
        <div className={`pixel-arrow ${isHovered && !isMobile ? "pixel-arrow-animated" : ""}`}>
          <div className="pixel"></div>
          <div className="pixel"></div>
          <div className="pixel"></div>
        </div>
      </button>
    </div>
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
    window.location.href = "/";
  };

  return (
    <div 
      className="w-full h-screen bg-gray-900 relative overflow-hidden"
      style={{ touchAction: "none" }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-900">
          <div className="text-white text-xl">Loading 3D Scene...</div>
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
      <div className="absolute bottom-24 md:bottom-16 left-0 right-0 flex justify-center pointer-events-auto">
        <ArcadeButton onClick={handleExplore} />
      </div>
    </div>
  );
}