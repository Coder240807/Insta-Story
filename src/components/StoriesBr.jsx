import React, { memo } from "react";
import AddStory from "./AddStory";
import StoryItem from "./StoryItem";

const StoriesBr = memo(({ stories, onUpload, handleActiveStory }) => {
  return (
    <div className="relative flex flex-start items-start flex-nowrap overflow-x-auto no-scrollbar w-full h-26 border-b">
      <AddStory onImageUpload={onUpload} />
      <div className="flex items-center h-26 gap-2 pr-6 shrink-0 w-auto">
      {stories?.map((item) => (
        <StoryItem key={item.id} story={item} handleActiveStory={handleActiveStory} />
      ))}
      </div>
    </div>
  );
})

export default StoriesBr;
