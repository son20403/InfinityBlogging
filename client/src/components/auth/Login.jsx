import React from 'react';

const Login = () => {
    return (
        <>
            <div className='p-5 bg-blue-charcoal max-w-[780px] mx-auto my-10 rounded-lg'>
                <div className='header flex flex-col justify-center items-center '>
                    <img src="./src/assets/infinity.png"
                        alt="" className="w-[150px] h-[130px] rounded-full overflow-hidden object-cover
                " />
                    <h1 className=' text-white font-semibold text-4xl'>Đăng Nhập</h1>
                </div>
                <form action="" className='p-5 text-white'>
                    <div className='mb-10'>
                        <label htmlFor="user_name" className='m-2 font-medium'>Tài khoản</label>
                        <input type="text" id='user_name' name='user_name'
                            className='px-5 py-3 text-sm mt-3 bg-baltic-sea w-full rounded-lg outline-none
                        focus:shadow-[0px_0px_0px_3px_rgba(58,_59,_60,_0.7)] '
                            placeholder='Tài khoản...' />
                    </div>
                    <div className='mb-10'>
                        <label htmlFor="password" className='m-2 font-medium'>Mật khẩu</label>
                        <input type="password" id='password' name='password'
                            className='px-5 py-3 text-sm mt-3 bg-baltic-sea w-full rounded-lg outline-none
                        focus:shadow-[0px_0px_0px_3px_rgba(58,_59,_60,_0.7)] '
                            placeholder='Mật khẩu...' />
                    </div>
                    <button className='text-white w-full py-3 rounded-lg font-semibold bg-[#329bf7]'>Đăng nhập</button>
                </form>
            </div>
        </>
    );
};

export default Login;