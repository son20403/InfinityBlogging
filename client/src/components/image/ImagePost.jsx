import React from 'react';

const ImagePost = ({ src, className }) => {
    return (
        <>
            <img
                src={`${src || "https://wowtheme7.com/tf/kiante/assets/img/banner/2.jpg"}`}
                alt="" className={`${className} object-cover`} />
        </>
    );
};

export default ImagePost;