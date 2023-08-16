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


const schemaValidate = Yup.object().shape({
    title: Yup.string().required("Vui lòng nhập địa chỉ!"),
    content: Yup.string().required("Vui lòng nhập địa chỉ!"),
    category: Yup.string().required("Vui lòng nhập loai!"),
    image: Yup.mixed(),
    status: Yup.string().required("Bạn có muốn duyệt bài không?"),
})

const postService = new PostService()
const EditPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { dataDetailPost, handleGetDetailPost } = useGetDetailPost(slug)
    const { dataCategory, handleGetDataCategory } = useGetAllCategory()
    const { token } = useAuth();
    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control, register, watch, setValue }
        = useForm({
            resolver: yupResolver(schemaValidate), mode: 'onBlur', defaultValues: {
                status: dataDetailPost.status || "pending",
            }
        })

    const onSubmitHandle = async (values) => {
        try {
            if (isValid && token) {
                const customer = await postService.updatePost(token, dataDetailPost._id, values)
                if (customer) {
                    toast.success(customer.message)
                    navigate('/admin')
                } else {
                    toast.error(customer.message || "Có lỗi xảy ra!")
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
    useEffect(() => {
        setValue("status", dataDetailPost?.status || "pending");
    }, [dataDetailPost, setValue]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandle)} className='p-5 w-[1280px]'>
                <Heading className={'text-4xl text-gray-700'}>Chỉnh sửa bài viết</Heading>
                <div className='grid grid-cols-3 gap-x-16 mb-5'>
                    <div className='col-span-2'>
                        <Input
                            key={dataDetailPost?.title}
                            control={control}
                            name={'title'}
                            errors={errors}
                            type={'text'}
                            value={dataDetailPost?.title}
                            lable={'Tiêu đề'}></Input>
                    </div>

                    <div className='h-[300px] row-span-3'>
                        <FileInput
                            key={dataDetailPost?.image}
                            oldImage={dataDetailPost.image}
                            control={control}
                            name={'image'}
                            errors={errors}
                            lable={'Ảnh'}></FileInput>
                    </div>
                    <Select
                        key={dataDetailPost?.category}
                        control={control}
                        name={'category'}
                        errors={errors}
                        lable={'Loại'}
                        value={dataDetailPost.category}
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
                            defaultValue={dataDetailPost?.content} key={dataDetailPost?.content} heightMax={300}></Textarea>
                    </div>
                </div>
                <Button style={{
                    maxWidth: 300,
                    margin: '0 auto'
                }} type='submit' isLoading={isSubmitting} disabled={isSubmitting}>
                    Chỉnh sửa
                </Button>
            </form>
        </>
    );
};

export default EditPost;

