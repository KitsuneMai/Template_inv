import React from "react";
import ReactDOM from "react-dom";

interface OverlayPortalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const OverlayPortal: React.FC<OverlayPortalProps> = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default OverlayPortal;

