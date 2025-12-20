import React from "react";

const SecondaryButton = ({ title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="px-6 py-2 border border-transparent shadow-md  rounded-md bg-(--mainColor) text-white
     transition-all duration-300 hover:cursor-pointer hover:text-(--mainColor) hover:bg-white active:bg-(--mainColor) active:text-white"
    >
      {title}
    </div>
  );
};

export default SecondaryButton;
