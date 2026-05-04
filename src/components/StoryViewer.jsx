import React, { useState } from "react";
import ProgressContainer from "./ProgressContainer";

function StoryViewer({ items, story, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    const index = items.findIndex((s) => s.id === story.id);
    return index !== -1 ? index : 0;
  });

  const currentStory = items[currentIndex];
  const isVideo = currentStory.image.match(/\.(mp4|mov|webm|quicktime)$/i);

  const handleNextStory = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const IMAGE_DURATION = 3000;
  const VIDEO_MAX_DURATION = 15000;

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-screen inset-0 bg-[#212121] bg-opacity-90 flex items-center justify-center z-50">
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-2 right-2 text-white text-2xl font-bold bg-gray-800 bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
        >
          X
        </button>
        <div className="relative w-full max-h-[97vh] max-w-[400px] aspect-[9/16] bg-black rounded-lg overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-full z-60">
            <ProgressContainer
              total={items.length}
              current={currentIndex}
              onComplete={handleNextStory}
              duration={isVideo ? VIDEO_MAX_DURATION : IMAGE_DURATION}
            />
          </div>
          <img
            src={currentStory.image}
            alt="blur-bg"
            className="absolute inset-0 w-full h-full object-cover blur-xl opacity-50 scale-110"
          />
          <div className="relative w-full h-full flex items-center justify-center">
            {isVideo ? (
              <video
                key={currentStory.id}
                src={currentStory.image}
                controls={false}
                autoPlay
                onEnded={handleNextStory}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                key={currentStory.id}
                src={currentStory.image}
                alt="story"
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryViewer;
