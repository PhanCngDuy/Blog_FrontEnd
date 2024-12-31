/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, useEffect, useState } from 'react';
import { FaEye, FaFacebook, FaPhoneVolume, FaRegBell } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaBars, FaRegCircleUser, FaTwitch, FaXmark } from 'react-icons/fa6';
import { Link, NavLink } from 'react-router-dom';
import AccountBar from './AccountBar';
import { useSelector } from 'react-redux';
import { currentUserSelector, getUserId, isLogin } from '~/redux/selector/AuthSelector';
import { RiQuillPenLine } from 'react-icons/ri';
import { IoBookmarkOutline, IoSettingsOutline } from 'react-icons/io5';
import { LiaSignOutAltSolid } from 'react-icons/lia';
import { isLoading, isNotLoading } from '~/redux/slice/LoadingSlice';
import axios from 'axios';
import { logoutSuccess } from '~/redux/slice/AuthSlice';
import { toast } from 'react-toastify';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useAxiosJwt from '~/Hook/useAxiosjwt';
import { calculateTimeDifference } from '../Time/time';
import { Menu, Transition } from '@headlessui/react';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function Header() {
    const isLoginState = useSelector(isLogin);
    const userDetails = useSelector(currentUserSelector);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const userId = useSelector(getUserId);
    const [notifications, setNotifications] = useState([]);
    const { dispatch, navigate, getAxiosJwt } = useAxiosJwt();

    const notiLength = notifications.filter((n) => !n.read).length;

    const navItems = [
        { path: '/', link: 'Home' },
        { path: '/services', link: 'Services' },
        { path: '/about', link: 'About' },
        { path: '/blogs', link: 'Blogs' },
        { path: '/contact', link: 'Contact' },
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const logout = async () => {
        try {
            dispatch(isLoading());
            const axiosLogout = axios.create({
                withCredentials: true,
            });
            const response = await axiosLogout.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/logout`);
            dispatch(logoutSuccess());
            toast.success('Logout successfully.');
            navigate('/login');

            if (response.status === 401) return null;
            dispatch(isNotLoading());

            return response.data.content;
        } catch (e) {
            return null;
        }
    };
    const handleReadAll = async () => {
        dispatch(isLoading());
        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            try {
                const res = await axiosJwt.post(
                    `${import.meta.env.VITE_API_URL}/api/v1/notification/read-all/${userId}`,
                );
                if (!res.data.hasErrors) {
                    console.log(res.data);
                    setNotifications((prev) => prev.map((noti) => ({ ...noti, read: true })));
                }
                dispatch(isNotLoading());
            } catch (e) {
                dispatch(isNotLoading());
            }
        }
    };
    const handleDeleteNoti = async (id) => {
        dispatch(isLoading());
        const axiosJwt = getAxiosJwt();
        if (axiosJwt) {
            try {
                const res = await axiosJwt.post(`${import.meta.env.VITE_API_URL}/api/v1/notification/delete/${id}`);
                if (!res.data.hasErrors) {
                    setNotifications((prev) => prev.filter((n) => n.id != id));
                }
                dispatch(isNotLoading());
            } catch (e) {
                dispatch(isNotLoading());
            }
        }
    };
    useEffect(() => {
        let stompClient;
        const createWebSocket = () => {
            return new SockJS(`${import.meta.env.VITE_API_URL}/websocket`);
        };

        const connect = () => {
            stompClient = Stomp.over(createWebSocket);
            stompClient.connect({}, () => {
                stompClient.subscribe(`/topic/notification/${userId}`, (data) => {
                    const newNotifications = JSON.parse(data.body);
                    setNotifications((prev) => [newNotifications, ...prev]);
                });
            });
        };
        const fetchNotification = async () => {
            const axiosJwt = getAxiosJwt();
            try {
                const res = await axiosJwt.get(`${import.meta.env.VITE_API_URL}/api/v1/notification/${userId}`);
                setNotifications(res.data.content);
            } catch (e) {
                console.log(e);
            }
        };
        if (isLoginState) {
            fetchNotification();
            connect();
        }

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

    return (
        <>
            <div className="flex items-center justify-between bg-orange px-6 py-1 bg-orange-400">
                <ul className="flex gap-4 items-center text-white">
                    <a href="/" className="">
                        <FaFacebook />
                    </a>
                    <a href="/" className="">
                        <FaInstagram />
                    </a>
                    <a href="/" className="">
                        <FaTwitch />
                    </a>
                    <a href="/">
                        <FaPhoneVolume />
                    </a>
                </ul>
            </div>
            <header className="bg-black sticky top-0 left-0 right-0 z-50 px-3">
                <div className="container mx-auto flex items-center justify-between">
                    <Link to="/">
                        <img className="h-20 px-4 object-cover" src="/Memmber-Blog-logo.png" alt="logo" />
                    </Link>

                    <nav className="px-4 hidden">
                        <ul className="md:flex gap-12 text-lg hidden">
                            {navItems.map((item) => (
                                <li key={item.path} className="text-white">
                                    <NavLink
                                        className={({ isActive, isPending }) =>
                                            isActive ? 'active' : isPending ? 'pending' : ''
                                        }
                                        to={item.path}
                                    >
                                        {item.link}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center">
                        {isLoginState ? (
                            <div className="hidden items-center gap-4 md:flex">
                                <Menu as="div" className="relative inline-block text-left">
                                    <Menu.Button className="relative flex items-center text-sm font-medium text-center text-white focus:outline-none">
                                        <FaRegBell color="white" size={23} />
                                        {notiLength > 0 ? (
                                            <div className="absolute flex  top-[-30%] right-[-30%] quantity h-4 w-4 bg-red-500 rounded-full justify-center items-center p-2 text-xs">
                                                {notiLength}
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </Menu.Button>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-max pb-4 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {notifications.length > 0 && (
                                                <div>
                                                    <div className="block px-4 py-2 font-medium text-center text-black rounded-t-lg bg-gray-50">
                                                        Notifications
                                                    </div>
                                                    <div className="flex justify-between px-4 py-2 font-medium text-xs text-gray-500 rounded-t-lg bg-gray-50">
                                                        <p>News</p>
                                                        {notiLength > 0 ? (
                                                            <button onClick={handleReadAll}>Read All</button>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                            <div className="py-1">
                                                {notifications.length > 0 ? (
                                                    notifications.map((noti) => (
                                                        <Menu.Item
                                                            className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto"
                                                            key={noti.id}
                                                        >
                                                            {({ active }) => (
                                                                <a
                                                                    href={`/post/${encodeURIComponent(noti.path)}`}
                                                                    className={`flex px-4 py-3 hover:bg-gray-100 ${
                                                                        noti?.read ? 'bg-gray-100' : ''
                                                                    }`}
                                                                >
                                                                    <div className="flex-shrink-0">
                                                                        <img
                                                                            className="rounded-full w-11 h-11 object-cover"
                                                                            src={
                                                                                noti.sender.avatar
                                                                                    ? `${
                                                                                          import.meta.env.VITE_API_URL
                                                                                      }/uploads/files/${
                                                                                          noti.sender.avatar
                                                                                      }`
                                                                                    : `https://flowbite.com/docs/images/people/profile-picture-2.jpg`
                                                                            }
                                                                            alt="Leslie image"
                                                                        />
                                                                        <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-green-400 border border-white rounded-full dark:border-gray-800">
                                                                            <svg
                                                                                className="w-2 h-2 text-white"
                                                                                aria-hidden="true"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                fill="currentColor"
                                                                                viewBox="0 0 20 18"
                                                                            >
                                                                                <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                    <div className="w-full ps-3">
                                                                        <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                                                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                                                {noti.sender.displayName}
                                                                            </span>
                                                                            <span> {noti.body}: </span>
                                                                            <span className="text-gray-950">
                                                                                {noti.content}
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex items-center justify-between text-xs">
                                                                            <div className=" text-orange-400 dark:text-orange-400">
                                                                                {calculateTimeDifference(noti.createAt)}
                                                                            </div>
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleDeleteNoti(noti.id)
                                                                                }
                                                                                className="text-red-500 hover:text-red-600 font-medium"
                                                                            >
                                                                                Delete
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </a>
                                                            )}
                                                        </Menu.Item>
                                                    ))
                                                ) : (
                                                    <p className="text-center px-4 mt-2">
                                                        You dont have any notifications
                                                    </p>
                                                )}
                                            </div>
                                            {notifications.length > 5 && (
                                                <a
                                                    href="#"
                                                    className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                                                >
                                                    <div className="inline-flex items-center gap-2">
                                                        <div>
                                                            <FaEye />
                                                        </div>
                                                        View all
                                                    </div>
                                                </a>
                                            )}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>

                                <AccountBar user={userDetails} />
                                <Link
                                    to="/new"
                                    className="flex items-center gap-1 bg-orange-500 text-white px-3 py-2 font-medium rounded hover:bg-white hover:text-orange-500 transition-all duration-200 ease-in"
                                >
                                    <RiQuillPenLine size={25} />
                                    <p>New</p>
                                </Link>
                            </div>
                        ) : (
                            <div className="md:flex gap-2 px-4 hidden">
                                <Link
                                    to="/register"
                                    className=" text-white px-6 py-2 font-medium rounded hover:bg-white hover:text-orange-500 transition-all duration-200 ease-in"
                                >
                                    Register
                                </Link>
                                <Link
                                    to="/login"
                                    className="bg-orange-500 text-white px-6 py-2 font-medium rounded hover:bg-white hover:text-orange-500 transition-all duration-200 ease-in"
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="md:hidden px-4">
                        <button onClick={toggleMenu} className="cursor-pointer">
                            {isMenuOpen ? (
                                <FaXmark className="h-5 w-5 text-white" />
                            ) : (
                                <FaBars className="h-5 w-5 text-white" />
                            )}
                        </button>
                    </div>
                </div>
                <ul
                    className={`md:hidden w-full gap-12 text-sm block space-y-4 bg-white ${
                        isMenuOpen ? 'h-auto transition-all ease-out duration-1000' : 'hidden h-0'
                    }`}
                >
                    {isLoginState ? (
                        <div className=" items-center flex-col gap-4">
                            <Link to="/new" className="flex gap-2 cursor-pointer hover:bg-slate-200 py-3 px-4">
                                <RiQuillPenLine size={23} />
                                <p>New</p>
                            </Link>
                            <Link
                                to={`/profile/${userId}`}
                                className="flex gap-2 cursor-pointer hover:bg-slate-200 py-3 px-4"
                            >
                                <FaRegCircleUser size={23} />
                                <p>Profile</p>
                            </Link>
                            <Link to="/reading-list" className="flex gap-2 cursor-pointer hover:bg-slate-200 py-3 px-4">
                                <IoBookmarkOutline size={23} />
                                <p>Readings</p>
                            </Link>
                            <Link to="/account" className="flex gap-2 cursor-pointer hover:bg-slate-200 py-3 px-4">
                                <IoSettingsOutline size={23} />
                                <p>Setting account</p>
                            </Link>
                            <button onClick={logout} className="flex gap-2 cursor-pointer hover:bg-slate-200 py-3 px-4">
                                <LiaSignOutAltSolid size={23} />
                                <p>Sign out</p>
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2 px-4 py-3">
                            <Link
                                to="/register"
                                className="border-gray-200 border-2 text-black px-6 py-2 font-medium rounded transition-all duration-200 ease-in"
                            >
                                Register
                            </Link>
                            <Link
                                to="/login"
                                className=" text-white bg-orange-500 px-6 py-2 font-medium rounded transition-all duration-200 ease-in"
                            >
                                Login
                            </Link>
                        </div>
                    )}
                </ul>
            </header>
        </>
    );
}

export default Header;
