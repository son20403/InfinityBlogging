import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { FileInput, Input } from '../../components/input';
import { Button } from '../../components/button';
import { Heading } from '../../components/text';
import adminService from '../../services/admin';
import useGetDetailCustomer from '../../hooks/useGetDetailCustomer';


const schemaValidate = Yup.object().shape({
    address: Yup.string().required("Vui lòng nhập địa chỉ!"),
    image: Yup.mixed(),
    full_name: Yup.string().required("Vui lòng nhập họ và tên!")
        .max(20, 'Không được nhập quá 20 ký tự!')
        .min(5, 'Bạn phải nhập trên 5 kí tự!'),
    email: Yup.string().required("Vui lòng nhập email!").email("Vui lòng nhập đúng định dạng email!"),
})

const EditCustomer = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { dataCustomer, handleGetDataDetailCustomer } = useGetDetailCustomer(id)

    const { token } = useAuth();

    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control }
        = useForm({ resolver: yupResolver(schemaValidate), mode: 'onBlur' })

    const onSubmitHandle = async ({ user_name, ...values }) => {
        try {
            if (isValid && token && id) {
                const customer = await adminService.updateCustomer(token, id, values)
                if (customer) {
                    toast.success(customer.message)
                    navigate('/admin/list-customer')
                } else {
                    toast.error(customer.message || "Có lỗi xảy ra!")
                }
            }
        } catch (error) {
            toast.error(error.response.data.message || "Có lỗi xảy ra!")
            console.log(error);
            return
        }
    }
    useEffect(() => {
        handleGetDataDetailCustomer()
    }, [dataCustomer]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandle)} className='p-5 w-[1280px]'>
                <Heading className={'text-4xl text-gray-700'}>Chỉnh sửa người dùng</Heading>
                <div className='grid grid-cols-3 gap-x-16 mb-16'>
                    <Input
                        control={control}
                        name={'user_name'}
                        errors={errors}
                        type={'text'}
                        value={dataCustomer.user_name}
                        key={dataCustomer.user_name}
                        disabled
                        lable={'Tài khoản'}></Input>
                    <Input
                        control={control}
                        name={'full_name'}
                        errors={errors}
                        type={'text'}
                        value={dataCustomer.full_name}
                        key={dataCustomer.full_name}
                        lable={'Họ và tên'}></Input>
                    <div className='row-span-2'>
                        <FileInput
                            oldImage={dataCustomer.image}
                            key={dataCustomer.image}
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
                        key={dataCustomer.email}
                        lable={'Email'}></Input>
                    <Input
                        control={control}
                        name={'address'}
                        errors={errors}
                        type={'text'}
                        value={dataCustomer.address}
                        key={dataCustomer.address}
                        lable={'Địa chỉ'}></Input>
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

export default EditCustomer;

