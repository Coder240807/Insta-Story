import React, { useRef, useState, useEffect } from "react";

export default function StoryMedia({ isVideo, currentStory, optimizedUrl, handleAutoNext, setIsMediaLoading }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLocalLoading, setIsLocalLoading] = useState(true);

  useEffect(() => {
    setIsLocalLoading(true);
    setIsMediaLoading(true);
  },[currentStory.id, setIsMediaLoading]);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMutedState = !videoRef.current.muted;
      videoRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  if (isVideo) {
    return (
      <div
        className="relative w-full h-full flex items-center justify-center "
        onClick={toggleMute}
      >
        <video
          ref={videoRef}
          key={currentStory.id}
          src={optimizedUrl}
          controls={false}
          autoPlay
          playsInline
          muted={isMuted}
          preload="auto"
          onEnded={handleAutoNext}
          onCanPlay={() => {
            setIsMediaLoading(false);
            setIsLocalLoading(false);
          }}
          className="w-full h-full object-contain"
        />
        {isMuted && !isLocalLoading && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-2 py-1 rounded pointer-events-none animate-pulse">
            🔊 Tap to unmute
          </div>
        )}
      </div>
    );
  } else {
    return (
      <img
        key={currentStory.id}
        src={optimizedUrl}
        alt="story"
        decoding="sync"
        onLoad={() => {
          setIsMediaLoading(false);
          setIsLocalLoading(false);
        }}
        className="w-full h-full object-contain"
        fetchPriority="high"
      />
    );
  }
}
