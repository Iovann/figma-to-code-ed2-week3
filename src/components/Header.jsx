import PropTypes from "prop-types";
import React from "react";

const Header = ({ toggleSidebar, isOpen, toggleDarkMode }) => {
  Header.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    toggleDarkMode: PropTypes.func.isRequired,
  };

  return (
    <div className="flex items-center justify-between p-4 dark:bg-gray-900 dark:text-tokena_gray">
      <div className="flex">
        <button
          className="text-gray-800 focus:outline-none dark:text-white lg:hidden"
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <img
              src="/assets/icons/close.svg"
              alt="Close menu"
              className="h-auto max-w-full"
              width={20}
              height={20}
            />
          ) : (
            <p className="rounded-xl border border-tokena_dark p-2 dark:border-tokena_gray">
              <img
                src="/assets/icons/menu.svg"
                alt="hmg menu"
                className="h-auto max-w-full"
                width={20}
                height={20}
              />
            </p>
          )}
        </button>
        <div className="flex flex-col max-sm:text-sm sm:ms-3">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <p className="truncate">Welcome back!</p>
          <h1 className="text-lg/6 font-semibold">Dashboard</h1>
          <p className="truncate">Welcome back, John Doe !</p>
        </div>
        <div className="ms-9 hidden items-center rounded-2xl bg-tokena_blue px-4 text-tokena_white sm:flex">
          <img
            src="/assets/icons/add-wallet.svg"
            alt="Add wallet"
            className="mx-2 h-auto max-w-full"
          />
          <p className="text-lg font-bold">Connect Wallet</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center gap-2 rounded-xl border border-tokena_gray p-2 sm:px-5">
          <span className="text-tokena_dark_gray dark:text-tokena_light_gray">
            USD
          </span>
          <div className="flex flex-col gap-1">
            <img
              src="/assets/icons/up-arrow.svg"
              alt="up arrow"
              width={10}
              height={10}
            />
            <img
              src="/assets/icons/down-arrow.svg"
              alt="down arrow"
              width={10}
              height={10}
            />
          </div>
        </div>

        <button
          className="ml-4 text-gray-800 focus:outline-none dark:text-white"
          onClick={toggleDarkMode}
        >
          {document.documentElement.classList.contains("dark") ? (
            <p className="rounded-xl border border-tokena_gray p-2 dark:border-tokena_gray">
              <img
                src="/assets/icons/sun.svg"
                alt="Light mode"
                className="h-auto max-w-full"
                width={20}
                height={20}
              />
            </p>
          ) : (
            <p className="rounded-xl border border-tokena_gray p-2 dark:border-tokena_gray">
              <img
                src="/assets/icons/moon.svg"
                alt="Dark mode"
                className="h-auto max-w-full"
                width={20}
                height={20}
              />
            </p>
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
