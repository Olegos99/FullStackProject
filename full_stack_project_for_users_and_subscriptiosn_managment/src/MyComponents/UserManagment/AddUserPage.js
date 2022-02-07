import React, {useState, useEffect, useRef} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {addObj} from '../../Utils/Utils';
import { useSelector } from 'react-redux'

function AddUserPage() {
  const history = useHistory();
  const location = useLocation();
  const store = useSelector((state) => state);

  const UsersUrl = "http://localhost:8500/api/users";

  useEffect(() => {
    if (store.CurrentUserID === 0 || store.CurrentUserID !== "61f63e8de4c909954be639fb")
    {
      // if no current loged in user or someone who is not admin tryes to go there
      history.push("/"); // go to log in page
    }
    if(window.localStorage.getItem('LastPage') !== location.pathname)
    {
      window.localStorage.setItem('LastPage', location.pathname);
    }
  },[]);

  const [User, SetUser] = useState({
    FirstName: "",
    LastName: "",
    UserName:"",
    SessionTimeOut:0,
    premissions:[
      {View_Subscriptions: false},
      {Create_Subscriptions: false},
      {Update_Subscriptions: false},
      {Delete_Subscriptions: false},
      {View_Movies:false},
      {Create_Movies:false},
      {Update_Movies:false},
      {Delete_Movies:false}
    ]
  });

  const ViewSubs = useRef(null);
  const ViewMovies = useRef(null);

  const validateFormAndSubmit = async(event) => {
    event.preventDefault();
    // all checks     
    if (document.forms["myForm"]["FirstName"].value == "") {
      alert("First Name must be filled out");
      return false;
    }
    if (document.forms["myForm"]["LastName"].value == "") {
      alert("Last Name must be filled out");
      return false;
    }
    if (document.forms["myForm"]["UserName"].value == "") {
      alert("User Name must be filled out");
      return false;
    }
    if (document.forms["myForm"]["FirstName"].value == "") {
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
      console.log(fieldName);
      if(fieldName == "FirstName" || fieldName == "LastName" || fieldName == "UserName" || fieldName == "SessionTimeOut")
      {
        UpdatedUser =  {
          ...UpdatedUser,
          [fieldName]:e.target.value
        }
      }

      if(fieldName === "View_Subscriptions" || fieldName === "Create_Subscriptions" || fieldName === "Update_Subscriptions" || fieldName === "Delete_Subscriptions" ||
      fieldName === "View_Movies" ||fieldName === "Create_Movies" ||fieldName === "Update_Movies" ||fieldName === "Delete_Movies")
      {
        var PremissionToCompare = {
          [fieldName]: true
        }
        var PremissionToCompare2 = {
          [fieldName]: false
        }
        
        var PremissionIndex = -1;

        PremissionIndex = UpdatedUser.premissions.findIndex((prem) => JSON.stringify(prem) === JSON.stringify(PremissionToCompare2)||
        JSON.stringify(prem) === JSON.stringify(PremissionToCompare));

        console.log(PremissionIndex);

        UpdatedUser.premissions[PremissionIndex] = {
          [fieldName]: e.target.checked
        }

        if(e.target.checked)
        {
          if( fieldName === "Create_Subscriptions" || fieldName === "Update_Subscriptions" || fieldName === "Delete_Subscriptions" ||
          fieldName === "Create_Movies" ||fieldName === "Update_Movies" ||fieldName === "Delete_Movies")
          {
            if(fieldName === "Create_Subscriptions" || fieldName === "Update_Subscriptions" || fieldName === "Delete_Subscriptions")
            {
                var ViewSubsPremissionIndex = 0;
                var ObjToCompare = {
                  View_Subscriptions: true
                }
                if(JSON.stringify(UpdatedUser.premissions[ViewSubsPremissionIndex]) !== JSON.stringify(ObjToCompare) )
                {
                  UpdatedUser.premissions[ViewSubsPremissionIndex] = ObjToCompare;
                  ViewSubs.current.checked = true;                //activate in front
                }
            }
              
            if(fieldName === "Create_Movies" ||fieldName === "Update_Movies" ||fieldName === "Delete_Movies")
            {
              var ViewMoviesPremissionIndex = 4;
              var ObjToCompare = {
                View_Movies: true
              }
              if(JSON.stringify(UpdatedUser.premissions[ViewMoviesPremissionIndex]) !== JSON.stringify(ObjToCompare) )
              {
                UpdatedUser.premissions[ViewMoviesPremissionIndex] = ObjToCompare;
                ViewMovies.current.checked = true;//activate in front
              }
            }
          }
        }
      }
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
        <li><input ref={ViewSubs} type="checkbox" name="View_Subscriptions" onChange={HandleInputChange}></input> View Subscriptions </li>
        <li><input type="checkbox" name="Create_Subscriptions" onChange={HandleInputChange}></input> Create Subscriptions </li>
        <li><input type="checkbox" name="Update_Subscriptions" onChange={HandleInputChange}></input> Update Subscriptions </li>
        <li><input type="checkbox" name="Delete_Subscriptions" onChange={HandleInputChange}></input> Delete Subscriptions </li>
        <li><input ref={ViewMovies} type="checkbox" name="View_Movies" onChange={HandleInputChange}></input> View Movies </li>
        <li><input type="checkbox" name="Create_Movies" onChange={HandleInputChange}></input> Create Movies </li>
        <li><input type="checkbox" name="Update_Movies" onChange={HandleInputChange}></input> Update Movies </li>
        <li><input type="checkbox" name="Delete_Movies" onChange={HandleInputChange}></input> Delete Movies </li>
      </ul> 
      <input type="submit" value="Submit"/>
      <Link to='/UsersManagmentPage/'>Back</Link>
      </form>
  </div>;
}

export default AddUserPage;

