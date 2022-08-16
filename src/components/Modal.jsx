import { useState, useCallback } from 'react';
import SpinnerComponent from './Spinner';

export default function ModalComponent({title, onClose, onSubmit, children}) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOnSubmit = () => {
    setIsSubmitted(true);
    onSubmit();
  }
  return (
    <div className="fixed insert-0 top-0 left-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full z-10">
      <div className="relative top-20 mx-auto px-1 py-5 border w-80 md:w-96 shadow-lg rounded-md bg-slate-800">
        <div className="mt-3 text-center">
          <h3  className="text-lg leading-6 font-medium text-white">{title}</h3>
          <div  className="mt-2 px-1 py-3">
            {children}
          </div>
          {isSubmitted
            ? <SpinnerComponent className="text-black" />
            : <div className="items-center px-1 py-3 grid grid-cols-2 gap-2">
                <button
                  onClick={handleOnSubmit}
                  className="px-2 py-2 bg-green-700 text-white text-sm font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-green-300"
                >
                  Save
                </button>

                <button
                  onClick={onClose}
                  className="px-2 py-2 bg-red-700 text-white text-sm font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-red-300"
                >
                  Close
                </button>
              </div>
          }
        </div>
      </div>
    </div>
  );
};

