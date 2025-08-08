


import { FiEdit, FiTrash2 } from 'react-icons/fi'; // Feather icons
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUser } from "../utils/auth";

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

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const currentUser = getUser()
  const currentUserId = currentUser?._id

  const handleEdit = (id) => {
    // Your edit logic here
    alert("Edit review: " + id);
  };

  const handleDelete = (id) => {
    // Your delete logic here
    alert("Delete review: " + id);
  };

  useEffect(() => {
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

    fetchReviews();
  }, []);

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
  if (reviews.length === 0) return <div className="text-center p-10">No reviews found.</div>;

  return (
    <div className="py-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center py-5 mb-6 text-gray-800">Customer Reviews</h1>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">

        {reviews.map((review) => {
          const userName = review.userId?.name || "Anonymous";
          const initial = userName.charAt(0).toUpperCase();

          return (
            <div key={review._id} className="border-b border-gray-100 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-semibold text-lg">
                    {initial}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{userName}</h3>
                </div>

                <Stars rating={review.rating} />

                <time className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </time>
              </div>

              <p className="text-gray-700 whitespace-pre-line">{review.reviewText}</p>

              {/* Show Edit/Delete only for reviews of logged-in user */}
              {review.userId?._id === currentUserId && (
                <div className=" flex  justify-end space-x-1 mt-2 ">
                  <button
                    className="px-1 py-1 text-green-500 rounded"
                    onClick={() => handleEdit(review._id)}
                  >
                  <FiEdit className="mr-1" />
                  </button>
                  <button
                    className=" py-1 text-red-500  rounded"
                    onClick={() => handleDelete(review._id)}
                  >
                    <FiTrash2 className="mr-1" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewsPage;
