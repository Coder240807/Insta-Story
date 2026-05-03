import React, { useRef, useState } from "react";
import { uploadToCloudinary } from "../Utilities/Cloudinary";

function AddStory({ onImageUpload }) {
  const fileInputRef = useRef(null);
  const [isUplooading, setIsUploading] = useState(false);

  const handleFileChage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const imageUrl = await uploadToCloudinary(file);
      onImageUpload(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center flex-start p-2 ml-[13vw]">
      <button
        title="Add New"
        type="button"
        disabled={isUplooading}
        onClick={() => fileInputRef.current.click()}
        className={`group cursor-pointer outline-none transition-all duration-300 
          ${isUplooading ? "opacity-50 cursor-not-allowed" : "hover:rotate-90"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80px"
          height="80px"
          viewBox="0 0 24 24"
          className={`stroke-zinc-400 fill-none group-active:stroke-zinc-200 group-active:fill-zinc-600 group-active:duration-0 duration-300 
            ${isUplooading ? "animate-spin" : ""}`}
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
    </div>
  );
}

export default AddStory;
