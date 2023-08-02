import React from 'react';
import BlogItem from '../components/post-item/BlogItem';
import BlogItemMedia from '../components/post-item/BlogItemMedia';
import CategoryItem from '../components/post-item/CategoryItem';
import useGetAllPost from '../hooks/useGetAllPost';
import SlideSwiper from '../components/post-item/SlideSwiper';
import { SectionField } from '../components/field';
import { Heading } from '../components/text';
import useGetAllCategory from '../hooks/useGetAllCategory';
const Home = () => {
    const { dataPost } = useGetAllPost()
    const { dataCategory } = useGetAllCategory()
    const dataPostReverse = dataPost.reverse();
    const dataPostSlide = dataPostReverse.slice(0, 5)
    const dataPostNew = dataPostReverse.slice(0, 6)
    const dataPostHighLight = dataPostReverse.slice(6, 11)
    const dataPostOther = dataPostReverse.slice(11)
    return (
        <div>
            <SlideSwiper dataPost={dataPostSlide}></SlideSwiper>
            <SectionField>
                <div className='col-span-2'>
                    <Heading >Mới nhất</Heading>
                    <div className='grid grid-cols-2 gap-6'>
                        {dataPostNew && dataPostNew.length > 0 && dataPostNew.slice(0, 2).map((post) => (
                            <BlogItem key={post._id} data={post}></BlogItem>
                        ))}
                    </div>
                </div>
                <div>
                    <Heading>Bài viết khác</Heading>
                    {dataPostNew && dataPostNew.length > 0 && dataPostNew.slice(2).map((post) => (
                        <BlogItemMedia key={post._id} data={post}></BlogItemMedia>
                    ))}
                </div>
            </SectionField>
            <SectionField>
                <div className='col-span-2'>
                    <Heading>Nỗi bật</Heading>
                    <div className='mb-10'>
                        <BlogItem isSingle data={dataPostHighLight[0]}></BlogItem>
                    </div>
                </div>
                <div>
                    <div className='mb-10'>
                        <Heading>Bài viết khác</Heading>
                        {dataPostHighLight && dataPostHighLight.length > 0 && dataPostHighLight.slice(1).map((post) => (
                            <BlogItemMedia key={post?._id} data={post}></BlogItemMedia>

                        ))}
                    </div>
                    <CategoryItem data={dataCategory}></CategoryItem>
                </div>
            </SectionField>
            <SectionField>
                <div className='col-span-3'>
                    <Heading>Không thể bỏ qua</Heading>
                </div>
                {dataPostOther.length > 0 && dataPostOther.map((post) => (
                    <BlogItem key={post?._id} data={post}></BlogItem>
                ))}
            </SectionField>
        </div>
    );
};

export default Home;