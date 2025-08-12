# Minecraft Components - Unified Style Guide

## Table of Contents
1. [Overview](#overview)
2. [Setup & Dependencies](#setup--dependencies)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Component Architecture](#component-architecture)
6. [Animation System](#animation-system)
7. [Component Library](#component-library)
8. [Implementation Examples](#implementation-examples)
9. [Best Practices](#best-practices)

## Overview

This style guide provides comprehensive documentation for creating authentic Minecraft-themed UI components using React, TypeScript, Tailwind CSS, and Framer Motion. The system features pixelated aesthetics, biome-specific theming, and authentic gaming UI patterns.

### Core Principles
- **Authentic Pixelated Aesthetic**: Sharp edges, no anti-aliasing, blocky design
- **Biome-Based Theming**: Seven distinct biome color schemes
- **Consistent Typography**: Press Start 2P font throughout
- **Smooth Animations**: Spring-based hover and interaction effects
- **Accessibility First**: WCAG AA compliant contrast ratios

## Setup & Dependencies

### Required Dependencies
\`\`\`bash
npm install framer-motion lucide-react
npm install -D tailwindcss @types/react
\`\`\`

### Font Configuration
\`\`\`tsx
// app/layout.tsx
import { Press_Start_2P } from 'next/font/google'

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-press-start-2p',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${pressStart2P.variable} antialiased`}>
      <body className="font-minecraft">{children}</body>
    </html>
  )
}
\`\`\`

### CSS Configuration
\`\`\`css
/* app/globals.css */
@import 'tailwindcss';

@theme inline {
  --font-minecraft: var(--font-press-start-2p);
}

/* Disable anti-aliasing for pixelated look */
* {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}
\`\`\`

## Color System

### Biome Color Schemes

#### Grassland (Default)
\`\`\`css
--mc-grassland-primary: #4a7c59;
--mc-grassland-secondary: #8fbc8f;
--mc-grassland-accent: #90ee90;
--mc-grassland-bg: linear-gradient(135deg, #98fb98 0%, #90ee90 100%);
--mc-grassland-border: #2d5a3d;
\`\`\`

#### Nether
\`\`\`css
--mc-nether-primary: #8b0000;
--mc-nether-secondary: #cd5c5c;
--mc-nether-accent: #ff6347;
--mc-nether-bg: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
--mc-nether-border: #5a0000;
\`\`\`

#### Cherry
\`\`\`css
--mc-cherry-primary: #d63384;
--mc-cherry-secondary: #f8d7da;
--mc-cherry-accent: #ffb3d9;
--mc-cherry-bg: linear-gradient(135deg, #ffcccb 0%, #ffc0cb 100%);
--mc-cherry-border: #a02142;
\`\`\`

#### Desert
\`\`\`css
--mc-desert-primary: #daa520;
--mc-desert-secondary: #f4a460;
--mc-desert-accent: #ffd700;
--mc-desert-bg: linear-gradient(135deg, #f5deb3 0%, #deb887 100%);
--mc-desert-border: #b8860b;
\`\`\`

#### Ice
\`\`\`css
--mc-ice-primary: #4682b4;
--mc-ice-secondary: #87ceeb;
--mc-ice-accent: #b0e0e6;
--mc-ice-bg: linear-gradient(135deg, #e0f6ff 0%, #b0e0e6 100%);
--mc-ice-border: #2f4f4f;
\`\`\`

#### Barren
\`\`\`css
--mc-barren-primary: #696969;
--mc-barren-secondary: #a9a9a9;
--mc-barren-accent: #d3d3d3;
--mc-barren-bg: linear-gradient(135deg, #f5f5f5 0%, #dcdcdc 100%);
--mc-barren-border: #2f2f2f;
\`\`\`

#### Caves
\`\`\`css
--mc-caves-primary: #2f2f2f;
--mc-caves-secondary: #4a4a4a;
--mc-caves-accent: #696969;
--mc-caves-bg: linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%);
--mc-caves-border: #1a1a1a;
\`\`\`

### Usage Pattern
\`\`\`tsx
// Apply biome theme via CSS class
<div className="biome-grassland">
  <MinecraftButton>Grassland Button</MinecraftButton>
</div>
\`\`\`

## Typography

### Font Hierarchy
- **Primary Font**: Press Start 2P (pixelated gaming font)
- **Sizes**: 8px, 10px, 12px, 14px, 16px, 20px, 24px
- **Line Height**: 1.2-1.4 for readability with pixelated fonts

### Typography Scale
\`\`\`css
.text-minecraft-xs { font-size: 8px; line-height: 1.2; }
.text-minecraft-sm { font-size: 10px; line-height: 1.2; }
.text-minecraft-base { font-size: 12px; line-height: 1.3; }
.text-minecraft-lg { font-size: 14px; line-height: 1.3; }
.text-minecraft-xl { font-size: 16px; line-height: 1.4; }
.text-minecraft-2xl { font-size: 20px; line-height: 1.4; }
.text-minecraft-3xl { font-size: 24px; line-height: 1.4; }
\`\`\`

## Component Architecture

### Base Component Pattern
\`\`\`tsx
interface MinecraftComponentProps {
  biome?: 'grassland' | 'nether' | 'cherry' | 'desert' | 'ice' | 'barren' | 'caves';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

const MinecraftComponent = ({ biome = 'grassland', size = 'md', className, children, ...props }: MinecraftComponentProps) => {
  return (
    <motion.div
      className={cn(
        'minecraft-base-styles',
        `biome-${biome}`,
        `size-${size}`,
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
\`\`\`

### Border System
\`\`\`css
/* Minecraft-style borders */
.minecraft-border {
  border: 4px solid;
  border-top-color: var(--border-light);
  border-left-color: var(--border-light);
  border-right-color: var(--border-dark);
  border-bottom-color: var(--border-dark);
}

.minecraft-border-inset {
  border-top-color: var(--border-dark);
  border-left-color: var(--border-dark);
  border-right-color: var(--border-light);
  border-bottom-color: var(--border-light);
}
\`\`\`

## Animation System

### Framer Motion Presets
\`\`\`tsx
// Hover animations
const hoverAnimation = {
  scale: 1.02,
  y: -2,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 25
  }
};

// Tap animations
const tapAnimation = {
  scale: 0.98,
  y: 1
};

// Float animation for decorative elements
const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};
\`\`\`

### Usage in Components
\`\`\`tsx
<motion.button
  whileHover={hoverAnimation}
  whileTap={tapAnimation}
  className="minecraft-button"
>
  Click Me
</motion.button>
\`\`\`

## Component Library

### MinecraftButton
\`\`\`tsx
interface MinecraftButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  biome?: BiomeType;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
}

// Usage
<MinecraftButton biome="nether" size="lg" onClick={handleClick}>
  Join Server
</MinecraftButton>
\`\`\`

### MinecraftInput
\`\`\`tsx
interface MinecraftInputProps extends InputHTMLAttributes<HTMLInputElement> {
  biome?: BiomeType;
  label?: string;
  error?: string;
}

// Usage
<MinecraftInput
  biome="grassland"
  label="Username"
  placeholder="Enter username..."
  error={errors.username}
/>
\`\`\`

### MinecraftCard
\`\`\`tsx
interface MinecraftCardProps {
  biome?: BiomeType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

// Usage
<MinecraftCard biome="ice" title="Ice Biome Info">
  <p>Frozen landscapes and ice blocks...</p>
</MinecraftCard>
\`\`\`

### MinecraftWindow
\`\`\`tsx
interface MinecraftWindowProps {
  biome?: BiomeType;
  title: string;
  closable?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

// Usage
<MinecraftWindow
  biome="nether"
  title="Server Settings"
  closable
  onClose={handleClose}
>
  <MinecraftForm>...</MinecraftForm>
</MinecraftWindow>
\`\`\`

### MinecraftImageCarousel
\`\`\`tsx
interface MinecraftImageCarouselProps {
  biome?: BiomeType;
  images: Array<{
    src: string;
    alt: string;
    title?: string;
  }>;
  autoPlay?: boolean;
  interval?: number;
}

// Usage
<MinecraftImageCarousel
  biome="cherry"
  images={biomeImages}
  autoPlay
  interval={5000}
/>
\`\`\`

### MinecraftBackground
\`\`\`tsx
interface MinecraftBackgroundProps {
  biome?: BiomeType;
  particles?: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

// Usage
<MinecraftBackground
  biome="caves"
  particles
  intensity="medium"
/>
\`\`\`

## Implementation Examples

### Basic Page Layout
\`\`\`tsx
export default function MinecraftPage() {
  const [currentBiome, setCurrentBiome] = useState<BiomeType>('grassland');

  return (
    <div className={`biome-${currentBiome} min-h-screen`}>
      <MinecraftBackground biome={currentBiome} particles />
      
      <div className="container mx-auto px-4 py-8">
        <MinecraftWindow title="Welcome to Minecraft Server" biome={currentBiome}>
          <div className="space-y-6">
            <MinecraftCard title="Server Info" biome={currentBiome}>
              <p>Join our amazing Minecraft server!</p>
            </MinecraftCard>
            
            <MinecraftButton
              biome={currentBiome}
              size="lg"
              onClick={() => console.log('Joining server...')}
            >
              Join Now
            </MinecraftButton>
          </div>
        </MinecraftWindow>
      </div>
    </div>
  );
}
\`\`\`

### Form Implementation
\`\`\`tsx
const RegistrationForm = () => {
  const [biome, setBiome] = useState<BiomeType>('grassland');

  return (
    <MinecraftForm biome={biome} onSubmit={handleSubmit}>
      <MinecraftInput
        label="Username"
        name="username"
        biome={biome}
        required
      />
      
      <MinecraftInput
        label="Email"
        name="email"
        type="email"
        biome={biome}
        required
      />
      
      <MinecraftTextarea
        label="About You"
        name="bio"
        biome={biome}
        rows={4}
      />
      
      <div className="flex gap-4">
        <MinecraftButton type="submit" biome={biome}>
          Register
        </MinecraftButton>
        <MinecraftButton type="button" variant="secondary" biome={biome}>
          Cancel
        </MinecraftButton>
      </div>
    </MinecraftForm>
  );
};
\`\`\`

### Biome Switcher
\`\`\`tsx
const BiomeSwitcher = ({ currentBiome, onBiomeChange }: BiomeSwitcherProps) => {
  const biomes: BiomeType[] = ['grassland', 'nether', 'cherry', 'desert', 'ice', 'barren', 'caves'];

  return (
    <div className="flex flex-wrap gap-2">
      {biomes.map((biome) => (
        <MinecraftButton
          key={biome}
          biome={biome}
          size="sm"
          variant={currentBiome === biome ? 'primary' : 'secondary'}
          onClick={() => onBiomeChange(biome)}
        >
          {biome.charAt(0).toUpperCase() + biome.slice(1)}
        </MinecraftButton>
      ))}
    </div>
  );
};
\`\`\`

## Best Practices

### Accessibility
- Always provide `alt` text for images
- Use semantic HTML elements
- Ensure keyboard navigation works
- Maintain WCAG AA contrast ratios
- Use `aria-label` for icon-only buttons

### Performance
- Use `React.memo` for static components
- Implement lazy loading for images
- Optimize Framer Motion animations
- Use CSS transforms over layout changes

### Responsive Design
\`\`\`tsx
// Mobile-first responsive classes
<MinecraftCard className="w-full md:w-1/2 lg:w-1/3">
  Content
</MinecraftCard>
\`\`\`

### Code Organization
\`\`\`
components/
├── minecraft-button.tsx
├── minecraft-input.tsx
├── minecraft-card.tsx
├── minecraft-window.tsx
├── minecraft-form.tsx
├── minecraft-background.tsx
└── index.ts (export all components)
\`\`\`

### Testing Considerations
- Test all biome variations
- Verify animations don't cause accessibility issues
- Test keyboard navigation
- Validate form components with various inputs
- Check responsive behavior across devices

### Common Patterns
\`\`\`tsx
// Conditional biome styling
const getBiomeClasses = (biome: BiomeType) => ({
  'bg-gradient-to-br from-green-200 to-green-300': biome === 'grassland',
  'bg-gradient-to-br from-red-200 to-red-300': biome === 'nether',
  // ... other biomes
});

// Consistent spacing
const SPACING = {
  xs: 'p-2',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8'
};
\`\`\`

This unified style guide provides everything needed to implement consistent, authentic Minecraft-themed components across your application.
