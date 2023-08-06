import React, { useEffect, useState } from 'react';
import _ from 'lodash'
import CategoryItem from '../components/post-item/CategoryItem';
import useGetAllCategory from '../hooks/useGetAllCategory';
import BlogItem from '../components/post-item/BlogItem';
import BlogItemLoading from '../components/loading/BlogItemLoading';
import { useLocation, useParams } from 'react-router-dom';
import { Title } from '../components/text';
import Pagination from '../components/post-item/Pagination';
import useGetDetailCategoryBySlug from '../hooks/useGetDetailCategoryBySlug';
import useGetAllPostByCategory from '../hooks/useGetAllPostByCategory';
import FormSearch from '../components/post-item/FormSearch';

const ListPostByCategory = () => {
    const { slug } = useParams();
    const [getSlug, setGetSlug] = useState(slug);
    const { dataCategoryBySlug } = useGetDetailCategoryBySlug(getSlug)
    const { dataPostByCategory } = useGetAllPostByCategory(dataCategoryBySlug?._id)
    const { dataCategory } = useGetAllCategory()
    const [currentPage, setCurrentPage] = useState(1);

    const postsPerPage = 4;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dataPostByCategory?.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {
        setGetSlug(slug)
        if (currentPage !== 1) {
            setCurrentPage(1)
        }
    }, [slug]);
    return (
        <>
            <div className='page-container my-10 min-h-screen'>
                <div className='grid grid-cols-4 gap-10'>
                    <div>
                        <div>
                            <h1 className='text-xl font-medium border-l-4 border-red-500 pl-5 mb-10'> Search</h1>
                            <FormSearch></FormSearch>
                        </div>
                        <CategoryItem data={dataCategory}></CategoryItem>
                    </div>
                    <div className='col-span-3'>
                        <Pagination currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            dataPost={dataPostByCategory} postsPerPage={postsPerPage} />
                        <div className='grid grid-cols-2 gap-5'>
                            {false && <>
                                <BlogItemLoading></BlogItemLoading>
                                <BlogItemLoading></BlogItemLoading>
                            </>}
                            {true && currentPosts.length > 0 ? currentPosts?.map((post) => (
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

export default ListPostByCategory;
