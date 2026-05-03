import React, { useCallback, useState, useEffect } from "react";
import StoriesBr from "./components/StoriesBr";
import StoryViewer from "./components/StoryViewer";
import "./App.css";
import "./index.css";

function App() {
  let [allStories, setStory] = useState(() => {
    const storedStories = localStorage.getItem("stories");
    return storedStories ? JSON.parse(storedStories) : [];
  });

  const [activeStory, setActiveStory] = useState(null);

  const uploadStory = useCallback((url) => {
    const newStory = {
      id: crypto.randomUUID(),
      image: url,
      timestamp: Date.now(),
    };
    setStory((prevStories) => {
      const updatedStories = [...prevStories, newStory];
      localStorage.setItem("stories", JSON.stringify(updatedStories));
      return updatedStories;
    });
  }, []);

  const handleActiveStory = useCallback((story) => {
    setActiveStory(story);
  }, []);

  const handleCloseStory = useCallback(() => {
    setActiveStory(null);
  }, []);

  useEffect(() => {
    const storedStories = localStorage.getItem("stories");

    if (storedStories) {
      const daysInMilliseconds = 24 * 60 * 60 * 1000; // 1 day in milliseconds

      const filteredStories = allStories.filter((story) => {
        const storyAge = Date.now() - story.timestamp;
        return storyAge < daysInMilliseconds; // Keep stories that are less than 24 hours old
      });
      if (filteredStories.length !== allStories.length) {
        setStory(filteredStories);
        localStorage.setItem("stories", JSON.stringify(filteredStories));
      }
    }
  }, []);

  return (
    <>
      <div>
        <StoriesBr
          stories={allStories}
          onUpload={uploadStory}
          handleActiveStory={handleActiveStory}
        />
        {activeStory && (
          <StoryViewer
            items={allStories}
            story={activeStory}
            onClose={handleCloseStory}
          />
        )}
      </div>
    </>
  );
}

export default App;
