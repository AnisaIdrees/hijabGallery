import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AuthForm from '../components/auth/AuthForm'
import App from '../App'
import ForgotPswd from '../components/ForgotPswd'
import ResetPaswd from '../components/ResetPaswd'
import Home from '../page/Home'
import ReviewForm from '../components/ReviewForm'






const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [

            // public routes
            { path: '/', element: <AuthForm /> },
            // { path: '/', element: <h1>Hello</h1> },
            { path: 'forgot-password', element: <ForgotPswd/> },
            { path: 'reset-password/:token', element: <ResetPaswd/> }
        ]
    },
    {
       path:'/home' ,
       element:<Home/>
    },
        {
       path:'/addReview' ,
       element:<ReviewForm/>
    }

  
])


export default router