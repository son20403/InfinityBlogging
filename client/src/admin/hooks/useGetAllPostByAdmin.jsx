import { useEffect, useState } from "react";
import adminService from "../../services/admin";

export default function useGetAllPostByAdmin(token) {
    const [dataPost, setDataPost] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetDataPost = async () => {
        setIsLoading(true)
        try {
            const data = await adminService.getAllPostByAdmin(token);
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