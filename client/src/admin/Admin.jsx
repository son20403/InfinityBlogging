import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './pages/Sidebar';

const Admin = () => {
    const location = useLocation();
    return (
        <div className='flex gap-5'>
            {location.pathname !== "/admin/login" && <Sidebar />}
            <Outlet></Outlet>
        </div>
    );
};

export default Admin;