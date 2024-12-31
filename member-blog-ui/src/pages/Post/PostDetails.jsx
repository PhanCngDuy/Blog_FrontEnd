/* eslint-disable react-hooks/exhaustive-deps */
import SearchBar from '~/components/SearchBar';
import { SlUserFollow } from 'react-icons/sl';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { AiOutlineHome } from 'react-icons/ai';
import { PiShareFat } from 'react-icons/pi';
import { IoBookmarks, IoBookmarksOutline, IoChatboxEllipsesOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isLoading, isNotLoading } from '~/redux/slice/LoadingSlice';
import axios from 'axios';
import Comments from '~/components/Comments/Comments';
import { calculateTimeDifference } from '~/components/Time/time';
import { FaRegCirclePause, FaRegCirclePlay } from 'react-icons/fa6';
import { FaFacebook, FaRegEdit } from 'react-icons/fa';
import { MdOutlineChat, MdOutlineShare } from 'react-icons/md';
import { BsBookmarks, BsBookmarksFill } from 'react-icons/bs';
import { getUserId } from '~/redux/selector/AuthSelector';
import useAxiosJwt from '~/Hook/useAxiosjwt';
import { RiQuillPenFill, RiQuillPenLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

function PostDetails() {
    const [isPlay, setIsPlay] = useState(false);
    const [post, setPost] = useState();
    const { title } = useParams();
    const userId = useSelector(getUserId);
    const { getAxiosJwt, dispatch } = useAxiosJwt();

    const [listUserIdLike, setListUserIdLike] = useState([]);
    const [listUserIdBookmark, setListUserIdBookmark] = useState([]);
    const [modifiedContent, setModifiedContent] = useState('');

    const replaceSrc = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const imgElements = doc.querySelectorAll('img');

        imgElements.forEach((img) => {
            const oldSrc = img.getAttribute('src');
            const newSrc = `${import.meta.env.VITE_API_URL}/uploads/files/${oldSrc}`;
            img.setAttribute('src', newSrc);
        });

        return doc.body.innerHTML;
    };
    const handleBookmark = async () => {
        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            try {
                const res = await axiosJwt.post(`${import.meta.env.VITE_API_URL}/api/v1/post/bookmark`, {
                    userId: userId,
                    postId: post.id,
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                dispatch(isLoading());
                if (title) {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/post`, {
                        params: {
                            title: title,
                        },
                    });
                    if (!response.data.hasErrors) {
                        const content = response.data.content;
                        setPost(content);
                        setListUserIdLike(content.likesId);
                        setListUserIdBookmark(content.userBookmarks);
                        const modifiedHTML = replaceSrc(content.content);
                        setModifiedContent(modifiedHTML);
                    }
                }

                dispatch(isNotLoading());
            } catch (e) {
                console.error(e);
                dispatch(isNotLoading());
            }
        };

        fetchData();
    }, [title]);

    const handleLikePost = async () => {
        const data = {
            userId,
            postId: post.id,
        };

        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            try {
                const res = await axiosJwt.post(`${import.meta.env.VITE_API_URL}/api/v1/post/like`, data);
                if (!res.data.hasErrors) {
                    setListUserIdLike(res.data.content);
                }
            } catch (e) {
                console.log(e);
            }
        }
    };
    return (
        <div className="container mx-auto">
            {post ? (
                <>
                    <div className="flex flex-col lg:flex-row gap-12 mt-8">
                        <div className="flex-1 p-4 bg-white px-4 py-5 rounded-xl">
                            <div className="flex justify-between">
                                <div className="flex gap-4 items-center">
                                    <img
                                        src={
                                            post.user.avatar
                                                ? `${import.meta.env.VITE_API_URL}/uploads/files/${post.user.avatar}`
                                                : `https://flowbite.com/docs/images/people/profile-picture-2.jpg`
                                        }
                                        alt="author"
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <p className="font-bold ">{post.user?.displayName}</p>
                                        <div className="flex gap-4  mt-2 text-gray-400 text-sm items-center">
                                            <span>{calculateTimeDifference(post.createAt)}</span>
                                            <div
                                                onClick={() => setIsPlay(!isPlay)}
                                                className={`text-white bg-blue-400 inline-flex rounded-md py-1 cursor-pointer justify-center gap-2 items-center px-2 transition-all duration-150 ${
                                                    isPlay ? 'bg-red-500' : ''
                                                }`}
                                            >
                                                {isPlay ? (
                                                    <>
                                                        <FaRegCirclePause /> Pause
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaRegCirclePlay /> Listen
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between bg-orange px-6 py-2">
                                    <ul className="flex gap-4 items-center">
                                        <a href="/" className="">
                                            <FaFacebook size={20} />
                                        </a>
                                        <a href="/" className="">
                                            <MdOutlineShare size={20} />
                                        </a>
                                        <div onClick={handleBookmark} className="cursor-pointer">
                                            {listUserIdBookmark.includes(userId) ? (
                                                <BsBookmarksFill color="orange" size={20} />
                                            ) : (
                                                <BsBookmarks size={20} />
                                            )}
                                        </div>
                                        {userId === post.user.id ? (
                                            <Link to={`/edit/${post.title}`}>
                                                <FaRegEdit size={20} />
                                            </Link>
                                        ) : (
                                            ''
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div className="relative w-1130 h-364 overflow-hidden rounded-xl my-6">
                                <img
                                    className="object-cover w-full h-full"
                                    src={`${import.meta.env.VITE_API_URL}/uploads/files/${post.coverImage}`}
                                    alt="Image 1"
                                />
                            </div>
                            <div className="text-3xl font-bold mb-5">{post.title}</div>
                            <div dangerouslySetInnerHTML={{ __html: modifiedContent }} />

                            <Comments postId={post.id} />
                        </div>
                        <div className="lg:w-96 w-full bg-white rounded-xl p-4 ">
                            <SearchBar />
                            <div className="mt-6">
                                <div className="flex gap-4 items-center">
                                    <img
                                        src={
                                            post.user.avatar
                                                ? `${import.meta.env.VITE_API_URL}/uploads/files/${post.user.avatar}`
                                                : `https://flowbite.com/docs/images/people/profile-picture-2.jpg`
                                        }
                                        alt="author"
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold ">{post.user.displayName}</p>
                                            <div className="text-sm text-gray-400">
                                                {post.user.likes > 0 ? (
                                                    <div className="flex gap-[2px] items-center">
                                                        <RiQuillPenFill className="text-yellow-300" size={23} />
                                                        {post.user.likes}
                                                    </div>
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                        </div>
                                        <div className="mt-1 text-gray-400 text-sm items-center">
                                            <span>{post.user.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="bio text-gray-400 text-sm mt-4 max-w-sm">
                                    Lead UX Designer @ Slack. Loves travelling and lives for backstage action! Love to
                                    design user centric products and understanding consumer behaviour
                                </p>

                                <a
                                    href={`/profile/${post.user.id}`}
                                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-orange-500 rounded-lg  hover:bg-orange-600 mt-5"
                                >
                                    View Profile
                                </a>
                            </div>
                        </div>
                    </div>
                    <section className="fixed xl:block hidden top-1/2 left-16 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md">
                        <ul className="flex flex-col gap-7 py-5 px-2">
                            <li>
                                <Link to="/">
                                    <AiOutlineHome size={25} />
                                </Link>
                            </li>
                            <li className="flex flex-col items-center gap-1">
                                <div onClick={handleLikePost} className="cursor-pointer">
                                    {listUserIdLike.includes(userId) ? (
                                        <>
                                            <RiQuillPenFill className="text-yellow-300" size={25} />
                                        </>
                                    ) : (
                                        <>
                                            <RiQuillPenLine size={25} />
                                        </>
                                    )}
                                </div>
                                <p className="font-semibold">{listUserIdLike.length}</p>
                            </li>
                            <li className="flex flex-col items-center gap-1">
                                <div>
                                    <IoChatboxEllipsesOutline size={23} />
                                </div>
                                <p className="font-semibold">{post.comments}</p>
                            </li>
                            <li>
                                <div
                                    onClick={handleBookmark}
                                    className="cursor-pointer flex flex-col items-center gap-1"
                                >
                                    {listUserIdBookmark.includes(userId) ? (
                                        <IoBookmarks color="orange" size={23} />
                                    ) : (
                                        <IoBookmarksOutline size={23} />
                                    )}
                                    <p className="font-semibold">{listUserIdBookmark.length}</p>
                                </div>
                            </li>
                            <li>
                                <a href="/">
                                    <PiShareFat size={25} />
                                </a>
                            </li>
                        </ul>
                    </section>
                </>
            ) : (
                <p className="flex justify-center my-6">Not found</p>
            )}
        </div>
    );
}

export default PostDetails;
