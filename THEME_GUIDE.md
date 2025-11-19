# 🎨 Multi-Theme System Guide

## Overview

This project features a complete multi-theme system that allows users to switch between 6 beautiful color themes dynamically. The theme preference is automatically saved to localStorage and persists across sessions.

## 🌈 Available Themes

| Theme | Description | Colors |
|-------|------|-------------|--------|
| **Light** | Clean and bright | White background, dark text |
| **Dark** | Easy on the eyes | Dark background, light text |
| **Crimson** | Bold and energetic | Red-themed dark mode |
| **Ocean** | Calm and professional | Blue-themed dark mode |
| **Purple** | Creative and luxurious | Purple-themed dark mode |
| **Forest** | Fresh and natural | Green-themed dark mode |

## 🚀 Features

- ✅ **6 Pre-built Themes** - Light, Dark, Crimson, Ocean, Purple, and Forest
- ✅ **Persistent Storage** - Theme preference saved in localStorage
- ✅ **Smooth Transitions** - 300ms color transitions for seamless changes
- ✅ **SSR Compatible** - Works perfectly with Next.js App Router
- ✅ **Responsive UI** - Beautiful floating button with theme preview
- ✅ **TypeScript Support** - Fully typed for better DX
- ✅ **Framer Motion Animations** - Smooth dropdown animations

## 📁 Project Structure

```
src/
├── config/
│   └── themes.ts              # Theme configuration and definitions
├── context/
│   └── ThemeContext.tsx       # React Context for theme state
├── hooks/
│   └── useTheme.ts            # Custom hook for accessing theme
├── components/
│   └── ThemeSwitcher.tsx      # Theme switcher UI component
└── app/
    ├── globals.css            # CSS variables for all themes
    └── layout.tsx             # ThemeProvider wrapper
```

## 🛠️ How It Works

### 1. Theme Configuration (`src/config/themes.ts`)

Defines all available themes with their metadata:

```typescript
export type ThemeType = 'light' | 'dark' | 'red' | 'blue' | 'purple' | 'green';

export interface Theme {
  name: string;
  value: ThemeType;
  description: string;
  cssClass: string;
  preview: {
    primary: string;
    background: string;
    accent: string;
  };
}
```

### 2. Theme Context (`src/context/ThemeContext.tsx`)

Provides theme state management:

```typescript
const { theme, setTheme, toggleTheme } = useTheme();
```

- `theme` - Current active theme
- `setTheme(themeType)` - Change to a specific theme
- `toggleTheme()` - Toggle between light and dark

### 3. CSS Variables (`src/app/globals.css`)

Each theme is defined using CSS custom properties:

```css
.theme-dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  /* ... more variables */
}

.theme-red {
  --background: oklch(0.12 0.04 27);
  --foreground: oklch(0.98 0.02 27);
  --primary: oklch(0.58 0.22 27);
  /* ... more variables */
}
```

### 4. Theme Switcher UI (`src/components/ThemeSwitcher.tsx`)

Floating button in bottom-right corner that displays a dropdown with all available themes and color previews.

## 💻 Usage

### Using the Theme Switcher

1. Click the **floating palette button** in the bottom-right corner
2. Select your preferred theme from the dropdown
3. The theme will be applied instantly with smooth transitions
4. Your preference is automatically saved

### Programmatic Usage

```typescript
import { useTheme } from '@/hooks/useTheme';

function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  // Get current theme
  console.log(theme); // 'dark'
  
  // Change theme
  setTheme('red');
  
  // Toggle between light/dark
  toggleTheme();
}
```

### Using Theme Colors in Components

Use Tailwind CSS utility classes with theme variables:

```tsx
// Background colors
<div className="bg-background">
<div className="bg-card">
<div className="bg-primary">

// Text colors
<p className="text-foreground">
<p className="text-muted-foreground">
<p className="text-primary">

// Border colors
<div className="border border-border">
```

## 🎨 Adding a New Theme

### Step 1: Add Theme to Config

Edit `src/config/themes.ts`:

```typescript
export type ThemeType = 'light' | 'dark' | 'red' | 'blue' | 'purple' | 'green' | 'orange';

export const themes: Theme[] = [
  // ... existing themes
  {
    name: 'Sunset',
    value: 'orange',
    description: 'Warm and inviting',
    cssClass: 'theme-orange',
    preview: {
      primary: '#EA580C',
      background: '#1A0F0A',
      accent: '#FDBA74',
    },
  },
];
```

