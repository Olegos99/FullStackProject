import React, { useState, useRef} from 'react';
import {CheckUserLogIn, GetUserPremisssions} from '../Utils/Utils'
import { useDispatch, useSelector } from 'react-redux'
import { SetUser } from '../redux/actions'
import { Link, useHistory } from "react-router-dom";



function LogInComponent() {
    let history = useHistory();

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
            var ResivedData = await GetUserPremisssions(UsersUrl, responce.data);
            console.log(ResivedData);
            var premissions = ResivedData.data[0][0].Premissions;
            console.log(premissions);//premisions
            var PersonalInfo = ResivedData.data[1][0];
            console.log(PersonalInfo);//otherdata
            dispatch(SetUser(PersonalInfo.id, premissions, PersonalInfo));
            history.push('/MainPage');
        }
        else{
            alert("Wrong username or password")
            // console.log("Wrong username or password");
        }
    }

    // const GoToCreateAccount = () => {
    //     history.push('/CreateNewAccount');
    // }

  return <div>
      <h2>Welcomme!</h2>
      <h3>Please login:</h3><br/>
      <table>
          <tbody>
              <tr><td>Username:</td><td><input name="username" ref={UsernameinputEl} type="text" onChange={ApplyChanges}></input></td></tr>
              <tr><td>Password:</td><td><input name="password" ref={PasswordinputEl} type="password" onChange={ApplyChanges}></input></td></tr>
          </tbody>
      </table><br/>
      <button onClick={TryToLogIn}>Log in</button><br />
      {/* New user? : <a onClick={GoToCreateAccount}>Create Account</a> */}
        New User? : <Link to='/CreateNewAccount'>Create New Account</Link>
  </div>;
}

export default LogInComponent;
