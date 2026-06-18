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

  const sortStories = (stories) => {
    return stories.sort((a,b)=>{
      if(a.isSeen && !b.isSeen) return 1;
      if(!a.isSeen && b.isSeen) return -1;
      return b.timestamp - a.timestamp;
    })
  }

  const uploadStory = useCallback((url) => {
    const newStory = {
      id: crypto.randomUUID(),
      image: url,
      timestamp: Date.now(),
      isSeen: false,
    };
    setStory((prevStories) => {
      const updatedStories = sortStories([...prevStories, newStory]);
      localStorage.setItem("stories", JSON.stringify(updatedStories));
      return updatedStories;
    });
  }, []);

  const handleActiveStory = useCallback((story) => {
    setActiveStory(story);
    setStory((prevStories) => {
      const updatedStories = prevStories.map((s) =>
        s.id === story.id ? { ...s, isSeen: true } : s,
      );
      localStorage.setItem("stories", JSON.stringify(updatedStories));
      return updatedStories;
    });
  }, []);

  const handleCloseStory = useCallback(() => {
    setActiveStory(null);
  }, []);

  const navigateStory = useCallback(
    (direction) => {
      setActiveStory((currentActiveStory) => {
        if (!currentActiveStory) return null;
        const currentIndex = allStories.findIndex(
          (s) => s.id === currentActiveStory.id,
        );
        const next = currentIndex + direction;

        if (next >= 0 && next < allStories.length) return allStories[next];
        return null;
      });
    },
    [allStories],
  );

  const nextStory = useCallback(() => navigateStory(1), [navigateStory]);
  const prevStory = useCallback(() => navigateStory(-1), [navigateStory]);

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
      <div className="mt-4">
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
            onNext={nextStory}
            onPrev={prevStory}
          />
        )}
      </div>
    </>
  );
}

export default App;
