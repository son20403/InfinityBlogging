import React from 'react';
import useMousePortal from '../../hooks/useMousePortal';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBlog, faCircleInfo, faRightFromBracket, faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';


const navListNotUser = [
    {
        id: 1,
        to: '/signin',
        title: 'Đăng nhập',
        icon: faRightToBracket
    },
    {
        id: 2,
        to: '/signup',
        title: 'Đăng ký tài khoản',
        icon: faUserPlus
    },

]

const UserSetting = ({ children, onClick = () => { }, isUser }) => {
    const { infoUser } = useAuth()
    const navListHasUser = [
        {
            id: 1,
            to: `/info-user/${infoUser?._id}`,
            title: 'Thông tin cá nhân',
            icon: faCircleInfo
        },
        {
            id: 2,
            to: '/add-post',
            title: 'Thêm bài viết',
            icon: faBlog
        },
    ]
    const { coords, show, domRef, handleClick } = useMousePortal()
    return (
        <div>
            <div ref={domRef} className='relative'>
                <div onClick={handleClick} className='cursor-pointer'>
                    {children}
                </div>
                <CSSTransition
                    in={show}
                    timeout={250}
                    unmountOnExit
                    classNames='fade'
                >
                    {(status) => (
                        isUser
                            ?
                            (<SettingUserDropDown coords={coords}>
                                <div className='pb-2 border-b-2 '>
                                    {navListHasUser.map(nav => (
                                        <NavLink key={nav.id} to={nav.to}
                                            className={({ isActive }) =>
                                                (`p-4 flex items-center gap-5 ${isActive ? "text-red-500 " : ""}`)}>
                                            <FontAwesomeIcon icon={nav.icon} /> {nav.title}</NavLink>

                                    ))}
                                </div>
                                <div onClick={onClick}
                                    className="p-4 flex items-center gap-5">
                                    <FontAwesomeIcon icon={faRightFromBracket} /> Đăng xuất</div>
                            </SettingUserDropDown>)
                            :
                            (<SettingUserDropDown coords={coords}>
                                {navListNotUser.map(nav => (
                                    <NavLink key={nav.id} to={nav.to}
                                        className={({ isActive }) =>
                                            (`p-4 border-b last:border-b-0 flex items-center gap-5 ${isActive ? "text-red-500 " : ""}`)}>
                                        <FontAwesomeIcon icon={nav.icon} /> {nav.title}</NavLink>
                                ))}
                            </SettingUserDropDown>)
                    )}
                </CSSTransition>
            </div>
        </div>
    );
};
const SettingUserDropDown = ({ coords, children }) => {
    return (
        <div className="dropdown absolute bg-white w-auto min-w-[250px] inline-block  
        border -translate-x-2/4 left-1/2  transition-all duration-[250] z-[9999] 
        rounded-lg mt-1 border-cyan-400 p-2"
            style={{
                top: coords.height + window.scrollY,
            }}
        >
            {children}
        </div>
    )
}

export default UserSetting;