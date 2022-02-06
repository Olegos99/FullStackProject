import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { Switch, Route } from 'react-router-dom';
import AddUserPage from './AddUserPage';
import AllUsersPage from './AllUsersPage';
import EditUserPage from './EditUserPage';

function UsersManagmentPage() {
  const history = useHistory();
  const store = useSelector((state) => state);

  useEffect(() => {
    if(store.CurrentUserID === 0 || store.CurrentUserID !== '61f63e8de4c909954be639fb') // if no current loged in user or someone who is not admin tryes to go there
    {
      history.push('/'); // go to log in page
    }
  }, []);

  const ShowAllUsers = async () =>
  {
    history.push('/UsersManagmentPage/');
  }

  const AddUser = () =>
  {
    history.push('/UsersManagmentPage/addUser');
  }
  

  return <div>
      <h2>Users Managment:</h2>
      <nav>
        <button onClick={ShowAllUsers}>All Users</button>
        <button onClick={AddUser}>Add User</button>
      </nav>

            <Switch>
                <Route path='/UsersManagmentPage/' component = {AllUsersPage} exact/>
                <Route path='/UsersManagmentPage/addUser' component = {AddUserPage}/>
                <Route path='/UsersManagmentPage/EditUser/:id' component = {EditUserPage}/>
            </Switch>
  </div>;
}

export default UsersManagmentPage;
