import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loading from "../pages/Loading";
import { AuthProvider } from "../contexts/authContext";
import { ThemeProvider } from "@material-tailwind/react";

import App from "../App";
import Admin from "../admin/Admin";

import ScrollToTop from "../components/ScrollToTop";
const NotFound404 = lazy(() => import("../pages/NotFound404"));

const EditAdmin = lazy(() => import("../admin/pages/EditAdmin"));
const ListAdmin = lazy(() => import("../admin/pages/ListAdmin"));
const AddAdmin = lazy(() => import("../admin/pages/AddAdmin"));
const AddCustomer = lazy(() => import("../admin/pages/AddCustomer"));
const EditCustomer = lazy(() => import("../admin/pages/EditCustomer"));
const ListCustomer = lazy(() => import("../admin/pages/ListCustomer"));
const AddCategory = lazy(() => import("../admin/pages/AddCategory"));
const AddPost = lazy(() => import("../admin/pages/AddPost"));
const LoginAdmin = lazy(() => import("../admin/authentication/LoginAdmin"));
const ListPost = lazy(() => import("../admin/pages/ListPost"));
const ListCategory = lazy(() => import("../admin/pages/ListCategory"));
const EditPost = lazy(() => import("../admin/pages/EditPost"));
const EditCategory = lazy(() => import("../admin/pages/EditCategory"));


const Signup = lazy(() => import("../pages/Signup"));
const Home = lazy(() => import("../pages/Home"));
const Signin = lazy(() => import("../pages/Signin"));
const Detail = lazy(() => import("../pages/Detail"));
const InfoUser = lazy(() => import("../pages/InfoUser"));
const PageAdd = lazy(() => import("../pages/PageAdd"));
const ListAllPost = lazy(() => import("../pages/ListAllPost"));
const ListPostByCategory = lazy(() => import("../pages/ListPostByCategory"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppWrapper />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/signin", element: <Signin /> },
            { path: "/signup", element: <Signup /> },
            { path: "/detail-post/:slug", element: <Detail /> },
            { path: "/info-user/:id", element: <InfoUser /> },
            { path: "/add-post", element: <PageAdd /> },
            { path: "/list-all-post", element: <ListAllPost /> },
            { path: "/list-post-category/:slug", element: <ListPostByCategory /> }
        ]
    },
    {
        path: "/admin",
        element: <AppAdminWrapper />,
        children: [
            { path: "", element: <ListPost /> },
            { path: "list-post", element: <ListPost /> },
            { path: "login", element: <LoginAdmin /> },
            { path: "edit-post/:slug", element: <EditPost /> },
            { path: "edit-customer/:id", element: <EditCustomer /> },
            { path: "edit-admin/:id", element: <EditAdmin /> },
            { path: "edit-category/:slug", element: <EditCategory /> },
            { path: "list-category", element: <ListCategory /> },
            { path: "list-customer", element: <ListCustomer /> },
            { path: "list-admin", element: <ListAdmin /> },
            { path: "add-post", element: <AddPost /> },
            { path: "add-category", element: <AddCategory /> },
            { path: "add-customer", element: <AddCustomer /> },
            { path: "add-admin", element: <AddAdmin /> },
        ]
    },
    { path: "/not-found", element: <NotFound404 /> },
    { path: "*", element: <NotFound404 /> }
]);

function AppWrapper() {
    return (
        <Suspense fallback={<Loading />}>
            <ScrollToTop />
            <AuthProvider>
                <ThemeProvider model='tokenUser' infoModel='userInfo'>
                    <App />
                </ThemeProvider>
            </AuthProvider>
        </Suspense>
    );
}
function AppAdminWrapper() {
    return (
        <Suspense fallback={<Loading />}>
            <ScrollToTop />
            <AuthProvider model="tokenAdmin" infoModel="infoAdmin">
                <ThemeProvider>
                    <Admin />
                </ThemeProvider>
            </AuthProvider>
        </Suspense>
    );
}
