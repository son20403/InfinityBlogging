import { faClock, faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';
import useGetDetailCustomer from '../../hooks/useGetDetailCustomer';
import useGetDetailCategory from '../../hooks/useGetDetailCategory';
import { Badge, Title } from '../text';
import { ImagePost } from '../image';
import Time from '../text/Time';

const SlideItem = ({ post }) => {
    const { dataCustomer } = useGetDetailCustomer(post.id_customer)
    const { dataCategory } = useGetDetailCategory(post.category)
    return (
        <div className='relative rounded-lg overflow-hidden w-[800px] h-[533px]'>
            <Link to={`/detail-post/${post._id}`}>
                <ImagePost src={post?.image} className={`w-full h-full`} />
                <div className='overlay absolute inset-0 bg-gradient-to-t to-80% from-black'></div>
            </Link>
            <div className='absolute bottom-10 mx-10 text-white'>
                <Badge>{dataCategory?.title}</Badge>
                <Link to={`/detail-post/${post._id}`}>
                    <Title className=' text-3xl leading-10'>{post.title}</Title>
                </Link>
                <div className='flex gap-5 items-center justify-between'>
                    <Link to={`/info-user/${dataCustomer._id}`} className='flex items-center gap-2'>
                        <Avatar urlImage={dataCustomer.image}></Avatar>
                        <Title className='text-sm'>{dataCustomer.full_name}</Title>
                    </Link>
                    <Time>{post?.date}</Time>
                </div>
            </div>
        </div>
    );
};

export default SlideItem;