import React from 'react'
import ConfirmModal from "../components/modal/ConfirmModal.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosLogOut } from "react-icons/io";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, removeToken, removeUser } from '../utils/auth.js';

function Home() {
    const [logoutOpen, setLogoutOpen] = useState(false)
    const user = getUser();
    const navigate = useNavigate()
        const handleLogout = () => {
        removeUser();
        removeToken();
        console.log('logout hogyaaa');
        navigate("/");
    }

    return (
        <div>Home

            <div

                onClick={() => { setLogoutOpen(true) }}
                className="flex items-center gap-3 hover:bg-red-500 px-3 py-2 rounded transition text-sm cursor-pointer"
            >
                <span className="text-xl"><IoIosLogOut /></span>
                {<span>Logout</span>}
            </div>
             <ConfirmModal
                isOpen={logoutOpen}
                onClose={() => setLogoutOpen(false)}
                onConfirm={handleLogout}
                title="Confirm Logout"
                description="Are you sure you want to logout?"
                confirmText="Logout"
                cancelText="Cancel"
            />

        </div>
    )
}

export default Home