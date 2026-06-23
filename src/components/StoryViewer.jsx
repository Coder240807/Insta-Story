import React, { useState, useRef } from "react";
import ProgressContainer from "./ProgressContainer";
import StoryMedia from "./StoryMedia";

const getOptimizedUrl = (url) => {
  if (!url || !url.includes("res.cloudinary.com")) return url;
  if (url.includes("/video/upload/")) {
    return url.replace(
      "/video/upload/",
      "/video/upload/f_auto,q_auto,w_450,vc_vp9/",
    );
  }
  return url.replace("/image/upload/", "/image/upload/f_auto,q_auto,w_450/");
};

function StoryViewer({ items, story, onClose, onNext, onPrev }) {
  const currentIndex = items.findIndex((s) => s.id === story.id);
  const currentStory = items[currentIndex !== -1 ? currentIndex : 0];

  const [isMediaLoading, setIsMediaLoading] = useState(true);

  const autohandleNextStory = () => {
    setIsMediaLoading(true);
    if (currentIndex < items.length - 1) {
      onNext();
    } else {
      onClose();
    }
  };

  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);

  const handleStoryTap = (e) => {
    const targetTagName = e.target.tagName.toLowerCase();
    if(targetTagName=== "video" || e.target.closest(".video-controls"))
      return;
    const rect = e.currentTarget.getBoundingClientRect();
    const tapX = e.clientX - rect.left;
    const cardWidth = rect.width;

    if (tapX < cardWidth * 0.3) {
      if (currentIndex > 0) {
        setIsMediaLoading(true);
        onPrev();
      }
    } else {
      autohandleNextStory();
    }
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
    const diffY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Vertical swipe check (swipe down to close)
    if (diffY > 80 && Math.abs(diffY) > Math.abs(diffX)) {
      onClose();
      return;
    }

    // Horizontal swipe check (swipe left/right to change stories)
    if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        if (currentIndex > 0) {
          setIsMediaLoading(true);
          onPrev();
        }
      } else {
        autohandleNextStory();
      }
    }
  };

  const isVideo = currentStory.image.match(/\.(mp4|mov|webm|quicktime)$/i);
  const optimizedUrl = getOptimizedUrl(currentStory.image);

  const IMAGE_DURATION = 3000;
  const VIDEO_MAX_DURATION = 30000;

  const InnerLoader = (
    <div className="absolute inset-0 w-full h-full bg-neutral-950 flex items-center justify-center z-20">
      <div className="loader"></div>
    </div>
  );

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-screen inset-0 bg-[#212121] bg-opacity-90 flex items-center justify-center z-50">
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-2 right-2 text-white text-2xl font-bold bg-gray-800 bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
        >
          X
        </button>

        <div className="w-full h-full max-h-[95vh] flex items-center justify-center md:grid md:grid-cols-[70px_400px_70px] md:justify-items-center md:items-center px-4">
          <div className="hidden md:flex justify-center items-center w-full">
            {currentIndex > 0 && (
              <button
                onClick={() => {
                  setIsMediaLoading(true);
                  onPrev();
                }}
                className="cursor-pointer text-[#212121] text-2xl font-bold bg-white hover:bg-zinc-100 shadow-lg rounded-full w-10 h-10 pb-1 flex items-center justify-center transition-colors"
              >
                &lt;
              </button>
            )}
          </div>

          <div
            onClick={handleStoryTap}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full max-h-[92vh] md:max-h-[95vh] max-w-[400px] aspect-9/16 bg-black rounded-xl overflow-hidden shadow-2xl border border-zinc-800/50 cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-full z-60">
              <ProgressContainer
                total={items.length}
                current={currentIndex}
                onComplete={autohandleNextStory}
                duration={isVideo ? VIDEO_MAX_DURATION : IMAGE_DURATION}
              />
            </div>

            {!isVideo ? (
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center blur-xl opacity-40 scale-110 pointer-events-none"
                style={{ backgroundImage: `url(${optimizedUrl})` }}
              />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-neutral-900 pointer-events-none" />
            )}

            {isMediaLoading && InnerLoader}

            <div className="relative w-full h-full flex items-center justify-center">
              <StoryMedia
                isVideo={isVideo}
                currentStory={currentStory}
                optimizedUrl={optimizedUrl}
                handleAutoNext={autohandleNextStory}
                setIsMediaLoading={setIsMediaLoading}
              />
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center w-full">
            {currentIndex < items.length - 1 && (
              <button
                onClick={autohandleNextStory}
                className="cursor-pointer text-[#212121] text-2xl font-bold bg-white hover:bg-zinc-100 shadow-lg rounded-full w-10 h-10 pb-1 flex items-center justify-center transition-colors"
              >
                &gt;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryViewer;
