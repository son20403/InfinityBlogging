import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import CategoryItem from '../components/post-item/CategoryItem';
import useGetAllCategory from '../hooks/useGetAllCategory';
import PostService from '../services/post';
import useGetAllPost from '../hooks/useGetAllPost';
import BlogItem from '../components/post-item/BlogItem';



const ListAllPost = () => {
    const { dataPost } = useGetAllPost()
    const { dataCategory } = useGetAllCategory()

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 2;

    // Tính chỉ số bắt đầu và kết thúc của các bài viết trong trang hiện tại
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dataPost.slice(indexOfFirstPost, indexOfLastPost);

    // Tạo hàm thay đổi trang
    const changePage = (newPage) => {
        if (newPage > 0 && newPage <= pageNumbers.length) setCurrentPage(newPage);
    };

    // Tính số lượng trang
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(dataPost.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    const renderPageButton = (number) => (
        <button
            key={number}
            onClick={() => changePage(number)}
            style={{ backgroundColor: number === currentPage ? 'red' : 'white' }}
        >
            {number}
        </button>
    )

    return (
        <>
            <div className='page-container my-10 '>
                <div className='grid grid-cols-4 gap-10'>
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
                    </div>
                    <div className='col-span-3'>
                        <div>
                            {/* Hiển thị số trang */}
                            <div>
                                <button
                                    onClick={() => changePage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Trước
                                </button>
                                {pageNumbers.slice(0, 2).map(renderPageButton)}
                                {currentPage > 3 && <span>...</span>}
                                {currentPage > 2 && currentPage < pageNumbers.length - 1 && renderPageButton(currentPage)}
                                {currentPage < pageNumbers.length - 2 && <span>...</span>}
                                {pageNumbers.slice(-2).map(renderPageButton)}
                                <button
                                    onClick={() => changePage(currentPage + 1)}
                                    disabled={currentPage === pageNumbers.length}
                                >
                                    Tiếp theo
                                </button>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-5'>
                            {currentPosts && currentPosts.map(post => (
                                <BlogItem key={post?._id} data={post}></BlogItem>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListAllPost;
