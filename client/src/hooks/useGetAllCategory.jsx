import { useEffect, useState } from "react";
import CategoryService from "../services/category";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const categoryService = new CategoryService()

export default function useGetAllCategory() {
    const navigate = useNavigate();
    const [dataCategory, setDataCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleGetDataCategory = async () => {
        setIsLoading(true)
        try {
            const data = await categoryService.getAll();
            if (!data) {
                setDataCategory([])
            }
            setDataCategory(data)
        } catch (error) {
            console.log(error);
            // toast.error("Có lỗi xảy ra khi lấy danh mục!")
            // navigate('/*')
        }
        setIsLoading(false)
    }
    useEffect(() => {
        handleGetDataCategory()
        return () => handleGetDataCategory()
    }, []);
    return { dataCategory, handleGetDataCategory, isLoading }
}
