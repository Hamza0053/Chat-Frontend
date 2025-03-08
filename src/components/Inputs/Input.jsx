import React from 'react';

const Input = ({
    type = 'text',
    name,
    value,
    onChange,
    placeholder = '',
    label = '',
    error = '',
    className,
    labelStyle,
    ...rest
}) => {
    return (
        <div className="input-wrapper w-full">
            {label && <label htmlFor={name} className={labelStyle}>{label}</label>}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...rest}
                className={`input ${error ? 'input-error' : ''} ${className}`}
            />
            {error && <span className="text-sm font-normal text-red-500 absolute right-0 -bottom-[17px]">{error}</span>}
        </div>
    );
};

export default Input;
