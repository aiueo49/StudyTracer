import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  const handleBackgroundClick = (event) => {
    onClose(event);
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50" onClick={handleBackgroundClick}>
      <div className="bg-white p-4 rounded w-3/4 h-3/4 flex flex-col" onClick={handleModalClick}>
        <div className="flex-grow overflow-auto">
          {children}
        </div>
        <div className="mt-4">
          <button
            className="w-full px-4 py-2 text-lg bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={onClose}>
              閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;