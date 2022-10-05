import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { addTodos } from '../utils/web3.config';
import { AlertBox } from '../components/Alerts';

const schema: any = yup.object().shape<any>({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
});

const AddTodo = () => {
  const dispatch = useDispatch();
  const { loading, entities, error } = useSelector(
    (state: any) => state.webthree
  );

  const handleSubmit = async (val: any) => {
    //e.preventDefault();
    const res = await Promise.resolve(dispatch(addTodos(val)));
    if (res.type === 'todos/add/fulfilled') {
      await AlertBox('success', 'Todo added successfully!');
      formik.resetForm();
      window.location.href = '/';
    }
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: schema,
    onSubmit: (val) => handleSubmit(val),
  });

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="bg-white w-96 h-auto rounded-xl drop-shadow-md px-6 py-8">
          <h1 className="text-center text-2xl font-bold text-violet-600 mb-4">
            Add a new todo.
          </h1>
          <form onSubmit={formik.handleSubmit} method="POST">
            <div>
              <div className="text-lg font-medium text-gray-500">Title:</div>
              <input
                type="text"
                name="title"
                className="w-full text-xl rounded-md px-4 py-2 focus:outline-none my-2 border-l-violet-500 border-4"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
              {formik.touched.title && formik.errors.title ? (
                <small>{formik.errors.title}</small>
              ) : (
                ''
              )}
            </div>
            <div>
              <div className="text-lg font-medium text-gray-500">
                Description:
              </div>
              <textarea
                name="description"
                className="w-full text-xl rounded-md px-4 py-2 focus:outline-none my-2 border-l-violet-500 border-4"
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.touched.description && formik.errors.description ? (
                <small>{formik.errors.description}</small>
              ) : (
                ''
              )}
            </div>
            <div className="mt-4 flex justify-center">
              {loading ? (
                <button
                  className="bg-violet-50 px-6 py-2 rounded-lg transition ease-in-out  text-violet-600 drop-shadow-sm font-medium flex cursor-wait"
                  disabled
                >
                  <svg
                    className="mr-3 h-5 w-5 animate-spin text-violet-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </button>
              ) : (
                <button
                  className="bg-violet-100 px-6 py-2 rounded-lg transition ease-in-out  text-violet-600 drop-shadow-lg font-medium hover:bg-violet-500 hover:drop-shadow-lg hover:text-white duration-500 hover:scale-105"
                  type="submit"
                >
                  Add
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
