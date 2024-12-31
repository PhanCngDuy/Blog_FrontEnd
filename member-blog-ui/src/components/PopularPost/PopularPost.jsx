import { memo, useEffect, useState } from 'react';
import PostTile from '../Post/PostTile';
import axios from 'axios';

function PopularPost() {
    const [posts, setPosts] = useState();

    const fetchPopularPost = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/post/popular`, {
                params: {
                    limit: 5,
                    page: 1,
                },
            });
            if (!response.data.hasErrors) {
                const content = response.data.content;
                setPosts(content.data);
            }
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        fetchPopularPost();
    }, []);

    return (
        <>
            {posts?.map((post) => (
                <PostTile key={post.id} post={post} />
            ))}
        </>
    );
}

export default memo(PopularPost);
