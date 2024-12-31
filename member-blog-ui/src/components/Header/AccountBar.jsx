import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoading, isNotLoading } from '~/redux/slice/LoadingSlice';
import { logoutSuccess } from '~/redux/slice/AuthSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function AccountBar({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex border-none justify-center gap-x-1.5  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm outline-none">
                    <div className="flex items-center gap-2 text-white">
                        <div className="rounded-full overflow-hidden">
                            <img
                                src={
                                    user.avatar
                                        ? `${import.meta.env.VITE_API_URL}/uploads/files/${user.avatar}`
                                        : `https://flowbite.com/docs/images/people/profile-picture-2.jpg`
                                }
                                alt="avatar"
                                className="w-10 h-10 object-cover"
                            />
                        </div>
                        <p>{user?.displayName}</p>
                    </div>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to={`/profile/${user.id}`}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm',
                                    )}
                                >
                                    Profile
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to="/reading-list"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm',
                                    )}
                                >
                                    Readings
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to="/account"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm',
                                    )}
                                >
                                    Setting Account
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={logout}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block w-full px-4 py-2 text-left text-sm',
                                    )}
                                >
                                    Sign out
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
