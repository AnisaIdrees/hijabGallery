import axios from 'axios';
import React, { useState } from 'react'
import { data, useNavigate, useParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ResetPaswd = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const { token } = useParams();
    const navigate = useNavigate()




    const handleResetPswd = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/reset-password`, { token, password })
            setPassword("");
            setConfirmPassword("");
            console.log(data?.message);
            toast.success(data?.message)
            setTimeout(() => {
                navigate("/");
            }, 7000);


        } catch {
            (e) => {
                console.log("Reset Password Failed : ", e);
                toast.error(e, data.message)

            }
        }


    }


    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        if (!password.includes(e.target.value)) {
            setError("Password not match")

        } else {
            setError("password matched!!")

        }

    }

    return (
       <>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">
                <h1 className='text-2xl'>Reset Password</h1>
                <form onSubmit={handleResetPswd} className="space-y-4">

                    <div className='input-box'>
                        <label className="label block mb-1 text-sm font-medium text-[#000000b7]">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? "text" : "password"}
                                className="w-full px-4 py-[10px] bg-[#d1c9c95b] border-none border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 transition"
                                placeholder="•••••"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className='label block mb-1 text-sm font-medium text-[#000000b7]'>Confirm Password</label>
                        <div className="relative">
                            <input
                                name="password"
                                value={confirmPassword}
                                onChange={handleConfirmPassword}
                                type={showPassword ? "text" : "password"}
                                className="w-full px-4 py-[10px] bg-[#d1c9c95b] border-none border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 transition"
                                placeholder="Confirm your password"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    {error && (
                        <p className={error.includes('not') ? 'text-red-500'
                            : error.includes('matched') ? 'text-green-700'
                                : 'hidden'}>
                            {error}</p>
                    )}


                    <button

                        type="submit"
                        className="w-full px-4 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-transform transform hover:scale-105"
                    >
                        Reset
                    </button>
                </form>
            </div>
              <ToastContainer position="top-center" theme="light"/>
        </div>
      
       </>
    )
}

export default ResetPaswd