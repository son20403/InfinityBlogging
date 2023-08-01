import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/index';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer autoClose={1000} style={{ zIndex: '9999999' }}></ToastContainer>
  </>
)
