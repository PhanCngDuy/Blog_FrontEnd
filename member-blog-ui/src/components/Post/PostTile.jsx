import { Link } from 'react-router-dom';

function PostTile({ post }) {
    return (
        <>
            {post ? (
                <div className="flex gap-4 w-full my-6">
                    <div className="h-0 w-[70px] pt-[70px] relative flex-shrink-0 rounded-md overflow-hidden">
                        <img
                            src={`${import.meta.env.VITE_API_URL}/uploads/files/${post?.coverImage}`}
                            alt="post_suggest"
                            className="absolute h-full left-0 top-0 object-center w-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col">
                        <div className="flex gap-2 items-center">
                            <img
                                src={
                                    post?.user.avatar
                                        ? `${import.meta.env.VITE_API_URL}/uploads/files/${post?.user?.avatar}`
                                        : '/user.png'
                                }
                                alt="author"
                                className="w-6 h-6 rounded-full"
                            />
                            <p className="text-xs">{post.user.displayName}</p>
                        </div>
                        <div className="line-clamp-2">
                            <Link to={`post/${encodeURIComponent(post.title)}`} className="font-bold mt-2 max-w-sm">
                                {post?.title}
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default PostTile;
