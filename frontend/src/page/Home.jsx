import React from 'react'
import ConfirmModal from "../components/modal/ConfirmModal.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosLogOut, IoMdAddCircleOutline } from "react-icons/io";
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUser, removeToken, removeUser, getToken } from '../utils/auth.js';
import axios from "axios";
import { FiMenu, FiX } from "react-icons/fi";

function Home() {
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);
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
    const checkID = navigate(`/addReview/${id}`);
    console.log(checkID, "idcard");

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
        <header className="flex flex-wrap sm:flex-nowrap justify-between items-center max-w-full mx-auto px-6 py-5 bg-black shadow-md sticky top-0 z-10">

          {/* Logo */}
          <div className="text-orange-500 text-3xl font-extrabold cursor-pointer select-none">
            Hijab<span className="text-white">Styles</span>
          </div>

          {/* Toggle Button - Mobile Only */}
          <div className="sm:hidden text-orange-500 text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-6">
            <NavLink
              to="/reviews"
              className="flex items-center gap-1 text-orange-500 hover:text-orange-400 transition text-lg"
            >
              <span className="font-semibold">Reviews</span>
            </NavLink>

            <div
              onClick={() => { setLogoutOpen(true); }}
              className="flex items-center bg-orange-500 gap-3 hover:bg-red-500 px-3 py-2 rounded transition text-sm cursor-pointer"
            >
              <span className="text-xl"><IoIosLogOut /></span>
              <span>Logout</span>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
            <div className="w-full sm:hidden mt-4 bg-black rounded-lg p-4 space-y-3">
              <NavLink
                to="/reviews"
                className="block text-orange-500 hover:text-orange-400 transition text-lg"
                onClick={() => setMenuOpen(false)}
              >
                Reviews
              </NavLink>

              <div
                onClick={() => { setLogoutOpen(true); setMenuOpen(false); }}
                className="flex items-center bg-orange-500 gap-3 hover:bg-red-500 px-3 py-2 rounded transition text-sm cursor-pointer"
              >
                <span className="text-xl"><IoIosLogOut /></span>
                <span>Logout</span>
              </div>
            </div>
          )}
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-13">

          <h1 className="pb-4 text-3xl sm:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-orange-500 to-rose-600 text-transparent bg-clip-text">
            Hijab Styles
          </h1>

          {/* Styles Grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {styles.map((style) => (
              <div
                onClick={() => handleClick(style.id)}
                key={style.id}
                className="bg-white px-4 py-4  shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
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