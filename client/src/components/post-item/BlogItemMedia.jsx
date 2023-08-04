import React from 'react';
import { Badge, Title } from '../text';
import { ImagePost } from '../image';
import Time from '../text/Time';
import { Link } from 'react-router-dom';
import useGetDetailCategory from '../../hooks/useGetDetailCategory';
import useTimeSince from '../../hooks/useTimeSince';

const BlogItemMedia = ({ data }) => {
    const timeSince = useTimeSince()

    const { dataCategory } = useGetDetailCategory(data?.category);
    return (
        <Link to={`/detail-post/${data?.slug}`} className='flex gap-x-5 items-center mb-5'>
            <ImagePost src={data?.image} className={'w-[100px] h-[100px] min-w-[100px] rounded-lg'}></ImagePost>
            <div className='flex-1'>
                <Title className=' text-sm mt-0'>{data?.title}</Title>
                <div className='flex items-center justify-between'>
                    <Badge >{dataCategory?.title}</Badge>
                    <Time className='text-sm text-gray-500'>{timeSince(data?.timestamps)}</Time>
                </div>
            </div>
        </Link>
    );
};

export default BlogItemMedia;