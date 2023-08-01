import React, { useEffect, useState } from 'react';
import { FileInput, Input } from '../input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button } from '../button';
import Textarea from '../input/Textarea';
import Select from '../input/Select';
import { getDate, getTimestamp } from '../../hooks/useGetTime';
import PostService from '../../services/post';
import { useAuth } from '../../contexts/authContext';
import { toast } from 'react-toastify';
import CategoryService from '../../services/category';
const postService = new PostService()
const schemaValidate = Yup.object().shape({
    title: Yup.string().required("Vui lòng nhập tên Tiêu đề!"),
    content: Yup.string().required("Vui lòng nhập nội dung!"),
    category: Yup.string().required("Vui lòng nhập loai!"),
    image: Yup.mixed().required("Vui lòng nhập ảnh!"),
})
const categoryService = new CategoryService()
const FormAddPost = () => {
    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control, reset } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onBlur', });
    const { token } = useAuth()
    const handleSubmitFormAddPost = async (values) => {
        const date = getDate()
        const timestamps = getTimestamp()
        const post = { ...values, date, timestamps }
        try {
            if (isValid) {
                const postData = await postService.createPost(token, post)
                if (postData) {
                    toast.success(postData.message)
                    reset({
                        category: '',
                        content: '',
                        image: null,
                        title: ''
                    })
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

    const [categoryData, setCategoryData] = useState({});
    const handleGetCategory = async () => {
        try {
            const categoryData = await categoryService.getAll()
            if (categoryData) {
                setCategoryData(categoryData)
            } else {
                toast.error("Có lỗi xảy ra khi lấy danh mục!")
            }

        } catch (error) {
            toast.error(error.response.data.message || "Có lỗi xảy ra!")
            console.log(error);
            return
        }
    }
    useEffect(() => {
        handleGetCategory()
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
                                lable={'Hình ảnh'}></FileInput>
                        </div>
                        <Select
                            control={control}
                            name={'category'}
                            errors={errors}
                            lable={'Loại'}
                            data={categoryData}
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