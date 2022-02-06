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
        if(Username.length >= 1)
        {
            const responce = await CheckUserExistence(UsersUrl,Username);
            // console.log(responce);
            if(responce.data != "no such new user found")
            {
                console.log("Found new user!");
                var NewUser = responce.data;
                NewUser.Password = Password;
                console.log(NewUser);
                console.log(NewUser._id);
                const responce2 = await SaveNewUserPassword(UsersUrl,NewUser._id, NewUser);
                console.log(responce2);
                history.push('/');
            }
            else{
                alert("No such NEW user!")
            }
        }
        else{
            alert("Fill Username")
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
