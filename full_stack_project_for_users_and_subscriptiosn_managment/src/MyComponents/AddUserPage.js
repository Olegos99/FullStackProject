import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {addObj} from '../Utils/Utils';

function AddUserPage() {
  const history = useHistory();

  const UsersUrl = "http://localhost:8500/api/users";

  const [User, SetUser] = useState({
    FirstName: "",
    LastName: "",
    UserName:"",
    SessionTimeOut:0,
    premissions:[
      {name:"View Subscriptions", value: false},
      {name:"Create Subscriptions", value: false},
      {name:"Update Subscriptions", value: false},
      {name:"Delete Subscriptions", value: false},
      {name:"View Movies", value:false},
      {name:"Create Movies", value:false},
      {name:"Update Movies", value:false},
      {name:"Delete Movies", value:false}
    ]
  });

  const validateFormAndSubmit = async(event) => {
    event.preventDefault();
    // all checks     
    let Fname = document.forms["myForm"]["FirstName"].value;
    if (Fname == "") {
      alert("First Name must be filled out");
      return false;
    }
    // crreation of object for submition
    var NewUserObject = [];
    var UsernamePart =[{
      UserName : User.UserName,
      Password : ""
    }]
    var PremissionsPart = User.premissions;
    var PersonalInfoPart = [{
      FirstName: User.FirstName,
      LastName: User.LastName,
      CreatedDate: new Date().toISOString().slice(0, 10),
      SessionTimeOut: User.SessionTimeOut
    }]
    NewUserObject.push(UsernamePart,PremissionsPart,PersonalInfoPart);
    // requesr for submition
    console.log(NewUserObject);
    var check = await addObj(UsersUrl, NewUserObject);
    console.log(check);
    // redirection to all users
    history.push('/UsersManagmentPage/');
  }

  const HandleInputChange = (e) =>
  {
    var UpdatedUser = {...User};
      var fieldName = e.target.name;
      if(fieldName == "FirstName")
      UpdatedUser.FirstName = e.target.value;
      if(fieldName == "LastName")
      UpdatedUser.LastName = e.target.value;
      if(fieldName == "UserName")
      UpdatedUser.UserName = e.target.value;
      if(fieldName == "SessionTimeOut")
      UpdatedUser.SessionTimeOut = e.target.value;
      SetUser(UpdatedUser);
  }

  return <div>
      <h2>Create New User:</h2> <br/>
      <form name="myForm" onSubmit={validateFormAndSubmit}>
      First Name: <input type="text" name="FirstName" onChange={HandleInputChange}/> <br/>
      Last Name: <input type="text" name="LastName"onChange={HandleInputChange}/> <br/>
      User Name: <input type="text" name="UserName"onChange={HandleInputChange}/> <br/>
      Session TimeOut (Minutes): <input type="number" name="SessionTimeOut" min = "0"onChange={HandleInputChange}/> <br/>
      Premissions: <br/>
      <ul>
        <li><input type="checkbox" name="ViewSub"></input> View Subscriptions </li>
        <li><input type="checkbox" name="CreateSub"></input> Create Subscriptions </li>
        <li><input type="checkbox" name="UpdateSub"></input> Update Subscriptions </li>
        <li><input type="checkbox" name="DeleteSub"></input> Delete Subscriptions </li>
        <li><input type="checkbox" name="ViewMov"></input> View Movies </li>
        <li><input type="checkbox" name="CreateMov"></input> Create Movies </li>
        <li><input type="checkbox" name="UpdateMov"></input> Update Movies </li>
        <li><input type="checkbox" name="DeleteMov"></input> Delete Movies </li>
      </ul> 
      <input type="submit" value="Submit"/>
      <Link to='/UsersManagmentPage/'>Back</Link>
      </form>
  </div>;
}

export default AddUserPage;
