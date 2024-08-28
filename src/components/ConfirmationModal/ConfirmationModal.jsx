import React from "react";

function ConfirmationModal({ isOpen, onClose, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <h2 className="text-xl mb-4">أين تريد الذهاب؟</h2>
        <div className="flex justify-between">
          <button
            onClick={() => onConfirm("/talemat-mekyas")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            المقياس
          </button>
          <button
            onClick={() => onConfirm("/")}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            الرئيسية
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default ConfirmationModal;
