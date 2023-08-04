import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { FileInput, Input } from '../input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Button } from '../button';
import Textarea from '../input/Textarea';
import Select from '../input/Select';
import { getDate, getTimestamp } from '../../hooks/useGetTime';
import { useAuth } from '../../contexts/authContext';
import useGetAllCategory from '../../hooks/useGetAllCategory';
import PostService from '../../services/post';

const postService = new PostService()
const schemaValidate = Yup.object().shape({
    title: Yup.string().required("Vui lòng nhập tên Tiêu đề!"),
    content: Yup.string().required("Vui lòng nhập nội dung!"),
    category: Yup.string().required("Vui lòng nhập loai!"),
    image: Yup.mixed().required("Vui lòng nhập ảnh!"),
})
const FormAddPost = () => {
    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control, reset } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onBlur', });

    const { token } = useAuth()
    const { dataCategory, handleGetDataCategory } = useGetAllCategory()

    const handleSubmitFormAddPost = async (values) => {
        const date = getDate()
        const timestamps = getTimestamp()
        const post = { ...values, date, timestamps }
        try {
            if (isValid) {
                const postData = await postService.createPost(token, post)
                if (postData) {
                    toast.success(postData.message)
                    reset({ category: '', content: '', image: null, title: '' })
                    return
                } else {
                    toast.error(postData.message || "Có lỗi xảy ra!")
                }
            }
        } catch (error) {
            toast.error(error.response.data.message || "Có lỗi xảy ra!")
            console.log(error);
            return
        }
    }
    useEffect(() => {
        handleGetDataCategory()
    }, []);

    return (
        <div>
            <div className='p-5 my-5 rounded-lg '>
                <form onSubmit={handleSubmit(handleSubmitFormAddPost)} className='p-5'>
                    <div className=' grid grid-cols-2 gap-x-14 mb-20'>
                        <Input
                            control={control}
                            name={'title'}
                            errors={errors}
                            type={'text'}
                            lable={'Tiêu đề'}></Input>
                        <div className='row-span-2'>
                            <FileInput
                                control={control}
                                name={'image'}
                                errors={errors}
                                lable={'Hình ảnh'}>
                            </FileInput>
                        </div>
                        <Select
                            control={control}
                            name={'category'}
                            errors={errors}
                            lable={'Loại'}
                            data={dataCategory}
                        >
                        </Select>
                        <div className='col-span-2'>
                            <Textarea control={control} name={'content'} errors={errors}></Textarea>
                        </div>
                    </div>
                    <Button style={{
                        maxWidth: 300,
                        margin: '0 auto'
                    }} type='submit' isLoading={isSubmitting} disabled={isSubmitting}>
                        Thêm bài viết
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default FormAddPost;