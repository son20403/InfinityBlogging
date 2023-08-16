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
import useGetDetailAdmin from '../../hooks/useGetDetailAdmin';
import { Radio } from '@material-tailwind/react';


const schemaValidate = Yup.object().shape({
    address: Yup.string().required("Vui lòng nhập địa chỉ!"),
    image: Yup.mixed(),
    full_name: Yup.string().required("Vui lòng nhập họ và tên!")
        .max(20, 'Không được nhập quá 20 ký tự!')
        .min(5, 'Bạn phải nhập trên 5 kí tự!'),
    email: Yup.string().required("Vui lòng nhập email!").email("Vui lòng nhập đúng định dạng email!"),
    role: Yup.string().required("Bạn có muốn phần quyền cho nhân viên này không?"),
})

const EditAdmin = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { dataAdmin, handleGetDataDetailAdmin } = useGetDetailAdmin(id)

    const { token } = useAuth();

    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control, register, watch, setValue }
        = useForm({
            resolver: yupResolver(schemaValidate), mode: 'onBlur', defaultValues: {
                role: "staff",
            }
        })

    const onSubmitHandle = async ({ user_name, ...values }) => {
        try {
            if (isValid && token && id) {
                const customer = await adminService.updateAdmin(token, id, values)
                if (customer) {
                    toast.success(customer.message)
                    navigate('/admin/list-admin')
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
        handleGetDataDetailAdmin()
    }, [dataAdmin]);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandle)} className='p-5 w-[1280px]'>
                <Heading className={'text-4xl text-gray-700'}>Chỉnh sửa quản trị viên</Heading>
                <div className='grid grid-cols-3 gap-x-16 mb-16'>
                    <Input
                        control={control}
                        name={'user_name'}
                        errors={errors}
                        type={'text'}
                        value={dataAdmin.user_name}
                        key={dataAdmin.user_name}
                        disabled
                        lable={'Tài khoản'}></Input>
                    <Input
                        control={control}
                        name={'full_name'}
                        errors={errors}
                        type={'text'}
                        value={dataAdmin.full_name}
                        key={dataAdmin.full_name}
                        lable={'Họ và tên'}></Input>
                    <div className='row-span-2'>
                        <FileInput
                            oldImage={dataAdmin.image}
                            key={dataAdmin.image}
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
                        value={dataAdmin.email}
                        key={dataAdmin.email}
                        lable={'Email'}></Input>
                    <Input
                        control={control}
                        name={'address'}
                        errors={errors}
                        type={'text'}
                        value={dataAdmin.address}
                        key={dataAdmin.address}
                        lable={'Địa chỉ'}></Input>
                    <div className="flex gap-10 mt-5 items-center col-span-1">
                        <Radio
                            {...register("role")}
                            value='admin'
                            label="Quản trị viên"
                            checked={watch("role") === "admin"}
                            onChange={(e) => setValue("role", e.target.value)}
                        />
                        <Radio
                            {...register("role")}
                            value='staff'
                            label="Nhân viên"
                            checked={watch("role") === "staff"}
                            onChange={(e) => setValue("role", e.target.value)}
                        />
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

export default EditAdmin;

