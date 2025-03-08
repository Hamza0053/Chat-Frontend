import { useState, useEffect } from "react";
import LoadingSpinner from "../Loader/LoadingSpinner";
import { useAuth, useLoading } from "../../hooks/useAuth";


export default function LogoutModal({ onConfirm, onCancel }) {
  const [open, setOpen] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const { setLoading } = useLoading()
  const { LogOutHandler } = useAuth();
  useEffect(() => {
    if (open) {
      setTimeout(() => setIsVisible(true), 10); // Small delay for smooth transition
    }
  }, [open]);

  const handleConfirm = async () => {
    setIsVisible(false);
    setOpen(false);
    setLoading(true)
    const success = await LogOutHandler()
    if (success) {
      setLoading(false)
    }
  };

  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(() => {
      setOpen(false);
      onCancel();
    }, 300);
  };

  return (
    <>
      {
        open && (
          <div className={`fixed inset-0 flex items-center justify-center bg-gray-900/40 z-20 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <div className={`bg-white rounded-lg overflow-hidden border border-gray-300/20 shadow-lg shadow-black/10 w-96 transform transition-transform duration-300 ${isVisible ? "scale-100" : "scale-95"}`}>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-black text-start">Log out confirmation</h2>
                <p className="text-start text-gray-600 mt-1">Are you sure you want to log out?</p>
              </div>
              <div className="flex justify-center bg-gray-300/90 gap-2 p-6 border-t-2 border-gray-300 py-6">
                <button
                  className="px-4 py-1 w-1/2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  onClick={handleConfirm}
                >
                  Yes
                </button>
                <button
                  className="px-4 py-1 w-1/2 bg-white text-gray-700 rounded-md hover:bg-gray-50"
                  onClick={handleCancel}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}
