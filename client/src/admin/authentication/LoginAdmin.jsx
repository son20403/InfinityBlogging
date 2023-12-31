import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import adminService from '../../services/admin';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/authContext';
import HeaderForm from '../../components/header-form/HeaderForm';
import { Input } from '../../components/input';
import { EyeIconClose, EyeIconOpen } from '../../components/icon';
import { Button } from '../../components/button';

const schemaValidate = Yup.object({
    user_name: Yup.string().required("Vui lòng nhập tên đăng nhập!")
        .max(20, "Tên tài khoản không được dài quá 20 ký tự"),
    password: Yup.string()
        .required("Vui lòng nhập mật khẩu!")
        .min(6, 'Mật khẩu có ít nhất 8 ký tự!')
        .max(20, "Mật khẩu không được dài quá 20 ký tự")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Mật khẩu cần có ít nhất 1 ký tự in hoa, 1 ký tự thường, 1 số và 1 ký tự đặt biệt!'),
})
const LoginAdmin = () => {
    const navigate = useNavigate();

    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onBlur', });
    const { token, info, setAccessToken, setInfo, deleteToken, deleteUserInfo } = useAuth()
    const onSubmitHandle = async (values) => {
        try {
            if (isValid) {
                const auth = await adminService.login(values)
                if (auth) {
                    const { accessToken, ...info } = auth;
                    setAccessToken(accessToken)
                    setInfo(info)
                    toast.success("Đăng nhập thành công!", { pauseOnHover: false })
                    navigate('/admin');
                } else {
                    toast.error(auth.message || "Có lỗi xảy ra!", { pauseOnHover: false })
                }
            }
        } catch (error) {
            toast.error(error?.response?.data.message || "Có lỗi xảy ra!", { pauseOnHover: false })
            console.log(error);
        }
    }
    const [toggleShowPassword, setToggleShowPassword] = useState(false);
    useEffect(() => {
        if (token) {
            toast.error("Bạn đã đăng nhập!", { pauseOnHover: false })
            navigate('/admin');
        }
    }, [token, navigate]);
    return (
        <div className='p-5 max-w-[780px] w-full mx-auto my-5 rounded-lg'>
            <HeaderForm>Đăng Nhập Admin</HeaderForm>
            <form onSubmit={handleSubmit(onSubmitHandle)} className='p-5'>
                <Input
                    control={control}
                    value={''}
                    name={'user_name'}
                    errors={errors}
                    type={'text'}
                    lable={'Tài khoản'}></Input>
                <Input
                    control={control}
                    name={'password'}
                    value={''}
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
                <Button style={{
                    maxWidth: 300,
                    margin: '0 auto'
                }} type='submit' isLoading={isSubmitting} disabled={isSubmitting}>
                    Đăng nhập
                </Button>
            </form>
        </div>
    );
};

export default LoginAdmin;

