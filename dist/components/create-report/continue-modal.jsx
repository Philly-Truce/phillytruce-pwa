// pages/index.js
import React, { useState, useEffect } from "react";
import warning from "../../assets/create-form-image/warning-amber.svg";
import Image from "next/image";
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen)
        return null;
    return (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl p-8 relative">
        {children}
      </div>
    </div>);
};
const Continue = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        setIsModalOpen(true);
    }, []);
    const closeModal = () => setIsModalOpen(false);
    return (<div className="p-4">


      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex flex-col justify-center items-center">
        <Image src={warning} alt="warning Icon" className="pb-4"/>
        <h2 className="text-lg font-bold">Need immediate assistance?</h2>
        <h2 className="text-lg font-bold">Dial 911 for emergencies.</h2>
        <small className="mt-2">If not urgent, proceed to create a new report. </small>
        <div>
        <button onClick={closeModal} className="mt-4 px-4 py-2 text-black">
          Don't show again
        </button>
        <button onClick={closeModal} className="mt-4 px-4 py-2 text-primary">
          Continue
        </button>
        </div>
        </div>
      </Modal>
    </div>);
};
export default Continue;
