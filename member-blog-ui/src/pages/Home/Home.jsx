/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Ads from '~/components/Ads/Ads';
import Hero from '~/components/Hero/Hero';
import PopularPost from '~/components/PopularPost/PopularPost';
import PostCard from '~/components/Post/PostCard';
import SearchBar from '~/components/SearchBar';
import { isLoading, isNotLoading } from '~/redux/slice/LoadingSlice';

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        limit: 5,
        totalPages: 1,
    });

    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();

    const fetchNewPost = async () => {
        try {
            dispatch(isLoading());
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/post/latest`, {
                params: {
                    limit: pagination.limit,
                    page: currentPage,
                },
            });
            if (!response.data.hasErrors) {
                const content = response.data.content;
                setPosts(content.data);
                setPagination((prev) => ({
                    ...prev,
                    limit: content.limit,
                    totalPages: content.total,
                }));
            }
            dispatch(isNotLoading());
        } catch (e) {
            console.log(e);
            dispatch(isNotLoading());
        }
    };

    useEffect(() => {
        fetchNewPost();
    }, [currentPage]);
    const onChangePage = (page) => {
        setCurrentPage(page);
    };
    return (
        <>
            <Hero />
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 mt-8">
                    <div className="flex-1 p-4">
                        <h1 className="heading">Recent Posts</h1>
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                        <Pagination
                            pageSize={pagination.limit}
                            onChange={onChangePage}
                            current={currentPage}
                            total={pagination.totalPages}
                        />
                    </div>
                    <div className="w-full lg:w-96 bg-white p-4 rounded-xl">
                        <SearchBar />
                        <Ads />
                        <p className="text-sm mt-6">What&#39;s hot</p>
                        <h1 className="heading">Most Popular</h1>
                        <PopularPost />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
