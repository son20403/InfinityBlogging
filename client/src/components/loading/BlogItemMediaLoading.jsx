import React from 'react';
import { ImagePost } from '../image';
import LoadingSkeleton from './LoadingSkeleton';

const BlogItemMediaLoading = () => {
    return (
        <div className='flex gap-x-5 items-center mb-5'>
            <ImagePost className={'w-[100px] h-[100px] min-w-[100px] rounded-lg'}></ImagePost>
            <div className='flex-1'>
                <LoadingSkeleton className={'  w-[300px] h-10'}></LoadingSkeleton>

                <div className='flex items-center justify-between'>
                    <LoadingSkeleton className={' h-10 rounded-lg w-1/3 self-start mt-3'}></LoadingSkeleton>
                    <LoadingSkeleton className={'  w-[150px] h-5'}></LoadingSkeleton>

                </div>
            </div>
        </div>
    );
};

export default BlogItemMediaLoading;