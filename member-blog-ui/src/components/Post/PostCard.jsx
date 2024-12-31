import { Fragment, useState } from 'react';
import { FaLongArrowAltRight, FaRegComment, FaRegHeart } from 'react-icons/fa';
import { BsBookmarks, BsBookmarksFill, BsExclamationOctagon } from 'react-icons/bs';
import { MdMoreHoriz } from 'react-icons/md';
import { GiBarbedSpear } from 'react-icons/gi';
import { RiQuillPenFill, RiQuillPenLine } from 'react-icons/ri';
import { calculateTimeDifference } from '../Time/time';
import { IoEyeSharp } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { getUserId } from '~/redux/selector/AuthSelector';
import useAxiosJwt from '~/Hook/useAxiosjwt';
import { Menu, Transition } from '@headlessui/react';
import { toast } from 'react-toastify';
import { Button, Modal } from 'flowbite-react';
import { isLoading, isNotLoading } from '~/redux/slice/LoadingSlice';
import { Link } from 'react-router-dom';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function PostCard({ post }) {
    const userId = useSelector(getUserId);
    const { user, title, coverImage, likesId, id, userBookmarks } = post;
    const [listUserIdLike, setListUserIdLike] = useState(likesId);
    const [listUserIdBookmark, setListUserIdBookmark] = useState(userBookmarks);

    const [openModal, setOpenModal] = useState(false);
    const { getAxiosJwt, dispatch } = useAxiosJwt();

    const handleLikePost = async () => {
        const data = {
            userId,
            postId: id,
        };

        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            try {
                const res = await axiosJwt.post(`${import.meta.env.VITE_API_URL}/api/v1/post/like`, data);
                if (!res.data.hasErrors) {
                    const content = res.data.content;
                    setListUserIdLike(content);
                }
            } catch (e) {
                console.log(e);
            }
        }
    };
    const handleBookmark = async () => {
        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            try {
                const res = await axiosJwt.post(`${import.meta.env.VITE_API_URL}/api/v1/post/bookmark`, {
                    userId: userId,
                    postId: id,
                });
                if (!res.data.hasErrors) {
                    const content = res.data.content;
                    setListUserIdBookmark(content);
                    if (content.includes(userId)) {
                        toast.success('Unsaved successfully.');
                    } else {
                        toast.success('Saved successfully. You can review it in the reading list.');
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }
    };
    const handleDeletePost = async () => {
        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            dispatch(isLoading());
            try {
                const res = await axiosJwt.delete(`${import.meta.env.VITE_API_URL}/api/v1/post/${post.id}`);
                if (!res.data.hasErrors) {
                    toast.success('Delete post successfully.');
                }

                dispatch(isNotLoading());
            } catch (e) {
                console.log(e);
                toast.error('Delete post failure.');
                dispatch(isNotLoading());
            }
        }
    };
    return (
        <section className="parent-section my-6 ">
            <div className="relative flex w-full max-w-[48rem] flex-col md:flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mx-auto">
                <div className="absolute top-2 right-2 acitons">
                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <Menu.Button className="inline-flex border-none justify-center gap-x-1.5  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm outline-none">
                                <MdMoreHoriz className="w-6 h-6" />
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
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
                                <div className="py-1">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <div
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm',
                                                )}
                                            >
                                                Report
                                            </div>
                                        )}
                                    </Menu.Item>
                                    {userId === post.user.id ? (
                                        <Menu.Item>
                                            {({ active }) => (
                                                <div
                                                    className={classNames(
                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                        'block px-4 py-2 text-sm',
                                                    )}
                                                >
                                                    <Link to={`/edit/${post.title}`}>Edit</Link>
                                                </div>
                                            )}
                                        </Menu.Item>
                                    ) : (
                                        ''
                                    )}
                                    {post.user.id === userId ? (
                                        <Menu.Item>
                                            {({ active }) => (
                                                <>
                                                    <div
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm',
                                                        )}
                                                        onClick={() => setOpenModal(true)}
                                                    >
                                                        Delete
                                                    </div>
                                                    <Modal
                                                        show={openModal}
                                                        size="md"
                                                        onClose={() => setOpenModal(false)}
                                                        popup
                                                    >
                                                        <Modal.Header />
                                                        <Modal.Body>
                                                            <div className="text-center">
                                                                <BsExclamationOctagon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                                                    Are you sure you want to delete this post?
                                                                </h3>
                                                                <div className="flex justify-center gap-4">
                                                                    <Button color="failure" onClick={handleDeletePost}>
                                                                        {"Yes, I'm sure"}
                                                                    </Button>
                                                                    <Button
                                                                        color="gray"
                                                                        onClick={() => setOpenModal(false)}
                                                                    >
                                                                        No, cancel
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </Modal.Body>
                                                    </Modal>
                                                </>
                                            )}
                                        </Menu.Item>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
                <div className="relative m-0 md:w-2/5 shrink-0 overflow-hidden rounded-xl md:rounded-r-none bg-white bg-clip-border text-gray-700">
                    <img
                        src={`${import.meta.env.VITE_API_URL}/uploads/files/${coverImage}`}
                        alt="image"
                        className="absolute block h-full w-full object-cover object-center"
                    />
                </div>
                <div className="p-6 w-full">
                    <div className="flex gap-3 items-center mb-3">
                        <img
                            src={
                                user.avatar
                                    ? `${import.meta.env.VITE_API_URL}/uploads/files/${user.avatar}`
                                    : `https://flowbite.com/docs/images/people/profile-picture-2.jpg`
                            }
                            alt="author"
                            className="w-[50px] h-[50px] object-cover rounded-full"
                        />
                        <div className="flex flex-col">
                            <a href={`/profile/${post.user.id}`} className="font-bold text-sm">
                                {user.displayName}
                            </a>
                            <span className="text-gray-400 text-xs">{calculateTimeDifference(post.createAt)}</span>
                        </div>
                    </div>
                    <div className="line-clamp-2">
                        <a
                            href={`/post/${encodeURIComponent(title)}`}
                            className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased hover:text-orange-400 cursor-pointer transition-colors duration-150"
                        >
                            {title}
                        </a>
                    </div>
                    <div className="flex justify-between mt-3">
                        <div className="flex items-center gap-4">
                            <div onClick={handleLikePost} className="like flex items-center gap-1 cursor-pointer">
                                {listUserIdLike.includes(userId) ? (
                                    <RiQuillPenFill className="text-yellow-300" size={23} />
                                ) : (
                                    <RiQuillPenLine size={23} />
                                )}
                                {listUserIdLike?.length}
                            </div>
                            <div className="comment flex items-center gap-1 cursor-pointer">
                                <FaRegComment size={18} /> {post.comments}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex gap-2 items-center">
                                <IoEyeSharp />
                                <p>{post.view}</p>
                            </div>
                            <div onClick={handleBookmark} className="flex items-center gap-2 cursor-pointer">
                                {listUserIdBookmark.includes(userId) ? (
                                    <BsBookmarksFill className="text-yellow-300" />
                                ) : (
                                    <BsBookmarks />
                                )}

                                <p>{listUserIdBookmark.length}</p>
                            </div>
                        </div>
                    </div>

                    <a
                        className="mt-4 flex select-none items-center gap-2 rounded-lg text-center align-middle font-sans text-xs font-bold uppercase text-orange-500  disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        href={`/post/${encodeURIComponent(title)}`}
                    >
                        Read More
                        <FaLongArrowAltRight className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </section>
    );
}

export default PostCard;
