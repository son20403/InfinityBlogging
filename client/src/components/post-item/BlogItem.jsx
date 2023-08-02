import { faClock, faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Avatar from './Avatar';
import useGetDetailCustomer from '../../hooks/useGetDetailCustomer';
import useGetDetailCategory from '../../hooks/useGetDetailCategory';
import { Link } from 'react-router-dom';
import { Badge, Title } from '../text';
import { ImagePost } from '../image';
import Time from '../text/Time';

const BlogItem = ({ isSingle = false, isDetail = false, data }) => {
    const { dataCustomer } = useGetDetailCustomer(data?.id_customer)
    const { dataCategory } = useGetDetailCategory(data?.category)
    return (
        <div className='mb-3 flex flex-col '>
            <Link to={`/detail-post/${data?.slug}`}>
                <ImagePost
                    src={data?.image}
                    className={`w-full h-full rounded-lg mb-3 ${isSingle ? 'h-full max-h-[460px] ' : 'max-h-[251px]'} `}
                />
            </Link>
            <Badge className={' self-start mt-3'}>{dataCategory?.title}</Badge>
            <Link to={`/detail-post/${data?.slug}`}>
                <Title className={`${isDetail || isSingle ? 'text-4xl leading-[3rem] font-semibold' : 'text-lg'}`}>
                    {data?.title}</Title>
            </Link>
            <div className={`flex mt-auto gap-5 items-center ${isSingle ? '' : ' justify-between'}`}>
                <Link to={`/info-user/${data?.id_customer}`} className='flex items-center gap-2'>
                    <Avatar urlImage={dataCustomer?.image}></Avatar>
                    <Title className='text-sm'>{dataCustomer?.full_name || "Stiven Jackson"}</Title>
                </Link>
                <Time className='text-sm text-gray-500'>{data?.date}</Time>
            </div>
        </div>
    );
};

export default BlogItem;