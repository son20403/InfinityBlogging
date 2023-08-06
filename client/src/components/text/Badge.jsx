import React from 'react';
import LoadingSkeleton from '../loading/LoadingSkeleton';

const Badge = ({ children, className }) => {
    return (
        <>
            <span
                className={`px-2 py-2 rounded-md text-sm bg-[#5A31F4] inline-block text-white ${className}`}>
                {children} </span>
        </>
    );
};

export default Badge;