import { useEffect, useState } from "react";
import PostService from "../services/post";
const postService = new PostService()

export default function useGetDetailPost(slug) {
    const [dataDetailPost, setDataPost] = useState([]);
    const handleGetDetailPost = async (slug) => {
        try {
            if (slug) {
                const data = await postService.detail(slug || '');
                if (!data) return setDataPost([])
                setDataPost(data)
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        handleGetDetailPost(slug)
    }, [slug]);
    return { dataDetailPost }
}