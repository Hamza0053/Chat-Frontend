import React from 'react'
import Input from './Input'



function SearchInput({ placeholder, children, onChange }) {
    return (
        <div className="flex bg-white mx-3 items-center justify-start gap-1 pl-2 py-1 rounded border-[1.35px] border-gray-300 focus-within:border-b-2 focus-within:border-b-[#1b8755]">
            {children}
            <Input
                onChange={onChange}
                placeholder={placeholder}
                className="w-full focus:outline-none -mb-1 test-sm placeholder:text-sm text-[#54656f]"
            />
        </div>
    )
}

export default SearchInput