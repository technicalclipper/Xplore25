"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  
  const constructionTexts = [
    "Building something amazing...",
    "Crafting the future...",
    "Assembling greatness...",
    "Creating magic...",
    "Engineering excellence..."
  ];

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 1000);

    // Animate text
    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % constructionTexts.length);
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <svg 
              className="w-12 h-12 text-white animate-pulse" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" 
              />
            </svg>
          </div>
        </div>

        {/* Xplore25 Heading */}
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-2 tracking-tight">
          <span className="bg-gradient-to-r from-gray-300 via-white to-gray-400 bg-clip-text text-transparent">
            Xplore25
          </span>
        </h1>

        {/* Department of CSE Subtitle */}
        <p className="text-xl md:text-2xl text-gray-400 mb-6 font-medium tracking-wide">
          Department of CSE
        </p>

        {/* Under Construction Title */}
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-gray-400 via-gray-300 to-white bg-clip-text text-transparent">
            Under Construction
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
          {constructionTexts[currentText]}
        </p>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm">
            <div 
              className="bg-gradient-to-r from-gray-400 via-white to-gray-300 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Progress: {Math.round(Math.min(progress, 100))}%
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: "⚡", title: "Fast", desc: "Lightning speed" },
            { icon: "🎯", title: "Precise", desc: "Perfect execution" },
            { icon: "🛡️", title: "Secure", desc: "Built with safety" }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <h3 className="text-white font-semibold">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <p className="text-gray-300 mb-2">Something exciting is coming soon!</p>
          <p className="text-gray-400 text-sm">
            Stay tuned for updates and be the first to know when we launch.
          </p>
        </div>

        {/* Quick link to new page */}
        <div className="mt-6">
          <a
            href="/new-page"
            className="inline-block px-4 py-2 rounded border border-white/20 bg-white/10 hover:bg-white/20 transition"
          >
            Go to New Page →
          </a>
        </div>

        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-4 h-4 bg-white rounded-full animate-bounce"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-gray-400 rounded-full animate-bounce animation-delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-gray-300 rounded-full animate-bounce animation-delay-2000"></div>
        <div className="absolute bottom-10 right-10 w-5 h-5 bg-white rounded-full animate-bounce animation-delay-3000"></div>
      </div>
    </div>
  );
}
