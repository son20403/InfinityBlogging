import { useEffect, useState } from "react";
import PostService from "../services/post";
const postService = new PostService()

export default function useGetSearchPost(key) {
    const [dataSearchPost, setDataSearchPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetDataSearchPost = async (key) => {
        setIsLoading(true)
        try {
            const data = await postService.search(key);
            if (!data) return setDataSearchPost([])
            setDataSearchPost(data.reverse())
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
    }
    useEffect(() => {
        handleGetDataSearchPost(key)
        return () => handleGetDataSearchPost(key)
    }, [key]);
    return { dataSearchPost, handleGetDataSearchPost, isLoading, setIsLoading }
}