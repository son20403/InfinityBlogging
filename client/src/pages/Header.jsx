import React, { useEffect, useState } from 'react';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ModalAdvanced from '../components/modal/ModalAdvanced';
import Avatar from '../components/post-item/Avatar';
import UserSetting from '../components/dropdown/UserSetting';
import { useAuth } from '../contexts/authContext';
import { toast } from 'react-toastify';
import PostService from '../services/post';
import FormSearch from '../components/post-item/FormSearch';

const postService = new PostService()

const listNav = [
    {
        id: 1,
        to: '/',
        title: 'Trang chủ'
    },
    {
        id: 2,
        to: '/list-all-post?query=',
        title: 'Bài viết'
    },
    {
        id: 3,
        to: '/category',
        title: 'Thể loại'
    },
    {
        id: 4,
        to: '/about',
        title: 'Giới thiệu'
    },
    {
        id: 5,
        to: '/contact',
        title: 'Liên hệ'
    },
]
const Header = () => {
    const navigate = useNavigate();

    const [openSearch, setOpenSearch] = useState(false);
    const { token, info, setAccessToken, setInfo, deleteToken, deleteInfo } = useAuth();
    console.log("🚀 ~ file: Header.jsx:47 ~ Header ~ token:", token)
    const logOut = () => {
        setAccessToken('')
        setInfo('')
        deleteToken()
        deleteInfo()
    }
    const handleLogout = () => {
        logOut()
        toast.success("Đăng xuất thành công!", { pauseOnHover: false })
    }
    const handleGetDataPost = async () => {
        try {
            const data = await postService.getAll();
            if (!data || data.length < 1) return navigate('/*')
        } catch (error) {
            console.log(error);
            navigate('/not-found')
        }
    }

    useEffect(() => {
        handleGetDataPost()
        if (!token) {
            logOut()
        }
    }, [token]);
    return (
        <>
            <header className=' page-container flex justify-between items-center py-4 border-b'>
                <Link to={'/'} className=' mr-[67px] flex items-center gap-5'>
                    <img src="../src/assets/infinity.png"
                        alt="" className="w-16 h-14 rounded-full overflow-hidden object-cover
                        " />
                    <p className="uppercase font-bold text-xl">Infinity Blogging</p>
                </Link>
                <div className='flex-1 flex gap-x-10 items-center'>
                    {listNav.map(nav => (
                        <NavLink key={nav.id}
                            className={({ isActive }) => (isActive ? "text-red-500" : "")} to={nav.to}>{nav.title}</NavLink>
                    ))}
                </div>
                <div className='flex gap-x-10 items-center'>
                    <div className='cursor-pointer' onClick={() => setOpenSearch(true)}>
                        <label htmlFor='input-search'><FontAwesomeIcon icon={faMagnifyingGlass} /></label>
                    </div>
                    <UserSetting isUser={token ? true : false} onClick={handleLogout}>
                        {token ?
                            <Avatar urlImage={info?.image}></Avatar>
                            :
                            <Avatar></Avatar>
                        }
                    </UserSetting>
                </div>
            </header>
            <ModalAdvanced visible={openSearch} onClose={() => setOpenSearch(false)}>
                <div className='w-[800px]'>
                    <FormSearch setOpenSearch={() => setOpenSearch(false)}></FormSearch>
                </div>
            </ModalAdvanced>
        </>
    );
};


export default Header;