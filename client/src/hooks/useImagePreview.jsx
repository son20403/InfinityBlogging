import { useState, useRef, useEffect } from 'react';
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
                fileInputRef.current.files = null;
            return;
        }
        if (file) {
            setPreview(URL.createObjectURL(e.target.files[0]))
        }
    };
    const clearPreview = () => {
        if (preview) {
            URL.revokeObjectURL(preview);
        }
        setPreview(null);
        if (fileInputRef.current)
            fileInputRef.current.value = null;
    };

    useEffect(() => () => URL.revokeObjectURL(preview), [preview])

    return { preview, handleFileChange, clearPreview, fileInputRef };
}

export default useImagePreview;
// const fileReader = new FileReader();
// fileReader.readAsDataURL(file);

// fileReader.onload = function () {
//     const url = fileReader.result;
//     setPreview(url);
// };