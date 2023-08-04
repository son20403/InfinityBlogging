import { useEffect, useState } from "react";
import CategoryService from "../services/category";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const categoryService = new CategoryService()

export default function useGetDetailCategory(id) {

    const navigate = useNavigate();
    const [dataCategory, setDataCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleGetDetailCategory = async () => {
        setIsLoading(true)
        try {
            if (id) {
                const data = await categoryService.detailCategory(id);
                if (!data) return setDataCategory([])
                setDataCategory(data)
            } else {
                return setDataCategory([])
            }
        } catch (error) {
            console.log(error);
            // toast.error("Có lỗi xảy ra khi lấy danh mục!")
            // navigate('/*')
        }
        setIsLoading(false)
    }
    useEffect(() => {
        handleGetDetailCategory()
        return () => handleGetDetailCategory()
    }, [id]);
    return { dataCategory, isLoading }
}