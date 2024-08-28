import PropTypes from "prop-types";
import React from "react";

const MenuButton = ({
  icon,
  title,
  className,
  onClick,
  isValid,
  white,
  dropmenu,
}) => {
  return (
    <li
      className={`flex justify-between rounded-2xl ${className} ${
        isValid
          ? "bg-tokena_blue py-3 text-tokena_light_gray"
          : "bg-tokena_white py-2 dark:bg-tokena_dark_blue_1"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <img
          src={
            isValid || document.documentElement.classList.contains("dark")
              ? white
              : icon
          }
          alt={title}
          className="mx-2 h-auto max-w-full"
        />
        <span className="font-semibold">{title}</span>
      </div>
      {dropmenu && (
        <img
          src={
            isValid || document.documentElement.classList.contains("dark")
              ? "/assets/icons/dropdown-arrow-white.svg"
              : "/assets/icons/dropdown-arrow.svg"
          }
          alt="dropdown-arrow"
          className="me-4 h-auto max-w-full"
          width={20}
          height={20}
        />
      )}
    </li>
  );
};

MenuButton.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  isValid: PropTypes.bool,
  white: PropTypes.string,
  dropmenu: PropTypes.bool,
};

export default MenuButton;
