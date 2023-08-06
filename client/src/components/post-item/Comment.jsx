import React, { useEffect } from 'react';
import ModalAdvanced from '../modal/ModalAdvanced';
import { Input } from '../input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import Avatar from './Avatar';
import { Title } from '../text';

import { useForm } from 'react-hook-form';
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../contexts/authContext';
import { toast } from 'react-toastify';
import { getDate, getTimestamp } from '../../hooks/useGetTime';
import CommentService from '../../services/comment';
import Time from '../text/Time';
import useGetAllCommentByPost from '../../hooks/useGetAllCommentByPost';
import useGetDetailCustomer from '../../hooks/useGetDetailCustomer';
import { Link } from 'react-router-dom';
import useTimeSince from '../../hooks/useTimeSince';

const commentService = new CommentService()

const schemaValidate = Yup.object({
    content: Yup.string().required("Vui lòng nhập nội dung bình luận!"),
})

const Comment = ({ showComment, setShowComment, id_post, setTotalComment = () => { }, id_customer }) => {

    const { handleSubmit, formState: { errors, isSubmitting, isValid }, control, reset } =
        useForm({ resolver: yupResolver(schemaValidate), mode: 'onSubmit', });

    const { token } = useAuth()
    const { dataCommentByPost, handleGetDataCommentByPost } = useGetAllCommentByPost(id_post)

    const handleSubmitFormComment = async (values) => {
        const date = getDate()
        const timestamps = getTimestamp()
        const comment = { ...values, date, timestamps, id_post }
        try {
            if (isValid) {
                const commentData = await commentService.create(token, comment)
                if (commentData) {
                    toast.success(commentData.message)
                    reset({ content: '' })
                    handleGetDataCommentByPost()
                    return
                } else {
                    toast.error(commentData.message)
                }
            }
        } catch (error) {
            toast.error(error.response.data.message)
            if (!error.response.data.message) {
                toast.error("Bạn cần đăng nhập để thực hiện chức năng này")
            }
            console.log(error);
            return
        }
    }
    const totalComment = dataCommentByPost.length;
    useEffect(() => {
        setTotalComment(totalComment)
    }, [setTotalComment, totalComment]);
    return (
        <>
            <ModalAdvanced visible={showComment} onClose={() => setShowComment(false)}>
                <>
                    <div className=' w-[900px] h-[550px] flex flex-col justify-center'>
                        <form onSubmit={handleSubmit(handleSubmitFormComment)}>
                            <div className='w-full   mt-0 relative my-10'>
                                <Input lable={'Nội dung bình luận'} control={control}
                                    isSubmitting={isSubmitting}
                                    name={'content'} errors={errors}>
                                    <button
                                        disabled={isSubmitting}
                                        type='submit'
                                        className='absolute right-5 top-1/2 -translate-y-2/4'>
                                        <FontAwesomeIcon icon={faComment} /></button>
                                </Input>
                            </div>
                        </form>
                        <div className=' w-full border-t pt-5 m-auto  h-52 flex-1 overflow-y-auto overscroll-none'>
                            {dataCommentByPost && totalComment > 0 ? dataCommentByPost.map((comment) => (
                                <CommentItem key={comment._id} id_customer={id_customer} data={comment} ></CommentItem>
                            )) : (<Title className={' text-center col-span-3 font-bold text-xl text-red-500 '}>
                                Chưa có bình luận nào</Title>)}
                        </div>
                    </div>
                </>
            </ModalAdvanced >
        </>
    );
};
const CommentItem = ({ data, id_customer }) => {
    const timeSince = useTimeSince()

    const { dataCustomer } = useGetDetailCustomer(data.id_customer);
    const isAuthor = dataCustomer?._id === id_customer
    return (
        <>
            <div className='flex items-start gap-5 mb-10'>
                <Link to={`/info-user/${dataCustomer?._id}`}>
                    <Avatar urlImage={dataCustomer?.image}></Avatar>
                </Link>
                <div className='text-sm flex-1'>
                    <div className=' flex gap-10 items-center'>
                        <Link to={`/info-user/${dataCustomer?._id}`} className='flex items-center gap-x-2'>
                            <Title className={' text-lg font-bold'}>{dataCustomer?.full_name}
                            </Title>  {isAuthor && <span> (Tác giả)</span>}
                        </Link>
                        <Time>{timeSince(data.timestamps)}</Time>
                    </div>
                    {data.content}
                </div>
            </div>
        </>
    )
}
export default Comment;