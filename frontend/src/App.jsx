import React, { use, useState } from "react";
import Header from "../Components/Header";
import UploadNote from "../Components/UploadNote";
import NoteDashboard from "../Components/NoteDashboard";
import { Toaster } from "react-hot-toast";
const App = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [data, setData] = useState([]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      <Header
        showUploadForm={showUploadForm}
        setShowUploadForm={setShowUploadForm}
      />
      <div className="w-full max-w-6xl mx-auto p-4 flex flex-col ">
        <UploadNote
          showUploadForm={showUploadForm}
          setShowUploadForm={setShowUploadForm}
          setData={setData}
        />
        <NoteDashboard data={data} setData={setData} />
      </div>
    </div>
  );
};

export default App;
