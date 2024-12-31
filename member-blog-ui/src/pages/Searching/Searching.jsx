/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import Pagination from 'rc-pagination/lib/Pagination';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import PostCard from '~/components/Post/PostCard';
import { isLoading, isNotLoading } from '~/redux/slice/LoadingSlice';

function Searching() {
    const q = new URLSearchParams(location.search).get('q');
    const [keyword, setKeyword] = useState(q || '');
    const [result, setResult] = useState([]);
    const dispatch = useDispatch();

    const [pagination, setPagination] = useState({
        limit: 5,
        totalPages: 0,
        page: 1,
    });

    const handleSearching = async (page) => {
        try {
            dispatch(isLoading());
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/post/search`, {
                params: {
                    keyword: keyword,
                    limit: pagination.limit,
                    page: page,
                },
            });
            console.log(res.data);
            if (!res.data.hasErrors) {
                const content = res.data.content;
                setResult(content.data);
                setPagination((prev) => ({
                    ...prev,
                    limit: content.limit,
                    totalPages: content.total,
                    page: content.page,
                }));
            }

            dispatch(isNotLoading());
        } catch (e) {
            console.log(e);
            dispatch(isNotLoading());
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearching(1);
    };
    const onChangePage = (page) => {
        handleSearching(page);
    };

    useEffect(() => {
        handleSearching(1);
    }, []);

    return (
        <section>
            <div className="w-full h-[80px] bg-white"></div>
            <div className="max-w-[600px] m-auto bg-white rounded-lg -translate-y-1/2">
                <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-2.5 relative w-full">
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
                        <input
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="placeholder:font-medium font-semibold text-dark-soft placeholder:text-gray-400 rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none  md:py-4 border-transparent focus:border-orange-400 focus:border-2 focus:ring-orange-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]"
                            type="text"
                            placeholder="Searching..."
                        />
                    </div>
                    <button className="w-full bg-orange-500 text-white font-semibold rounded-lg px-5 py-3 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2">
                        Search
                    </button>
                </form>
            </div>
            {result.length > 0 ? (
                <div className="bg-white py-4">
                    {result.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <div className="w-full text-center mt-10">Not found.Please try again.</div>
            )}

            {pagination.totalPages > 0 ? (
                <div className="mt-4">
                    <Pagination
                        pageSize={pagination.limit}
                        onChange={onChangePage}
                        current={pagination.page}
                        total={pagination.totalPages}
                    />
                </div>
            ) : (
                ''
            )}
        </section>
    );
}

export default Searching;
