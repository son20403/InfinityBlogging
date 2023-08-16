import { createContext, useContext } from "react";
import useCookie from "../hooks/useCookie";
import useLocalStorage from "../hooks/useLocalStrorage";

const AuthContext = createContext();
const AuthProvider = ({ model = 'tokenUser', infoModel = 'infoUser', ...props }) => {
    const {
        cookie: token,
        setCookie: setAccessToken,
        deleteCookie: deleteToken
    } = useCookie(model)
    const {
        storedValue: info,
        setValue: setInfo,
        removeValue: deleteInfo
    } = useLocalStorage(infoModel);

    const values = { token, info, setAccessToken, setInfo, deleteToken, deleteInfo }
    return <AuthContext.Provider value={values} {...props}></AuthContext.Provider>
}
const useAuth = () => {
    const context = useContext(AuthContext);
    if (typeof context === 'undefined') throw new Error('useAuth must be used within AuthProvider')
    return context
}
export { useAuth, AuthProvider }