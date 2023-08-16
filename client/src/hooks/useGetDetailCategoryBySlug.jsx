import { useEffect, useState } from "react";
import CategoryService from "../services/category";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const categoryService = new CategoryService()

export default function useGetDetailCategoryBySlug(slug) {

    const navigate = useNavigate();
    const [dataCategoryBySlug, setDataCategoryBySlug] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleGetDetailCategoryBySlug = async () => {
        setIsLoading(true)
        try {
            if (slug) {
                const data = await categoryService.detailCategoryBySlug(slug);
                if (!data) return setDataCategoryBySlug([])
                setDataCategoryBySlug(data)
            } else {
                return setDataCategoryBySlug([])
            }
        } catch (error) {
            console.log(error);
            // toast.error("Có lỗi xảy ra khi lấy danh mục!")
            navigate('/not-found')
        }
        setIsLoading(false)
    }
    useEffect(() => {
        handleGetDetailCategoryBySlug()
    }, [slug]);
    return { dataCategoryBySlug, isLoading }
}