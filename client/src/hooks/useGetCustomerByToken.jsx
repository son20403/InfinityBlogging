import { useEffect, useState } from "react";
import AuthService from "../services/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const authService = new AuthService()

export default function useGetCustomerByToken(token) {
    const navigate = useNavigate();
    const [dataCustomerByToken, setDataCustomerByToken] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetDataCustomer = async () => {
        setIsLoading(true)
        try {
            const data = await authService.getDataCustomer(token);
            if (!data) return setDataCustomerByToken([])
            setDataCustomerByToken(data)
        } catch (error) {
            console.log(error);
            navigate('/not-found')
        }
        setIsLoading(false)
    }
    useEffect(() => {
        handleGetDataCustomer()
        return () => handleGetDataCustomer()
    }, []);
    return { dataCustomerByToken, handleGetDataCustomer, isLoading }
}