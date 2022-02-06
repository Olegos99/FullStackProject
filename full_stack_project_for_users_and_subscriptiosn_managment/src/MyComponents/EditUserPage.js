import React, {useState, useRef, useEffect} from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import {updateObj, getUserInfoById, GetUserNameById} from '../Utils/Utils';

function EditUserPage(props) {
  const history = useHistory();
  const match = useRouteMatch();

  const UsersUrl = "http://localhost:8500/api/users";

  const ViewSubs = useRef(null);
  const ViewMovies = useRef(null);
  const CreateSubs = useRef(null);
  const CreateMovies = useRef(null);
  const EditSubs = useRef(null);
  const EditMovies = useRef(null);
  const DeleteSubs = useRef(null);
  const DeleteMovies = useRef(null);
  const UserName = useRef(null);
  const UserFirstName = useRef(null);
  const UserLastName = useRef(null);
  const UserTimout = useRef(null);

    let userIdToEdit = match.params.id;
    let PW = '';

    useEffect(() => {
     console.log("User id to edit = " + userIdToEdit); // <-- pass the component props
     FillUserInfo();
    },[])

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

  const FillUserInfo = async() =>
  {
      var allInfo = await getUserInfoById(UsersUrl, userIdToEdit); // no username
      var Username = await GetUserNameById(UsersUrl, userIdToEdit); // username
      console.log(allInfo.data);
      console.log(Username.data);
      PW = Username.data.Password;
      console.log("PW = " + PW);

      UserFirstName.current.value = allInfo.data[1][0].FirstName;
      UserLastName.current.value = allInfo.data[1][0].LastName;
      UserName.current.value = Username.data.UserName;
      UserTimout.current.value = allInfo.data[1][0].SessionTimeOut;
      //premissions
      ViewSubs.current.checked = JSON.stringify(allInfo.data[0][0].Premissions[0]).includes("true") ? true : false;
      CreateSubs.current.checked = JSON.stringify(allInfo.data[0][0].Premissions[1]).includes("true") ? true : false;
      EditSubs.current.checked = JSON.stringify(allInfo.data[0][0].Premissions[2]).includes("true") ? true : false;
      DeleteSubs.current.checked = JSON.stringify(allInfo.data[0][0].Premissions[3]).includes("true") ? true : false;
      ViewMovies.current.checked = JSON.stringify(allInfo.data[0][0].Premissions[4]).includes("true") ? true : false;
      CreateMovies.current.checked = JSON.stringify(allInfo.data[0][0].Premissions[5]).includes("true") ? true : false;
      EditMovies.current.checked = JSON.stringify(allInfo.data[0][0].Premissions[6]).includes("true") ? true : false;
      DeleteMovies.current.checked = JSON.stringify(allInfo.data[0][0].Premissions[7]).includes("true") ? true : false;


      var UpdatedUser = {...User};
      // UpdatedUser.FirstName = allInfo.data[1][0].FirstName;
      // UpdatedUser.LastName = allInfo.data[1][0].LastName;
      // UpdatedUser.UserName = Username.data.UserName;
      // UpdatedUser.SessionTimeOut = allInfo.data[1][0].SessionTimeOut;
      UpdatedUser.FirstName = UserFirstName.current.value;
      UpdatedUser.LastName = UserLastName.current.value;
      UpdatedUser.UserName = UserName.current.value;
      UpdatedUser.SessionTimeOut = UserTimout.current.value;

      for(var i = 0; i < UpdatedUser.premissions.length; i++)
      {
        var value = JSON.stringify(allInfo.data[0][0].Premissions[i]).includes("true");
        var PremName = GetPremissionStringByindex(i);
        UpdatedUser.premissions[i] = {
          [PremName]: value
        }
      }
      SetUser(UpdatedUser);
  }

  const GetPremissionStringByindex = (index) =>
  {
    var ReturnString = "";
    var String = JSON.stringify(User.premissions[index]);
    String = String.replace('}','').replace('{','').replace('"','').replace(':','').replace('true','').replace('"','').replace('false','');
    ReturnString = String;
    return ReturnString;
  }




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
      Password : `${PW}`
    }]
    var PremissionsPart = User.premissions;
    var PersonalInfoPart = [{
      FirstName: User.FirstName,
      LastName: User.LastName,
      CreatedDate: new Date().toISOString().slice(0, 10),
      SessionTimeOut: Number(User.SessionTimeOut),
      id: userIdToEdit
    }]
    NewUserObject.push(UsernamePart,PremissionsPart,PersonalInfoPart);
    // requesr for submition
    console.log(NewUserObject);
    console.log(userIdToEdit);
    var check = await updateObj(UsersUrl, userIdToEdit, NewUserObject);
    console.log(check);
    // redirection to all users
    history.push('/UsersManagmentPage/');
  }

  const HandleInputChange = (e) =>
  {
    var UpdatedUser = {...User};
      var fieldName = e.target.name;
      console.log(fieldName);
      console.log(UpdatedUser);
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
                ViewSubs.current.checked = true; //activate in front
              }
            }
            if(fieldName === "Create_Movies" ||fieldName === "Update_Movies" || fieldName === "Delete_Movies")
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
      SetUser(UpdatedUser);
  }

  return <div>
      <h2>Update User:</h2> <br/>
      <form name="myForm" onSubmit={validateFormAndSubmit}>
      First Name: <input ref={UserFirstName} type="text" name="FirstName" onChange={HandleInputChange}/> <br/>
      Last Name: <input ref={UserLastName} type="text" name="LastName"onChange={HandleInputChange}/> <br/>
      User Name: <input ref={UserName} type="text" name="UserName"onChange={HandleInputChange}/> <br/>
      Session TimeOut (Minutes): <input ref={UserTimout} type="number" name="SessionTimeOut" min = "0"onChange={HandleInputChange}/> <br/>
      Premissions: <br/>
      <ul>
        <li><input ref={ViewSubs} type="checkbox" name="View_Subscriptions" onChange={HandleInputChange}></input> View Subscriptions </li>
        <li><input ref={CreateSubs} type="checkbox" name="Create_Subscriptions" onChange={HandleInputChange}></input> Create Subscriptions </li>
        <li><input ref={EditSubs} type="checkbox" name="Update_Subscriptions" onChange={HandleInputChange}></input> Update Subscriptions </li>
        <li><input ref={DeleteSubs} type="checkbox" name="Delete_Subscriptions" onChange={HandleInputChange}></input> Delete Subscriptions </li>
        <li><input ref={ViewMovies} type="checkbox" name="View_Movies" onChange={HandleInputChange}></input> View Movies </li>
        <li><input ref={CreateMovies} type="checkbox" name="Create_Movies" onChange={HandleInputChange}></input> Create Movies </li>
        <li><input ref={EditMovies} type="checkbox" name="Update_Movies" onChange={HandleInputChange}></input> Update Movies </li>
        <li><input ref={DeleteMovies} type="checkbox" name="Delete_Movies" onChange={HandleInputChange}></input> Delete Movies </li>
      </ul> 
      <input type="submit" value="Submit"/>
      <Link to='/UsersManagmentPage/'>Back</Link>
      </form>
  </div>;
}

export default EditUserPage;
