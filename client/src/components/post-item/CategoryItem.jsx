import React from 'react';
import { Link } from 'react-router-dom';

const CategoryItem = ({ data }) => {
    return (
        <div className='mb-10'>
            <h1 className='text-xl font-medium border-l-4 border-red-500 pl-5 mb-10'>Danh mục</h1>
            <div className='flex gap-3 flex-col'>
                {data && data.length > 0 && data.map((category, index) => (
                    <Link to={`/list-post-category/${category.slug}`} key={category?._id + index} className=' px-2 rounded-md py-1 text-sm'>{category?.title}</Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryItem;