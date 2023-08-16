import React, { useEffect } from 'react';
import { FileInput, Input } from '../input';
import { Button } from '../button';
import ModalAdvanced from '../modal/ModalAdvanced';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { toast } from 'react-toastify';

import PostService from '../../services/post';
import { useAuth } from '../../contexts/authContext';
import useGetDetailCustomer from '../../hooks/useGetDetailCustomer';
import useGetDetailPost from '../../hooks/useGetDetailPost';
import Textarea from '../input/Textarea';
import useGetAllCategory from '../../hooks/useGetAllCategory';
import Select from '../input/Select';

const schemaValidate = Yup.object().shape({
    title: Yup.string().required("Vui lòng nhập địa chỉ!"),
    content: Yup.string().required("Vui lòng nhập địa chỉ!"),
    category: Yup.string().required("Vui lòng nhập loai!"),
    image: Yup.mixed(),
})

const postService = new PostService()
const EditPost = ({ show, setShow = () => { }, slug, setDetailPost = () => { } }) => {
    const { dataDetailPost, handleGetDetailPost } = useGetDetailPost(slug)
    const { dataCategory, handleGetDataCategory } = useGetAllCategory()
    const { token } = useAuth();
    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control }
        = useForm({ resolver: yupResolver(schemaValidate), mode: 'onBlur' })

    const onSubmitHandle = async ({ ...values }) => {
        console.log(values);
        try {
            if (isValid && token) {
                const customer = await postService.updatePost(token, dataDetailPost._id, values)
                if (customer) {
                    toast.success(customer.message)
                } else {
                    toast.error(customer.message || "Có lỗi xảy ra!")
                }
            }
        } catch (error) {
            toast.error(error.response.data.message || "Có lỗi xảy ra!")
            console.log(error);
        }
        setShow(false)
        setDetailPost()
    }
    useEffect(() => {
        handleGetDataCategory()
    }, [slug]);

    return (
        <>
            <ModalAdvanced visible={show} onClose={() => setShow(false)}>
                <form onSubmit={handleSubmit(onSubmitHandle)} className='p-5 w-[1280px]'>
                    <div className='grid grid-cols-3 gap-x-16 mb-5'>
                        <Input
                            key={dataDetailPost.title}
                            control={control}
                            name={'title'}
                            errors={errors}
                            type={'text'}
                            value={dataDetailPost.title}
                            lable={'Tiêu đề'}></Input>
                        <div className='row-span-2 col-span-2'>
                            <FileInput
                                oldImage={dataDetailPost.image}
                                key={dataDetailPost.image}
                                control={control}
                                name={'image'}
                                errors={errors}
                                lable={'Ảnh'}></FileInput>
                        </div>
                        <Select
                            control={control}
                            name={'category'}
                            errors={errors}
                            lable={'Loại'}
                            value={dataDetailPost?.category}
                            key={dataDetailPost?.category}
                            data={dataCategory}
                        >
                        </Select>
                        <div className=' row-span-2 col-span-3'>
                            <Textarea className={'max-h-[50px]'} control={control} name={'content'} errors={errors}
                                defaultValue={dataDetailPost?.content}></Textarea>
                        </div>
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

export default EditPost;