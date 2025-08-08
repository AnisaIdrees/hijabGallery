import React from 'react'
import { data, NavLink, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios'
import { setToken, setUser } from '../../utils/auth';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";




function AuthForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login')
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: ""
  })

  const hadleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.name]: e.target.value
      }
    )
    console.log(e.target.value);
  }


  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, formData)


      if (data.success) {
        console.log('sign up successfully ', data.message);
        console.log('sign up data ', data);
          console.log("Token:", data.token); 
        setToken(data.token)
        setUser(data.user)
        setFormData({
          name: "",
          email: "",
          contact: "",
          password: ""
        });


        if (data.user.role === 'admin') {
          toast.success('Admin SignUp Successfully !')
        }
        else {
          toast.success('User SignUp Successfully !')

        }

        setTimeout(() => {
          navigate("/home");
        }, "7000");


      } else {
        toast.error(data.message)
        console.log("Signup Fail ", data.message);
        toast.error("Signup fail!", data.message);
      }

    }

    catch (error) {
      toast.error(`Error ${e.message}`)
      console.log('sign up failes', error.message);

    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, formData)


      if (data.success) {
        console.log('login successfully ', data.message);
        console.log('login successfully ', data);
        setToken(data.token)
        setUser(data.user)
        setFormData({
          email: "",
          password: ""
        });

        if (data.user.role === 'admin') {
          toast.success('Admin login Successfully !')
        } else {
          toast.success('User login Successfully !')
        }

        setTimeout(() => {
          navigate("/home");
        }, "7000");



      } else {
        toast.error(data.message)
        console.log("login Fail ", data.message);
      }

    }

    catch (error) {
      toast.error(`Error ${data.message}`)
      console.log('login failes', error.message);

    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
        <div className="form-box  w-full max-w-md py-5 p-[30px] bg-[#fffbfb] rounded-2xl shadow-2xl">
          <h2 className="heading text-[26px] py-4 font-bold text-left text-black">
            {activeTab === 'login' ? (
              <>
                <span className="text-[#000000b4] ">Login</span>{""}
              </>
            ) : (
              <>
                <span className=" text-[#000000b4]">Sign Up</span>{""}
              </>
            )}


          </h2>
          {/*signup form  */}
          {activeTab === 'signUp' && (
            <form className="space-y-5"
              onSubmit={handleSignUp}
            >
              <div className='input-box'>
                <label className="label block mb-1 text-sm font-medium text-[#000000b7]">
                  Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={hadleChange}
                  type="text"
                  className="w-full px-4 py-[10px] bg-[#d1c9c95b] border-none border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 transition"
                  placeholder="Full Name"
                />
              </div>

              <div className='input-box'>
                <label className="label block mb-2 text-sm font-medium text-[#000000b7]">
                  Email
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={hadleChange}
                  type="email"
                  className="w-full px-4 py-[10px] bg-[#d1c9c95b] border-none border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 transition"
                  placeholder="you@example.com"
                />
              </div>

              <div className='input-box'>
                <label className="label block mb-1 text-sm font-medium text-[#000000b7]">
                  Contact
                </label>
                <input
                  name="contact"
                  value={formData.contact}
                  onChange={hadleChange}
                  type="text"
                  className="w-full px-4 py-[10px] bg-[#d1c9c95b] border-none border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 transition"
                  placeholder="contact"
                />
              </div>

              <div className='input-box'>
                <label className="label block mb-1 text-sm font-medium text-[#000000b7]">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    value={formData.password}
                    onChange={hadleChange}
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

              <button
                type="submit"
                className="submit w-full py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition duration-300 font-semibold"
              >
                Sign Up
              </button>
            </form>

          )}

          {/*login  form  */}

          {activeTab === 'login' && (
            <form className="space-y-5" onSubmit={handleLogin}>


              <div className='input-box'>
                <label className="label block mb-2 text-sm font-medium text-[#000000b7]">
                  Email
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={hadleChange}
                  type="email"
                  className="w-full px-4 py-[10px] bg-[#d1c9c95b] border-none  border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 transition"
                  placeholder="you@example.com"
                />
              </div>

              <div className='input-box'>
                <label className="label block mb-1 text-sm font-medium text-[#000000b7]">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    value={formData.password}
                    onChange={hadleChange}
                    type={showPassword ? "text" : "password"}
                    className="w-full  px-4 py-[10px] bg-[#d1c9c95b] border-none border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400 transition"
                    placeholder="••••••••"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <NavLink to='/forgot-password' className='forgot-paswd text-orange-500 py-2 hover:underline cursor-pointer text-[14px] '>
                  forgot password ?</NavLink>
              </div>

              <button
                type="submit"
                className="submit w-full py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition duration-300 font-semibold"
              >
                {activeTab === 'login' ? (
                  <>
                    Login
                  </>
                ) : (
                  <>
                    Sign up
                  </>
                )}
              </button>
            </form>
          )}

          <p className="tab text-sm py-3 text-center text-black">
            {activeTab === 'login' ? (
              <>
                Already have an account?{" "}

                <span className="text-orange-500 hover:underline cursor-pointer" onClick={() => setActiveTab('signUp')}>
                  SignUp
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}

                <span className="text-orange-500 hover:underline cursor-pointer" onClick={() => setActiveTab('login')}>
                  login
                </span>
              </>
            )}

          </p>
        </div>
        <ToastContainer position="top-center" theme="light" />
       
      </div>
      
    </>
  )
}

export default AuthForm