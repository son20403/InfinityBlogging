import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import useGetDetailCustomer from '../../hooks/useGetDetailCustomer';
import Pagination from '../../components/post-item/Pagination';
import ModalAdvanced from '../../components/modal/ModalAdvanced';
import { Button } from '@material-tailwind/react';
import adminService from '../../services/admin';
import { useAuth } from '../../contexts/authContext';
import { toast } from 'react-toastify';
import useGetAllCategoryByAdmin from '../hooks/useGetAllCategoryByAdmin';
import { Title } from '../../components/text';
import CustomerService from '../../services/customer';
const customerService = new CustomerService()
const ListCategory = () => {
    const navigate = useNavigate();
    const { token } = useAuth()
    const { dataCategory, handleGetDataCategory } = useGetAllCategoryByAdmin(token)
    const [currentPage, setCurrentPage] = useState(1);

    const [filterStatus, setFilterStatus] = useState(null);

    const filteredCategories = dataCategory.filter(post => {
        if (!filterStatus) return true;
        return post.status === filterStatus;
    });

    const postsPerPage = 4;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentCategory = filteredCategories?.slice(indexOfFirstPost, indexOfLastPost);
    useEffect(() => {
        // navigate('/admin/login')
        setCurrentPage(1)
    }, [filterStatus]);
    return (
        <>
            <div className=' m-5 p-5 rounded-lg shadow-lg w-full h-full min-h-[calc(100vh-2rem)] border'>
                <h1 className='text-center text-3xl font-bold mb-10'>Danh sách các danh mục</h1>
                <div className='flex items-center justify-between mx-10'>
                    <div className='flex-1'>
                        <Pagination currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            dataPost={filteredCategories} postsPerPage={postsPerPage} />
                    </div>
                    <div className='flex gap-5 items-center'>
                        <ButtonFiller filterStatus={filterStatus} statusValue={null}
                            onClick={() => setFilterStatus(null)}>Tất cả</ButtonFiller>
                        <ButtonFiller filterStatus={filterStatus} statusValue="pending"
                            onClick={() => setFilterStatus('pending')}>Chưa duyệt</ButtonFiller>
                        <ButtonFiller filterStatus={filterStatus} statusValue="approved"
                            onClick={() => setFilterStatus('approved')}>Đã duyệt</ButtonFiller>
                    </div>
                </div>
                <div className=' m-5 p-5 w-auto h-full border'>
                    <div className='grid grid-cols-7 gap-x-5 text-center items-center mb-10 border-b pb-3'>
                        <span className='col-span-2 text-start'>Tên danh mục</span>
                        <span>Tác giả</span>
                        <span className='col-span-2'>Ngày tạo</span>
                        <span>Trạng thái</span>
                        <span className='col-span-1'>Action</span>
                    </div>
                    {currentCategory.length > 0 ? currentCategory?.map((category) => (
                        <CategoryItem key={category._id} data={category}
                            handleGetDataCategory={handleGetDataCategory}></CategoryItem>
                    )) : <Title className={' text-center col-span-3 font-bold text-xl text-red-500 '}>
                        Chưa có danh mục nào</Title>}
                </div>

            </div>
        </>
    );
};
const ButtonFiller = ({ onClick, children, filterStatus, statusValue }) => {
    const isSelected = filterStatus === statusValue;
    const buttonClass = isSelected ? 'bg-[#2693f6] text-white' : 'bg-white focus:bg-[#2693f6] focus:text-white';
    return (
        <button
            className={`rounded-lg outline-none px-3 py-2 transition-all border-[#2693f6] border text-sm font-body 
                ${buttonClass}`} onClick={onClick}>{children}</button>
    );
};


