import React, { useState, useEffect, useRef, memo } from "react";
import AddStory from "./AddStory";
import StoryItem from "./StoryItem";

const StoriesBr = memo(({ stories, onUpload, handleActiveStory }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkScrollLimits = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollWidth > container.clientWidth + container.scrollLeft + 5,
    );
  };

 useEffect(() => {
  checkScrollLimits();
  const container = scrollContainerRef.current;
  
  if (container) {
    container.addEventListener("scroll", checkScrollLimits);
    window.addEventListener("resize", checkScrollLimits);
  }

  return () => {
    if (container) {
      container.removeEventListener("scroll", checkScrollLimits);
    }
    window.removeEventListener("resize", checkScrollLimits);
  };
  
}, [stories]); 


  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 320;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative group w-full h-28 border-b bg-white">
      {showLeftArrow && (
        <button
          onClick={() => handleScroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md border border-gray-200 transition-all duration-200 backdrop-blur-sm"
          aria-label="Scroll Left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {showRightArrow && (
        <button
          onClick={() => handleScroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-40 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md border border-gray-200 transition-all duration-200 backdrop-blur-sm"
          aria-label="Scroll Right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      <div ref={scrollContainerRef} className="relative flex flex-start items-start flex-nowrap overflow-x-auto no-scrollbar w-full h-full ">
        <AddStory onImageUpload={onUpload} />
        <div className="flex items-center h-full gap-2 pr-6 shrink-0 w-auto">
          {stories?.map((item) => (
            <StoryItem
              key={item.id}
              story={item}
              handleActiveStory={handleActiveStory}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default StoriesBr;
