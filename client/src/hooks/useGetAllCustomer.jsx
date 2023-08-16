import { useEffect, useState } from "react";
import CustomerService from "../services/customer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const customerService = new CustomerService()

export default function useGetAllCustomer() {
    const navigate = useNavigate();
    const [dataCustomer, setDataCustomer] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetDataCustomer = async () => {
        setIsLoading(true)
        try {
            const data = await customerService.getAll();
            if (!data) return setDataCustomer([])
            setDataCustomer(data)
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
    }
    useEffect(() => {
        handleGetDataCustomer()
    }, []);
    return { dataCustomer, handleGetDataCustomer, isLoading }
}