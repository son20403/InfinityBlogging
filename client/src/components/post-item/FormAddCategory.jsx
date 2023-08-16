import React from 'react';
import { FileInput, Input } from '../input';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Button } from '../button';
import CategoryService from '../../services/category';
import { useAuth } from '../../contexts/authContext';
import { toast } from 'react-toastify';
import { getDate, getTimestamp } from '../../hooks/useGetTime';
const categoryService = new CategoryService()
const schemaValidate = Yup.object().shape({
    title: Yup.string().required("Vui lòng nhập tên Tiêu đề!"),
})
const FormAddCategory = () => {
    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onBlur', });
    const { token } = useAuth()
    const handleSubmitFormAddCategory = async (values) => {
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
        <div>
            <div className='p-5 my-5 rounded-lg '>
                <form onSubmit={handleSubmit(handleSubmitFormAddCategory)} className='p-5'>
                    <div className=' mb-20'>
                        <Input
                            control={control}
                            name={'title'}
                            errors={errors}
                            type={'text'}
                            lable={'Tên loại'}></Input>
                    </div>
                    <Button style={{
                        maxWidth: 300,
                        margin: '0 auto'
                    }} type='submit' isLoading={isSubmitting} disabled={isSubmitting}>
                        Thêm loại
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default FormAddCategory;