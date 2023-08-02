import React from 'react';
import { Badge, Title } from '../text';
import { ImagePost } from '../image';
import Time from '../text/Time';
import { Link } from 'react-router-dom';
import useGetDetailCategory from '../../hooks/useGetDetailCategory';

const BlogItemMedia = ({ data }) => {
    const { dataCategory } = useGetDetailCategory(data?.category);
    return (
        <Link to={`/detail-post/${data?.slug}`} className='flex gap-x-5 items-center mb-5'>
            <ImagePost src={data?.image} className={'w-[100px] h-[100px] rounded-lg'}></ImagePost>
            <div className=''>
                <Title className=' text-sm mt-0'>{data?.title}</Title>
                <div className='flex items-center justify-between'>
                    <Badge >{dataCategory?.title}</Badge>
                    <Time className='text-sm text-gray-500'>{data?.date}</Time>
                </div>
            </div>
        </Link>
    );
};

export default BlogItemMedia;