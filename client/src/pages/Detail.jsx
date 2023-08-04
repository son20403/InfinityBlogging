import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useParams } from 'react-router-dom';

import CategoryItem from '../components/post-item/CategoryItem';
import BlogItemMedia from '../components/post-item/BlogItemMedia';
import BlogItem from '../components/post-item/BlogItem';
import useGetDetailPost from '../hooks/useGetDetailPost';
import useGetAllPostByCategory from '../hooks/useGetAllPostByCategory';
import useGetAllCategory from '../hooks/useGetAllCategory';
import Comment from '../components/post-item/Comment';
import PostService from '../services/post';

const postService = new PostService()


const Detail = () => {
    const { slug } = useParams();
    const { dataDetailPost, handleGetDetailPost } = useGetDetailPost(slug)
    const { dataPostByCategory } = useGetAllPostByCategory(dataDetailPost?.category)
    const { dataCategory } = useGetAllCategory()
    const [showComment, setShowComment] = useState(false);
    const commentDom = useRef(null)
    const [totalComment, setTotalComment] = useState(0);
    const [isSticky, setIsSticky] = useState(false);
    const handleUpdateView = async (slug) => await postService.updateView(slug)
    useEffect(() => {
        handleUpdateView(slug)
        const topCommentDom = commentDom.current?.getBoundingClientRect().bottom
        const handleScrollbar = () => {
            setIsSticky(window.pageYOffset >= topCommentDom);
        }
        window.addEventListener('scroll', handleScrollbar)
        return () => {
            window.removeEventListener('scroll', handleScrollbar)
        }
    }, [slug]);
    return (
        <>
            <div className='page-container my-10 '>
                <div className='grid grid-cols-3 gap-10'>
                    <div className='col-span-2'>
                        <BlogItem isSingle isDetail data={dataDetailPost} setData={handleGetDetailPost}></BlogItem>
                        <label htmlFor="content" >
                            <div ref={commentDom}
                                className={`border-2 border-[#37a2fe] rounded-lg w-full p-3  mt-10
                                text-gray-500 cursor-pointer flex justify-between items-center bg-white
                                hover:text-white hover:bg-[#32a2fe] transition-all
                                font-semibold hover:shadow-[0px_0px_0px_3px_rgba(51,_159,_254,_0.5)]
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
                            <form className='w-full relative my-10'>
                                <input type="text"
                                    className='w-full py-3 px-5 outline-none border rounded-lg
                                focus:shadow-[0px_0px_0px_3px_rgba(51,_159,_254,_0.5)]' placeholder='search...' />
                                <button
                                    className='absolute right-5 top-1/2 -translate-y-2/4'>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                            </form>
                        </div>
                        <CategoryItem data={dataCategory}></CategoryItem>
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
                id_post={dataDetailPost?._id} setShowComment={setShowComment} showComment={showComment}></Comment>
        </>
    );
};

export default Detail;
