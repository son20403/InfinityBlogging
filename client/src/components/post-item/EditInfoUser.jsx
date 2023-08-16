import React, { useEffect } from 'react';
import { FileInput, Input } from '../input';
import { Button } from '../button';
import ModalAdvanced from '../modal/ModalAdvanced';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { toast } from 'react-toastify';

import CustomerService from '../../services/customer';
import { useAuth } from '../../contexts/authContext';
import useGetDetailCustomer from '../../hooks/useGetDetailCustomer';

const schemaValidate = Yup.object().shape({
    address: Yup.string().required("Vui lòng nhập địa chỉ!"),
    image: Yup.mixed(),
    full_name: Yup.string().required("Vui lòng nhập họ và tên!")
        .max(20, 'Không được nhập quá 20 ký tự!')
        .min(5, 'Bạn phải nhập trên 5 kí tự!'),
    email: Yup.string().required("Vui lòng nhập email!").email("Vui lòng nhập đúng định dạng email!"),
})

const customerService = new CustomerService()
const EditInfoUser = ({ show, setShow = () => { }, id, setInfoCustomer = () => { } }) => {
    const { dataCustomer, handleGetDataDetailCustomer } = useGetDetailCustomer(id)

    const { token, setInfo } = useAuth();

    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control }
        = useForm({ resolver: yupResolver(schemaValidate), mode: 'onBlur' })

    const onSubmitHandle = async ({ user_name, ...values }) => {
        try {
            if (isValid && token) {
                const customer = await customerService.updateCustomer(token, values)
                if (customer) {
                    setInfo(customer.others)
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
        setShow(false)
        setInfoCustomer()
    }
    useEffect(() => {
        handleGetDataDetailCustomer()
    }, [dataCustomer]);

    return (
        <>
            <ModalAdvanced visible={show} onClose={() => setShow(false)}>
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
                                oldImage={dataCustomer.image}
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

export default EditInfoUser;