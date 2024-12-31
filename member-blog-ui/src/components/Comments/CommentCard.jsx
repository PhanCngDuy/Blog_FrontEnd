import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { calculateTimeDifference } from '../Time/time';
import CommentInput from './CommentInput';
import useAxiosJwt from '~/Hook/useAxiosjwt';
import { isLoading, isNotLoading } from '~/redux/slice/LoadingSlice';
import { useSelector } from 'react-redux';
import { getUserId } from '~/redux/selector/AuthSelector';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function CommentCard({ comment, setComments, depth = 0, postId, fetchComment }) {
    const [isLike, setIsLike] = useState(false);
    const [isOpenInput, setIsOpenInput] = useState(false);

    const [commentInput, setCommentInput] = useState('');
    const { getAxiosJwt, dispatch } = useAxiosJwt();
    const userId = useSelector(getUserId);

    const postComment = async (data) => {
        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            dispatch(isLoading());
            try {
                const res = await axiosJwt.post(`${import.meta.env.VITE_API_URL}/api/v1/comment`, data);
                if (!res.data.hasErrors) {
                    setComments(res.data.content);
                    setIsOpenInput(!isLike);
                    setCommentInput('');
                    dispatch(isNotLoading());
                }
            } catch (e) {
                dispatch(isNotLoading());
                console.log(e);
            }
        }
    };
    const deletedComment = async (id) => {
        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            dispatch(isLoading());
            try {
                const res = await axiosJwt.post(`${import.meta.env.VITE_API_URL}/api/v1/comment/delete/${id}`);
                if (!res.data.hasErrors) {
                    fetchComment(postId);
                    dispatch(isNotLoading());
                }
            } catch (e) {
                console.log(e);
                dispatch(isNotLoading());
            }
        }
    };
    const submitComment = () => {
        const data = {
            userId: userId,
            postId: postId,
            text: commentInput,
            parentCommentId: comment.id,
        };
        postComment(data);
    };
    return (
        <>
            {comment ? (
                <>
                    <div className={`p-6 text-base bg-white rounded-lg border-t border-gray-100 ml-${depth * 10}`}>
                        <div className="flex justify-between items-center mb-2 ">
                            <div className="flex items-center">
                                <a
                                    href={`/profile/${comment.user.id}`}
                                    className="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold"
                                >
                                    <img
                                        className="mr-2 w-8 h-8 rounded-full object-cover"
                                        src={
                                            comment?.user?.avatar
                                                ? `${import.meta.env.VITE_API_URL}/uploads/files/${comment.user.avatar}`
                                                : `https://flowbite.com/docs/images/people/profile-picture-2.jpg`
                                        }
                                        alt="Michael Gough"
                                    />
                                    {comment?.user?.displayName}
                                </a>
                                <p className="text-sm text-gray-600">{calculateTimeDifference(comment.createAt)}</p>
                            </div>

                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button>
                                        <div className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg ">
                                            <svg
                                                className="w-4 h-4"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 16 3"
                                            >
                                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                            </svg>
                                        </div>
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {userId === comment.user.id ? (
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <div
                                                            onClick={() => deletedComment(comment.id)}
                                                            className="block py-2 px-4 hover:bg-gray-100 cursor-pointer"
                                                        >
                                                            Delete
                                                        </div>
                                                    )}
                                                </Menu.Item>
                                            ) : (
                                                <></>
                                            )}
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a href="#" className="block py-2 px-4 hover:bg-gray-100 ">
                                                        Report
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                        <p className="text-gray-500">{comment.text}</p>
                        <div className="flex items-center mt-4 space-x-4">
                            <button
                                type="button"
                                className="flex items-center text-sm gap-2 text-gray-500 hover:underline font-medium"
                                onClick={() => setIsLike(!isLike)}
                            >
                                {isLike ? (
                                    <>
                                        <FaHeart size={18} />
                                        <p>Like</p>
                                    </>
                                ) : (
                                    <>
                                        <FaRegHeart size={18} />
                                        <p className="">Like</p>
                                    </>
                                )}
                            </button>
                            <button
                                onClick={() => setIsOpenInput(!isOpenInput)}
                                className="flex items-center gap-2 text-sm text-gray-500 hover:underline font-medium"
                            >
                                <IoChatboxEllipsesOutline size={18} />
                                <p>{comment?.childComments?.length > 0 ? comment?.childComments?.length : ''} Reply</p>
                            </button>
                        </div>
                        {isOpenInput ? (
                            <CommentInput
                                comment={commentInput}
                                setComment={setCommentInput}
                                submitComment={submitComment}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                    {comment?.childComments && comment?.childComments?.length > 0 && (
                        <>
                            {comment.childComments.map((childComment) => (
                                <CommentCard
                                    key={childComment.id}
                                    comment={childComment}
                                    setComments={setComments}
                                    depth={depth + 1}
                                    postId={postId}
                                    fetchComment={fetchComment}
                                />
                            ))}
                        </>
                    )}
                </>
            ) : (
                <></>
            )}
        </>
    );
}

export default CommentCard;
