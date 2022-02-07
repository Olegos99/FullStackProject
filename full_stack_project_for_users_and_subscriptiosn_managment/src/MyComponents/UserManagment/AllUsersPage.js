import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getAll, getUserInfoById, deleteObj } from "../../Utils/Utils";

function AllUsersPage() {
  const history = useHistory();
  const store = useSelector((state) => state);
  const location = useLocation();

  const [Users, SetUsers] = useState([]);

  const [AllUsers, SetAllUsers] = useState([]);


  const ReadyUsers = [];
  const UsersUrl = "http://localhost:8500/api/users";

  useEffect(() => {
    console.log("useEffect1");
    if (store.CurrentUserID === 0 || store.CurrentUserID !== "61f63e8de4c909954be639fb")
    {
      // if no current loged in user or someone who is not admin tryes to go there
      history.push("/"); // go to log in page
    }
    if(window.localStorage.getItem('LastPage') !== location.pathname)
    {
      window.localStorage.setItem('LastPage', location.pathname);
    }
    ShowAllUsers();
  }, []);

  useEffect(() => {
    console.log("useEffect2");
    let AllUsers2 = Users.map((item, key) => (
      <table id={item.key} key={key} style={{ border: "thick double #32a1ce" }}>
        <tbody>
          <tr>
            <td>Name: </td>
            <td>{item.Name}</td>
          </tr>
          <tr>
            <td>Username: </td>
            <td>{item.Username}</td>
          </tr>
          <tr>
            <td>Session TimeOut: </td>
            <td>{item.SessionTimeOut}</td>
          </tr>
          <tr>
            <td>Created Data: </td>
            <td>{item.CreatedDate}</td>
          </tr>
          <tr>
            <td>Premissions: </td>
            <td>{item.Premissions}</td>
          </tr>
          <tr>
            <td>
              <button id={`${item.id}`} onClick={EditUserWithId}>
                Edit
              </button>
              <button id={`${item.id}`} onClick={DeleteUser}>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    ));
    SetAllUsers(AllUsers2);
  }, [Users]);

  const ShowAllUsers = async () => {
    SetUsers([]);
    let allUsers = await getAll(UsersUrl); // only usernames and passwords
    console.log("all users count: " + allUsers.data.length);
    console.log(allUsers.data);

    let GetUsers = allUsers.data.map(async (obj, key) => {
      let User = {
        id: obj._id,
        key: key,
        Name: "",
        Username: obj.UserName,
        SessionTimeOut: 0,
        CreatedDate: "",
        Premissions: "",
      };
      // var userInfo = await getAll(`${UsersUrl}/${obj._id}`);
      const userInfo = await getUserInfoById(UsersUrl, obj._id);
      // console.log(userInfo.data); // premissions and personal info from JSONS

      //usersInfo.data[0] //- id and premissions
      //usersInfo.data[1] //- personal info

      // console.log(key);

      User.key = key;
      User.Name = userInfo.data[1][0].FirstName;
      if (userInfo.data[1][0].SessionTimeOut != 0) {
        User.SessionTimeOut = userInfo.data[1][0].SessionTimeOut;
      } else User.SessionTimeOut = "No time limit";

      User.CreatedDate = userInfo.data[1][0].CreatedDate;
      let PremissionsString = "";

      // console.log(userInfo.data[0][0].Premissions);

      if (userInfo.data[0][0].Premissions.length >= 1) {
        let counter = 0;
        userInfo.data[0][0].Premissions.forEach((element) => {
          if (JSON.stringify(element).includes("true")) {
            //check if element is true
            counter++;
            var String = JSON.stringify(element);
            String = String.replace("_", " ")
              .replace("}", "")
              .replace("{", "")
              .replace('"', "")
              .replace(":", "")
              .replace("true", "")
              .replace('"', "");
            PremissionsString += `${String}, `;
          }
        });
        if (counter >= userInfo.data[0][0].Premissions.length) {
          PremissionsString = "All Premissions  ";
        }
      }

      User.Premissions = PremissionsString.slice(0, -2);

      // console.log("Ready Users: ");
      console.log(User);
      ReadyUsers.push(User);
      // SetUsers([...Users, User]);
      console.log(ReadyUsers);
      // console.log(Users);
      // ReadyUsers.push(User);
      // console.log(ReadyUsers);

      return User;
    });

    GetUsers[allUsers.data.length - 1]
      .then((result) => {
        // console.log("seting users");
        console.log(ReadyUsers);
        console.log(result);
        console.log("SettingUsers");
        SetUsers(ReadyUsers);
      })
      .catch((err) => {
        console.log("Eror happend");
      });

    // console.log(await GetUsers[0]);

    // for(var q = 0; q < allUsers.data.length; q++)
    // {
    //   var newUserToAdd = await GetUsers[q];
    //   SetUsers([...Users, newUserToAdd]);
    // }

    // SetUsers([await GetUsers[0]]);
  };

  const EditUserWithId = (e) => {
    console.log("Edit user with id: " + e.target.id);
    history.push(`/UsersManagmentPage/EditUser/${e.target.id}`);
  };

  const DeleteUser = async (e) => {
    console.log("Delete user with id: " + e.target.id);
    var responce = await deleteObj(UsersUrl, e.target.id);
    console.log(responce);
    ShowAllUsers();
  };

  return (
    <div>
      <h3>Users:</h3>
      {AllUsers}
      {/* {Users.map((item, key) => 
      <table id ={item.key} key = {key} style={{border: "thick double #32a1ce"}}>
        <tbody>
          <tr><td>Name: </td><td>{item.Name}</td></tr>
          <tr><td>Username: </td><td>{item.Username}</td></tr>
          <tr><td>Session TimeOut: </td><td>{item.SessionTimeOut}</td></tr>
          <tr><td>Created Data: </td><td>{item.CreatedDate}</td></tr>
          <tr><td>Premissions: </td><td>{item.Premissions}</td></tr>
          <tr>
            <td>
              <button id={`${item.id}`} onClick={EditUserWithId}>Edit</button>
              <button id={`${item.id}`} onClick={DeleteUser}>Delete</button>
              </td>
          </tr>
        </tbody>
      </table>
          )} */}
    </div>
  );
}

export default AllUsersPage;
