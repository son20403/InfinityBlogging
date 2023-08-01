import { useState } from 'react';

function useCookie(cookieName) {
    const getCookie = () => {
        const cookiePair = document.cookie.split('; ').find(row => row.startsWith(cookieName));
        return cookiePair ? cookiePair.split('=')[1] : null;
    }
    const [cookie, setCookieState] = useState(getCookie);

    const setCookie = (value, days = 1) => {
        const d = new Date();
        d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = "expires=" + d.toUTCString();
        document.cookie = `${cookieName}=${value};${expires};path=/`;
        setCookieState(value);
    }

    const deleteCookie = () => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        setCookieState(null);
    }

    return { cookie, setCookie, deleteCookie };
}

export default useCookie;
