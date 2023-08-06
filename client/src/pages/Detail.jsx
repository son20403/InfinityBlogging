import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';

import CategoryItem from '../components/post-item/CategoryItem';
import BlogItemMedia from '../components/post-item/BlogItemMedia';
import BlogItem from '../components/post-item/BlogItem';
import useGetDetailPost from '../hooks/useGetDetailPost';
import useGetAllPostByCategory from '../hooks/useGetAllPostByCategory';
import useGetAllCategory from '../hooks/useGetAllCategory';
import Comment from '../components/post-item/Comment';
import PostService from '../services/post';
import useIsSticky from '../hooks/useIsSticky';
import AuthService from '../services/auth';
import { useAuth } from '../contexts/authContext';
import { toast } from 'react-toastify';
import FormSearch from '../components/post-item/FormSearch';
import useGetDetailCategory from '../hooks/useGetDetailCategory';

const postService = new PostService()
const authService = new AuthService()


const Detail = () => {
    const navigate = useNavigate();
    const { token } = useAuth()
    const { slug } = useParams();
    const { isSticky, stickyDom } = useIsSticky()
    const { dataDetailPost, handleGetDetailPost } = useGetDetailPost(slug)
    const { dataCategory } = useGetAllCategory()
    const { dataPostByCategory } = useGetAllPostByCategory(dataDetailPost?.category)
    const { dataCategory: detailCategory } = useGetDetailCategory(dataDetailPost?.category)

    const [showComment, setShowComment] = useState(false);
    const [totalComment, setTotalComment] = useState(0);
    const [dataCustomerByToken, setDataCustomerByToken] = useState();
    const [totalLikes, setTotalLikes] = useState(0);

    const likes = dataDetailPost?.likes
    const isLiked = likes?.some((id) => id === dataCustomerByToken?.id);


    const handleUpdateView = async (slug) => await postService.updateView(slug)
    const handleGetDataCustomer = async (token) => {
        try {
            const data = await authService.getDataCustomer(token);
            if (!data) return setDataCustomerByToken([])
            setDataCustomerByToken(data.customer)
        } catch (error) {
            console.log(error);
        }
    }
    const handleLikePost = async () => {
        try {
            const isLike = await postService.like(token, dataDetailPost?._id);
            if (isLike) {
                toast.success(isLike.message)
                handleGetDetailPost()
            } else {
                toast.error(isLike.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
            if (!error.response.data.message) {
                toast.error("Bạn cần đăng nhập để thực hiện chức năng này")
            }
        }
    }
    useEffect(() => {
        if (token) {
            handleGetDataCustomer(token)
        } else {
            setDataCustomerByToken([])
        }
        setTotalLikes(likes?.length)
        handleUpdateView(slug)
    }, [likes?.length, slug, token]);


    return (
        <>
            <div className='page-container my-10 '>
                <div className='grid grid-cols-3 gap-10'>
                    <div className='col-span-2'>
                        <BlogItem isSingle isDetail data={dataDetailPost} handleLikePost={handleLikePost}
                            isLiked={isLiked} totalLikes={totalLikes}></BlogItem>
                        <label htmlFor="content" >
                            <div ref={stickyDom}
                                className={`border-2 border-[#37a2fe] rounded-lg w-full p-3  mt-10
                                text-gray-500 cursor-pointer flex justify-between items-center bg-white
                                hover:text-white hover:bg-[#32a2fe] transition-all
                                font-semibold hover:shadow-[0px_0px_0px_3px_rgba(51,_159,_254,_0.5)]
                                z-[999]
                                ${isSticky ? 'sticky -top-[1px] rounded-t-none' : ''}`}
                                onClick={() => { setShowComment(true) }}>
                                <div className='flex-1 text-center'>Nhấn vào để viết bình luận</div>
                                <div>{totalComment} <FontAwesomeIcon icon={faComment} /></div>
                            </div>
                        </label>
                        <div className='content mt-10'>
                            <div dangerouslySetInnerHTML={{ __html: dataDetailPost?.content }} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <h1 className='text-xl font-medium border-l-4 border-red-500 pl-5 mb-10'> Search</h1>
                            <FormSearch></FormSearch>
                        </div>
                        <CategoryItem data={[detailCategory]}></CategoryItem>
                        <div className='mb-10'>
                            <h1 className='text-xl font-medium border-l-4 border-red-500 pl-5 mb-10'>Bài viết khác</h1>
                            {dataPostByCategory && dataPostByCategory.length > 0 && dataPostByCategory.map((post) => (
                                <BlogItemMedia key={post?._id} data={post}></BlogItemMedia>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Comment setTotalComment={setTotalComment}
                id_post={dataDetailPost?._id} id_customer={dataDetailPost?.id_customer} setShowComment={setShowComment} showComment={showComment}></Comment>
        </>
    );
};

export default Detail;
