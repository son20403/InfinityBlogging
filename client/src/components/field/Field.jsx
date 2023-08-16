import React from 'react';

const Field = ({ children }) => {
    return (
        <div className='mb-5 w-full flex flex-col items-start last:mb-0'>
            {children}
        </div>
    );
};

export default Field;