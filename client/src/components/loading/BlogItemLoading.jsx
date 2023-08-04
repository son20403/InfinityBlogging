
import React from 'react';
import LoadingSkeleton from './LoadingSkeleton';

const BlogItemLoading = ({ isSingle = false, isDetail = false }) => {
    return (
        <div className='mb-3 flex flex-col '>
            <LoadingSkeleton
                className={`w-full h-full rounded-lg mb-3 ${isSingle ?
                    'h-full max-h-[460px] min-h-[460px]' : 'max-h-[251px] min-h-[251px]'} `}
            ></LoadingSkeleton>
            <LoadingSkeleton className={' h-10 rounded-lg w-1/3 self-start mt-3'}></LoadingSkeleton>
            <LoadingSkeleton className={`${isDetail || isSingle ? 'h-[300px]' : 'h-[70px]'} mt-3`}>
            </LoadingSkeleton>
            <div className={`flex mt-auto gap-5 items-center ${isSingle ? '' : ' justify-between'}`}>
                <div className='flex items-center gap-2'>
                    <LoadingSkeleton className=' border-2 w-[50px] h-[50px] rounded-full 
                    p-[3px] flex justify-center items-center'></LoadingSkeleton>
                    <LoadingSkeleton className={'  w-[150px] h-5'}></LoadingSkeleton>
                </div>
                <LoadingSkeleton className={' h-5 w-[150px]'}></LoadingSkeleton>
            </div>
        </div>
    );
};

export default BlogItemLoading;