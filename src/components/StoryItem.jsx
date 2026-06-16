import React from "react";

function StoryItem({ story, handleActiveStory }) {
  const isVideo = story.image.match(/\.(mp4|mov|webm|quicktime)$/i);
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
            className="ringstyle w-20 h-20 min-w-[10px] min-h-[10px] rounded-full object-cover object-center p-2"
          />
        ) : (
          <img
            src={story.image}
            alt="story"
            className="ringstyle w-20 h-20 min-w-[10px] min-h-[10px] rounded-full object-cover object-center p-2"
          />
        )}
      </div>
    </div>
  );
}

export default StoryItem;
