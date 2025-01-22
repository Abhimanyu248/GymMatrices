// src/components/ConfirmationAlert.jsx
import React from "react";

const ConfirmationAlert = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null; // Do not render if the alert box is not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Delete Confirmation</h2>
        <p className="text-sm text-gray-400 mb-6">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationAlert;
