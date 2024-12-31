import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { RiQuillPenFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostCard from '~/components/Post/PostCard';
import { getUserId } from '~/redux/selector/AuthSelector';
import { isLoading, isNotLoading } from '~/redux/slice/LoadingSlice';
const tab = ['Posts'];
function Profile() {
    const [currentTab, setCurrentTab] = useState(tab[0]);
    const [user, setUser] = useState({});
    const myUserId = useSelector(getUserId);
    const [allPost, setAllPost] = useState([]);
    const dispatch = useDispatch();

    const { userId } = useParams();

    useEffect(() => {
        const fetchMyPost = async (userId) => {
            try {
                dispatch(isLoading());
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/post/my/${userId}`);
                if (!res.data.hasErrors) {
                    const content = res.data.content;
                    setAllPost(content);

                    dispatch(isNotLoading());
                }
            } catch (e) {
                console.log(e);
                dispatch(isNotLoading());
            }
        };
        const fetchUserDetail = async (userId) => {
            try {
                dispatch(isLoading());
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/detail/${userId}`);
                if (!res.data.hasErrors) {
                    setUser(res.data.content);
                    dispatch(isNotLoading());
                }
            } catch (e) {
                console.log(e);
                dispatch(isNotLoading());
            }
        };
        if (userId) {
            fetchUserDetail(userId);
            fetchMyPost(userId);
        }
    }, []);
    return (
        <>
            {user ? (
                <div className="container mx-auto pl-0 transition-all" id="main">
                    <div className="p-4">
                        <div className="flex items-center gap-4 mt-4">
                            <div className="relative">
                                <img
                                    src={
                                        user.avatar
                                            ? `${import.meta.env.VITE_API_URL}/uploads/files/${user.avatar}`
                                            : `https://flowbite.com/docs/images/people/profile-picture-2.jpg`
                                    }
                                    className="w-28 h-28 object-cover rounded-full"
                                    alt="avatar"
                                />
                            </div>
                            <div>
                                <div className="text-2xl font-semibold mb-2 flex items-center gap-2 ">
                                    <p className="font-bold ">{user.displayName}</p>
                                    <div className="text-sm text-gray-400">
                                        {user.likes > 0 ? (
                                            <div className="flex gap-[2px] items-center">
                                                <RiQuillPenFill className="text-yellow-300" size={23} /> {user.likes}
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                                <span className="text-lg text-gray-500">{user.email}</span>
                            </div>
                        </div>
                        <p className="text-gray-500 text-lg mt-4 mb-8">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium vitae tempora culpa
                            laborum inventore mollitia eius odit voluptatem perspiciatis magnam ratione sunt, facilis,
                            possimus sed delectus.
                        </p>
                        <div>
                            <div className="flex items-center gap-8 tab-indicator border-b border-gray-200">
                                {tab.map((t) => (
                                    <span
                                        onClick={() => setCurrentTab(t)}
                                        className={`${t === currentTab ? 'active' : ''} cursor-pointer`}
                                        key={t}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                            <div className="tab-content mt-4" id="security">
                                {allPost.map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default Profile;
