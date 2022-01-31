import Axios from 'axios';

const getAll = (url) => Axios.get(url);

const CheckUserLogIn = (url, username, password) => Axios.get(`${url}/${username}/${password}`);

const GetUserPremisssions = (url,id)  => Axios.get(`${url}/${id}`);

const getById = (url, id) => Axios.get(`${url}/${id}`);

const addObj = (url, obj) => Axios.post(url, obj);

const updateObj = (url, id, obj) => Axios.put(`${url}/${id}`, obj);

const deleteObj = (url, id) => Axios.delete(`${url}/${id}`);

export { getAll, getById, addObj, updateObj, deleteObj, CheckUserLogIn, GetUserPremisssions };