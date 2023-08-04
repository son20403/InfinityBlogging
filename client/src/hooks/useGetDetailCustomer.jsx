import { useEffect, useState } from "react";
import CustomerService from "../services/customer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const customerService = new CustomerService()
export default function useGetDetailCustomer(id) {
    const navigate = useNavigate();
    const [dataCustomer, setDataCustomer] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetDataCustomer = async () => {
        setIsLoading(true)
        try {
            if (id) {
                const data = await customerService.detailCustomer(id);
                if (!data) return setDataCustomer([])
                setDataCustomer(data)
            } else {
                return setDataCustomer([])
            }
        } catch (error) {
            console.log(error);
            // toast.error("Có lỗi xảy ra khi lấy người dùng!")
            // navigate('/*')
        }
        setIsLoading(false)
    }
    useEffect(() => {
        handleGetDataCustomer()
        return () => handleGetDataCustomer()
    }, [id]);
    return { dataCustomer, handleGetDataCustomer, isLoading }
}