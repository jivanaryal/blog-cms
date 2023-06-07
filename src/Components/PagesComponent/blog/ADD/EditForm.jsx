import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import axios from "axios";
import { useLocation } from "react-router-dom";

const schema = yup.object().shape({
  title: yup.string().required("The name is required"),
  sub_title: yup.string().required("The name is required"),
  author_name: yup.string().required("The name is required"),
  date: yup.string().required("The name is required"),
  description: yup.string().required("The name is required"),
});
const FormField = [
  {
    name: "title",
    type: "text",
  },
  {
    name: "sub_title",
    type: "text",
  },
  {
    name: "author_name",
    type: "text",
  },
  {
    name: "date",
    type: "date",
  },
  {
    name: "description",
    type: "text",
  },
  {
    name: "image",
    type: "file",
    // image: [
    //   {
    //     path: "",
    //   },
    // ],
  },
];

const EditForm = () => {
  const [showimage, setShowImage] = useState("");
  const [newImage, setImage] = useState([]);
  const [oldimg, setOldImg] = useState([]);
  const [extraImage, setExtraImage] = useState([]);
  const [addImage, setAddImage] = useState([]);

  //   const [blog, setBlog] = useState([]);
  const location = useLocation();

  console.log(location.state.title);

  console.log(location.state.image[0].path);

  useEffect(() => {
    setOldImg(location.state.image.map((val) => val.path));
  }, []);

  const handleImageChange = (event) => {
    setShowImage(event.target.files[0]);
    setImage([...newImage, event.target.files[0]]);
    setExtraImage([...extraImage, event.target.files[0]]);
    setAddImage([...addImage, event.target.files[0]]);
  };

  const postFormData = async (value) => {
    const formData = new FormData();
    formData.append("title", value.title);
    formData.append("sub_title", value.sub_title);
    formData.append("author_name", value.author_name);
    formData.append("date", value.date);
    formData.append("description", value.description);
    for (let i = 0; i < newImage.length; i++) {
      formData.append("image", newImage[i]);
    }
    console.log(newImage);
    try {
    await axios.put(`https://kalikablog.onrender.com/blog`, formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      {/* field title,sub_title,author_name,date,description,image */}
      <Formik
        initialValues={{
          title: location.state.title,
          sub_title: location.state.sub_title,
          author_name: location.state.author_name,
          date: location.state.date,
          description: location.state.description,
          image: location.state.image,
        }}
        validationSchema={schema}
        onSubmit={(val) => {
          console.log(val);
          postFormData(val);
        }}>
        {({ handleSubmit }) => {
          return (
            <Form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="grid grid-cols-2 gap-2">
              {FormField.map((val, i) => {
                return (
                  <div
                    key={i}
                    className="w-10/12 mx grid grid-cols-12 gap-6 place-content-center place-items-center">
                    <label className="col-span-2" htmlFor={val.name}>
                      {val.name}
                    </label>
                    {val.type === "file" ? (
                      <div>
                        <div className="grid grid-cols-3 gap-2 bg-red-500 ml-32">
                          {location.state.image &&
                            location.state.image.map((val, i) => {
                              console.log(val);
                              return (
                                <img
                                  key={i}
                                  src={
                                    `${val.path}`
                                    // newImg
                                    //   ? URL.createObjectURL(newImg)
                                    //   : `http://localhost:5000/${path}`
                                  }
                                  className="w-16 mx-auto p-2 mt-6"
                                  alt="preview"
                                />
                              );
                            })}
                        </div>

                        <label htmlFor="image">
                          {addImage &&
                            addImage.map((val, i) => {
                              return (
                                <img
                                  key={i}
                                  src={URL.createObjectURL(val)}
                                  alt="create"
                                />
                              );
                            })}
                        </label>

                        <input
                          type={val.type}
                          name={val.name}
                          accept=".png,.jpg,.jpeg,.gif"
                          required
                          multiple
                          onChange={(e) => handleImageChange(e)}
                          className=""
                        />
                      </div>
                    ) : (
                      <Field
                        type={val.type}
                        name={val.name}
                        className="bg-gray-300  col-span-10 border-2 border-gray-400 rounded-md py-2 px-2 w-full"
                        placeholder={`enter your ${val.name}`}
                      />
                    )}
                  </div>
                );
              })}
              <button type="submit">submit</button>
            </Form>
          );
        }}
      </Formik>

      <ToastContainer />
    </div>
  );
};

export default EditForm;
