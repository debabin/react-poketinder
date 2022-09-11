import React from 'react';

type ButtonProps = React.ComponentPropsWithRef<'button'>;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <button
    type='button'
    className='focus:ring-gray-700" w-full rounded-lg border border-gray-600 bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:border-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-200 disabled:bg-gray-700'
    {...props}
  >
    {children}
  </button>
);
