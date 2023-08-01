import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className='flex justify-center items-center'>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default LoadingSpinner;