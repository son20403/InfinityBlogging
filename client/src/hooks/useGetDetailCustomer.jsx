import { useEffect, useState } from "react";
import CustomerService from "../services/customer";
const customerService = new CustomerService()
export default function useGetDetailCustomer(id) {
    const [dataCustomer, setDataCustomer] = useState([]);
    const handleGetDataCustomer = async (id) => {
        const data = await customerService.detailCustomer(id);
        if (!data) return setDataCustomer([])
        setDataCustomer(data)
    }
    useEffect(() => {
        handleGetDataCustomer(id)
    }, [id]);
    return { dataCustomer }
}