import { useEffect, useState } from "react";
import PostService from "../services/post";
const postService = new PostService()

export default function useGetAllPost() {
    const [dataPost, setDataPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetDataPost = async () => {
        setIsLoading(true)
        try {
            const data = await postService.getAll();
            if (!data) return setDataPost([])
            setDataPost(data.reverse())
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
    }
    useEffect(() => {
        handleGetDataPost()
    }, []);
    return { dataPost, handleGetDataPost, isLoading }
}