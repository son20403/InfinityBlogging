import React from 'react';

const Field = ({ children }) => {
    return (
        <div className='mb-10 w-full flex flex-col items-start last:mb-0'>
            {children}
        </div>
    );
};

export default Field;