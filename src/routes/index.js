import Home from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/login', component: LoginPage, layout: null },
    { path: '/sign-up', component: SignUpPage, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
