import Axios from 'axios';

const getAll = (url) => Axios.get(url);

const CheckUserLogIn = (url, username, password) => Axios.get(`${url}/${username}/${password}`);

const CheckUserExistence = (url, username) => Axios.get(`${url}/username${username}`);

const getById = (url,id) => Axios.get(`${url}/${id}`);

const getUserInfoById = (url,id) => Axios.get(`${url}/UserInfo${id}`);

const GetUserNameById = (url, id) => Axios.get(`${url}/GetUsername${id}`); 

const GetUserPremisssions = (url,id) => Axios.get(`${url}/GetUserPremissions${id}`);

const addObj = (url, obj) => Axios.post(url, obj);

const updateObj = (url, id, obj) => Axios.put(`${url}/${id}`, obj);

const SaveNewUserPassword = (url, id, obj) => Axios.put(`${url}/newpassword${id}`, obj);

const deleteObj = (url, id) => Axios.delete(`${url}/${id}`);

const DeleteMovieFromAllSubscriptions = (url,MovieId) => Axios.delete(`${url}/MovieID${MovieId}`);

const deleteSubscription = (url, id) => Axios.delete(`${url}/subscription${id}`);



export { deleteSubscription, DeleteMovieFromAllSubscriptions, getUserInfoById, getAll, getById, addObj, updateObj, deleteObj, CheckUserLogIn, GetUserPremisssions, CheckUserExistence, SaveNewUserPassword, GetUserNameById};