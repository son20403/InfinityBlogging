import React from 'react';

const Heading = ({ children, className }) => {
    return (
        <>
            <h1 className={`text-xl font-medium border-l-4 border-red-500 pl-5 mb-10 ${className}`}>{children}</h1>
        </>
    );
};

export default Heading;