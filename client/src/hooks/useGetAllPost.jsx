import { useEffect, useState } from "react";
import PostService from "../services/post";
const postService = new PostService()

export default function useGetAllPost() {
    const [dataPost, setDataPost] = useState([]);
    const handleGetDataPost = async () => {
        const data = await postService.getAll();
        if (!data) return setDataPost([])
        setDataPost(data)
    }
    useEffect(() => {
        handleGetDataPost()
    }, []);
    return { dataPost }
}