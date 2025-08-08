import React from 'react'
import ConfirmModal from "../components/modal/ConfirmModal.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosLogOut, IoMdAddCircleOutline } from "react-icons/io";
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUser, removeToken, removeUser, getToken } from '../utils/auth.js';
import axios from "axios";

function Home() {
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = getUser();
  const navigate = useNavigate()
  const handleLogout = () => {
    removeUser();
    removeToken();
    console.log('logout hogyaaa');
    navigate("/");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/hijab-styles`);
        setStyles(response.data);
      } catch (err) {
        setError("Failed to fetch hijab styles");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClick = (id) => {
     const checkID= navigate(`/addReview/${id}`);
     console.log(checkID,"idcard");
     
  };

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        {error}
      </div>
    );

  return (

    <>
      <div className="min-h-screen bg-gray-100">

        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto px-6 py-4 bg-black shadow-md sticky top-0 z-10">

          {/* Logo */}
          <div className="text-orange-500 text-3xl font-extrabold cursor-pointer select-none mb-3 sm:mb-0">
            Hijab<span className="text-white">Styles</span>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-4 sm:gap-6">

            {/* Add Review Icon */}
            <NavLink
              to='/reviews'
              onClick={() => alert('Add Review clicked!')} // 
              className="flex items-center gap-1 text-orange-500 hover:text-orange-400 transition text-lg"
              title="Add Review"
            >
              {/* <IoMdAddCircleOutline size={28} /> */}
              <span className="hidden sm:inline font-semibold"> Review</span>
            </NavLink>

            {/* Logout Button */}
            <div
              onClick={() => { setLogoutOpen(true); handleLogout }}
              className="flex items-center bg-orange-500 gap-3 hover:bg-red-500 px-3 py-2 rounded transition text-sm cursor-pointer"
            >

              <span className="text-xl"><IoIosLogOut /></span>
              {<span>Logout</span>}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-orange-600">
            Hijab Styles
          </h1>

          {/* Styles Grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {styles.map((style) => (
              <div
                onClick={() => handleClick(style.id)}
                key={style.id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-orange-600 mb-2">
                    {style.name}
                  </h2>
                  <p className="text-gray-700 text-sm">{style.description}</p>
                </div>
              </div>
            ))}
          </div>

        </main>
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
    </>

  )
}

export default Home