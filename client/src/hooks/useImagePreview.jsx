import { useState, useRef } from 'react';
import { toast } from 'react-toastify';

function useImagePreview() {
    const [preview, setPreview] = useState(null);
    const [validImageTypes, setValidImageTypes] = useState(["image/gif", "image/jpeg", "image/png"]);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const files = e.target.files;
        const file = files[0];
        const fileType = file["type"];
        if (!validImageTypes.includes(fileType)) {
            setPreview(null);
            toast.error("Vui lòng chọn ảnh!")
            if (fileInputRef.current)
                fileInputRef.current.value = null;
            return;
        }
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = function () {
            const url = fileReader.result;
            setPreview(url);
        };
    };

    const clearPreview = () => {
        setPreview(null);
        if (fileInputRef.current)
            fileInputRef.current.value = null;
    };

    return { preview, handleFileChange, clearPreview, fileInputRef };
}

export default useImagePreview;
