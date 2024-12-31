import axios from 'axios';
import { useEffect, useState } from 'react';
import CommentCard from './CommentCard';
import CommentInput from './CommentInput';
import { isLoading, isNotLoading } from '~/redux/slice/LoadingSlice';
import { useSelector } from 'react-redux';
import { getUserId } from '~/redux/selector/AuthSelector';
import useAxiosJwt from '~/Hook/useAxiosjwt';

function Comments({ postId }) {
    const [commentInput, setCommentInput] = useState('');
    const [comments, setComments] = useState([]);
    const { getAxiosJwt, dispatch, navigate } = useAxiosJwt();
    const userId = useSelector(getUserId);

    const postComment = async (data) => {
        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            dispatch(isLoading());
            try {
                const res = await axiosJwt.post(`${import.meta.env.VITE_API_URL}/api/v1/comment`, data);
                if (!res.data.hasErrors) {
                    setComments(res.data.content);
                    setCommentInput('');
                    dispatch(isNotLoading());
                }
            } catch (e) {
                dispatch(isNotLoading());
                console.log(e);
            }
        }
    };
    const submitComment = () => {
        const data = {
            userId: userId,
            postId: postId,
            text: commentInput,
            parentCommentId: '',
        };
        postComment(data);
    };

    const fetchComment = async (postId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/comment`, {
                params: { postId },
            });
            if (!response.data.hasErrors) {
                setComments(response.data.content);
            }
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        if (postId) fetchComment(postId);
    }, []);

    return (
        <>
            <section className="bg-white  py-8 lg:py-16 antialiased border-gray-200 border-t mt-6">
                <div className="w-full mx-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">Discussion ({comments.length})</h2>
                    </div>
                    <CommentInput comment={commentInput} setComment={setCommentInput} submitComment={submitComment} />
                    {comments?.map((comment) => (
                        <CommentCard
                            key={comment.id}
                            comment={comment}
                            postId={postId}
                            setComments={setComments}
                            fetchComment={fetchComment}
                        />
                    ))}
                </div>
            </section>
        </>
    );
}

export default Comments;
