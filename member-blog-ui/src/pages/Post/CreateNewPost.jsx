import { useRef, useState } from 'react';
import { MdFileUpload } from 'react-icons/md';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useAxiosJwt from '~/Hook/useAxiosjwt';
import Editor from '~/components/Editor/Editor';
import { getUserId } from '~/redux/selector/AuthSelector';
import { isLoading, isNotLoading } from '~/redux/slice/LoadingSlice';

function CreateNewPost() {
    const [coverImage, setCoverImage] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const userId = useSelector(getUserId);
    const { getAxiosJwt, dispatch, navigate } = useAxiosJwt();
    const [message, setMessage] = useState([]);

    const handleChangeEditor = (html) => {
        setContent(html);
        console.log(JSON.stringify(html));
    };
    const fileInputRef = useRef();

    const handleImageChange = () => {
        fileInputRef.current.click();
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async () => {
        const data = {
            title,
            coverImage: coverImage,
            content: content,
        };

        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            dispatch(isLoading());
            try {
                const res = await axiosJwt.post(`${import.meta.env.VITE_API_URL}/api/v1/post/${userId}`, data);
                if (!res.data.hasErrors) {
                    dispatch(isNotLoading());
                    toast.success('You have successfully posted the article');
                    navigate('/');
                }
            } catch (e) {
                setMessage([...e.response.data.errors]);
                dispatch(isNotLoading());
            }
        }
    };

    return (
        <>
            <div className="max-w-[800px] mx-auto mt-5 flex flex-col gap-5 px-3">
                <h2 className="font-semibold">Create Post</h2>
                {coverImage && (
                    <div className="w-full h-[332px] relative overflow-hidden rounded-xl">
                        <img src={coverImage} alt="Selected" className="w-full h-full block object-cover" />
                    </div>
                )}
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        ref={fileInputRef}
                        className="hidden"
                    />
                    <button
                        onClick={handleImageChange}
                        className="bg-white border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-lg outline-none"
                    >
                        Add a cover image
                    </button>
                </div>
                <input
                    type="text"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="Title here..."
                    className="text-4xl px-5 py-7 w-full font-black outline-none border-transparent focus:border-orange-400 focus:border-2 focus:ring-orange-400 text-black"
                />
                <div className="bg-white w-full">
                    <Editor
                        handleChange={handleChangeEditor}
                        editorHtml={content}
                        placeholder={'Write something cool...'}
                    />
                </div>
                {message.length > 0 ? (
                    <div className="text-red-500 text-sm flex flex-col gap-2 mt-2">
                        {message.map((m, i) => (
                            <p key={i}>*{m}</p>
                        ))}
                    </div>
                ) : (
                    ''
                )}
                <div>
                    <button
                        onClick={onSubmit}
                        className="flex items-center gap-2 bg-orange-500 text-white px-3 py-2 font-medium rounded hover:bg-orange-600 transition-all duration-200 ease-in"
                    >
                        <div className="flex items-center">
                            <MdFileUpload />
                        </div>

                        <p>Publish Now</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default CreateNewPost;
