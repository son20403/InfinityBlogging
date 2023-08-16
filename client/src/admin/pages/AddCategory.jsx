import React, { useEffect } from 'react';
import { Radio } from "@material-tailwind/react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Heading } from '../../components/text';
import { getDate, getTimestamp } from '../../hooks/useGetTime';
import CategoryService from '../../services/category';


const schemaValidate = Yup.object().shape({
    title: Yup.string().required("Vui lòng nhập địa chỉ!"),
    status: Yup.string().required("Bạn có muốn duyệt bài không?"),
})

const categoryService = new CategoryService()

const AddCategory = () => {
    const navigate = useNavigate();
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
        const categories = { ...values, date, timestamps }
        try {
            if (isValid) {
                const categoryData = await categoryService.create(token, categories)
                if (categoryData) {
                    toast.success(categoryData.message)
                    return
                } else {
                    toast.error(categoryData.message || "Có lỗi xảy ra!")
                }
            }
        } catch (error) {
            toast.error(error.response.data.message || "Có lỗi xảy ra!")
            console.log(error);
            return
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandle)} className='p-5 w-[1280px]'>
                <Heading className={'text-4xl text-gray-700'}>Thêm bài danh mục</Heading>
                <div className=' gap-x-16 mb-5'>
                    <div className='col-span-2'>
                        <Input
                            control={control}
                            name={'title'}
                            errors={errors}
                            type={'text'}
                            value={''}
                            lable={'Tiêu đề'}></Input>
                    </div>
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
                </div>
                <Button style={{
                    maxWidth: 300,
                    margin: '0 auto'
                }} type='submit' isLoading={isSubmitting} disabled={isSubmitting}>
                    Thêm danh mục
                </Button>
            </form>
        </>
    );
};

export default AddCategory;

