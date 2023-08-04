import { faEye, faThumbsUp as farThumbUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as fasThumbUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Avatar from './Avatar';
import useGetDetailCustomer from '../../hooks/useGetDetailCustomer';
import useGetDetailCategory from '../../hooks/useGetDetailCategory';
import { Link } from 'react-router-dom';
import { Badge, Title } from '../text';
import { ImagePost } from '../image';
import Time from '../text/Time';
import PostService from '../../services/post';
import { useAuth } from '../../contexts/authContext';
import { toast } from 'react-toastify';
import useTimeSince from '../../hooks/useTimeSince';
import ButtonLike from '../button/ButtonLike';

const postService = new PostService()
const BlogItem = ({ isSingle = false, isDetail = false, data, setData }) => {
    const { dataCustomer } = useGetDetailCustomer(data?.id_customer)
    const { dataCategory } = useGetDetailCategory(data?.category)
    const timeSince = useTimeSince()
    const { token, infoUser } = useAuth()
    const likeArray = data?.likes
    const [totalLikes, setTotalLikes] = useState(0);
    const isLiked = likeArray?.some((id) => id === infoUser?._id)
    const handleLikePost = async () => {
        try {
            const isLike = await postService.like(token, data?._id);
            toast.success(isLike.message)
            setData()
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            if (!error.response.data.message) {
                toast.error("Bạn cần đăng nhập để thực hiện chức năng này")
            }
        }
    }
    useEffect(() => {
        setTotalLikes(likeArray?.length)
    }, [likeArray?.length]);
    return (
        <div className='mb-3 flex flex-col '>
            <Link to={`/detail-post/${data?.slug}`}>
                <ImagePost
                    src={data?.image}
                    className={`w-full h-full rounded-lg mb-3 ${isSingle ?
                        'h-full max-h-[370px] min-h-[370px]' :
                        'max-h-[251px] min-h-[251px]'} `} />
            </Link>
            <Badge className={' self-start mt-3'}>{dataCategory?.title}</Badge>
            <Link to={`/detail-post/${data?.slug}`}>
                <Title className={`${isDetail || isSingle ? 'text-4xl leading-[3rem] font-semibold' : 'text-lg'}`}>
                    {data?.title}</Title>
            </Link>
            <div className={`flex mt-auto gap-5 items-center ${isSingle ? '' : ' justify-between'}`}>
                <Link to={`/info-user/${data?.id_customer}`} className='flex items-center gap-2'>
                    <Avatar urlImage={dataCustomer?.image}></Avatar>
                    <Title className='text-sm'>{dataCustomer?.full_name}</Title>
                </Link>
                <Time className='text-sm text-gray-500'>{timeSince(data?.timestamps)}</Time>
                <div className='text-sm flex items-center gap-1 font- text-gray-500 '>
                    {data?.views > 999 ? `${String(data?.views).slice(0, 1)}k` : data?.views}
                    {isDetail || isSingle ? ' lượt xem' : <FontAwesomeIcon icon={faEye} />}
                </div>
                {isDetail && (
                    <ButtonLike isLiked={isLiked} totalLikes={totalLikes} onClick={handleLikePost} />
                )}
            </div>
        </div>
    );
};



export default BlogItem;