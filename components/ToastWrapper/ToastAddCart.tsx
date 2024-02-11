import React from 'react';
import toast, { Toast } from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';
import Button from '../Button';

const ToastAddCart = ({ t, message }: { t: Toast; message: string }) => {
  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-xs w-full bg-white shadow-lg rounded-lg pointer-events-auto flex items-center ring-1 ring-primary ring-opacity-5`}
    >
      <div className="flex-1 p-2 items-center">
        <p className="text-sm text-gray-500">{message}</p>
      </div>
      <div className="flex border-l border-primary-light">
        <Button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium"
          icon={<IoClose size={16} />}
        />
      </div>
    </div>
  );
};

export default ToastAddCart;
