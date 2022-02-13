import React, { useState, useRef, useEffect} from 'react';
import {CheckUserLogIn, GetUserPremisssions} from '../Utils/Utils'
import { useDispatch, useSelector } from 'react-redux'
import { LogOut } from '../redux/actions'
import { SetUser } from '../redux/actions'
import { Link, useHistory, useLocation } from "react-router-dom";

function LogInComponent() {
    const history = useHistory();
    const dispatch = useDispatch();
    const store = useSelector((state) => state);
    const location = useLocation();

    const DoLogOut = () => {
        dispatch(LogOut());
    }

    useEffect(() => {
        const lastPage = window.localStorage.getItem("LastPage");
        const LastUserId = window.localStorage.getItem('ID');
        if(window.localStorage.getItem('LastPage') !== location.pathname)
        {
            if(window.localStorage.getItem('ID') !== "" && window.localStorage.getItem('ID') !== undefined) //page was refreshed
            {
                var Id = JSON.parse(window.localStorage.getItem('ID'));
                var premissions = JSON.parse(window.localStorage.getItem('premissions'));
                var PersonalInfo = JSON.parse(window.localStorage.getItem('PersonalInfo'));
                dispatch(SetUser(Id, premissions, PersonalInfo));

                setTimeout(() => {
                    history.push(lastPage);
                },500)
            }
            else{
                //window.localStorage.setItem("LastPage", location.pathname);
            }
        }
        // if(store.CurrentUserID !== 0)
        // {
        //     DoLogOut();
        // }
      }, []);

    const [Username, setUsername] = useState([]);
    const [Password, setPassword] = useState([]);

    const UsersUrl = "http://localhost:8500/api/users";

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

    const cleanUp = () =>
    {
        setUsername('');
        setPassword('');
    }

    const TryToLogIn = async () =>
    {
        if(Username.length >= 1 && Password.length >= 1)
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
                window.localStorage.setItem('ID', JSON.stringify(PersonalInfo.id));
                window.localStorage.setItem('premissions', JSON.stringify(premissions));
                window.localStorage.setItem('PersonalInfo', JSON.stringify(PersonalInfo));
                cleanUp();
                history.push('/Blank');
            }
            else{
                alert("Wrong username or password")
            }
        }
        else{
            alert("Please fill username and password fields to log in")
        }

    }

    // const GoToCreateAccount = () => {
    //     history.push('/CreateNewAccount');
    // }

  return <div>
      <h2>Welcomme!</h2>
      <h3>Please login:</h3><br/>
      <table style = {{margin:"auto"}}>
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
