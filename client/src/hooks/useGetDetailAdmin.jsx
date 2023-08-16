import { useEffect, useState } from "react";
import CustomerService from "../services/customer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import adminService from "../services/admin";
export default function useGetDetailAdmin(id) {
    const navigate = useNavigate();
    const [dataAdmin, setDataAdmin] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetDataDetailAdmin = async () => {
        setIsLoading(true)
        try {
            if (id) {
                const data = await adminService.getDetailAdmin(id);
                if (!data) return setDataAdmin([])
                setDataAdmin(data)
            } else {
                return setDataAdmin([])
            }
        } catch (error) {
            console.log(error);
            // toast.error("Có lỗi xảy ra khi lấy người dùng!")
            navigate('/not-found')
        }
        setIsLoading(false)
    }
    useEffect(() => {
        handleGetDataDetailAdmin()
    }, [id]);
    return { dataAdmin, handleGetDataDetailAdmin, isLoading }
}