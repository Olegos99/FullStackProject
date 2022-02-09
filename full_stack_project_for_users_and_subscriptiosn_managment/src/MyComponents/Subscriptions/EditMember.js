import React, {useState, useRef, useEffect} from 'react';
import { Link, useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import {updateObj, getById} from '../../Utils/Utils';
import { useSelector } from 'react-redux'

function EditMember() {
  const history = useHistory();
  const store = useSelector((state) => state);
  const match = useRouteMatch();

  const MembersUrl = "http://localhost:8500/api/members";

  const Name = useRef(null);
  const Email = useRef(null);
  const City = useRef(null);

  let MemberIdToEdit = match.params.id;

  const [Member, SetMember] = useState({
      Name: "",
      Email: "",
      City:""
    }
    );

    useEffect(() => {
      console.log("member id to edit = " + MemberIdToEdit); // <-- pass the component props
      FillMemberInfo();
  },[])

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

      var check = await updateObj(MembersUrl, MemberIdToEdit, UpdatedMember);
      console.log(check);
      // redirection to all movies
      history.push('/Subscriptions/');

  }

    const FillMemberInfo = async() =>
    {
        var allInfo = await getById(MembersUrl, MemberIdToEdit);
        var Member = allInfo.data[0];
        // console.log(Movie);
        Name.current.value = Member.Name;
        Email.current.value = Member.Email;
        City.current.value = Member.City;

        let UpdatedMember = {...Member};
        UpdatedMember.Name = Name.current.value;
        UpdatedMember.Email = Email.current.value;
        UpdatedMember.City = City.current.value;

        SetMember(UpdatedMember);
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
        <h2>Edit Member:</h2>
        <form name="myForm" onSubmit={validateFormAndSubmit}>
      Name: <input ref={Name} type="text" name="Name" onChange={HandleInputChange}/> <br/>
      Email: <input ref={Email} type="text" name="Email"onChange={HandleInputChange}/> <br/>
      City: <input ref={City} type="text" name="City" onChange={HandleInputChange}/> <br/>
      <input type="submit" value="Submit"/>
      <Link to='/Subscriptions/'>Back</Link>
      </form>
  </div>;
}

export default EditMember;
