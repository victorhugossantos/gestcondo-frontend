import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, title, children, actions }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Bloqueia scroll
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm'
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role='dialog'
      aria-modal='true'
    >
      <div className='bg-gray-800/95 w-full max-w-2xl rounded-xl border border-gray-700/50 shadow-2xl animate-fade-in'>
        <div className='flex justify-between items-center p-6 border-b border-gray-700/50'>
          <h2 className='text-xl font-semibold text-gray-200'>{title}</h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-200 transition-colors'
            aria-label='Fechar modal'
          >
            <XMarkIcon className='w-6 h-6'/>
          </button>
        </div>

        <div className='p-6'>
          {children}
        </div>

        {actions && (
          <div className='p-6 border-t border-gray-700/50'>
            <div className='flex justify-end gap-3'>
              {actions}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;