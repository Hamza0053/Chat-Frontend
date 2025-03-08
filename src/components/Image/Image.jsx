// src/components/Image.js
import React from "react";

const Image = ({ src, alt = "Image", className = "", onClick }) => {
  return (
    <img
      src={src || "/default-avatar.png"} // Fallback image if src is missing
      alt={alt}
      className={` object-cover ${className}`}
      onClick={onClick}
    />
  );
};

export default Image;
