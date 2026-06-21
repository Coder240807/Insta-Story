import axios from "axios";
import imageCompression from "browser-image-compression";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadToCloudinary = async (file) => {
  if (!file) return null;

  let fileToUpload = file;
  const fileType = fileToUpload.type.startsWith("video") ? "video" : "image";

  if (fileType === "image" && fileToUpload.size > 2 * 1024 * 1024) {
    console.log("Image is larger than 2MB, compressing...");
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(fileToUpload, options);
      console.log(`Original size: ${fileToUpload.size / 1024 / 1024} MB`);
      console.log(`Compressed size: ${compressedFile.size / 1024 / 1024} MB`);
      fileToUpload = new File([compressedFile], file.name, { type: file.type });
    } catch (compressionError) {
      console.error("Error during image compression:", compressionError);
      throw compressionError;
    }
  }
  const formData = new FormData();
  formData.append("file", fileToUpload);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${fileType}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          console.log(`Upload Progress: ${percentCompleted}%`);
        },
      },
    );
    return response.data.secure_url;
  } catch (error) {
    console.error(
      "Cloudinary Upload Error:",
      error.response.data.error.message,
    );
    throw error;
  }
};
