import { useEffect, useState } from "react";
import PostService from "../services/post";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const postService = new PostService()

export default function useGetDetailPost(slug) {

    const navigate = useNavigate();
    const [dataDetailPost, setDataPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleGetDetailPost = async () => {
        setIsLoading(true)
        try {
            if (slug) {
                const data = await postService.detail(slug || '');
                if (!data) return setDataPost([])
                setDataPost(data)
            } else {
                return setDataPost([])
            }
        } catch (error) {
            console.log(error);
            navigate('/not-found')
        }
        setIsLoading(false)
    }
    useEffect(() => {
        handleGetDetailPost()
        return () => handleGetDetailPost()
    }, [slug]);
    return { dataDetailPost, isLoading, handleGetDetailPost }
}