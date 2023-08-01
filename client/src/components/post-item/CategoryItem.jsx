import React from 'react';

const CategoryItem = () => {
    return (
        <div className='mb-10'>
            <h1 className='text-xl font-medium border-l-4 border-red-500 pl-5 mb-10'>Danh mục</h1>
            <div className='flex gap-3 flex-col'>
                <span className=' px-2 rounded-md py-1 text-sm'>Travel</span>
                <span className=' px-2 rounded-md py-1 text-sm'>Marketing</span>
                <span className=' px-2 rounded-md py-1 text-sm'>Politics</span>
                <span className=' px-2 rounded-md py-1 text-sm'>Sport</span>
            </div>
        </div>
    );
};

export default CategoryItem;