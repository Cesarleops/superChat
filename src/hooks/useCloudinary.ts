import { useState } from "react";

export const useCloudinary = () => {
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0]
        if(file) setFileToBase(file);
        
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