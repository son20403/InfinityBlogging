import { useEffect, useState } from "react";
import CommentService from "../services/comment";
import { useNavigate } from "react-router-dom";
const commentService = new CommentService()

export default function useGetAllCommentByPost(id) {
    const navigate = useNavigate();
    const [dataCommentByPost, setDataCommentByPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetDataCommentByPost = async () => {
        setIsLoading(true)
        try {
            if (id) {
                const data = await commentService.getCommentByPost(id);
                if (!data) return setDataCommentByPost([])
                setDataCommentByPost(data.reverse())
            } else {
                return setDataCommentByPost([])
            }
        } catch (error) {
            console.log(error)
            // navigate('/*')
        }
        setIsLoading(false)
    }
    useEffect(() => {
        handleGetDataCommentByPost()
    }, [id]);
    return { dataCommentByPost, handleGetDataCommentByPost, isLoading }
}