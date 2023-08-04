import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from "yup";
import { Input } from '../components/input';
import HeaderForm from '../components/header-form/HeaderForm';
import { EyeIconClose, EyeIconOpen } from '../components/icon';
import { Button } from '../components/button';
import { toast } from 'react-toastify';
import AuthService from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
const authService = new AuthService()

const schemaValidate = Yup.object({
    user_name: Yup.string().required("Vui lòng nhập tên đăng nhập!")
        .max(20, "Tên tài khoản không được dài quá 20 ký tự")
        .min(6, 'Tên đăng nhập phải lớn hơn 6 kí tự'),
    full_name: Yup.string().required("Vui lòng nhập họ và tên nhập!")
        .max(22, "Tên không dài quá 23 ký tự")
        .min(6, 'Tên đăng nhập phải lớn hơn 6 kí tự'),
    password: Yup.string()
        .required("Vui lòng nhập mật khẩu!")
        .min(6, 'Mật khẩu có ít nhất 8 ký tự!')
        .max(20, "Mật khẩu không được dài quá 20 ký tự")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Mật khẩu cần có ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 số và 1 ký tự đặt biệt!'),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp vui lòng nhập lại!'),
    email: Yup.string().required("Vui lòng nhập email!").email("Vui lòng nhập đúng định dạng email!"),
})

const Signup = () => {
    const { token } = useAuth()
    const navigate = useNavigate();
    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onBlur', })
    const onSubmitHandle = async (values) => {
        try {
            if (isValid) {
                const auth = await authService.register(values)
                if (auth) {
                    toast.success(auth.message)
                    navigate('/signin')
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
    useEffect(() => {
        if (token) {
            toast.error("Bạn đã đăng nhập!", { pauseOnHover: false })
            navigate('/');
        }
    }, [token, navigate]);
    return (
        <div className='p-5 max-w-[780px] mx-auto my-5 rounded-lg'>
            <HeaderForm>Đăng ký</HeaderForm>
            <form onSubmit={handleSubmit(onSubmitHandle)} className='p-5'>
                <Input
                    control={control}
                    name={'user_name'}
                    errors={errors}
                    type={'text'}
                    lable={'Tài khoản'}></Input>
                <Input
                    control={control}
                    name={'full_name'}
                    errors={errors}
                    type={'text'}
                    lable={'Họ và tên'}></Input>
                <Input
                    control={control}
                    name={'password'}
                    errors={errors}
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
                    type={toggleShowPasswordConfirmation ? 'text' : 'password'}
                    lable={'Nhập lại mật khẩu'}>
                    {
                        !toggleShowPasswordConfirmation ?
                            <EyeIconClose onClick={() => setToggleShowPasswordConfirmation(true)}></EyeIconClose> :
                            <EyeIconOpen onClick={() => setToggleShowPasswordConfirmation(false)}></EyeIconOpen>
                    }
                </Input>
                <Input
                    control={control}
                    name={'email'}
                    errors={errors}
                    type={'email'}
                    lable={'Email'}></Input>

                <Button style={{
                    maxWidth: 300,
                    margin: '0 auto'
                }} type='submit' isLoading={isSubmitting} disabled={isSubmitting}>
                    Đăng ký
                </Button>
            </form>
        </div>
    );
};

export default Signup;