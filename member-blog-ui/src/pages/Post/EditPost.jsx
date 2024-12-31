/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { MdFileUpload } from 'react-icons/md';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxiosJwt from '~/Hook/useAxiosjwt';
import Editor from '~/components/Editor/Editor';
import { isLoading, isNotLoading } from '~/redux/slice/LoadingSlice';

function EditPost() {
    const { title } = useParams();
    const [coverImage, setCoverImage] = useState(null);
    const [content, setContent] = useState('');
    const [postTitle, setPostTile] = useState(title);
    const [post, setPost] = useState({});
    const { getAxiosJwt, dispatch, navigate } = useAxiosJwt();
    const [message, setMessage] = useState([]);

    const handleChangeEditor = (html) => {
        setContent(html);
    };
    const fileInputRef = useRef();

    const handleImageChange = () => {
        fileInputRef.current.click();
    };

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
    const replaceOriginSrc = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const imgElements = doc.querySelectorAll('img');

        imgElements.forEach((img) => {
            const oldSrc = img.getAttribute('src');
            const src = `${import.meta.env.VITE_API_URL}/uploads/files/`;
            if (oldSrc.startsWith(src)) {
                var newSrc = oldSrc.substring(src.length);
                img.setAttribute('src', newSrc);
            }
        });

        return doc.body.innerHTML;
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
            title: postTitle,
            coverImage: coverImage,
            content: replaceOriginSrc(content),
        };

        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            dispatch(isLoading());
            try {
                const res = await axiosJwt.put(`${import.meta.env.VITE_API_URL}/api/v1/post/update/${post.id}`, data);
                if (!res.data.hasErrors) {
                    dispatch(isNotLoading());
                    toast.success('Update post successfully.');
                    navigate(`/post/${res.data.content.title}`);
                }
            } catch (e) {
                setMessage([...e.response.data.errors]);
                dispatch(isNotLoading());
                toast.error('Update post failure.');
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
                        setCoverImage(`${import.meta.env.VITE_API_URL}/uploads/files/${content.coverImage}`);
                        setContent(replaceSrc(content.content));
                        setPost(content);
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

    return (
        <>
            <div className="max-w-[800px] mx-auto mt-5 flex flex-col gap-5 px-3">
                <h2 className="font-semibold">Edit my post</h2>
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
                    value={postTitle}
                    onChange={(e) => setPostTile(e.target.value)}
                    placeholder="Title here..."
                    className="text-4xl px-5 py-7 w-full font-black outline-none text-black"
                />
                <div className="bg-white w-full">
                    <Editor handleChange={handleChangeEditor} editorHtml={content} placeholder={'Write something...'} />
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
                        <p>Update now</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default EditPost;
