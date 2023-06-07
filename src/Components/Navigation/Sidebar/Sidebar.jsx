import React from "react";
import { AiFillHome } from "react-icons/ai";
import { MdPostAdd, MdOutlinePermMedia, MdOutlinePages } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";

const data = [
  {
    name: "home",
    icons: <AiFillHome />,
    path: "/",
  },
  {
    name: "posts",
    icons: <MdPostAdd />,
    path: "/posts",
  },
  {
    name: "pages",
    icons: <MdOutlinePages />,
    path: "/pages",
  },
  {
    name: "media",
    icons: <MdOutlinePermMedia />,
    path: "/media",
  },
  {
    name: "team",
    icons: <RiTeamLine />,
    path: "/team",
  },
];

const Sidebar = () => {
  const Location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="sticky top-0  left-0 h-screen px-2 py-6 bg-secondaryColor text-white text-sm">
      <div className="flex  w-full h-14  bg-secondaryColor px-6 gap-2 items-center">
        <div className="text-2xl">
          <img
            src="https://lh6.googleusercontent.com/-dRNEzRSwRIY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcI7qeN_76yvEnw8e8puvBL5JHDbA/mo/photo.jpg"
            alt="logo"
            className="h-8 w-8"
          />
        </div>
        <div>Blog Mgmt</div>
      </div>
      <div className="flex flex-col  gap-2 text-lg capitalize pl-2 pt-2">
        {data.map((val, i) => {
          return (
            <div
              key={i}
              onClick={() => {
                navigate(val.path);
              }}
              className={`flex gap-2 cursor-pointer w-10/12  ${
                Location.pathname === val.path &&
                "bg-white text-mainColor shadow-sm shadow-gray-100"
              } py-2 justify-start mx-auto px-3   hover:bg-white hover:text-mainColor rounded-md text-gray-300 items-center`}>
              <div>{val.icons}</div>
              <div>{val.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
