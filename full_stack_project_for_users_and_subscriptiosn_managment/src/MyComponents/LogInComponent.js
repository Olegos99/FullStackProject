import React, { useState, useRef} from 'react';
import {CheckUserLogIn, GetUserPremisssions} from '../Utils/Utils'
import { useDispatch, useSelector } from 'react-redux'
import { SetUser } from '../redux/actions'

function LogInComponent() {
    const [Username, setUsername] = useState([]);
    const [Password, setPassword] = useState([]);

    const UsersUrl = "http://localhost:8500/api/users";

    const UsernameinputEl = useRef(null);
    const PasswordinputEl = useRef(null);

    const dispatch = useDispatch();
    const CurrentUserID = useSelector(state => state.CurrentUserID)


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

    const TryToLogIn = async () =>
    {
        const responce = await CheckUserLogIn(UsersUrl,Username, Password);
        console.log(responce);
        if(responce.data != "no such combination found")
        {
            console.log("Loged In!!!");
            var premissions = await GetUserPremisssions(UsersUrl, responce.data);
            console.log(premissions.data[0].Premissions[0]);
            dispatch(SetUser(responce.data, premissions.data[0].Premissions[0]));
        }
        else{
            console.log("Wrong username or password");
        }
    }

  return <div>
      <h2>Welcomme!</h2>
      <h3>Please login:</h3><br/>
      <table>
          <tbody>
              <tr><td>Username:</td><td><input name="username" ref={UsernameinputEl} type="text" onChange={ApplyChanges}></input></td></tr>
              <tr><td>Password:</td><td><input name="password" ref={PasswordinputEl} type="password" onChange={ApplyChanges}></input></td></tr>
          </tbody>
      </table><br/>
      <button onClick={TryToLogIn}>Log in</button>

  </div>;
}

export default LogInComponent;
