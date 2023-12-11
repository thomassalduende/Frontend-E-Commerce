import React from 'react';

type ModalProps = {
    isOpen: boolean;
    question: string;
    onClose: () => void;
    onConfirm: () => void;
};


export const Modal: React.FC<ModalProps> = ({ isOpen, question, onClose, onConfirm }) => {
    const modalClasses = isOpen ? 'block' : 'hidden';

    return (
        <div className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 ${modalClasses}`}>
            <div className="flex items-center justify-center h-full">
                <div className="bg-white rounded-lg p-8">
                    <h2 className="text-lg font-bold mb-4">{question}</h2>
                    <div className="flex justify-end">
                        <button
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
                            onClick={onConfirm}
                        >
                            Sí
                        </button>
                        <button
                            className="mr-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
                            onClick={onClose}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
