import { useState, useEffect } from 'react';

const DEFAULT_IMAGE = "/recipe_default.jpg";

export const useRecipeImage = (initialUrl) => {
    const getImageUrl = (url) => {
      if (!url) return "/recipe_default.jpg";
      if (url.startsWith("/")) return `https://recetasyummy.duckdns.org${url}`;
      return url;
    };
  
    const [src, setSrc] = useState(getImageUrl(initialUrl));
  
    useEffect(() => {
      setSrc(getImageUrl(initialUrl));
    }, [initialUrl]);
  
    const handleError = () => {
      setSrc(DEFAULT_IMAGE);
    };
  
    return { src, handleError };
  };