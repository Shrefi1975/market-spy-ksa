import React from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, BarChart3, Target, Sparkles, LineChart } from "lucide-react";

const AnimatedHeroBackground: React.FC = () => {
  const floatingIcons = [
    { Icon: Search, x: "15%", y: "20%", delay: 0, size: 40 },
    { Icon: TrendingUp, x: "85%", y: "25%", delay: 0.5, size: 36 },
    { Icon: BarChart3, x: "10%", y: "70%", delay: 1, size: 44 },
    { Icon: Target, x: "90%", y: "65%", delay: 1.5, size: 38 },
    { Icon: Sparkles, x: "25%", y: "80%", delay: 2, size: 32 },
    { Icon: LineChart, x: "75%", y: "15%", delay: 2.5, size: 42 },
  ];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-bg bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900" />
      
      {/* Animated mesh gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 50%, hsl(168 84% 39% / 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 80% 20%, hsl(262 83% 58% / 0.12), transparent),
            radial-gradient(ellipse 50% 30% at 20% 80%, hsl(38 92% 50% / 0.1), transparent)
          `,
        }}
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating SEO icons */}
      {floatingIcons.map(({ Icon, x, y, delay, size }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 5,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <Icon 
              size={size} 
              className="text-primary/60"
              strokeWidth={1.5}
            />
          </div>
        </motion.div>
      ))}

      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            delay: Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
    </div>
  );
};

export default AnimatedHeroBackground;