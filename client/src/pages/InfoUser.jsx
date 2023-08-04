import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFile, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useParams } from 'react-router-dom';

import BlogItem from '../components/post-item/BlogItem';
import { useAuth } from '../contexts/authContext';
import { Title } from '../components/text';
import { ImagePost } from '../components/image';
import Heading from '../components/text/Heading';
import BlogItemLoading from '../components/loading/BlogItemLoading';
import useGetDetailCustomer from '../hooks/useGetDetailCustomer';
import useGetAllPostByCustomer from '../hooks/useGetAllPostByCustomer';
import EditInfoUser from '../components/post-item/EditInfoUser';

const InfoUser = () => {

    const { id } = useParams();

    const { infoUser } = useAuth();

    const [openEditInfo, setOpenEditInfo] = useState(false);

    const { dataCustomer, handleGetDataCustomer, isLoading } = useGetDetailCustomer(id)

    const { dataPostByCustomer } = useGetAllPostByCustomer(id)
    const total = dataPostByCustomer.length
    const totalViews = dataPostByCustomer.reduce((total, post) => total + post.views, 0)
    const isValidUser = dataCustomer?._id === infoUser?._id

    useEffect(() => {
        handleGetDataCustomer()
    }, [id]);
    return (
        <>
            <div>
                <section className='page-container  rounded-lg my-10 '>
                    <div className='relative rounded-lg bg-gradient-to-b from-cyan-500 to-blue-700 h-[260px]
                text-white mb-10 '>
                        <Title className=' pl-10 py-4 font-bold text-xl border-b'>Thông Tin Cá Nhân</Title>
                        <div className='absolute -bottom-7 left-20 flex items-center gap-x-10 pr-10'
                            style={{ width: 'calc(100% - 80px)' }}>
                            <div className='w-40 h-40 rounded-full bg-white  border-4 border-white
                                flex justify-center items-center  overflow-hidden'>
                                <ImagePost src={dataCustomer?.image} className='w-full h-full' />
                            </div>
                            <div>
                                <Title className='font-semibold text-3xl mt-0'>{dataCustomer?.full_name}</Title>
                                <Title className='text-sm mb-0'>@{dataCustomer?.user_name}</Title>
                            </div>
                            <div className=' flex-1'>
                                {isValidUser && (
                                    <FontAwesomeIcon
                                        className='cursor-pointer'
                                        icon={faPenToSquare}
                                        onClick={() => setOpenEditInfo(true)} />
                                )}
                            </div>
                            <div className='flex flex-col gap-y-0 text-right'>
                                <Title className={'text-sm leading-[1px]'}>
                                    Bài viết: {total} <FontAwesomeIcon icon={faFile} /></Title>
                                <Title className={'text-sm leading-[1px]'}>
                                    Lượt xem:  {totalViews}  <FontAwesomeIcon icon={faEye} /> </Title>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <Heading>Bài viết của bạn</Heading>
                    </div>
                    <div className=' grid grid-cols-3 gap-10'>
                        {isLoading && (
                            <>
                                <BlogItemLoading></BlogItemLoading>
                                <BlogItemLoading></BlogItemLoading>
                                <BlogItemLoading></BlogItemLoading>
                            </>
                        )}
                        {!isLoading && dataPostByCustomer && dataPostByCustomer?.length > 0
                            ? dataPostByCustomer.map((post) => (
                                <BlogItem key={post._id} data={post}></BlogItem>))
                            :
                            (<Title className={' text-center col-span-3 font-bold text-xl text-red-500 '}>
                                Chưa có bài viết nào</Title>)
                        }
                    </div>
                </section>
            </div>
            <EditInfoUser id={id} show={openEditInfo} setShow={setOpenEditInfo}
                setInfoCustomer={handleGetDataCustomer}></EditInfoUser>
        </>
    );
};

export default InfoUser;