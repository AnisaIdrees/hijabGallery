import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function ForgotPswd() {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    const handleForgotPswd = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/forgot-password`, { email })
            setEmail('');
            setMessage(data.message)
            console.log(data.message);
            toast.success('Email sent',data.message)

        } catch (error) {
            console.log("Forgot session Failed : ", error.message);
            toast.error("Forgot session Failed : ", error.message)

        }
    }

    return (
        <>
            <div className="flex items-center py-6 justify-center min-h-screen bg-gray-100">
                <div className="form-box  w-full max-w-md mt-6 p-[30px] bg-[#fffbfb] rounded-2xl shadow-2xl">
                    <form className="space-y-5"
                        onSubmit={handleForgotPswd}>
                        <div className='input-box'>
                            <label className="label block mb-3 text-md font-medium text-[#000000b7] mt-8">
                                Email
                            </label>
                            <input
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="w-full px-4 py-[10px] bg-[#d1c9c95b] border-none border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 transition"
                                placeholder="you@example.com"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-transform transform hover:scale-105"
                        >
                            Reset
                        </button>
                    </form>
                </div>
                  <ToastContainer position="top-center" theme="light" />
            </div>
          
        </>
    )
}

export default ForgotPswd