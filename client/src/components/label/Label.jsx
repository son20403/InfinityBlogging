import React from 'react';

const Label = ({ htmlFor, children, className, ...props }) => {
    return (
        <>
            <label htmlFor={htmlFor} className={`m-2 font-medium cursor-pointer ${className}`} {...props}>{children}</label>
        </>
    );
};

export default Label;