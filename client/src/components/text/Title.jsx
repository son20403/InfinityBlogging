import React from 'react';

const Title = ({ children, className }) => {
    return (
        <>
            <h1 className={`my-3 ${className}`}>
                {children || 'B2B cmos plan 2022 spending that rise, influencer marketing’s.'}</h1>
        </>
    );
};

export default Title;