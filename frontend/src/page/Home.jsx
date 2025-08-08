import React from 'react'
import ConfirmModal from "../components/modal/ConfirmModal.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosLogOut } from "react-icons/io";
import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, removeToken, removeUser ,getToken } from '../utils/auth.js';
import axios from "axios";
import ReviewForm from '../components/ReviewForm.jsx';

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

    if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;
    if (error)
        return (
            <div className="text-center mt-10 text-red-500 font-semibold">
                {error}
            </div>
        );

    return (
        <div>

            <div

                onClick={() => { setLogoutOpen(true) }}
                className="flex items-end w-[100px]  gap-3 hover:bg-red-500 px-3 py-2 rounded transition text-sm cursor-pointer"
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
            <div className='w-full  h-full bg-gray-100'>
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-8 text-center text-purple-700">
                        Hijab Styles
                    </h1>

                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {styles.map((style) => (
                            <div
                                key={style.id}
                                className="bg-white cursor-pointer rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <img
                                    src={style.image}
                                    alt={style.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold text-purple-600 mb-2">
                                        {style.name}
                                    </h2>
                                    <p className="text-gray-700 text-sm">{style.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
<ReviewForm/>
        </div>
        
    )
}

export default Home