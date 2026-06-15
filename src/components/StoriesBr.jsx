import React, { memo } from "react";
import AddStory from "./AddStory";
import StoryItem from "./StoryItem";

const StoriesBr = memo(({ stories, onUpload, handleActiveStory }) => {
  return (
    <div className="flex flex-start flex-nowrap items-center overflow-x-auto no-scrollbar w-full h-26 border-b">
      <AddStory onImageUpload={onUpload} />
      {stories?.map((item) => (
        <StoryItem key={item.id} story={item} handleActiveStory={handleActiveStory} />
      ))}
    </div>
  );
})

export default StoriesBr;
