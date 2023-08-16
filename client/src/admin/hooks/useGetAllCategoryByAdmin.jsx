import { useEffect, useState } from "react";
import adminService from "../../services/admin";

export default function useGetAllCategoryByAdmin(token) {
    const [dataCategory, setDataCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetDataCategory = async () => {
        setIsLoading(true)
        try {
            const data = await adminService.getAllCategoryByAdmin(token);
            if (!data) return setDataCategory([])
            setDataCategory(data.reverse())
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
    }
    useEffect(() => {
        handleGetDataCategory()
    }, []);
    return { dataCategory, handleGetDataCategory, isLoading }
}