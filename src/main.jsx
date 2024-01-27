import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignUpPage.jsx'
import AllPostsPage from './pages/AllPostsPage.jsx'
import AddNewPostFormPage from './pages/AddNewPostFormPage.jsx'
import EditPostFormPage from './pages/EditPostFormPage.jsx'
import ReadPostPage from './pages/ReadPostPage.jsx'
import { ProtectedLayout } from './components/index.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "login",
            element: (
                <ProtectedLayout authentication={false}>
                    <LoginPage />
                </ProtectedLayout>
            ),
        },
        {
            path: "signup",
            element: (
                <ProtectedLayout authentication={false}>
                    <SignupPage />
                </ProtectedLayout>
            ),
        },
        {
            path: "all-posts",
            element: (
                <ProtectedLayout authentication>
                    {" "}
                    <AllPostsPage />
                </ProtectedLayout>
            ),
        },
        {
            path: "add-post",
            element: (
                <ProtectedLayout authentication>
                    {" "}
                    <AddNewPostFormPage />
                </ProtectedLayout>
            ),
        },
        {
            path: "edit-post/:slug",
            element: (
                <ProtectedLayout authentication>
                    {" "}
                    <EditPostFormPage />
                </ProtectedLayout>
            ),
        },
        {
            path: "post/:slug",
            element: <ReadPostPage />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
