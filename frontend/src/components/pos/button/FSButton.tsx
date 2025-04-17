import React from "react";
import { useState } from "react";
import { CgMaximize } from "react-icons/cg";
import { CgMinimize } from "react-icons/cg";

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
      className={`bg-mayormoto-blue  rounded 
      cursor-pointer p-2 px-2 ${
        !isFullscreen
          ? `text-2xl bg-transparent text-gray-500 
        hover:bg-gray-200`
          : "text-2xl text-white"
      }`}
      onClick={toggleFullscreen}
    >
      {isFullscreen ? (
        <CgMinimize title="Minimize screen" className="" />
      ) : (
        <CgMaximize title="Maximize screen" />
      )}
    </button>
  );
};

export default React.memo(FullscreenButton);
