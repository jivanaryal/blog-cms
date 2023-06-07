import React, { useState } from "react";
import AddForm from "../../PagesComponent/blog/ADD/AddForm";
import VIewBlog from "../../PagesComponent/blog/View/VIewBlog";
import HomePage from "./HomePage";

const Index = () => {
  const [Active, setActive] = useState("add");
  const obj = [
    {
      name: "add blog",
      id: "add",
    },
    {
      name: "view blog",
      id: "view",
    },
  ];
  return (
    <div className=" my-7 relative flex flex-col w-full">
      <div className="grid grid-cols-12">
        {obj.map((val, i) => {
          return (
            <div
              onClick={() => {
                console.log(val.id);
                setActive(val.id);
              }}
              className={`${
                Active === val.id
                  ? "bg-blue-400 text-white shadow-lg shadow-gray-600"
                  : "bg-white text-black "
              } w-full cursor-pointer col-span-3 capitalize px-6 py-6 flex items-center justify-center text-xl font-semibold`}
              key={i}>
              {val.name}
            </div>
          );
        })}
      </div>
      <div className="py-4 w-full bg-white">
        {Active === "add" ? <AddForm /> : <VIewBlog />}
      </div>
    </div>
  );
};

export default Index;
