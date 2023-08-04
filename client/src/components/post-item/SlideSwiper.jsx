import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';
import SlideItem from './SlideItem';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import LoadingSkeleton from '../loading/LoadingSkeleton';

const SlideSwiper = ({ dataPost }) => {
    return (
        <section className=' slider my-10 mb-20 select-none'>
            <Swiper
                initialSlide={1}
                modules={[Navigation, Autoplay, FreeMode]}
                spaceBetween={0}
                slidesPerView={2}
                navigation
                centeredSlides={true}
                speed={2000}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: true
                }}>
                {dataPost && dataPost.length > 0 ? dataPost.map(post => (
                    <SwiperSlide key={post._id}>
                        <SlideItem post={post}></SlideItem>
                    </SwiperSlide>
                )) : <LoadingSkeleton className={'w-full h-[400px]'}></LoadingSkeleton>}
            </Swiper>
        </section>
    );
};

export default SlideSwiper;