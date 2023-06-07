import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiMenu } from "react-icons/bi";
const TopNav = ({ setShowBar }) => {
  return (
    <div className="shadow h-14 bg-mainColor  ">
      <div className="flex w-11/12 mx-auto lg:mx-0 justify-between lg:justify-end items-center gap-4 h-14">
        <div className="block lg:hidden">
          <BiMenu
            onClick={() => {
              setShowBar();
            }}
            className="text-3xl text-white"
          />
        </div>
        <div className="relative">
          <label htmlFor="search"></label>
          <input
            type="search"
            name="search"
            placeholder="search"
            className="bg-[#F7FAFC]  focus:ring-4 ring-red-500- py-1 pl-7 pr-4"
          />
          <AiOutlineSearch className="absolute text-xl top-2 text-gray-500 ml-1 left-0" />
        </div>
        <div>
          <IoMdNotificationsOutline className="text-xl" />
        </div>
        <div>
          <img
            src="https://scontent.fktm16-1.fna.fbcdn.net/v/t39.30808-6/315895995_1206787963516733_8522724124304818949_n.jpg?stp=cp6_dst-jpg&_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6DGhKJyNlzoAX-OQ23E&_nc_ht=scontent.fktm16-1.fna&oh=00_AfDUYJfYSCeTGnqztnG6qBoZdBkZ4IutmjXkDOwq1rhG7A&oe=641C5299"
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
