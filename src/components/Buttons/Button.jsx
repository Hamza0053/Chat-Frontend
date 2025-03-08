// src/components/Button.js
import React from "react";

const Button = ({ text, onClick, type = "button", className = "", disabled = false, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer transition duration-200 
       ${className}`}
    >
      {
        children &&
        children
      }
      {
        text &&
        text
      }

    </button>
  );
};

export default Button;
