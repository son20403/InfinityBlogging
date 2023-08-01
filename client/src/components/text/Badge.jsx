import React from 'react';

const Badge = ({ children, className }) => {
    return (
        <>
            <span
                className={`px-2 py-2 rounded-md text-sm bg-[#5A31F4] inline-block text-white ${className}`}>
                {children || 'Marketing'} </span>
        </>
    );
};

export default Badge;