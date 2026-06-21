import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { uploadToCloudinary } from "../Utilities/Cloudinary";

function AddStory({ onImageUpload }) {
  const fileInputRef = useRef(null);
  const [status, setStatus] = useState("idle"); // 'idle', 'loading', 'success'

  const handleFileChage = async (event) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    setStatus("loading");

    try {
      const imageUrl = await uploadToCloudinary(file);
      onImageUpload(imageUrl);

      setStatus("idle");
    } catch (error) {
      console.error("Error uploading image:", error);
      setStatus("idle");
    }
  };

  const isUploading = status === "loading";

  return (
    <div className="flex flex-col items-center justify-center h-26 w-24 shrink-0 ml-[10vw]">
      <button
        title="Add New"
        type="button"
        disabled={isUploading}
        onClick={() => fileInputRef.current.click()}
        className={`group cursor-pointer outline-none transition-all duration-300 
          ${isUploading ? "opacity-50 cursor-not-allowed" : "hover:rotate-90"}`}
      >
        <svg
          xmlns="http://w3.org"
          width="80px"
          height="80px"
          viewBox="0 0 24 24"
          className="stroke-zinc-400 fill-none group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300"
        >
          <path
            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
            strokeWidth="1.5"
          ></path>
          <path d="M8 12H16" strokeWidth="1.5"></path>
          <path d="M12 16V8" strokeWidth="1.5"></path>
        </svg>
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChage}
        accept="image/*,video/*"
        className="hidden"
      />

      {isUploading &&
        createPortal(
          <div
            className="fixed top-50 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center min-w-[200px] bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 text-center"
            style={{ zIndex: 99999 }} 
          >
            {status === "loading" && (
              <div className="uiverse-container scale-75 mb-2">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}

            {/*{status === "success" && (
              
                <p className="text-[#9b59b6] font-sans text-lg font-bold whitespace-nowrap animate-bounce">
                  Added story successfully!
                </p>
            )}*/}
          </div>,
          document.body,
        )}
    </div>
  );
}

export default AddStory;
