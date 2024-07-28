import React from 'react';
import { API_URL } from '../../constants';
import GoogleColorIcon from '../../assets/svg/Icons/GoogleColorIcon';

const handleLoginGoogle = (e: React.FormEvent): void => {
  e.preventDefault();
  window.location.href = `${API_URL}/auth/google`;
};

const GoogleLoginButton = () => {
  return (
    <>
      <div className="my-1 m-0 flex items-center before:mt-0.2 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p className="mx-1 mb-0 text-center font-semibold text-gray-400">OR</p>
      </div>
      <div className="m-0 items-center flex justify-center">
        <button
          onClick={handleLoginGoogle}
          className="pl-9 pr-11 py-1.5 border border-gray-300 dark:border-gray-400 rounded-lg text-sm text-gray-700 dark:text-black hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-300 hover:shadow transition duration-150 flex items-center gap-2"
        >
          <GoogleColorIcon />
          <span>Continue with Google</span>
        </button>
      </div>
    </>
  );
};

export default GoogleLoginButton;
