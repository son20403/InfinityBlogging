import React from 'react';
import BlogItem from '../components/post-item/BlogItem';
import BlogItemMedia from '../components/post-item/BlogItemMedia';
import CategoryItem from '../components/post-item/CategoryItem';
import useGetAllPost from '../hooks/useGetAllPost';
import SlideSwiper from '../components/post-item/SlideSwiper';
import { SectionField } from '../components/field';
import { Heading } from '../components/text';
import useGetAllCategory from '../hooks/useGetAllCategory';
import BlogItemLoading from '../components/loading/BlogItemLoading';
import BlogItemMediaLoading from '../components/loading/BlogItemMediaLoading';
const Home = () => {
    const { dataPost } = useGetAllPost()
    const { dataCategory } = useGetAllCategory()
    const dataPostSlide = dataPost.slice(0, 5)
    const dataPostNew = dataPost.slice(0, 6)
    const dataPostHighLight = dataPost.slice(6, 16)
    const dataPostOther = dataPost.slice(16)
    return (
        <div>
            <SlideSwiper dataPost={dataPostSlide}></SlideSwiper>
            <SectionField>
                <div className='col-span-2'>
                    <Heading >Mới nhất</Heading>
                    <div className='grid grid-cols-2 gap-6'>
                        {dataPostNew && dataPostNew.length > 0 ? dataPostNew.slice(0, 2).map((post) => (
                            <BlogItem key={post._id} data={post}></BlogItem>
                        )) :
                            <>
                                <BlogItemLoading></BlogItemLoading>
                                <BlogItemLoading></BlogItemLoading>
                            </>
                        }
                    </div>
                </div>
                <div>
                    <Heading>Bài viết khác</Heading>
                    {dataPostNew && dataPostNew.length > 0 ? dataPostNew.slice(2).map((post) => (
                        <BlogItemMedia key={post._id} data={post}></BlogItemMedia>
                    )) : (
                        <>
                            <BlogItemMediaLoading></BlogItemMediaLoading>
                            <BlogItemMediaLoading></BlogItemMediaLoading>
                            <BlogItemMediaLoading></BlogItemMediaLoading>
                            <BlogItemMediaLoading></BlogItemMediaLoading>
                        </>
                    )}
                </div>
            </SectionField>
            <SectionField>
                <div className='col-span-2'>
                    <Heading>Nỗi bật</Heading>
                    <div className='mb-10'>
                        <BlogItem isSingle data={dataPostHighLight[0]}></BlogItem>
                    </div>
                    <div className=' grid grid-cols-2 gap-x-10 gap-y-2'>
                        {dataPostHighLight && dataPostHighLight?.length > 0 ? dataPostHighLight?.slice(1, 5).map((post) => (
                            <BlogItemMedia key={post?._id} data={post}></BlogItemMedia>
                        )) : (
                            <>
                                <BlogItemMediaLoading></BlogItemMediaLoading>
                                <BlogItemMediaLoading></BlogItemMediaLoading>
                                <BlogItemMediaLoading></BlogItemMediaLoading>
                                <BlogItemMediaLoading></BlogItemMediaLoading>
                            </>
                        )}
                    </div>
                </div>
                <div>
                    <div className='mb-10'>
                        <Heading>Bài viết khác</Heading>
                        {dataPostHighLight && dataPostHighLight?.length > 0 ? dataPostHighLight?.slice(6).map((post) => (
                            <BlogItemMedia key={post?._id} data={post}></BlogItemMedia>
                        )) : (
                            <>
                                <BlogItemMediaLoading></BlogItemMediaLoading>
                                <BlogItemMediaLoading></BlogItemMediaLoading>
                                <BlogItemMediaLoading></BlogItemMediaLoading>
                                <BlogItemMediaLoading></BlogItemMediaLoading>
                            </>
                        )}
                    </div>
                    <CategoryItem data={dataCategory}></CategoryItem>
                </div>
            </SectionField>
            <SectionField>
                <div className='col-span-3'>
                    <Heading>Không thể bỏ qua</Heading>
                </div>
                {dataPostOther?.length > 0 ? dataPostOther?.map((post) => (
                    <BlogItem key={post?._id} data={post}></BlogItem>
                )) : <>
                    <BlogItemLoading></BlogItemLoading>
                    <BlogItemLoading></BlogItemLoading>
                    <BlogItemLoading></BlogItemLoading>
                </>}
            </SectionField>
        </div>
    );
};

export default Home;