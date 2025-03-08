// src/components/LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ text = "Connecting..." }) => {
  return (
    <div className="w-full flex items-center justify-center fixed inset-0 bg-gray-800/50 z-40">
      <div className="w-full min-w-72 max-w-96 min-h-20 bg-white relative z-50 flex items-center justify-start gap-4 px-4 rounded-[2px]">
        <svg className="spinner" width="45px" height="45px" viewBox="0 0 52 52">
          <circle className="path" cx="26px" cy="26px" r="16px" fill="none" strokeWidth="4px" />
        </svg>
        <span className="text-sm text-gray-700 font-medium">{text}</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
