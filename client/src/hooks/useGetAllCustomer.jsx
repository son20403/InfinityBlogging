import { useEffect, useState } from "react";
import CustomerService from "../services/customer";
const customerService = new CustomerService()

export default function useGetAllCustomer() {
    const [dataCustomer, setDataCustomer] = useState([]);
    const handleGetDataCustomer = async () => {
        const data = await customerService.getAll();
        if (!data) return setDataCustomer([])
        setDataCustomer(data)
    }
    useEffect(() => {
        handleGetDataCustomer()
    }, []);
    return { dataCustomer }
}