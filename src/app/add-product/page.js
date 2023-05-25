"use client";

import React, { useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { BASE_URL } from "../utils/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [imageURL, setImageURL] = useState("");
  const [category, setCategory] = useState([]);

  const FILE_SIZE = 1024 * 1024 * 10; // 10MB
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png",
  ];

  const validateSchema = Yup.object().shape({
    title: Yup.string().required("Required products Name"),
    price: Yup.string().required("Invalid price"),
    description: Yup.string().required("invaild description"),
    categoryId: Yup.number().positive().integer(),
    file: Yup.mixed()
      .test("fileSize", "File too large", (value) => {
        console.log("value", value);
        if (!value) {
          return true;
        }
        return value.size <= FILE_SIZE;
      })
      .test("fileFormat", "Unsupported Format", (value) => {
        if (!value) {
          return true;
        }
        return SUPPORTED_FORMATS.includes(value.type);
      })
      .required("Required"),
  });
  const uploadImage = async (values) => {
    try {
      const response = await axios.post(`${BASE_URL}files/upload`, values.file);
      console.log(response);
      setIsLoading(false);
      return response.data.location;
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };
  useEffect(
    () =>
      fetch(`${BASE_URL}categories`)
        .then((resp) => resp.json())
        .then((res) => setCategory(res)),
    []
  );

  const notify = () => {
    toast.success("Add product successfully !", {
      theme: "colored",
      icon: "🚀",
      autoClose: 1000,
      position: "bottom-right",
    });
  };

  const insertUser = async (data) => {
    let { title, price, description, categoryId, images } = data;
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const userData = JSON.stringify({
      title,
      price,
      description,
      categoryId,
      images,
    });

    let requestData = {
      method: "POST",
      headers: myHeaders,
      body: userData,
    };

    fetch(`${BASE_URL}products`, requestData)
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        setIsLoading(false);
        // router.push("/");
      })
      .catch((error) => {
        console.log("Error create products", error.message);
      });
  };
  return (
    <Formik
      initialValues={{
        title: "",
        price: "",
        description: "",
        categoryId: "",
        images: [],
      }}
      validationSchema={validateSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const formData = new FormData();

        formData.append("file", values.file);
        const image = await uploadImage({ file: formData });
        console.log("avatar", image);
        console.log(values.file);
        values.images = [image];

        setTimeout(() => {
          // alert(JSON.stringify(values, null, 2));
          insertUser(values);
          setSubmitting(false);
        }, 1000);
      }}
    >
      {({ isSubmitting }) => (
        <section className="my-28 md:container md:mx-auto">
          <div className="max-w-md mx-auto bg-white my-12 rounded-xl shadow">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create Product
              </h1>
              <Form className="space-y-4 md:space-y-6">
                <div className="flex justify-between">
                  <div className="mx-5">
                    <div>
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Product Name
                      </label>
                      <Field
                        type="text"
                        name="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="input your products's name"
                      />
                      <ErrorMessage name="title">
                        {(msg) => <div className="text-red-600">{msg}</div>}
                      </ErrorMessage>
                    </div>
                    <div>
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Product Price
                      </label>
                      <Field
                        type="text"
                        name="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Your price"
                        required=""
                      />
                      <ErrorMessage name="price">
                        {(msg) => <div className="text-red-600">{msg}</div>}
                      </ErrorMessage>
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <Field
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Your Description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      />
                      <ErrorMessage name="description">
                        {(msg) => <div className="text-red-600">{msg}</div>}
                      </ErrorMessage>
                    </div>
                    <div>
                      <label
                        htmlFor="categoryId"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category
                      </label>
                      <Field
                        type="categoryId"
                        name="categoryId"
                        as="select"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      >
                        {category.map((categorys) => (
                          <option key={categorys.id} value={categorys.id}>
                            {categorys.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="categoryId">
                        {(msg) => <div className="text-red-600">{msg}</div>}
                      </ErrorMessage>
                    </div>
                  </div>
                  <div className="mt-5">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span class="font-semibold">Click to upload</span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <Field
                          id="dropzone-file"
                          name="file"
                          type="file"
                          className="hidden"
                          component={DropFileZone}
                        />
                      </label>
                    </div>
                    <ErrorMessage name="file">
                      {(msg) => <div className="text-red-600">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>

                <button
                  onClick={notify}
                  disabled={isSubmitting}
                  type="submit"
                  class="text-white w-full bg-sky-400a bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-xl text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Upload
                </button>
                <ToastContainer />
              </Form>
            </div>
          </div>
        </section>
      )}
    </Formik>
  );
}

function DropFileZone({ field, form }) {
  const [previewImage, setPreviewImage] = useState(null);
  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    form.setFieldValue(field.name, file);
    setPreviewImage(URL.createObjectURL(file));
  };
  return (
    <>
      <input
        id="dropzone-file"
        type="file"
        name="file"
        onChange={handleChange}
        className="hidden"
      />
      {previewImage && (
        <img src={previewImage} alt="preview" className="mt-2 h-20 w-full" />
      )}
    </>
  );
}
