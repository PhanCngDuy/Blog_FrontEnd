import AuthLayout from '~/Layout/AuthLayout';
import Home from '~/pages/Home/Home';
import Login from '~/pages/Auth/Login';
import Register from '~/pages/Auth/Register';
import CreateNewPost from '~/pages/Post/CreateNewPost';
import Profile from '~/pages/Profile/Profile';
import PostDetails from '~/pages/Post/PostDetails';
import AccountSetting from '~/pages/AccountSetting/AccountSetting';
import EditPost from '~/pages/Post/EditPost';
import ReadingList from '~/pages/ReadingList/ReadingList';
import Searching from '~/pages/Searching/Searching';

export const publicRoute = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
        layout: AuthLayout,
    },
    {
        path: '/register',
        component: Register,
        layout: AuthLayout,
    },
    {
        path: '/post/:title',
        component: PostDetails,
    },
    {
        path: '/edit/:title',
        component: EditPost,
    },
    {
        path: '/new',
        component: CreateNewPost,
    },
    {
        path: '/profile/:userId',
        component: Profile,
    },
    {
        path: '/account',
        component: AccountSetting,
    },
    {
        path: '/reading-list',
        component: ReadingList,
    },
    {
        path: '/searching',
        component: Searching,
    },
];
