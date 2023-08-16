import React, { useEffect, useState } from 'react';
import { Radio } from "@material-tailwind/react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { FileInput, Input } from '../../components/input';
import { Button } from '../../components/button';
import { Heading } from '../../components/text';
import { EyeIconClose, EyeIconOpen } from '../../components/icon';
import adminService from '../../services/admin';


const schemaValidate = Yup.object().shape({
    user_name: Yup.string().required("Vui lòng nhập tên đăng nhập!")
        .max(20, "Tên tài khoản không được dài quá 20 ký tự")
        .min(6, 'Tên đăng nhập phải lớn hơn 6 kí tự'),
    full_name: Yup.string().required("Vui lòng nhập họ và tên nhập!")
        .max(22, "Tên không dài quá 23 ký tự")
        .min(6, 'Tên đăng nhập phải lớn hơn 6 kí tự'),
    image: Yup.mixed(),
    password: Yup.string()
        .required("Vui lòng nhập mật khẩu!")
        .min(6, 'Mật khẩu có ít nhất 8 ký tự!')
        .max(20, "Mật khẩu không được dài quá 20 ký tự")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Mật khẩu cần có ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 số và 1 ký tự đặt biệt!'),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp vui lòng nhập lại!'),
    email: Yup.string().required("Vui lòng nhập email!").email("Vui lòng nhập đúng định dạng email!"),
    role: Yup.string().required("Bạn có muốn phần quyền cho nhân viên này không?"),

})


const AddAdmin = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control, register, watch, setValue }
        = useForm({
            resolver: yupResolver(schemaValidate), mode: 'onBlur', defaultValues: {
                role: "staff",
            }
        })
    const onSubmitHandle = async (values) => {
        try {
            if (isValid) {
                const auth = await adminService.createAdmin(token, values)
                if (auth) {
                    toast.success(auth.message)
                    navigate('/admin/list-admin')
                    return
                } else {
                    toast.error(auth.message || "Có lỗi xảy ra!")
                }
            }
        } catch (error) {
            toast.error(error.response.data.message || "Có lỗi xảy ra!")
            console.log(error);
            return
        }
    }
    const [toggleShowPassword, setToggleShowPassword] = useState(false);
    const [toggleShowPasswordConfirmation, setToggleShowPasswordConfirmation] = useState(false);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandle)} className='p-5 w-[1280px]'>
                <Heading className={'text-4xl text-gray-700'}>Thêm người dùng</Heading>

                <div className='grid grid-cols-3 gap-x-16 mb-16'>
                    <Input
                        control={control}
                        name={'user_name'}
                        errors={errors}
                        type={'text'}
                        value=''
                        lable={'Tài khoản'}></Input>
                    <Input
                        control={control}
                        name={'full_name'}
                        errors={errors}
                        type={'text'}
                        value=''
                        lable={'Họ và tên'}></Input>
                    <div className='row-span-3'>
                        <FileInput
                            oldImage={''}
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
                        value={''}
                        lable={'Email'}></Input>
                    <Input
                        control={control}
                        name={'address'}
                        errors={errors}
                        type={'text'}
                        value={''}
                        lable={'Địa chỉ'}></Input>

                    <Input
                        control={control}
                        name={'password'}
                        errors={errors}
                        value={''}
                        type={toggleShowPassword ? 'text' : 'password'}
                        lable={'Mật khẩu'}
                    >
                        {
                            !toggleShowPassword ?
                                <EyeIconClose onClick={() => setToggleShowPassword(true)}></EyeIconClose> :
                                <EyeIconOpen onClick={() => setToggleShowPassword(false)}></EyeIconOpen>
                        }
                    </Input>

                    <Input
                        control={control}
                        name={'password_confirmation'}
                        errors={errors}
                        value={''}
                        type={toggleShowPasswordConfirmation ? 'text' : 'password'}
                        lable={'Nhập lại mật khẩu'}
                    >
                        {
                            !toggleShowPasswordConfirmation ?
                                <EyeIconClose onClick={() => setToggleShowPasswordConfirmation(true)}></EyeIconClose> :
                                <EyeIconOpen onClick={() => setToggleShowPasswordConfirmation(false)}></EyeIconOpen>
                        }
                    </Input>
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
                    Thêm người dùng
                </Button>
            </form>
        </>
    );
};

export default AddAdmin;

