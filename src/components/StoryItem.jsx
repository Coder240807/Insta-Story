import React from "react";

function StoryItem({ story, handleActiveStory }) {
  const isVideo = story.image.match(/\.(mp4|mov|webm|quicktime)$/i);
  return (
    <div className="flex shrink-0 items-center flex-start p-[0.1vw]">
      <div
        onClick={() => handleActiveStory(story)}
        className="cursor-pointer rounded-full object-center overflow-hidden p-1"
      >
        {isVideo ? (
          <video
            src={story.image}
            alt="story"
            className="w-[95px] h-[95px] min-w-[10px] min-h-[10px] rounded-full object-cover object-center p-2"
          />
        ) : (
          <img
            src={story.image}
            alt="story"
            className="w-[95px] h-[95px] min-w-[10px] min-h-[10px] rounded-full object-cover object-center p-2"
          />
        )}
      </div>
    </div>
  );
}

export default StoryItem;
