import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  walletConnect,
  checkConnectivity,
  getTodos,
  getaTodo,
} from '../utils/web3.config';
import metamask_logo from '../img/metamask-seeklogo.com.svg';
import DialogBox from '../components/DialogBox';
import Animation from '../components/Animation';
import NetworkAni from '../components/NetworkAni';

const AllTodos = () => {
  const dispatch = useDispatch();
  const { loading, entities, error } = useSelector(
    (state: any) => state.webthree
  );
  const [account, setAccount] = useState<string>();
  const [todos, setTodos] = useState<any>([]);

  let [isOpen, setIsOpen] = useState<boolean>(false);
  let [todoId, setTodoId] = useState<number>(0);
  let [todo, setTodo] = useState<any>(0);

  const closeModal: any = () => {
    setIsOpen(false);
  };

  const openModal: any = (id: number, todo: any) => {
    setIsOpen(true);
    setTodoId(id);
    setTodo(todo);
  };

  console.log(entities.network);

  useEffect(() => {
    checkWallet().then((data) => {
      setAccount(data.payload.account);
    });
    getTodoItems();
  }, []);

  const connectWallet = async () => {
    const res = await Promise.resolve(dispatch(walletConnect()));
    if (res.type === 'wallet/connect/fulfilled') {
      window.location.href = '/';
    }
  };

  const checkWallet = async () => {
    const data = await Promise.resolve(dispatch(checkConnectivity()));
    return data;
  };

  const getTodoItems = async () => {
    const data = await Promise.resolve(dispatch(getTodos()));
    setTodos(data?.payload);
  };

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="bg-white w-auto h-auto rounded-xl drop-shadow-md px-6 py-4">
          {!account ? (
            <button
              onClick={connectWallet}
              className="bg-violet-100 px-6 py-2 rounded-lg transition ease-in-out  text-violet-600 drop-shadow-lg font-medium hover:bg-violet-500 hover:drop-shadow-lg hover:text-white duration-500 hover:scale-105"
            >
              <div className="grid grid-cols-5 gap-2">
                <div>
                  <img
                    src={metamask_logo}
                    alt="metamask-logo"
                    className="h-6 w-auto"
                  />
                </div>
                <div className="col-span-4">Connect Metamask</div>
              </div>
            </button>
          ) : entities.account && entities.network !== 5 ? (
            <div className="text-center">
              <NetworkAni />
              <h1 className="text-2xl text-gray-500 font-medium">Oops...</h1>
              <p className="text-gray-500 text-lg">
                You have choosen a different network.
              </p>
              <p className="text-gray-500 font-light">
                Please choose <span className="font-medium">Goerli</span>{' '}
                network and reload the page.
              </p>
            </div>
          ) : (
            <div className="w-96">
              <div>
                <div className="grid grid-cols-3 mb-8">
                  <div className="col-span-2">
                    <h1 className="text-3xl text-violet-900 font-bold">
                      All ToDos
                    </h1>
                  </div>

                  <button
                    onClick={() => {
                      window.location.href = '/add';
                    }}
                    className="bg-violet-100 px-2 py-2 rounded-lg transition ease-in-out  text-violet-600 drop-shadow-lg font-medium hover:bg-violet-500 hover:drop-shadow-lg hover:text-white duration-500 hover:scale-105"
                  >
                    Add a ToDo
                  </button>
                </div>

                {todos?.length && todos?.length > 0 ? (
                  todos?.map((todo: any, index: number) => (
                    <div
                      key={index}
                      onClick={() => openModal(index, todo)}
                      className="bg-violet-100 px-6 py-2 h-max-32 rounded-lg transition ease-in-out  text-violet-600 drop-shadow-lg font-semibold duration-500 my-4 cursor-pointer"
                    >
                      <h1 className="text-xl capitalize">{todo.topic}</h1>
                      <p className="text-gray-500 font-normal text-base">
                        {todo.description}
                      </p>
                    </div>
                  ))
                ) : loading ? (
                  <span className="text-2xl text-gray-500 font-medium">
                    Loading...
                  </span>
                ) : (
                  <div>
                    <Animation />
                    <div className="flex justify-center">
                      <span className="text-xl text-gray-500 font-medium">
                        No To-Dos added yet.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <DialogBox
        isOpen={isOpen}
        closeModal={closeModal}
        openModal={openModal}
        todoId={todoId}
        todo={todo}
      />
    </div>
  );
};

export default AllTodos;
