import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from 'axios';
import { getToken } from "../utils/auth";
const ReviewForm = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [reviewText, setReviewText] = useState("");


    



const handleSubmit = async (e) => {
  e.preventDefault();

  if (rating === 0) {
    alert("Please select a rating");
    return;
  }

  if (reviewText.trim() === "") {
    alert("Please write a review");
    return;
  }

  const data = { rating, reviewText };

  try {
    const token = getToken();
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/review/createReview`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('success question', response.data);

    if (response.status === 201 || response.status === 200) {
      alert('Review submitted successfully!');
      setRating(0);
      setReviewText("");
    } else {
      alert('Failed to submit review');
    }
  } catch (error) {
    alert('Error: ' + (error.response?.data?.message || error.message));
    console.log('Error: ' + (error.response?.data?.message || error.message));
  }
};

    return (
        <div className="div bg-gray-100 w-full h-screen py-15">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-2xl">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Your Review</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block text-gray-700 mb-2 font-medium">Rating:</label>
                    <div className="flex space-x-1 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                size={30}
                                className="cursor-pointer"
                                color={(hover || rating) >= star ? "orange" : "gray"}
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(null)}
                            />
                        ))}
                    </div>

                    <label htmlFor="review" className="block text-gray-700 mb-2 font-medium">
                        Review:
                    </label>
                    <textarea
                        id="review"
                        rows="4"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 mb-6"
                        placeholder="Write your review here..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                     
                    />

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white font-semibold py-3 rounded-md hover:bg-orange-600 transition-colors duration-300"
                    >
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;
