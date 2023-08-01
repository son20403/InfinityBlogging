import React from 'react';
import BlogItem from '../components/post-item/BlogItem';
import BlogItemMedia from '../components/post-item/BlogItemMedia';
import CategoryItem from '../components/post-item/CategoryItem';
import useGetAllPost from '../hooks/useGetAllPost';
import SlideSwiper from '../components/post-item/SlideSwiper';
import { SectionField } from '../components/field';
import { Heading } from '../components/text';
const Home = () => {
    const { dataPost } = useGetAllPost()
    return (
        <div>
            <SlideSwiper dataPost={dataPost}></SlideSwiper>
            <SectionField>
                <div className='col-span-2'>
                    <Heading >Nỗi bật</Heading>
                    <div className='grid grid-cols-2 gap-6'>
                        <BlogItem></BlogItem>
                        <BlogItem></BlogItem>
                        <BlogItem></BlogItem>
                        <BlogItem></BlogItem>
                    </div>
                </div>
                <div>
                    <Heading>Bài viết khác</Heading>
                    <BlogItemMedia></BlogItemMedia>
                    <BlogItemMedia></BlogItemMedia>
                    <BlogItemMedia></BlogItemMedia>
                    <BlogItemMedia></BlogItemMedia>
                </div>
            </SectionField>
            <SectionField>
                <div className='col-span-2'>
                    <Heading>Nỗi bật</Heading>
                    <div className='mb-10'>
                        <BlogItem isSingle></BlogItem>
                    </div>
                    <div className='grid grid-cols-2 gap-6'>
                        <BlogItemMedia></BlogItemMedia>
                        <BlogItemMedia></BlogItemMedia>
                        <BlogItemMedia></BlogItemMedia>
                        <BlogItemMedia></BlogItemMedia>
                    </div>
                </div>
                <div>
                    <div className='mb-10'>
                        <Heading>Bài vHeadingiết khác</Heading>
                        <BlogItemMedia></BlogItemMedia>
                        <BlogItemMedia></BlogItemMedia>
                        <BlogItemMedia></BlogItemMedia>
                        <BlogItemMedia></BlogItemMedia>
                    </div>
                    <CategoryItem></CategoryItem>
                </div>
            </SectionField>
            <SectionField>
                <div className='col-span-3'>
                    <Heading>Không thể bỏ qua</Heading>
                </div>
                <BlogItem></BlogItem>
                <BlogItem></BlogItem>
                <BlogItem></BlogItem>
            </SectionField>
        </div>
    );
};

export default Home;