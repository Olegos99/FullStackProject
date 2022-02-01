import React, { useState, useRef} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {CheckUserExistence, SaveNewUserPassword} from '../Utils/Utils'

function CreateNewAccount() {
    let history = useHistory();

    const UsersUrl = "http://localhost:8500/api/users";

    const [Username, setUsername] = useState([]);
    const [Password, setPassword] = useState([]);

    const UsernameinputEl = useRef(null);
    const PasswordinputEl = useRef(null);

    const ApplyChanges = (e) =>
    {
        var targetName = e.target.name;
        if(targetName == "username")
        {
            setUsername(e.target.value);
        }
        if(targetName == "password")
        {
            setPassword(e.target.value);
        }
    }

    const CheckUserAndSave = async () =>
    {
        const responce = await CheckUserExistence(UsersUrl,Username);
        console.log(responce);
        if(responce.data != "No such new user found")
        {
            console.log("Found new user!");
            var NewUser = responce.data;
            NewUser.Password = Password;
            console.log(NewUser);
            const responce2 = await SaveNewUserPassword(UsersUrl,NewUser._id, NewUser);
            console.log(responce2);
        }
        else{
            alert("No such new user!")
        }
    }

  return <div>
      <h2>Create New Account:</h2>
      <table>
          <tbody>
              <tr><td>Username:</td><td><input name="username" ref={UsernameinputEl} type="text" onChange={ApplyChanges}></input></td></tr>
              <tr><td>Password:</td><td><input name="password" ref={PasswordinputEl} type="password" onChange={ApplyChanges}></input></td></tr>
          </tbody>
      </table><br/>
      <button onClick={CheckUserAndSave}>Create</button><br />
      <Link to='/'>Back</Link>
  </div>;
}

export default CreateNewAccount;
