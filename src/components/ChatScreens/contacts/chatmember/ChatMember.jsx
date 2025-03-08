import React from 'react'
import Image from '../../../Image/Image'
import SkeletonLoader from './Skeleton'



function ChatMember({ index, data, onClick }) {


    return (
        <div
            onClick={onClick}
            key={index}
            className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-200 cursor-pointer"
        >
            <div className="w-10 h-10 bg-gray-300 rounded-full">
                <Image
                    src={`http://localhost:5000/${data?.profile_picture}`}
                    className='rounded-full h-10 w-10'
                />
            </div>
            <div className="flex-1">
                <h3 className="font-medium">{data?.name}</h3>
                <p className="text-sm text-[#54656f]">{data?.status}</p>
            </div>
        </div>
    )
}

export default ChatMember