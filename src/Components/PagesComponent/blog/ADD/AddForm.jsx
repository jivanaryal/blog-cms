import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import axios from "axios";

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

const AddForm = () => {
  const [showimage, setShowImage] = useState("");
  const [newImage, setImage] = useState([]);
  const [extraImage, setExtraImage] = useState([]);

  const handleImageChange = (event) => {
    setShowImage(event.target.files[0]);
    setImage([...newImage, event.target.files[0]]);
    setExtraImage([...extraImage, event.target.files[0]]);
  };

  // const handleImageChange = (event) => {
  //   // console.log(event.target.files[0]);
  //   setImage(event.target.files[0]);
  //   // const files = e.target.files;
  //   // const formDataArray = [];
  //   // for (let i = 0; i < files.length; i++) {
  //   //     const formData = new FormData();
  //   //     formData.append('image', files[i]);
  //   //     formDataArray.push(formData);
  //   // }

  //   // setFormDataArray(formDataArray);
  // };
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
      await axios.post(`https://kalikablog.onrender.com/blog`, formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      {/* field title,sub_title,author_name,date,description,image */}
      <Formik
        initialValues={{
          title: "",
          sub_title: "",
          author_name: "",
          date: "",
          description: "",
          image: [],
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
                          {extraImage &&
                            extraImage.map((val, i) => {
                              return (
                                <img
                                  key={i}
                                  src={URL.createObjectURL(val)}
                                  alt="img"
                                  className="h-12 w-full "
                                />
                              );
                            })}
                        </div>
                        {/* <img
                          className="w-full aspect-square"
                          src={
                            showimage
                              ? URL.createObjectURL(showimage)
                              : "https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
                          }
                          alt=""
                        /> */}
                        <input
                          type={val.type}
                          name={val.name}
                          accept=".png,.jpg,.jpeg,.gif"
                          required
                          multiple
                          onChange={(e) => handleImageChange(e)}
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
      {/* <ErrorMessage /> */}z
      <ToastContainer />
    </div>
  );
};

export default AddForm;
