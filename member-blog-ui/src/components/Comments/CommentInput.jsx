function CommentInput({ comment, setComment, submitComment }) {
    return (
        <>
            <div className="mb-6 mt-3">
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 text-black">
                    <label htmlFor="comment" className="sr-only">
                        Your comment
                    </label>
                    <textarea
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="3"
                        className="px-0 w-full text-sm text-black  border-0 focus:ring-0 focus:outline-none "
                        placeholder="Write a comment..."
                        required
                    ></textarea>
                </div>
                <button
                    onClick={submitComment}
                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-orange-500 rounded-lg  hover:bg-orange-600"
                >
                    Post comment
                </button>
            </div>
        </>
    );
}

export default CommentInput;
