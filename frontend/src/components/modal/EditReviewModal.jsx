import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const EditReviewModal = ({ isOpen, onClose, review ,onSave}) => {
  const [editText, setEditText] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (review) {
      setEditText(review.reviewText || "");
      setRating(review.rating || 0);
    }
  }, [review]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full relative p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-xl font-bold"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Edit Review</h2>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              size={24}
              className={`cursor-pointer transition-colors duration-200 ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>

        {/* Review Text */}
        <textarea
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="w-full border rounded-md p-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
          rows={4}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
          type="button"
            onClick={() => onSave({ text: editText, rating })}
            className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReviewModal;
