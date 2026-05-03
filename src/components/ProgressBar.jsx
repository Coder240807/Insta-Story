import React from "react";

function ProgressBar({ status, onComplete, duration }) {
  return (
    <div className="flex-1 rounded-sm bg-white/30 overflow-hidden h-[2px]">
      <div
        className={`h-full bg-white ${status === "active" ? "animate-progress" : ""}`}
        style={{
          width: status === "done" ? "100%" : "0%",
          animationDuration: `${duration}ms`,
          animationPlayState: "running", 
        }}
        onAnimationEnd={status === "active" ? onComplete : null}
        
      />
    </div>
  );
}

export default ProgressBar;
