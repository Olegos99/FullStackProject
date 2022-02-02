import React, {useEffect} from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import {getAll, getById} from '../Utils/Utils'

function UsersManagmentPage() {
  const history = useHistory();
  const store = useSelector((state) => state);

  const UsersUrl = "http://localhost:8500/api/users";

  let AllUsersToPresent = {};

  useEffect(() => {
    if(store.CurrentUserID === 0 || store.CurrentUserID !== '61f63e8de4c909954be639fb') // if no current loged in user or someone who is not admin tryes to go there
    {
      history.push('/'); // go to log in page
    }
  }, []);

  const ShowAllUsers = async () =>
  {
      var allUsers = await getAll(UsersUrl); // only usernames and passwords
      AllUsersToPresent = allUsers.data.map(async(obj, key) =>
      {
        console.log(obj._id);
        var userInfo = await getAll(`${UsersUrl}/${obj._id}`); // only usernames and passwords from database
        console.log(userInfo.data); // premissions and personal info from JSONS
      });
  }

  const AddUser = () =>
  {
    
  }

  return <div>
      <h2>Users Managment:</h2>
      <nav>
        <button onClick={ShowAllUsers}>All Users</button>
        <button onClick={AddUser}>Add User</button>
      </nav>
      <table>
        <tbody>

        </tbody>
      </table>
  </div>;
}

export default UsersManagmentPage;
