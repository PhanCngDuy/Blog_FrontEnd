import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAxiosJwt from '~/Hook/useAxiosjwt';
import PostCard from '~/components/Post/PostCard';
import { getUserId } from '~/redux/selector/AuthSelector';
import { isLoading, isNotLoading } from '~/redux/slice/LoadingSlice';

function ReadingList() {
    const [allPost, setAllPost] = useState([]);
    const { dispatch, getAxiosJwt } = useAxiosJwt();
    const userId = useSelector(getUserId);

    useEffect(() => {
        const fetchMyPost = async (userId) => {
            const axiosJwt = getAxiosJwt();
            if (axiosJwt) {
                try {
                    dispatch(isLoading());
                    const res = await axiosJwt.get(
                        `${import.meta.env.VITE_API_URL}/api/v1/post/get-bookmark/${userId}`,
                    );
                    if (!res.data.hasErrors) {
                        const content = res.data.content;
                        setAllPost(content);
                        dispatch(isNotLoading());
                    }
                } catch (e) {
                    console.log(e);
                    dispatch(isNotLoading());
                }
            }
        };

        if (userId) {
            fetchMyPost(userId);
        }
    }, []);

    return (
        <>
            <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-black">
                <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                    <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
                        <h2 className="pl-3 mb-4 text-2xl font-semibold">Reading List</h2>

                        <a
                            href="#"
                            className="flex items-center px-3 py-2.5 font-bold bg-white  text-orange-500 border rounded-full"
                        >
                            All
                        </a>
                    </div>
                </aside>
                <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                    <div className="tab-content mt-4" id="security">
                        {allPost.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}

export default ReadingList;
