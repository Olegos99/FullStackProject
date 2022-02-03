import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import {getAll, getById} from '../Utils/Utils';

function AllUsersPage() {

    const history = useHistory();
    const store = useSelector((state) => state);

    useEffect(() => {
        if(store.CurrentUserID === 0 || store.CurrentUserID !== '61f63e8de4c909954be639fb') // if no current loged in user or someone who is not admin tryes to go there
        {
          history.push('/'); // go to log in page
        }
        ShowAllUsers();
      }, []);

      const [Users, SetUsers] =  useState([]);

      const UsersUrl = "http://localhost:8500/api/users";

    const ShowAllUsers = async () =>
    {
      SetUsers([]);
        var allUsers = await getAll(UsersUrl); // only usernames and passwords
  
        var GetUsers = allUsers.data.map(async(obj, key) =>
        {
          var User = {
            id: obj._id,
            key: key,
            Name: '',
            Username: obj.UserName,
            SessionTimeOut: 0,
            CreatedData: '',
            Premissions: ''
          }
          var userInfo = await getAll(`${UsersUrl}/${obj._id}`); 
          // console.log(userInfo.data); // premissions and personal info from JSONS
  
          //usersInfo.data[0] - id and premissions
          //usersInfo.data[1] - personal info
  
          User.key = key;
          User.Name = userInfo.data[1][key].FirstName;
          User.SessionTimeOut = userInfo.data[1][key].SessionTimeOut;
          User.CreatedData = userInfo.data[1][key].CreatedData;
          var PremissionsString = "";
          userInfo.data[0][key].Premissions.forEach(element => {
            if(element.value === true )
            {
              PremissionsString += `${element.name},`;
            }
          });
          User.Premissions = PremissionsString.slice(0,-1);
  
          return User;
        });
        // console.log(await GetUsers[0]);
        SetUsers([await GetUsers[0]]);
    }

    const EditUserWithId = (e) =>
    {
      console.log("Edit user with id: " + e.target.id);
    }
  
    const DeleteUser = (e) =>
    {
      console.log("Delete user with id: " + e.target.id);
    }


  return <div>
            <h3>Users:</h3>
          {Users.map((item, key) => 
      <table id ={item.key} key = {key} style={{border: "thick double #32a1ce"}}>
        <tbody>
          <tr><td>Name: </td><td>{item.Name}</td></tr>
          <tr><td>Username: </td><td>{item.Username}</td></tr>
          <tr><td>Session TimeOut: </td><td>{item.SessionTimeOut}</td></tr>
          <tr><td>Created Data: </td><td>{item.CreatedData}</td></tr>
          <tr><td>Premissions: </td><td>{item.Premissions}</td></tr>
          <tr>
            <td>
              <button id={`${item.id}`} onClick={EditUserWithId}>Edit</button>
              <button id={`${item.id}`} onClick={DeleteUser}>Delete</button>
              </td>
          </tr>
        </tbody>
      </table>
          )}
  </div>;
}

export default AllUsersPage;
