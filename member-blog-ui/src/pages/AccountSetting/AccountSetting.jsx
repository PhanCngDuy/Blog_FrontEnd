import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useAxiosJwt from '~/Hook/useAxiosjwt';
import { getUserId } from '~/redux/selector/AuthSelector';
import { isLoading, isNotLoading } from '~/redux/slice/LoadingSlice';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { updateUserDetails } from '~/redux/slice/AuthSlice';
import { toast } from 'react-toastify';

const validationSchema = yup.object({
    displayName: yup
        .string()
        .required('*Please enter the display name')
        .min(5, '*Display Name must be at least 5 characters.'),
    email: yup
        .string()
        .required('*Please enter the email')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, '* Enter your correct email.'),
    bio: yup.string().required('*Please enter the bio'),
});

function AccountSetting() {
    const myUserId = useSelector(getUserId);
    const [message, setMessage] = useState();
    const [user, setUser] = useState({
        avatar: '',
        displayName: '',
        email: '',
        username: '',
        bio: '',
    });
    const [avatar, setAvatar] = useState(null);
    const fileInputRef = useRef();
    const { dispatch, getAxiosJwt } = useAxiosJwt();

    const handleFileSelect = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageChange = () => {
        fileInputRef.current.click();
    };
    useEffect(() => {
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
        if (myUserId) {
            fetchUserDetail(myUserId);
        }
    }, []);

    const handleSubmit = async (values) => {
        const data = {
            ...values,
            avatar: avatar,
        };
        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            try {
                dispatch(isLoading());
                const res = await axiosJwt.put(`${import.meta.env.VITE_API_URL}/api/v1/user/update/${myUserId}`, data);
                if (!res.data.hasErrors) {
                    dispatch(updateUserDetails(res.data.content));
                    toast.success('Update successfully.');
                    dispatch(isNotLoading());
                }
            } catch (e) {
                console.log(e);
                dispatch(isNotLoading());
            }
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            avatar: user.avatar,
            displayName: user.displayName,
            email: user.email,
            bio: user.bio,
        },
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: handleSubmit,
        validationSchema: validationSchema,
    });

    return (
        <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-black">
            <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
                <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
                    <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

                    <a
                        href="#"
                        className="flex items-center px-3 py-2.5 font-bold bg-white  text-orange-500 border rounded-full"
                    >
                        Account Settings
                    </a>
                    <a
                        href="#"
                        className="flex items-center px-3 py-2.5 font-semibold hover:text-orange-500 hover:border hover:rounded-full  "
                    >
                        Notifications
                    </a>
                    <a
                        href="#"
                        className="flex items-center px-3 py-2.5 font-semibold hover:text-orange-500 hover:border hover:rounded-full  "
                    >
                        PRO Account
                    </a>
                </div>
            </aside>
            <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                <form onSubmit={formik.handleSubmit} className="p-2 md:p-4">
                    <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                        <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>

                        <div className="grid max-w-2xl mx-auto mt-8">
                            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                                {avatar ? (
                                    <img
                                        src={avatar}
                                        className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-orange-300 "
                                        alt="avatar"
                                    />
                                ) : (
                                    <img
                                        src={
                                            user.avatar
                                                ? `${import.meta.env.VITE_API_URL}/uploads/files/${user.avatar}`
                                                : `https://flowbite.com/docs/images/people/profile-picture-2.jpg`
                                        }
                                        className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-orange-300 "
                                        alt="avatar"
                                    />
                                )}

                                <div className="flex flex-col space-y-5 sm:ml-8">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        ref={fileInputRef}
                                        className="hidden"
                                    />
                                    <button
                                        onClick={handleImageChange}
                                        type="button"
                                        className="py-2 px-5 text-base font-medium text-white focus:outline-none bg-orange-500 rounded-lg border border-orange-500 hover:bg-orange-500 focus:z-10 focus:ring-4 focus:ring-orange-500 "
                                    >
                                        Change avatar
                                    </button>
                                </div>
                            </div>

                            <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                    <div className="w-full">
                                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-black">
                                            Username
                                        </label>
                                        <p className="bg-gray-100 border border-gray-200 text-black text-sm rounded-lg block w-full p-2.5 ">
                                            {user.username}
                                        </p>
                                    </div>

                                    <div className="w-full">
                                        <label
                                            htmlFor="last_name"
                                            className="block mb-2 text-sm font-medium text-black"
                                        >
                                            DisplayName
                                        </label>
                                        <input
                                            type="text"
                                            id="last_name"
                                            className="bg-indigo-50 border border-gray-200 text-black text-sm rounded-lg block w-full p-2.5"
                                            name="displayName"
                                            placeholder="DisplayName"
                                            value={formik.values.displayName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.displayName && formik.errors.displayName ? (
                                            <div className="text-red-500 text-sm mt-1">
                                                {formik.errors.displayName}{' '}
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>

                                <div className="mb-2 sm:mb-6">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="bg-indigo-50 border border-gray-200 text-black text-sm rounded-lg block w-full p-2.5"
                                        name="email"
                                        placeholder="Email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                                    ) : (
                                        ''
                                    )}
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-black">
                                        Bio
                                    </label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        name="bio"
                                        placeholder="Your bio"
                                        value={formik.values.bio}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="block p-2.5 w-full text-sm text-black bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                                    ></textarea>
                                    {formik.touched.bio && formik.errors.bio ? (
                                        <div className="text-red-500 text-sm mt-1">{formik.errors.bio}</div>
                                    ) : (
                                        ''
                                    )}
                                    {message ? <div className="text-red-500 text-sm mt-3">{message}</div> : ''}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="text-white bg-orange-500  hover:bg-orange-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default AccountSetting;
