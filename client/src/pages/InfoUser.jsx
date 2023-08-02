import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFile, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import BlogItem from '../components/post-item/BlogItem';
import ModalAdvanced from '../components/modal/ModalAdvanced';
import { FileInput, Input } from '../components/input';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { Button } from '../components/button';
import CustomerService from '../services/customer';
import PostService from '../services/post';
import { Title } from '../components/text';
import { ImagePost } from '../components/image';
import Heading from '../components/text/Heading';

const customerService = new CustomerService()
const postService = new PostService()

const schemaValidate = Yup.object().shape({
    address: Yup.string().required("Vui lòng nhập địa chỉ!"),
    image: Yup.mixed(),
    full_name: Yup.string().required("Vui lòng nhập tên đăng nhập!")
        .max(30, 'Không được nhập quá 30 ký tự!')
        .min(5, 'Bạn phải nhập trên 5 kí tự!'),
    email: Yup.string().required("Vui lòng nhập email!").email("Vui lòng nhập đúng định dạng email!"),
})
const InfoUser = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { token, setInfoUser } = useAuth();

    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control }
        = useForm({ resolver: yupResolver(schemaValidate), mode: 'onBlur' })

    const [dataPostByCustomer, setDataPostByCustomer] = useState([]);
    const [openEditInfo, setOpenEditInfo] = useState(false);
    const [totalPost, setTotalPost] = useState(0);
    const [dataCustomer, setDataCustomer] = useState({});

    const onSubmitHandle = async ({ user_name, ...values }) => {
        try {
            if (isValid) {
                const customer = await customerService.updateCustomer(token, values)
                if (customer) {
                    setInfoUser(customer.others)
                    toast.success(customer.message)
                } else {
                    toast.error(customer.message || "Có lỗi xảy ra!")
                }
            }
        } catch (error) {
            toast.error(error.response.data.message || "Có lỗi xảy ra!")
            console.log(error);
            return
        }
        setOpenEditInfo(false)
        handleGetDataCustomer(id)
    }
    const handleGetDataCustomer = async (id) => {
        try {
            const data = await customerService.detailCustomer(id);
            if (!data) {
                toast.error("Người dùng này không tồn tại!")
                return setDataCustomer([])
            }
            setDataCustomer(data)
        } catch (error) {
            toast.error("Người dùng này không tồn tại!")
            navigate('/')
        }
    }
    const handleGetPostByCustomer = async (id) => {
        const dataPost = await postService.getAllPostByCustomer(id)
        setTotalPost(dataPost.length)
        setDataPostByCustomer(dataPost)
    }

    useEffect(() => {
        handleGetPostByCustomer(id)
        handleGetDataCustomer(id)
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
                                <FontAwesomeIcon
                                    className='cursor-pointer'
                                    icon={faPenToSquare}
                                    onClick={() => setOpenEditInfo(true)} />
                            </div>
                            <div className='flex flex-col gap-y-0 text-right'>
                                <Title className={'text-sm leading-[1px]'}>
                                    <FontAwesomeIcon icon={faFile} /> - {totalPost} posts</Title>
                                <Title className={'text-sm leading-[1px]'}>
                                    <FontAwesomeIcon icon={faEye} /> -  0 views </Title>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-3'>
                        <Heading>Bài viết của bạn</Heading>
                    </div>
                    <div className=' grid grid-cols-3 gap-10'>
                        {dataPostByCustomer && dataPostByCustomer.length > 0 ? dataPostByCustomer.reverse().map((post) => (
                            <BlogItem key={post._id} data={post}></BlogItem>)) : 'Chua co bai viet nao'}
                    </div>
                </section>
            </div>
            <ModalAdvanced visible={openEditInfo} onClose={() => setOpenEditInfo(false)} heading='Chỉnh sửa thông tin'>
                <form onSubmit={handleSubmit(onSubmitHandle)} className='p-5 min-w-[1280px] '>
                    <div className='grid grid-cols-3 gap-x-16 mb-16'>
                        <Input
                            control={control}
                            name={'user_name'}
                            errors={errors}
                            type={'text'}
                            value={dataCustomer.user_name}
                            disabled
                            lable={'Tài khoản'}></Input>
                        <Input
                            control={control}
                            name={'full_name'}
                            errors={errors}
                            type={'text'}
                            value={dataCustomer.full_name}
                            lable={'Họ và tên'}></Input>
                        <div className='row-span-2'>
                            <FileInput
                                control={control}
                                name={'image'}
                                errors={errors}
                                lable={'Ảnh'}></FileInput>
                        </div>
                        <Input
                            control={control}
                            name={'email'}
                            errors={errors}
                            type={'email'}
                            value={dataCustomer.email}
                            lable={'Email'}></Input>
                        <Input
                            control={control}
                            name={'address'}
                            errors={errors}
                            type={'text'}
                            value={dataCustomer.address}
                            lable={'Địa chỉ'}></Input>
                    </div>
                    <Button style={{
                        maxWidth: 300,
                        margin: '0 auto'
                    }} type='submit' isLoading={isSubmitting} disabled={isSubmitting}>
                        Chỉnh sửa
                    </Button>
                </form>
            </ModalAdvanced>
        </>
    );
};

export default InfoUser;