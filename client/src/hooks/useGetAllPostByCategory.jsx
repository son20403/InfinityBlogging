import { useEffect, useState } from "react";
import PostService from "../services/post";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const postService = new PostService()

export default function useGetAllPostByCategory(id) {
    const navigate = useNavigate();
    const [dataPostByCategory, setDataPostByCatgory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetDataPostByCategory = async () => {
        setIsLoading(true)
        try {
            if (id) {
                const data = await postService.getPostByCategory(id);
                if (!data) return setDataPostByCatgory([])
                setDataPostByCatgory(data)
            } else {
                return setDataPostByCatgory([])
            }
        } catch (error) {
            console.log(error);
            // toast.error("Có lỗi xảy ra khi lấy bài viết!")
            // navigate('/*')
        }
        setIsLoading(false)
    }
    useEffect(() => {
        handleGetDataPostByCategory()
        return () => handleGetDataPostByCategory()
    }, [id]);
    return { dataPostByCategory, isLoading }
}