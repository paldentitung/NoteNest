import React from "react";
import MainButton from "./MainButton";
import SecondaryButton from "./SecondaryButton";

const UploadNote = ({ showUploadForm, setShowUploadForm }) => {
  return (
    <>
      <section
        className={`bg-white  rounded-md shadow-md flex flex-col space-y-5 transition-all duration-300 transform 
        ${
          showUploadForm
            ? "opacity-100 scale-100 h-auto p-5 mb-5"
            : "opacity-0 scale-95 h-0 overflow-hidden"
        }
        `}
      >
        <h2 className="text-2xl font-semibold">Upload New Note</h2>
        <form className="flex flex-col gap-5">
          <div className="flex gap-4">
            {/* Subject Dropdown */}
            <div className="flex-1">
              <select className="p-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 focus:ring-mainColor">
                <option value="">Select Subject</option>
                <option value="DSA">DSA</option>
                <option value="DBMS">DBMS</option>
                <option value="Math">Math</option>
                <option value="WebDev">Web Development</option>
              </select>
            </div>

            {/* Semester Dropdown */}
            <div className="flex-1">
              <select className="p-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 focus:ring-mainColor">
                <option value="">Select Semester</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>

          {/* Note Title */}
          <div>
            <input
              type="text"
              placeholder="Note Title"
              className="p-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 focus:ring-mainColor"
            />
          </div>

          {/* Description Field */}
          <div>
            <textarea
              placeholder="Description"
              className="p-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 focus:ring-mainColor"
              rows={3}
            />
          </div>

          {/* File Upload */}
          <div>
            <input
              type="file"
              className="p-2 rounded w-full outline-0 border-0 ring-2 ring-gray-400 focus:ring-mainColor"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <SecondaryButton
              onClick={() => setShowUploadForm(false)}
              title="cancel"
            />
            <MainButton title="Upload" />
          </div>
        </form>
      </section>
    </>
  );
};

export default UploadNote;
