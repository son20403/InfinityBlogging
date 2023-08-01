import { createContext, useContext, useEffect, useState } from "react";
import useCookie from "../hooks/useCookie";
import useLocalStorage from "../hooks/useLocalStrorage";

const AuthContext = createContext();
const AuthProvider = (props) => {
    const {
        cookie: token,
        setCookie: setAccessToken,
        deleteCookie: deteteToken
    } = useCookie('token')
    const {
        storedValue: infoUser,
        setValue: setInfoUser,
        removeValue: deleteUserInfo
    } = useLocalStorage('userInfo');

    const values = { token, infoUser, setAccessToken, setInfoUser, deteteToken, deleteUserInfo }
    return <AuthContext.Provider value={values} {...props}></AuthContext.Provider>
}
const useAuth = () => {
    const context = useContext(AuthContext);
    if (typeof context === 'undefined') throw new Error('useAuth must be used within AuthProvider')
    return context
}
export { useAuth, AuthProvider }