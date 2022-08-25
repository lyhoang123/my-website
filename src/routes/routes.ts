import Login from "pages/auth/login";
import Register from "pages/auth/register";

export const ROUTES_AUTH = {
    Login: {
        path: '/',
        Component: Login,
    },
    Register: {
        path: '/register',
        Component: Register,
    }
}

