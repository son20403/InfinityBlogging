import React from 'react';
import { ImagePost } from '../image';

const Avatar = ({ urlImage }) => {
    return (
        <div className=' border-2 border-cyan-500 rounded-full p-[3px] flex justify-center items-center'>
            <ImagePost
                src={urlImage ||
                    'https://www.nicepng.com/png/full/514-5146455_premium-home-loan-icon-download-in-svg-png.png'}
                className={'w-10 h-10 rounded-full'} />
        </div>
    );
};

export default Avatar;