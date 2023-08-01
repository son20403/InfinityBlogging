import { useEffect, useState } from "react";
import CategoryService from "../services/category";
const categoryService = new CategoryService()

export default function useGetDetailCategory(id) {
    const [dataCategory, setDataCategory] = useState([]);
    const handleGetDetailCategory = async (id) => {
        const data = await categoryService.detailCategory(id);
        if (!data) return setDataCategory([])
        setDataCategory(data)
    }
    useEffect(() => {
        handleGetDetailCategory(id)
    }, [id]);
    return { dataCategory }
}