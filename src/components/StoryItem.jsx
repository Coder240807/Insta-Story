import React from "react";

function StoryItem({ story, handleActiveStory }) {
  const isVideo = story.image.match(/\.(mp4|mov|webm|quicktime)$/i);
  const isSeen = story.isSeen === true;
  return (
    <div className="flex shrink-0 items-center justify-center h-26 px-1">
      <div
        onClick={() => handleActiveStory(story)}
        className="rounded-full cursor-pointer object-center overflow-hidden p-1"
      >
      
        {isVideo ? (
          <video
            src={story.image}
            alt="story"
            className={`w-20 h-20 min-w-[10px] min-h-[10px] rounded-full object-cover object-center p-2 transition-all duration-300 ${isSeen ? 'ringseen' : 'ringstyle'}`}
          />
        ) : (
          <img
            src={story.image}
            alt="story"
            className={`w-20 h-20 min-w-[10px] min-h-[10px] rounded-full object-cover object-center p-2 transition-all duration-300 ${isSeen ? 'ringseen' : 'ringstyle'}`}
          />
        )}
      </div>
    </div>
  );
}

export default StoryItem;
