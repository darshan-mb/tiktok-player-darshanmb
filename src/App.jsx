import { useState, useEffect } from 'react';
import { Moon, Sun, Play } from 'lucide-react';
import './App.css';
import VideoFeed from './components/VideoFeed';
import Skeleton from './components/Skeleton';

// Sample Video Data following the required structure
// Note: We use the actual videos discovered in the public folder.
const sampleVideos = [
  {
    id: 1,
    url: "/videos/video1.mp4",
    user: { name: "ai_learner", avatar: "https://ui-avatars.com/api/?name=AI&background=random" },
    description: "How transformers actually work #AI #DeepLearning",
    likes: 1240,
    comments: 89,
    shares: 45,
    music: "Original Audio - ai_learner",
    commentsList: [
      { id: 1, user: "ai_researcher", avatar: "A", text: "This visualizing technique makes it so much easier to understand.", time: "2h" },
      { id: 2, user: "dev_student", avatar: "B", text: "The self-attention mechanism finally clicked for me, thanks!", time: "5h" },
      { id: 3, user: "neural_net", avatar: "C", text: "Are these similar to the architecture used in GPT-4?", time: "1d" }
    ]
  },
  {
    id: 2,
    url: "/videos/video2.mp4",
    user: { name: "tech_guru", avatar: "https://ui-avatars.com/api/?name=TG&background=random" },
    description: "The future of React 19 is wild #frontend #reactjs",
    likes: 3450,
    comments: 210,
    shares: 110,
    music: "Chill Beats - Lofi Studio",
    commentsList: [
      { id: 1, user: "react_lover", avatar: "D", text: "React 19 Server Components are going to change everything.", time: "1h" },
      { id: 2, user: "newbie_dev", avatar: "E", text: "I'm still learning React 18 and you're already dropping this 😂", time: "3h" },
      { id: 3, user: "fullstack_sam", avatar: "F", text: "The new action hooks are a total game changer for forms.", time: "12h" }
    ]
  },
  {
    id: 3,
    url: "/videos/video3.mp4",
    user: { name: "VarunMayya", avatar: "https://ui-avatars.com/api/?name=VM&background=random" },
    description: "Anthropic accidentally leaked their most powerful AI ✨ #ai #openai",
    likes: 890,
    comments: 45,
    shares: 12,
    music: "Tech House 2026 - DJ Synth",
    commentsList: [
      { id: 1, user: "tech_insider", avatar: "G", text: "Claude's new model is going to be genuinely terrifying at this rate.", time: "45m" },
      { id: 2, user: "skeptic_ai", avatar: "H", text: "Did they leak it on purpose to build hype? 🤔", time: "4h" },
      { id: 3, user: "data_nerd", avatar: "I", text: "The benchmark scores they showed are absolutely insane.", time: "1d" }
    ]
  },
  {
    id: 4,
    url: "/videos/video4.mp4",
    user: { name: "design_pro", avatar: "https://ui-avatars.com/api/?name=DP&background=random" },
    description: "Design almost any mobile apps using this AI tool #uiux #uidesign",
    likes: 5600,
    comments: 420,
    shares: 320,
    music: "Original Audio - design_pro",
    commentsList: [
      { id: 1, user: "ui_wizard", avatar: "J", text: "Wait, did AI generate the entire prototype layout? 🤯", time: "2h" },
      { id: 2, user: "figma_fan", avatar: "K", text: "This tool is going to replace standard wireframing completely.", time: "6h" },
      { id: 3, user: "app_creator", avatar: "L", text: "What's the name of this software? Looks flawless.", time: "2d" }
    ]
  },
  {
    id: 5,
    url: "/videos/video5.mp4",
    user: { name: "startup_life", avatar: "https://ui-avatars.com/api/?name=SL&background=random" },
    description: "Day in the life of a Frontend Developer WFH #vlog #coding",
    likes: 2100,
    comments: 130,
    shares: 80,
    music: "Morning Routine - Acoustic",
    commentsList: [
      { id: 1, user: "remote_worker", avatar: "M", text: "WFH looks so peaceful, I wish my company allowed it. 😭", time: "10m" },
      { id: 2, user: "agile_dev", avatar: "N", text: "That morning standup meeting looked way too long haha", time: "1h" },
      { id: 3, user: "desk_setup", avatar: "O", text: "Drop the link for that standing desk setup right now! 🔥", time: "5h" }
    ]
  }
];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to Dark Mode
  const [isLoading, setIsLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);

  // Apply dark mode theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Simulate initial load for Skeleton (1.5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  return (
    <div className="appContainer">
      <div className="mobileWrapper">
        {/* Absolute Top UI Layer */}
        <div className="topBar">
          <h1>For You</h1>
          <span className="liveBadge">Live</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          className="themeToggle"
          onClick={toggleTheme}
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Main Feed or Loader */}
        {isLoading ? (
          <Skeleton />
        ) : !isStarted ? (
          <div className="startOverlay" onClick={() => setIsStarted(true)}>
            <div className="pulseCircle">
              <Play size={48} fill="white" />
            </div>
            <h2>Ready to scroll?</h2>
            <p>Tap anywhere to start</p>
          </div>
        ) : (
          <VideoFeed videos={sampleVideos} />
        )}
      </div>
    </div>
  );
}

export default App;
