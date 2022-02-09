import React, {useState, useRef, useEffect} from 'react';
import { Link, useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import {addObj} from '../../Utils/Utils';
import { useSelector } from 'react-redux'

function AddMember() {
  const history = useHistory();
  const store = useSelector((state) => state);


  const MembersUrl = "http://localhost:8500/api/members";


  const [Member, SetMember] = useState([]);

  const validateFormAndSubmit = async(event) => {
    event.preventDefault();

    if (document.forms["myForm"]["Name"].value == "") {
        alert("Name must be filled out");
        return false;
      }
      if (document.forms["myForm"]["Email"].value == "") {
        alert("Email must be filled out");
        return false;
      }
      if (document.forms["myForm"]["City"].value == "") {
        alert("City must be filled out");
        return false;
      }

      let UpdatedMember = {...Member};

      var check = await addObj(MembersUrl, UpdatedMember);
      console.log(check);
      // redirection to all movies
      history.push('/Subscriptions/');

  }

  const HandleInputChange = (e) =>
  {
      var fieldName = e.target.name;
      let UpdatedMember = {...Member};
      UpdatedMember =  {
        ...UpdatedMember,
        [fieldName]:e.target.value
      }
      SetMember(UpdatedMember);
  }

  return <div>
            <h2>Add Member:</h2>
            <form name="myForm" onSubmit={validateFormAndSubmit}>
            Name: <input type="text" name="Name" onChange={HandleInputChange}/> <br/>
            Email: <input type="text" name="Email"onChange={HandleInputChange}/> <br/>
            City: <input type="text" name="City" onChange={HandleInputChange}/> <br/>
            <input type="submit" value="Submit"/>
            <Link to='/Subscriptions/'>Back</Link>
      </form>
  </div>;
}

export default AddMember;
