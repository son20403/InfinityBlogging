import { useEffect, useState } from "react";
import PostService from "../services/post";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const postService = new PostService()

export default function useGetAllPostByCustomer(id) {
    const navigate = useNavigate();
    const [dataPostByCustomer, setDataPostByCustomer] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetDataPostByCustomer = async () => {
        setIsLoading(true)
        try {
            if (id) {
                const data = await postService.getAllPostByCustomer(id);
                if (!data) return setDataPostByCustomer([])
                setDataPostByCustomer(data.reverse())
            } else {
                return setDataPostByCustomer([])
            }
        } catch (error) {
            console.log(error);
            // toast.error("Có lỗi xảy ra khi lấy bài viết!")
            // navigate('/*')
        }
        setIsLoading(false)
    }
    useEffect(() => {
        handleGetDataPostByCustomer()
    }, [id]);
    return { dataPostByCustomer, isLoading }
}