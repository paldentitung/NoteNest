import React from "react";

const MainButton = ({ title, onClick, type }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="px-6 py-2 border border-transparent shadow-md  rounded-md text-(--mainColor) bg-white
     transition-all duration-300 hover:cursor-pointer hover:bg-(--mainColor) hover:text-white hover:border hover:border-gray-50"
    >
      {title}
    </button>
  );
};

export default MainButton;
