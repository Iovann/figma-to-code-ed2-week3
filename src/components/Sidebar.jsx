import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { menuItems } from "../data/Menuicons ";
import MenuButton from "./MenuButton";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  useEffect(() => {
    if (location.pathname === "/news") {
      setActiveMenu("News");
    } else {
      setActiveMenu("Dashboard");
    }
  }, [location.pathname]);

  const handleMenuClick = (title, path) => {
    setActiveMenu(title);
    navigate(path);
    toggleSidebar();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-neutral-900/50 max-lg:z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <div
        className={`flex flex-col justify-between max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-30 ${
          isOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"
        } h-screen w-64 bg-white transition-transform duration-300 ease-in-out dark:bg-tokena_dark_blue_1 dark:text-white`}
      >
        <div>
          <div className="flex items-center justify-between p-4">
            <div className="flex w-full items-center rounded-2xl bg-tokena_blue/15 px-4 py-3">
              <img
                src="/assets/icons/logo.svg"
                alt="logo"
                className="h-auto w-11 rounded-2xl bg-tokena_blue/25 p-2"
              />
              <div className="ms-3 flex w-full flex-col overflow-hidden">
                <h3 className="truncate text-xl/5 font-bold text-tokena_blue dark:text-tokena_dark_2">
                  Tokena
                </h3>
                <span className="truncate text-base/5 text-tokena_blue">
                  Finance app
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="px-4 pt-3 text-lg text-tokena_dark_gray dark:text-tokena_light_gray">
              Menu
            </p>
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="flex flex-col gap-1">
                {menuItems.map((item, index) => (
                  <MenuButton
                    key={index}
                    icon={item.icon}
                    title={item.title}
                    onClick={() => handleMenuClick(item.title, item.path)}
                    white={item.white}
                    isValid={item.title === activeMenu}
                    dropmenu={item.dropmenu}
                  />
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mx-2 mb-6 flex items-center justify-between p-2 dark:rounded-xl dark:bg-tokena_dark_blue_2">
          <div className="flex w-full overflow-hidden">
            <img
              src="/assets/images/user.svg"
              alt="user avatar"
              className="h-auto w-10"
            />
            <div className="mx-2 flex w-full flex-col justify-center overflow-hidden">
              <p className="truncate text-lg/6 font-medium">John Doe</p>
              <p className="truncate text-sm/3 dark:text-neutral-500">
                johndoe8@gmail.com
              </p>
            </div>
          </div>
          <div className="p-2">
            <img
              src={
                document.documentElement.classList.contains("dark")
                  ? "/assets/icons/dropdown-arrow-white.svg"
                  : "/assets/icons/dropdown-arrow.svg"
              }
              alt="arrow dropdown"
              className="h-auto w-5"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
