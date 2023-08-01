import { useEffect, useState } from "react";
import PostService from "../services/post";
const postService = new PostService()

export default function useGetDetailPost(id) {
    const [dataDetailPost, setDataPost] = useState([]);
    const handleGetDetailPost = async (id) => {
        const data = await postService.detail(id || '');
        if (!data) return setDataPost([])
        setDataPost(data)
    }
    useEffect(() => {
        handleGetDetailPost(id)
    }, [id]);
    return { dataDetailPost }
}