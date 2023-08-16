import React, { useEffect } from 'react';
import { Radio } from "@material-tailwind/react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import PostService from '../../services/post';
import useGetDetailPost from '../../hooks/useGetDetailPost';
import useGetAllCategory from '../../hooks/useGetAllCategory';
import { useAuth } from '../../contexts/authContext';
import { FileInput, Input } from '../../components/input';
import Select from '../../components/input/Select';
import Textarea from '../../components/input/Textarea';
import { Button } from '../../components/button';
import { Heading } from '../../components/text';
import { getDate, getTimestamp } from '../../hooks/useGetTime';


const schemaValidate = Yup.object().shape({
    title: Yup.string().required("Vui lòng nhập địa chỉ!"),
    content: Yup.string().required("Vui lòng nhập địa chỉ!"),
    category: Yup.string().required("Vui lòng nhập loai!"),
    image: Yup.mixed(),
    status: Yup.string().required("Bạn có muốn duyệt bài không?"),
})

const postService = new PostService()
const AddPost = () => {
    const navigate = useNavigate();
    const { dataCategory, handleGetDataCategory } = useGetAllCategory()
    const { token } = useAuth();
    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control, register, watch, setValue }
        = useForm({
            resolver: yupResolver(schemaValidate), mode: 'onBlur', defaultValues: {
                status: "pending",
            }
        })

    const onSubmitHandle = async (values) => {
        const date = getDate()
        const timestamps = getTimestamp()
        const post = { ...values, date, timestamps }
        try {
            if (isValid && token) {
                const newPost = await postService.createPost(token, post)
                if (newPost) {
                    toast.success(newPost.message)
                    navigate('/admin')
                } else {
                    toast.error(newPost.message || "Có lỗi xảy ra!")
                }
            }
        } catch (error) {
            toast.error(error.response.data.message || "Có lỗi xảy ra!")
            console.log(error);
        }
    }
    useEffect(() => {
        handleGetDataCategory()
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandle)} className='p-5 w-[1280px]'>
                <Heading className={'text-4xl text-gray-700'}>Thêm bài viết</Heading>
                <div className='grid grid-cols-3 gap-x-16 mb-5'>
                    <div className='col-span-2'>
                        <Input
                            control={control}
                            name={'title'}
                            errors={errors}
                            type={'text'}
                            value={''}
                            lable={'Tiêu đề'}></Input>
                    </div>

                    <div className='h-[300px] row-span-3'>
                        <FileInput
                            oldImage={''}
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
                        value={''}
                        data={dataCategory}
                    >
                    </Select>
                    <div className="flex gap-10 mt-5 items-center col-span-1">
                        <Radio
                            {...register("status")}
                            value='pending'
                            label="Không duyệt"
                            checked={watch("status") === "pending"}
                            onChange={(e) => setValue("status", e.target.value)}
                        />
                        <Radio
                            {...register("status")}
                            value='approved'
                            label="Đã duyệt"
                            checked={watch("status") === "approved"}
                            onChange={(e) => setValue("status", e.target.value)}
                        />
                    </div>
                    <div className=' row-span-2 col-span-2 mt-10'>
                        <Textarea control={control} name={'content'} errors={errors}
                            defaultValue={''} heightMax={300}></Textarea>
                    </div>
                </div>
                <Button style={{
                    maxWidth: 300,
                    margin: '0 auto'
                }} type='submit' isLoading={isSubmitting} disabled={isSubmitting}>
                    Thêm bài viết
                </Button>
            </form>
        </>
    );
};

export default AddPost;

