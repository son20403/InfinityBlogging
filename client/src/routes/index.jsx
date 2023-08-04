import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../pages/Loading";
import { AuthProvider } from "../contexts/authContext";

import App from "../App";
import { CategoryProvider } from "../contexts/categoryContext";
import ScrollToTop from "../components/ScrollToTop";
import NotFound404 from "../pages/NotFound404";
const Signup = lazy(() => import("../pages/Signup"));
const Home = lazy(() => import("../pages/Home"));
const Signin = lazy(() => import("../pages/Signin"));
const Detail = lazy(() => import("../pages/Detail"));
const InfoUser = lazy(() => import("../pages/InfoUser"));
const PageAdd = lazy(() => import("../pages/PageAdd"));
const ListAllPost = lazy(() => import("../pages/ListAllPost"));

export const router = createBrowserRouter([
    {
        path: "/",
        element:
            <Suspense fallback={<Loading />}>
                <ScrollToTop />
                <AuthProvider>
                    <CategoryProvider>
                        <App />
                    </CategoryProvider>
                </AuthProvider>
            </Suspense>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/signin",
                element: <Signin />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/detail-post/:slug",
                element: <Detail />,
            },
            {
                path: "/info-user/:id",
                element: <InfoUser />,
            },
            {
                path: "/add-post",
                element: <PageAdd />,
            },
            {
                path: "/list-all-post",
                element: <ListAllPost />,
            },
        ]
    },
    {
        path: "*",
        element:
            <>
                <NotFound404></NotFound404>
            </>,
        children: [
        ]
    }, {
        path: "/not-found",
        element:
            <>
                <NotFound404></NotFound404>
            </>,
        children: [
        ]
    }
]);