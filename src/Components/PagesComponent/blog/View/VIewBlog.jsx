import axios from "axios";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { MdDelete, MdOutlineUpdate } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const VIewBlog = () => {
  const [info, setInfo] = useState([]);
  // const navigate = useNavigate();
  const [toggle, setToggle] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(`https://kalikablog.onrender.com/blog`);
    // console.log(res.data);
    setInfo(res.data.data);
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const deleteItem = (id) => {
    axios.delete(`https://kalikablog.onrender.com/blog/${id}`).then((res) => {
      if (res.status === 200) {
        setToggle(!toggle);
        toast.success("The data is submitted");
      }
    });
  };

  const newCallBack = useCallback(() => {
    fetchData();
  }, []);

  const newData = useMemo(() => newCallBack(), [toggle]);
  return (
    <div>
      <table className="w-full rounded-lg shadow-lg">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              S.No
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              Title
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              Sub Title
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              description
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              Author Name
            </th>
            <th className="py-3 px-6 border-r border-b border-gray-200">
              Image
            </th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {info.map((val, i) => (
            <tr key={i} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4 border-l text-center">{i + 1}</td>
              <td className="py-3 px-4 border-l border-r">{val.title}</td>
              <td className="py-3 px-4 border-l border-r">{val.sub_title}</td>
              <td>{val.description}</td>
              <td className="py-3 px-4 border-l border-r ">
                {val.author_name}
              </td>
              <td className="py-3 px-4 border-l flex border-r gap-10 overflow-scroll w-56 max-h-32">
                <div className="flex overflow-auto">
                  {val.image.map((images, i) => (
                    <div key={i}>
                      <img
                        src={images.path}
                        alt="img"
                        className=" w-56 h-full overflow-scroll"
                      />
                    </div>
                  ))}
                </div>
              </td>
              <td className="py-3 px-4 border-l border-r text-3xl hover:scale-110 hover:text-red-500 transition-all delay-100 duration-300">
                <MdDelete onClick={() => deleteItem(val._id)} />
              </td>
              <Link
                state={val}
                to={{
                  pathname: `/edit/${val._id}`,
                }}>
                {" "}
                <td className="py-3 px-4 border-l border-r text-3xl hover:scale-110 transition-all delay-100 duration-300 hover:text-blue-500">
                  <MdOutlineUpdate />
                </td>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default VIewBlog;
