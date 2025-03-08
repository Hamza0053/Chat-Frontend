import React from 'react';

function SkeletonLoader() {
    return (
        <div className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-200 cursor-pointer">
            {/* Skeleton for Profile Picture */}
            <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-full"></div>

            <div className="flex-1">
                {/* Skeleton for Name */}
                <div className="w-1/2 bg-gray-300 animate-pulse rounded h-4 mb-2"></div>

                {/* Skeleton for Status */}
                <div className="w-1/3 bg-gray-300 animate-pulse rounded h-3"></div>
            </div>
        </div>
    );
}

export default SkeletonLoader;
