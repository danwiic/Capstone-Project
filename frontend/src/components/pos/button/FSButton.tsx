import React from "react";
import { useState } from "react";

const FullscreenButton = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    const elem = document.documentElement;

    if (!isFullscreen) {
      // Must be called directly inside this click handler
      elem
        .requestFullscreen()
        .then(() => setIsFullscreen(true))
        .catch((err) => console.error("Fullscreen error:", err));
    } else {
      document
        .exitFullscreen()
        .then(() => setIsFullscreen(false))
        .catch((err) => console.error("Exit fullscreen error:", err));
    }
  };

  return (
    <button
      className="bg-mayormoto-blue text-white rounded text-sm 
      cursor-pointer p-2 px-4"
      onClick={toggleFullscreen}
    >
      {isFullscreen ? "Minimize" : "Maximize"}
    </button>
  );
};

export default React.memo(FullscreenButton);
