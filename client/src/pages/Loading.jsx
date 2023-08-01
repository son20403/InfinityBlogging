import React from 'react';

const Loading = () => {
    return (
        <div className='loading fixed flex justify-center items-center inset-0 bg-white transition-all'>
            <div className="lds-ripple w-20 h-20"><div></div><div></div></div>
        </div>
    );
};

export default Loading;