import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Modal = ({
  children,
  openModal,
  setOpenModal,
  openBtn,
  modalTitle,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <div className="w-fit" onClick={() => setOpenModal(true)}>
        {openBtn}
      </div>

      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 h-screen w-screen grid place-content-center bg-black/50 z-50 transition-all duration-200 ${
              openModal
                ? "opacity-100 visible"
                : "opacity-0 invisible"
            }`}
            onClick={() => setOpenModal(false)}
          >
            <div
              className={`relative w-[90vw] flex flex-col sm:max-w-[400px] rounded-xl shadow-md bg-[#2D2D2D] overflow-hidden transition-transform duration-200 ${
                openModal ? "scale-100" : "scale-95"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full bg-[#2D2D2D]/20 font-semibold flex items-center justify-between relative">
                <h3 className="p-3 text-white font-medium text-md">{modalTitle}</h3>
                <IoIosCloseCircleOutline
                  onClick={() => setOpenModal(false)}
                  className="absolute top-3 right-3 text-2xl cursor-pointer text-white hover:text-white/50"
                />
              </div>
              <div className="flex items-center justify-center flex-1">
                {children}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Modal;