import React, { useEffect, useState } from "react";
import { FaToggleOff, FaToggleOn, FaRegLightbulb } from "react-icons/fa";

const DarkMode = () => {
  const [light, setLight] = useState("darkModeOff");
  let clickedClass = 'clicked'
  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";
  let theme;

  useEffect(() => {
    theme === lightTheme ? setLight("darkModeOff") : setLight("darkModeOn");
  }, []);

  theme = localStorage.getItem("theme");

  if (theme === lightTheme || theme === darkTheme) body.classList.add(theme);
  else body.classList.add(lightTheme);

  const switchTheme = (e) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      e.target.classList.remove(clickedClass);
      localStorage.setItem("theme", "light");
      theme = lightTheme;
      setLight("darkModeOff");
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.add(clickedClass)
      localStorage.setItem("theme", "dark");
      theme = darkTheme;
      setLight("darkModeOn");
    }
  };

  return (
    <button
    className={theme=== 'dark' ? clickedClass : ''}
      id="darkMode"
      onClick={(e) => switchTheme(e)}
    >
      
    </button>
  );
};

export default DarkMode;
