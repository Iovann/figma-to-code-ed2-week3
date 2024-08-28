import React, { useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const ContentWrapper = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? "dark" : ""}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col">
          <Header
            toggleSidebar={toggleSidebar}
            isOpen={sidebarOpen}
            toggleDarkMode={toggleDarkMode}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

ContentWrapper.propTypes = {
  children: PropTypes.node,
};

export default ContentWrapper;
