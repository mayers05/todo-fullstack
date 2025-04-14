import React from "react";

const DarkModeToggle = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
};

export default DarkModeToggle;
