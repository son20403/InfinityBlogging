import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import Pagination from '../../components/post-item/Pagination';
import ModalAdvanced from '../../components/modal/ModalAdvanced';
import { Button } from '@material-tailwind/react';
import adminService from '../../services/admin';
import { useAuth } from '../../contexts/authContext';
import { toast } from 'react-toastify';
import { Title } from '../../components/text';
import useGetAllCustomer from '../../hooks/useGetAllCustomer';
const ListCustomer = () => {
    const { dataCustomer, handleGetDataCustomer } = useGetAllCustomer()
    const [currentPage, setCurrentPage] = useState(1);


    const postsPerPage = 4;
    const indexOfLastCustomer = currentPage * postsPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - postsPerPage;
    const currentCustomer = dataCustomer?.slice(indexOfFirstCustomer, indexOfLastCustomer);

    return (
        <>
            <div className=' m-5 p-5 rounded-lg shadow-lg w-full h-full min-h-[calc(100vh-2rem)] border'>
                <h1 className='text-center text-3xl font-bold mb-10'>Danh sách người dùng</h1>
                <div className='flex items-center justify-between mx-10'>
                    <div className='flex-1'>
                        <Pagination currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            dataPost={dataCustomer} postsPerPage={postsPerPage} />
                    </div>
                </div>
                <div className=' m-5 p-5 w-auto h-full border'>
                    <div className='grid grid-cols-7 gap-x-5 text-center items-center mb-10 border-b pb-3 font-bold text-gray-800'>
                        <span className='col-span-2'>Tên người dùng</span>
                        <span>Tài khoản</span>
                        <span className='col-span-2'>Email</span>
                        <span>Địa chỉ</span>
                        <span className='col-span-1'>Action</span>
                    </div>
                    {currentCustomer.length > 0 ? currentCustomer?.map((customer) => (
                        <CustomerItem key={customer._id} data={customer}
                            handleGetDataCustomer={handleGetDataCustomer}></CustomerItem>
                    )) : <Title className={' text-center col-span-3 font-bold text-xl text-red-500 '}>
                        Chưa có bài viết nào</Title>}
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


const CustomerItem = ({ data, handleGetDataCustomer }) => {
    const { token } = useAuth()
    const navigate = useNavigate();
    const [openDeleteCustomer, setDeleteCustomer] = useState(false);
    const handleEditCustomer = (id) => {
        navigate(`/admin/edit-customer/${id}`)
    }


    const handleDeleteCustomer = async (id) => {
        try {
            const updatedStatus = await adminService.deleteCustomer(token, id)
            toast.success(updatedStatus.message)
            handleGetDataCustomer()
            setDeleteCustomer(false)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
        }
    }

    return (
        <>
            <div className='grid grid-cols-7 gap-x-5 mt-5 pb-5 items-center
                        text-center border-b last:border-none text-sm'>
                <div className='col-span-2 flex gap-x-5 items-center'>
                    <img src={data.image} alt="" className='w-16 h-16 rounded-full object-cover' />
                    <h1 className=' text-start text-blue-gray-900 font-bold'>{data.full_name}</h1>
                </div>
                <div className='font-semibold text-gray-800'>
                    {data.user_name}
                </div>
                <div className='col-span-2'>
                    {data.email}
                </div>
                <div>
                    {data.address}
                </div>
                <div className='col-span-1 flex items-center justify-center gap-x-5'>
                    <FontAwesomeIcon className='text-green-700 cursor-pointer'
                        onClick={() => handleEditCustomer(data._id)} icon={faPenToSquare} />
                    <FontAwesomeIcon
                        onClick={() => setDeleteCustomer(true)}
                        className='text-red-700 cursor-pointer' icon={faTrash} />
                </div>
            </div>
            <ModalAdvanced visible={openDeleteCustomer} onClose={() => setDeleteCustomer(false)} heading='Search'>
                <div className=' flex flex-col justify-center items-center gap-5 p-5'>
                    <h1 className=' font-bold text-xl'>{data.title}</h1>
                    <h1 className='font-semibold text-sm'>Bạn có muốn <span className='font-bold text-red-500'>XÓA </span>
                        người dùng này không? Nếu bạn xóa, tất cả thông tin liên quan (bài viết, bình luận) sẽ bị xóa hết.</h1>
                    <div className='inline-flex justify-center w-full items-center gap-x-5'>
                        <Button onClick={() => handleDeleteCustomer(data._id)}
                            className='bg-green-500 flex-1 max-w-[150px]'>Có</Button>
                        <Button onClick={() => setDeleteCustomer(false)}
                            className='bg-red-500 flex-1 max-w-[150px] '>Không</Button>
                    </div>
                </div>
            </ModalAdvanced>
        </>
    )
}
export default ListCustomer;
