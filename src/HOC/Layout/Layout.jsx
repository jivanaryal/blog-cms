import React, { useState } from "react";
import Sidebar from "../../Components/Navigation/Sidebar/Sidebar";
import TopNav from "../../Components/Navigation/Toolbar/TopNav";

const Layout = ({ children }) => {
  const [ShowBar, setShowBar] = useState(false);

  return (
    <div className="lg:grid grid-cols-12 gap-0 h-screen w-screen relative">
      <div className=" relative w-full left-0 hidden lg:block z-30 lg:col-span-3 xl:col-span-2 ">
        <Sidebar />
      </div>

      {ShowBar && (
        <div
          onClick={() => {
            setShowBar(false);
          }}
          className="sticky top-0 left-0 z-50  h-screen  grid grid-cols-12">
          <div className="col-span-4">
            <Sidebar />
          </div>
          <div className="bg-backdrop col-span-8"></div>
        </div>
      )}

      <div className="lg:col-span-9 h-full xl:col-span-10  relative bg-[#ffffff]">
        <div className=" sticky top-0 z-10 left-0">
          <TopNav
            setShowBar={() => {
              setShowBar((prev) => !prev);
            }}
          />
        </div>
        <div className=" w-11/12 mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
