import Axios from 'axios';

const getAll = (url) => Axios.get(url);

const CheckUserLogIn = (url, username, password) => Axios.get(`${url}/${username}/${password}`);

const CheckUserExistence = (url, username) => Axios.get(`${url}/username${username}`);

const SaveNewUserPassword = (url, id, obj) => Axios.put(`${url}/${id}`, obj);

const GetUserPremisssions = (url,id)  => Axios.get(`${url}/${id}`);

const getById = (url, id) => Axios.get(`${url}/${id}`);

const addObj = (url, obj) => Axios.post(url, obj);

const updateObj = (url, id, obj) => Axios.put(`${url}/${id}`, obj);

const deleteObj = (url, id) => Axios.delete(`${url}/${id}`);

export { getAll, getById, addObj, updateObj, deleteObj, CheckUserLogIn, GetUserPremisssions, CheckUserExistence, SaveNewUserPassword};