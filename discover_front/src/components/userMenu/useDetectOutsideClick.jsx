import { useState, useEffect } from "react";

export const useDetectOutsideClick = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const onClick = (e) => {
      if (el.current && !el.current.contains(e.target)) {
        setIsActive(false);
      }
    };

    const handleClickOutside = (e) => {
      onClick(e);
    };

    const handleClickInside = (e) => {
      if (el.current && el.current.contains(e.target)) {
        setIsActive(true);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("mouseup", handleClickInside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("mouseup", handleClickInside);
    };
  }, [el]);

  return [isActive, setIsActive]; // Devolver el estado y la función de actualización del estado
};
