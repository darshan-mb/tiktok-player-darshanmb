# TikTok-Style Video Player

A responsive, high-performance TikTok-style vertical video player built with React (Vite). This project demonstrates modern UI/UX design patterns including infinite scrolling, swipe navigation, Intersection Observer playback management, and custom CSS animations.

## Key Features
- **Vertical Video Feed**: Infinite scrolling experience using native CSS scroll snapping (`scroll-snap-type: y mandatory`) for smooth, native-feeling transitions.
- **Auto Play/Pause**: Utilizes the Intersection Observer API to only play the currently visible video and pause off-screen content, saving memory and processing power.
- **Complex Pointer Events**: Supports tap to play/pause, long-press to hold/pause, and double tap to like with native-feeling delays and threshold management.
- **Interactive UI Overlay**: Includes animated components like a spinning music disc, sliding progress bar, and expanding/collapsing description text.
- **Loading Skeleton**: A shimmering placeholder loader to handle the initial data hydration step before the feed renders.
- **Accessibility/Desktop Support**: Works beautifully on mobile dimensions, featuring full Keyboard navigation (Arrow keys to scroll, Spacebar to play/pause) explicitly built in.

## Technical Choices & Rationale
1. **Plain CSS (CSS Modules)** over Tailwind: For fine-grained animation control (like `@keyframes heartPop`) and leveraging cutting-edge CSS Native features (`scroll-snap`, `backdrop-filter`).
2. **IntersectionObserver Hook**: Replaces heavy `scroll` event listeners. Tracking screen intersections ensures that playback controls aren't unnecessarily blocking the main thread when users scroll rapidly.
3. **Local Shared State**: Actions like `toggleFollow` and `toggleMute` act locally within the wrapper to prevent entire DOM tree re-renders, adhering strictly to React performance metrics.
4. **Lucide React**: Integrated for professional, scalable SVG icon designs that match premium modern UI paradigms without shipping large font files.

## Project Setup Instructions

1. **Prerequisites**
   - Node.js (v18+)
   - npm or yarn

2. **Installation**
   ```bash
   # Clone or access the directory
   cd tiktok-player-darshan
   
   # Install dependencies
   npm install
   ```

3. **Running out of development server**
   ```bash
   # Starts the Vite development server
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Building for Production**
   ```bash
   npm run build
   npm run preview
   ```

## Known Limitations / Trade-offs
- Video Preloading: Currently `preload="auto"` or similar chunking is deferred to the browser. A more scalable version (like TikTok's real app) would require complex HTTP range request loading for video hydration.
- Infinite Feed Memory: Expanding the array infinitely increases the DOM node count. Real "infinite" feeds eventually recycle DOM nodes (virtualization) rather than constantly appending.
- Audio Autoplay restrictions: Browser policies restrict sounds prior to a user gesture. Videos initialize muted or require a first tap.

## Architecture
- `App.jsx`: Global provider, skeleton delay logic, dark mode wrapper.
- `VideoFeed.jsx`: The native snap container and intersection watcher root.
- `VideoPlayer.jsx`: Video logic, Intersection hooking, gestures.
- `VideoOverlay.jsx`: Dumb UI component that receives playback states.

## Video Demonstration
[Watch the live Prototype Video on Google Drive](https://drive.google.com/file/d/14d9PYJt71vGdP7iNm6eB5sfV-bqELKgM/view?usp=sharing) 