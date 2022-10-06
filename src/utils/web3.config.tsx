import { createAsyncThunk } from '@reduxjs/toolkit';
import Web3 from 'web3';
import TodoList from './abis/TodoList.json';
import { AbiItem } from 'web3-utils';
import { AlertBox } from '../components/Alerts';

var web3 = new Web3(
  Web3.givenProvider || 'ws://some.local-or-remote.node:8546'
);

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

export const walletConnect: any = createAsyncThunk(
  'wallet/connect',
  async () => {
    if (window.ethereum === undefined) {
      await AlertBox('warning', 'Install MetaMask!');
    }
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    const network = await web3.eth.net.getId();

    const data = {
      account: accounts[0],
      network: network,
    };

    return data;
  }
);

export const checkConnectivity: any = createAsyncThunk(
  'wallet/check',
  async () => {
    if (window.ethereum === undefined) {
      //await AlertBox('warning', 'Install MetaMask!');
    }
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });

    const network = await web3.eth.net.getId();

    const data = {
      account: accounts[0],
      network: network,
    };

    return data;
  }
);

export const getTodos: any = createAsyncThunk('todos/get', async () => {
  const contract = new web3.eth.Contract(
    TodoList.abi as AbiItem[],
    contractAddress
  );
  const todos = await contract.methods.viewTodos().call();
  return todos;
});

export const addTodos: any = createAsyncThunk(
  'todos/add',
  async (data: any) => {
    const contract = new web3.eth.Contract(
      TodoList.abi as AbiItem[],
      contractAddress
    );
    const address = await web3.eth.getAccounts();

    const res = await contract.methods
      .addTodo(data.title, data.description)
      .send({ from: address[0] });
    return res;
  }
);

export const deleteTodos: any = createAsyncThunk(
  'todos/delete',
  async (data: any) => {
    const contract = new web3.eth.Contract(
      TodoList.abi as AbiItem[],
      contractAddress
    );
    const address = await web3.eth.getAccounts();

    const res = await contract.methods
      .removeTodo(data)
      .send({ from: address[0] });
    return res;
  }
);

export const getaTodo: any = createAsyncThunk(
  'todos/atodo',
  async (data: any) => {
    const contract = new web3.eth.Contract(
      TodoList.abi as AbiItem[],
      contractAddress
    );

    const res = await contract.methods.viewTodo(data).call();

    return res;
  }
);

export const changeTodos: any = createAsyncThunk(
  'todos/change',
  async (data: any) => {
    const contract = new web3.eth.Contract(
      TodoList.abi as AbiItem[],
      contractAddress
    );

    const address = await web3.eth.getAccounts();

    const res = await contract.methods
      .changeTodo(data?.id, data?.value?.title, data?.value?.description)
      .send({ from: address[0] });
    return res;
  }
);
