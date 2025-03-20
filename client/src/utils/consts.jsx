import {ADMIN_ROUTE, DEFAULT_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PROPERTIES_ROUTE, REGISTER_ROUTE} from "../routes.jsx";
import Admin from "../pages/Admin.jsx";
import Home from "../pages/Home.jsx";
import Auth from "../pages/Auth.jsx";
import Properties from "../pages/Properties.jsx";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin,
    }
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home,
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth,
    },
    {
        path: REGISTER_ROUTE,
        Component: Auth,
    },
    {
        path: PROPERTIES_ROUTE,
        Component: Properties,
    },
    {
        path: DEFAULT_ROUTE,
        Component: Home,
    }
]