### Step 2: Add CSS Variables

Edit `src/app/globals.css`:

```css
/* Orange/Sunset Theme */
.theme-orange {
  --background: oklch(0.12 0.04 40);
  --foreground: oklch(0.98 0.01 40);
  --card: oklch(0.18 0.05 40);
  --card-foreground: oklch(0.98 0.01 40);
  --primary: oklch(0.58 0.22 40);
  --primary-foreground: oklch(0.98 0.01 40);
  /* ... add all other variables */
}
```

### Step 3: Update Context

Edit `src/context/ThemeContext.tsx`:

```typescript
// Update the validation array
if (savedTheme && ['light', 'dark', 'red', 'blue', 'purple', 'green', 'orange'].includes(savedTheme)) {
  setThemeState(savedTheme);
}

// Update classList removal
root.classList.remove('theme-light', 'theme-dark', 'theme-red', 'theme-blue', 'theme-purple', 'theme-green', 'theme-orange', 'dark');
```

## 🎯 Best Practices

### 1. Always Use Theme Variables

❌ **Bad:**
```tsx
<div className="bg-black text-white">
```

✅ **Good:**
```tsx
<div className="bg-background text-foreground">
```

### 2. Available Color Variables

- `bg-background` - Main background
- `bg-card` - Card/component background
- `bg-primary` - Primary action color
- `text-foreground` - Main text color
- `text-muted-foreground` - Secondary text
- `text-primary` - Primary text color
- `border-border` - Border color
- `bg-accent` - Accent background

### 3. Testing Themes

Test your component in all themes:

```tsx
// Temporarily set theme in useEffect
useEffect(() => {
  setTheme('red'); // Test in red theme
}, []);
```

## 🔧 Customization

### Change Default Theme

Edit `src/config/themes.ts`:

```typescript
export const defaultTheme: ThemeType = 'dark'; // Change to any theme
```

### Adjust Transition Speed

Edit `src/app/globals.css`:

```css
@layer base {
  * {
    transition-duration: 500ms; /* Change from 300ms */
  }
}
```

### Customize Button Position

Edit `src/components/ThemeSwitcher.tsx`:

```tsx
// Change from bottom-10 right-10 to any position
<div className="fixed bottom-5 right-5 z-50">
```

## 📱 Responsive Behavior

- **Desktop**: Floating button shows in bottom-right
- **Mobile**: Same floating button, touch-optimized
- **Dropdown**: Automatically adjusts to screen size

## ♿ Accessibility

- ✅ Proper ARIA labels on buttons
- ✅ Keyboard navigation support
- ✅ Color contrast meets WCAG AA standards
- ✅ Focus indicators on interactive elements

## 🐛 Troubleshooting

### Theme Not Persisting

**Issue**: Theme resets on page refresh

**Solution**: Check localStorage permissions in your browser settings

### Colors Not Updating

**Issue**: Component shows hardcoded colors

**Solution**: Replace hardcoded color classes with theme variables:
- `text-white` → `text-foreground`
- `bg-black` → `bg-background`
- `text-gray-500` → `text-muted-foreground`

### Hydration Errors

**Issue**: "Hydration failed" error in console

**Solution**: The ThemeSwitcher component has built-in SSR protection. Make sure ThemeProvider wraps your app in `layout.tsx`

## 📚 Technical Details

### CSS Variable System

Uses OKLCH color space for better perceptual uniformity:

```css
--primary: oklch(0.58 0.22 27);
/*            ^     ^    ^
           lightness chroma hue */
```

### State Management

- React Context API for global state
- localStorage for persistence
- SSR-safe initialization

### Performance

- No runtime CSS generation
- CSS variables enable instant theme switching
- Smooth transitions via CSS (GPU-accelerated)

## 🎓 Learning Resources

- [OKLCH Color Space](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
- [Tailwind CSS Variables](https://tailwindcss.com/docs/customizing-colors#using-css-variables)
- [Framer Motion](https://www.framer.com/motion/)
- [React Context](https://react.dev/reference/react/useContext)

## 📝 License

This theme system is part of the Agency Landing Page project.

---

**Need Help?** Open an issue or reach out to the development team!

Happy theming! 🎨✨
