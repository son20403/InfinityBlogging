import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import adminService from "../services/admin";

export default function useGetAllAdmin(token) {
    const navigate = useNavigate();
    const [dataAdmin, setDataAdmin] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetDataAdmin = async () => {
        setIsLoading(true)
        try {
            const data = await adminService.getListAdmin(token);
            if (!data) return setDataAdmin([])
            setDataAdmin(data.reverse())
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
    }
    useEffect(() => {
        handleGetDataAdmin()
    }, []);
    return { dataAdmin, handleGetDataAdmin, isLoading }
}