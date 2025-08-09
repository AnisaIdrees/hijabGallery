import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AuthForm from '../components/auth/AuthForm'
import App from '../App'
import ForgotPswd from '../components/ForgotPswd'
import ResetPaswd from '../components/ResetPaswd'
import Home from '../page/Home'
import ReviewForm from '../components/ReviewForm'
import ReviewsPage from '../page/ReviewsPage'
import ProtectedRoute from '../components/ProtectedRoute'






const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [

            // public routes
            { path: '/', element: <AuthForm /> },
            { path: 'forgot-password', element: <ForgotPswd /> },
            { path: 'reset-password/:token', element: <ResetPaswd /> }
        ]
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/addReview/:id',
        element: (
            <ProtectedRoute>
                <ReviewForm />
            </ProtectedRoute>
        ),
    },
    {
        path: '/reviews',
        element: (
            <ProtectedRoute>
                <ReviewsPage />
            </ProtectedRoute>
        )
    },

])


export default router