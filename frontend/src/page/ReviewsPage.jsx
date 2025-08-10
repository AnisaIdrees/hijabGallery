import { FiEdit, FiTrash2 } from 'react-icons/fi'; // Feather icons
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUser } from "../utils/auth";
import EditReviewModal from '../components/modal/EditReviewModal';
import ReviewText from '../components/ReviewText';
import { toast, ToastContainer } from 'react-toastify';
import { FaArrowLeft } from "react-icons/fa6";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("token");
  const currentUser = getUser()
  const currentUserId = currentUser?._id



  // ******************* handle edit **************** //
  const handleEdit = (id) => {
    const reviewToEdit = reviews.find((r) => r._id === id); // ✅ sirf ek review lo
    setSelectedReview(reviewToEdit);
    setIsModalOpen(true);
  };
  const handleUpdateReview = async ({ text, rating }) => {
    if (!selectedReview?._id) return;
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/review/editReview/${selectedReview._id}`,
        { reviewText: text, rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchReviews(); // update ke baad refresh
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error updating review", err);
    }
  };

  // ******************* handle delete **************** //
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/review/deleteReview/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Delete forntend
      setReviews((prevReviews) => prevReviews.filter((review) => review._id !== id));
    } catch (error) {
      alert("Failed to delete review");
      console.error(error);
    }
    toast.success("Deleted successfully");
  };


  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/review/allReview`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setReviews(res.data.reviews);
      } else {
        setError("Failed to load reviews");
      }
      setLoading(false);
    } catch (error) {
      setError("Failed to load reviews");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [])


  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (reviews.length === 0) return <div className="text-center p-10">No reviews found.</div>;

  return (
    <>
      <div className="py-10 bg-gray-100 min-h-screen">
        {/* Header with Back Link */}
        <div className="max-w-7xl mx-auto px-4 mb-6">
          {/* Back Button */}
          <a
            href="/home"
            className="flex items-center text-orange-600 hover:text-orange-800 font-semibold text-sm sm:text-base"
          >
            <FaArrowLeft size={25} className='mb-9'/>
          </a>
          {/* Top bar for Back Button & Heading */}
          <div className="flex flex-col sm:flex-row  justify-center items-center  relative gap-3">


            {/* Heading */}
            <h1 className="text-3xl sm:text-3xl pb-4 font-bold text-gray-800 text-center sm:text-left">
              Customer Reviews
            </h1>
          </div>
        </div>



        {/* Reviews Container */}
        <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-4">
          {reviews.map((review) => {
            const userName = review.userId?.name || "Anonymous";
            const initial = userName.charAt(0).toUpperCase();

            return (
              <div
                key={review._id}
                className="bg-white rounded-lg shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition duration-200 border border-orange-100"
              >
                {/* User Info */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-lg">
                    {initial}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{userName}</h3>
                    <time className="text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </time>
                  </div>
                </div>

                {/* Rating */}
                <Stars rating={review.rating} />



                <ReviewText
                  text={review.reviewText}
                  limit={120}
                  className="text-gray-700 whitespace-pre-line my-3 flex-1"
                />


                {/* Edit/Delete (Only for Current User) */}
                {review.userId?._id === currentUserId && (
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      type="button"
                      className="p-2 text-orange-500 rounded-full hover:bg-orange-100 transition"
                      onClick={() => handleEdit(review._id)}
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="p-2 text-red-500 rounded-full hover:bg-red-100 transition"
                      onClick={() => handleDelete(review._id)}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Edit Modal */}
        <EditReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdateReview}
          review={selectedReview}
        />
        <ToastContainer position="top-center" theme="light" />

      </div>

    </>
  );
};

// *********************************  rating start *******************************//
const Stars = ({ rating, total = 5 }) => {
  const safeRating = Math.min(Math.max(Math.floor(rating) || 0, 0), total);
  const fullStars = safeRating;
  const emptyStars = total - safeRating;

  const fullStarSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-yellow-400"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.157c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.955c.3.922-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.783.57-1.838-.196-1.538-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.018 9.382c-.783-.57-.38-1.81.588-1.81h4.157a1 1 0 00.95-.69l1.286-3.955z" />
    </svg>
  );
  const emptyStarSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-300"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.157c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.955c.3.922-.755 1.688-1.538 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.783.57-1.838-.196-1.538-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.018 9.382c-.783-.57-.38-1.81.588-1.81h4.157a1 1 0 00.95-.69l1.286-3.955z" />
    </svg>
  );

  return (
    <div className="flex space-x-0.5" aria-label={`Rating: ${rating} out of ${total} stars`}>
      {[...Array(fullStars)].map((_, i) => (
        <span key={"full" + i}>{fullStarSVG}</span>
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={"empty" + i}>{emptyStarSVG}</span>
      ))}
    </div>
  );
};


export default ReviewsPage;
