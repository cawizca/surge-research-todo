import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { changeTodos, deleteTodos, getaTodo } from '../utils/web3.config';
import { AlertBox } from './Alerts';

interface Props {
  isOpen: boolean;
  closeModal: any;
  openModal: any;
  todoId: number;
  todo: any;
}

const schema: any = yup.object().shape<any>({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
});

const DialogBox: FC<Props> = ({
  isOpen,
  closeModal,
  openModal,
  todoId,
  todo,
}) => {
  const dispatch = useDispatch();
  const { loading, entities, error } = useSelector(
    (state: any) => state.webthree
  );

  const handleSubmit = async (value: any) => {
    //e.preventDefault();

    const data = {
      value: value,
      id: todoId,
    };

    const res = await Promise.resolve(dispatch(changeTodos(data)));
    if (res.type === 'todos/change/fulfilled') {
      await AlertBox('success', 'Todo changed successfully!');
      formik.resetForm();
      window.location.href = '/';
    }
  };

  const removeTodo = async () => {
    const res = await Promise.resolve(dispatch(deleteTodos(todoId)));

    if (res.type === 'todos/delete/fulfilled') {
      await AlertBox('success', 'Todo deleted successfully!');
      window.location.href = '/';
    }
  };

  const formik = useFormik({
    initialValues: {
      title: String(todo?.topic),
      description: String(todo?.description),
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (value) => handleSubmit(value),
  });

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title>
                    <div className="grid grid-cols-3 mb-6">
                      <div className="col-span-2">
                        <h1 className="text-2xl font-bold text-violet-900">
                          Change a ToDo.
                        </h1>
                      </div>
                      {loading ? (
                        <button
                          className="bg-rose-50 px-4 h-10 rounded-lg transition ease-in-out text-rose-600 drop-shadow-sm font-medium cursor-wait"
                          type="submit"
                          disabled
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          onClick={removeTodo}
                          className="bg-rose-100 px-4 h-10 rounded-lg transition ease-in-out focus:outline-none text-rose-600 drop-shadow-lg font-medium hover:bg-rose-500 hover:drop-shadow-lg hover:text-white duration-500 hover:scale-105"
                          type="submit"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </Dialog.Title>
                  <form onSubmit={formik.handleSubmit} method="POST">
                    <div>
                      <div className="text-lg font-medium text-gray-500">
                        Title:
                      </div>
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
                      {formik.touched.description &&
                      formik.errors.description ? (
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
                          className="bg-violet-100 px-6 py-2 rounded-lg transition ease-in-out text-violet-600 drop-shadow-lg font-medium hover:bg-violet-500 hover:drop-shadow-lg hover:text-white duration-500 hover:scale-105"
                          type="submit"
                        >
                          Change ToDo
                        </button>
                      )}
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DialogBox;
