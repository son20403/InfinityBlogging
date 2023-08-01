import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';
import SlideItem from './SlideItem';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

const SlideSwiper = ({ dataPost }) => {
    return (
        <section className=' slider my-10 mb-20 select-none'>
            <Swiper
                initialSlide={1}
                modules={[Navigation, Autoplay, FreeMode]}
                spaceBetween={30}
                slidesPerView={1.9}
                navigation
                centeredSlides={true}
                speed={2000}
                autoplay={{
                    delay: 3000,
                    // disableOnInteraction: true
                }}>
                {dataPost && dataPost.length > 0 && dataPost.map(post => (
                    <SwiperSlide key={post._id}>
                        <SlideItem post={post}></SlideItem>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default SlideSwiper;