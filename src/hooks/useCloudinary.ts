import { useState } from "react";

export const useCloudinary = () => {
    const [image, setImage] = useState([]);
    const handleImage = (e: React.ChangeEvent) => {
        const file = e.target.files[0];
        setFileToBase(file);
      };
    
      const setFileToBase = (file: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImage(reader.result);
        };
      };

      return {
        image,
        handleImage
      }
}