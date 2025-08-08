
import React from "react";
const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure?",
    description = "",
    confirmText = "Confirm",
    cancelText = "Cancel",
    data = null
}) => {
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
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>

                {/* Body */}
                <p className="text-gray-700 text-sm mb-1">{description}</p>

                {data && (
                    <div className="bg-gray-100 p-3 rounded-md mb-4">
                        <p className="font-semibold py-3">{data.name || data.title || "Item"}</p>
                        <p className="text-sm text-gray-600 pb-3">{data.description || ""}</p>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
