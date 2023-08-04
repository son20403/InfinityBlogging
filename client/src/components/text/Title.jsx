import React from 'react';

const Title = ({ children, className }) => {
    return (
        <>
            <h1 className={`my-3 ${className}`}>
                {children}</h1>
        </>
    );
};

export default Title;