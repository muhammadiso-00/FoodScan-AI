"use client";

import React from "react";
import { useTheme } from "next-themes";

type GradientBackgroundProps = {
  className?: string;
};

const GradientBackground: React.FC<GradientBackgroundProps> = ({ className = "" }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Large gradient blob in the top right */}
      <div
        className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 transform-gpu blur-3xl"
        aria-hidden="true"
      >
        <div
          className={`aspect-[1155/678] w-[72.1875rem] ${
            isDarkMode
              ? "bg-gradient-to-br from-[#FF8060] to-[#FF6B35] opacity-30"
              : "bg-gradient-to-br from-[#FF6B35] to-[#FFA380] opacity-20"
          }`}
          style={{
            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          }}
        />
      </div>

      {/* Smaller gradient blob in the bottom left */}
      <div
        className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/3 transform-gpu blur-3xl"
        aria-hidden="true"
      >
        <div
          className={`aspect-[1155/678] w-[36.125rem] ${
            isDarkMode
              ? "bg-gradient-to-tr from-[#FF6B35] to-[#FF8F5E] opacity-30"
              : "bg-gradient-to-tr from-[#FFA380] to-[#FF6B35] opacity-20"
          }`}
          style={{
            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          }}
        />
      </div>

      {/* Circular gradient blob in the center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu blur-3xl animate-pulse-scale"
        style={{ animationDuration: "10s" }}
        aria-hidden="true"
      >
        <div
          className={`aspect-square w-[40rem] rounded-full ${
            isDarkMode
              ? "bg-gradient-to-r from-[#1A1A1A] via-[#FF6B35] to-[#FF8F5E] opacity-20"
              : "bg-gradient-orange-white opacity-30"
          }`}
        />
      </div>

      {/* Small colorful orbs scattered around */}
      <div className={`absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-primary opacity-20 blur-2xl animate-pulse-scale`}
        style={{ animationDuration: "8s" }} />
      <div className={`absolute top-3/4 right-1/3 h-24 w-24 rounded-full bg-secondary opacity-20 blur-2xl animate-pulse-scale`}
        style={{ animationDuration: "12s", animationDelay: "1s" }} />
      <div className={`absolute bottom-1/4 left-2/3 h-28 w-28 rounded-full bg-accent opacity-20 blur-2xl animate-pulse-scale`}
        style={{ animationDuration: "9s", animationDelay: "2s" }} />

      {/* Add a floating animation for one of the elements */}
      <div className={`absolute top-1/3 right-1/4 h-36 w-36 rounded-full ${
        isDarkMode ? "bg-primary/20" : "bg-primary/10"
      } blur-3xl animate-float`} />
    </div>
  );
};

export default GradientBackground;
