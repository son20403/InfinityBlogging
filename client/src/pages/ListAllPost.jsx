import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash'
import CategoryItem from '../components/post-item/CategoryItem';
import useGetAllCategory from '../hooks/useGetAllCategory';
import BlogItem from '../components/post-item/BlogItem';
import useGetSearchPost from '../hooks/useGetSearchPost';
import BlogItemLoading from '../components/loading/BlogItemLoading';
import { useLocation } from 'react-router-dom';
import { Title } from '../components/text';
import Pagination from '../components/post-item/Pagination';

const ListAllPost = () => {
    const location = useLocation();
    const keys = new URLSearchParams(location.search);
    const key = keys.get('query');

    const { dataCategory } = useGetAllCategory()
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState(key || '');
    const { dataSearchPost, isLoading, setIsLoading } = useGetSearchPost(query)

    const handleOnChange = _.debounce((e) => {
        setIsLoading(true)
        setQuery(e.target.value)
        if (currentPage !== 1) {
            setCurrentPage(1)
        }
        setIsLoading(false)
    }, 1000)

    const postsPerPage = 4;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dataSearchPost?.slice(indexOfFirstPost, indexOfLastPost);


    useEffect(() => {
        setQuery(key)
    }, [key]);

    return (
        <>
            <div className='page-container my-10 min-h-screen'>
                <div className='grid grid-cols-4 gap-10'>
                    <div>
                        <div>
                            <h1 className='text-xl font-medium border-l-4 border-red-500 pl-5 mb-10'> Search</h1>
                            <div className='w-full relative my-10'>
                                <input type="text"
                                    defaultValue={query}
                                    onChange={handleOnChange}
                                    className='w-full py-3 px-5 outline-none border rounded-lg
                                focus:shadow-[0px_0px_0px_3px_rgba(51,_159,_254,_0.5)] pr-16' placeholder='search...' />
                                <div
                                    className='absolute right-5 top-1/2 -translate-y-2/4'>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} /></div>
                            </div>
                        </div>
                        <CategoryItem data={dataCategory}></CategoryItem>
                    </div>
                    <div className='col-span-3'>
                        <Pagination currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            dataPost={dataSearchPost} postsPerPage={postsPerPage} />
                        <div className='grid grid-cols-2 gap-5'>
                            {isLoading && <>
                                <BlogItemLoading></BlogItemLoading>
                                <BlogItemLoading></BlogItemLoading>
                            </>}
                            {!isLoading && currentPosts.length > 0 ? currentPosts?.map((post) => (
                                <BlogItem key={post?._id} data={post}></BlogItem>
                            )) : (<>
                                <Title className={' text-center col-span-3 font-bold text-xl text-red-500 '}>
                                    Không có bài viết nào</Title>
                            </>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListAllPost;
