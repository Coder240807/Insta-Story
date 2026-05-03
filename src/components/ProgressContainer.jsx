import React from "react";
import ProgressBar from "./ProgressBar";

function ProgressContainer({ total, current, onComplete, duration }) {
  return (
    <div>
      <div className="absolute top-[10px] left-[20px] right-[20px] inset-x-0 flex gap-1 z-50 pt-2">
        {Array.from({ length: total }).map((_, index) => (
          <ProgressBar
            key={index}
            status={
              index < current ? "done" : index == current ? "active" : "pending"
            }
            onComplete={index === current ? onComplete : null}
            duration={index === current ? duration : 0}
          />
        ))}
      </div>
    </div>
  );
}

export default ProgressContainer;
