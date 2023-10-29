// components/Modal.tsx
import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-black p-6 rounded-lg shadow-lg w-full md:w-10/12 border-2">
        <button onClick={onClose} className="float-right px-3 py-1 text-lg font-bold text-red-500">
          X
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
