import React, { useCallback, useState, useEffect} from "react";
import StoriesBr from "./components/StoriesBr";
import StoryViewer from "./components/StoryViewer";
import "./App.css";
import "./index.css";


const sortStories = (stories) => {
    return stories.sort((a, b) => {
      if (a.isSeen && !b.isSeen) return 1;
      if (!a.isSeen && b.isSeen) return -1;
      return b.timestamp - a.timestamp;
    });
  };

function App() {
  const [allStories, setStory] = useState(() => {
    const storedStories = localStorage.getItem("stories");
    if (!storedStories) return [];
    const parsedStories = JSON.parse(storedStories);
    const daysInMilliseconds = 24 * 60 * 60 * 1000;

    const activeStories = parsedStories.filter((story) => {
      return Date.now() - story.timestamp < daysInMilliseconds;
    });
    if (activeStories.length !== parsedStories.length) {
      localStorage.setItem("stories", JSON.stringify(activeStories));
    }
    return activeStories;
  });

  const [activeStory, setActiveStory] = useState(null);

  useEffect(() => {
    if (!activeStory) return;

    setStory((prevStories) => {
      
      const current = prevStories.find((s) => s.id === activeStory.id);
      if (current && current.isSeen) return prevStories;

      const updatedStories = prevStories.map((s) =>
        s.id === activeStory.id ? { ...s, isSeen: true } : s
      );
      localStorage.setItem("stories", JSON.stringify(updatedStories));
      return updatedStories;
    });
  }, [activeStory?.id]);

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

  return (
    <>
      <div className="mt-4">
        <StoriesBr
          stories={allStories}
          onUpload={uploadStory}
          handleActiveStory={handleActiveStory}
        />
      </div>
      {activeStory && (
          <StoryViewer
            items={allStories}
            story={activeStory}
            onClose={handleCloseStory}
            onNext={nextStory}
            onPrev={prevStory}
          />
      )}
    </>
  );
}

export default App;
