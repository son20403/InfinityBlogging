import { useEffect, useState } from "react";
import CategoryService from "../services/category";
const categoryService = new CategoryService()

export default function useGetAllCategory() {
    const [dataCategory, setDataCategory] = useState([]);
    const handleGetDataCategory = async () => {
        const data = await categoryService.getAll();
        if (!data) return setDataCategory([])
        setDataCategory(data)
    }
    useEffect(() => {
        handleGetDataCategory()
    }, []);
    return { dataCategory }
}