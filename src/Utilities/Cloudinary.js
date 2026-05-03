import axios from 'axios';

const CLOUD_NAME = "dxngb5bdo"; 
const UPLOAD_PRESET = "my_app_unsigned_preset"; 

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const resourceType = file.type.startsWith('video') ? 'video' : 'image';

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload Progress: ${percentCompleted}%`);
        }
      }
    );
    return response.data.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.response.data.error.message);
    throw error;
  }
};