import React from 'react';

const LoadingSkeleton = ({ className, height, width, borderRadius }) => {
    return (
        <div className={`${className} skeleton`} style={{
            width: width || "100%",
            height: height || "100%",
            borderRadius: borderRadius
        }}>

        </div>
    );
};

export default LoadingSkeleton;