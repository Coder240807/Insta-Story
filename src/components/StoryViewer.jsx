import React, { useState } from "react";
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

  if (!currentStory) {
    return null; //
  }

  const isVideo = currentStory.image.match(/\.(mp4|mov|webm|quicktime)$/i);
  const optimizedUrl = getOptimizedUrl(currentStory.image);

  const autohandleNextStory = () => {
    setIsMediaLoading(true);
    if (currentIndex < items.length - 1) {
      onNext();
    } else {
      onClose();
    }
  };

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

        {currentIndex > 0 && (
          <button
            onClick={() => {
              setIsMediaLoading(true);
              onPrev();
            }}
            className="absolute cursor-pointer top-1/2 left-95 transform -translate-y-1/2 text-[#212121] text-2xl font-bold bg-white bg-opacity-50 rounded-full w-10 h-10 pb-2 flex items-center justify-center"
          >
            &lt;
          </button>
        )}

        {currentIndex < items.length - 1 && (
          <button
            onClick={() => {
              setIsMediaLoading(true);
              onNext();
            }}
            className="absolute cursor-pointer top-1/2 right-95 transform -translate-y-1/2 text-[#212121] text-2xl font-bold bg-white bg-opacity-50 rounded-full w-10 h-10 pb-2 flex items-center justify-center"
          >
            &gt;
          </button>
        )}

        <div className="relative w-full max-h-[97vh] max-w-[400px] aspect-9/16 bg-black rounded-lg overflow-hidden shadow-2xl">
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
      </div>
    </div>
  );
}

export default StoryViewer;