const CategoryItem = ({ data, handleGetDataCategory }) => {
    const { token } = useAuth()
    const navigate = useNavigate();
    const [openEditStatus, setOpenEditStatus] = useState(false);
    const [openDeleteCategory, setDeleteCategory] = useState(false);
    const isPending = data.status === 'pending'
    const [author, setAuthor] = useState({});
    const handleGetDataAuthor = async () => {
        if (data.authorType === 'admin') {
            const dataAdmin = await adminService.getDetailAdmin(data.id_customer);
            setAuthor(dataAdmin)
        } else {
            const dataCustomer = await customerService.detailCustomer(data.id_customer);
            setAuthor(dataCustomer)
        }
    }
    useEffect(() => {
        handleGetDataAuthor()
    }, []);

    const handleEditCategory = (slug) => {
        navigate(`/admin/edit-category/${slug}`)
    }
    const handleEditStatus = () => {
        if (isPending)
            setOpenEditStatus(true)
        else return
    }
    const closeEditStatus = () => {
        setOpenEditStatus(false)
    }

    const handleUpdateStatus = async (id, model, status) => {
        try {
            const updatedStatus = await adminService.updateStatus(token, id, model, { status: status })
            toast.success(updatedStatus.message)
            handleGetDataCategory()
            setOpenEditStatus(false)
        } catch (error) {
            console.log(error);
        }
    }
    const handleDeletePost = async (id) => {
        try {
            const updatedStatus = await adminService.deleteCategory(token, id)
            toast.success(updatedStatus.message)
            handleGetDataCategory()
            setOpenEditStatus(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='grid grid-cols-7 gap-x-5 mt-5 pb-5 items-center
                        text-center border-b last:border-none text-sm'>
                <div className='col-span-2 flex gap-x-5 items-center'>
                    <h1 className=' text-start font-medium text-base'>{data.title}</h1>
                </div>
                <div className='font-semibold text-gray-800'>
                    {author.full_name}
                    <p className={` ${data.authorType === 'admin' ? ' text-red-500' : ' text-blue-500'}`}>
                        ({data.authorType === 'admin' ? 'ADMIN' : 'Người dùng'})</p></div>
                <p className=' font-semibold text-cyan-700 col-span-2'>{data.date}</p>
                <Button
                    onClick={handleEditStatus}
                    className={`cursor-pointer bg-white border border-[#2693f6] 
                    ${isPending ? 'text-red-500' : 'text-green-500'}`}>
                    {isPending ? 'Chưa duyệt' : 'Đã duyệt'}
                </Button>
                <div className='col-span-1 flex items-center justify-center gap-x-5'>
                    <FontAwesomeIcon className='text-green-700 cursor-pointer'
                        onClick={() => handleEditCategory(data.slug)} icon={faPenToSquare} />
                    <FontAwesomeIcon
                        onClick={() => setDeleteCategory(true)}
                        className='text-red-700 cursor-pointer' icon={faTrash} />
                </div>
            </div>
            <ModalAdvanced visible={openEditStatus} onClose={() => setOpenEditStatus(false)} heading='Search'>
                <div className=' flex flex-col justify-center items-center gap-5'>
                    <h1 className=' font-bold text-xl'>{data.title}</h1>
                    <h1 className='font-semibold text-sm'>Bạn có muốn duyệt danh mục này không?</h1>
                    <div className='inline-flex justify-center w-full items-center gap-x-5'>
                        <Button onClick={() => handleUpdateStatus(data._id, 'category', 'approved')}
                            className='bg-green-500 flex-1 max-w-[150px]'>Có</Button>
                        <Button onClick={closeEditStatus} className='bg-red-500 flex-1 max-w-[150px] '>Không</Button>
                    </div>
                </div>
            </ModalAdvanced>
            <ModalAdvanced visible={openDeleteCategory} onClose={() => setDeleteCategory(false)} heading='Search'>
                <div className=' flex flex-col justify-center items-center gap-5 p-5'>
                    <h1 className=' font-bold text-xl'>{data.title}</h1>
                    <h1 className='font-semibold text-sm'>Bạn có muốn <span className='font-bold text-red-500'>XÓA </span>
                        danh mục này không? Nếu bạn xóa, tất cả thông tin liên quan (Bài viết, bình luận) sẽ bị xóa hết.</h1>
                    <div className='inline-flex justify-center w-full items-center gap-x-5'>
                        <Button onClick={() => handleDeletePost(data._id)}
                            className='bg-green-500 flex-1 max-w-[150px]'>Có</Button>
                        <Button onClick={() => setDeleteCategory(false)}
                            className='bg-red-500 flex-1 max-w-[150px] '>Không</Button>
                    </div>
                </div>
            </ModalAdvanced>
        </>
    )
}
export default ListCategory;
