import React from 'react';
import { Badge, Title } from '../text';
import { ImagePost } from '../image';
import Time from '../text/Time';

const BlogItemMedia = () => {
    return (
        <div className='flex gap-x-5 items-center mb-5'>
            <ImagePost className={'w-[100px] h-[100px] rounded-lg'}></ImagePost>
            <div className=''>
                <Title className=' text-sm mt-0'></Title>
                <div className='flex items-center justify-between'>
                    <Badge >Game</Badge>
                    <Time className='text-sm text-gray-500'></Time>
                </div>
            </div>
        </div>
    );
};

export default BlogItemMedia;