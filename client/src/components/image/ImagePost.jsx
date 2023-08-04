import React from 'react';
import LoadingSkeleton from '../loading/LoadingSkeleton';

const ImagePost = ({ src, className }) => {
    return (
        <>  {!src ? <LoadingSkeleton className={className}></LoadingSkeleton> :

            <img
                src={`${src}`}
                alt="" className={`${className} object-cover`} />
        }
        </>
    );
};

export default ImagePost;