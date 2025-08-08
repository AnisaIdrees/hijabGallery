import axios from 'axios';
import {getToken} from '../utils/auth.js'

export const fetchUserFromServer =()=>{
    const token = getToken()
    if(!token)return null

    const res = axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/profile`,{
        headers:{Authorization:`Bearer ${token}`}
    })
   return res.data.user
}