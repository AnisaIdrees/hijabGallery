import React from 'react'
import { Navigate } from 'react-router-dom'
import { getToken, getUser } from '../utils/auth'

function ProtectedRoutes({ children}) {
    const token = getToken()
    const user = getUser()

    const isLoggedIn = token && user
   

    if (!isLoggedIn) return <Navigate to='/auth' replace />


    return children
}

export default ProtectedRoutes