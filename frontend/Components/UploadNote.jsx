import React from "react";
import MainButton from "./MainButton";
import SecondaryButton from "./SecondaryButton";
const UploadNote = ({ showUploadForm, setShowUploadForm }) => {
  return (
    <>
      <section
        className={`bg-white p-5 rounded-md shadow-md flex flex-col space-y-5 transition-all duration-300     transform
        ${showUploadForm ? " opacity-100 scale-100" : "opacity-0 scale-95"}
        
        `}
      >
        <h className="text-2xl font-semibold">Upload New Note</h>
        <form className="flex flex-col gap-5">
          <div className="flex gap-4 ">
            {/* subject */}
            <div className="flex-1">
              <input
                placeholder="Subject"
                className=" p-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 transition-all duration-300 focus:ring-(--mainColor)
              "
              />
            </div>
            {/* semester */}
            <div className="flex-1">
              <input
                type="number"
                placeholder="semeser"
                className=" p-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 transition-all duration-300 focus:ring-(--mainColor)"
              />
            </div>
          </div>
          <div>
            <input
              type="text"
              placeholder="Note Title"
              className=" p-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 transition-all duration-300 focus:ring-(--mainColor)"
            />
          </div>
          <div>
            <input
              type="file"
              className=" p-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 transition-all duration-300 focus:ring-(--mainColor)"
            />
          </div>
          <div className="flex">
            <SecondaryButton />
          </div>
        </form>
      </section>
    </>
  );
};

export default UploadNote;
