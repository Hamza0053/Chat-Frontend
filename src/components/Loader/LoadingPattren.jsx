// src/components/LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css';
import welcomePattren from '../../assets/whatsapp-pattren.png'
import Image from '../Image/Image';
const LoadingPattren = () => {
    return (
        <div className="w-full  flex flex-col items-center justify-center absolute inset-0 bg-white z-40">
            <Image
                className='w-72 -mt-32'
                src={welcomePattren} />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <svg className="spinner" width="45px" height="45px" viewBox="0 0 52 52">
                    <circle className="path" cx="26px" cy="26px" r="16px" fill="none" strokeWidth="4px" />
                </svg>
            </div>
        </div>
    );
};

export default LoadingPattren;
