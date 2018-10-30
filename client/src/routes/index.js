import RootRoute from './root/root';
import LoginRoute from './Forms/login_route';
import SignUpRoute from './Forms/sign_up_route';

const mainRoutes = [
    {
        path: '/',
        component: RootRoute
    },
    {
        path: '/create_account',
        component: SignUpRoute
    },
    {
        path: '/login',
        component: LoginRoute
    }
];

export {
    mainRoutes
}