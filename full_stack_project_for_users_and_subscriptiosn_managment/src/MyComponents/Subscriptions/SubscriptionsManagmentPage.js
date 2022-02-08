import React, {useEffect, useState, useRef} from 'react';
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from "react-router-dom";
import { Switch, Route } from 'react-router-dom';
import AddMember from './AddMember';
import EditMember from './EditMember';
import AllMembers from './AllMembers';


function SubscriptionsPage() {
  const history = useHistory();
  const store = useSelector((state) => state);
  const location = useLocation();

  useEffect(() => {
    if(store.CurrentUserID === 0) // if no current loged in user
    {
      history.push('/'); // go to log in page
    }
    if(window.localStorage.getItem('LastPage') !== location.pathname)
    {
      window.localStorage.setItem('LastPage', location.pathname);
    }
  }, []);

  const ShowAllMembers = async () =>
  {
    history.push('/Subscriptions/');
  }

  const ToAddMember = () =>
  {
    history.push('/Subscriptions/addMember');
  }

  let GetPremmisionByPremName = (premissionName) =>
  {
      var haveThisPremission = false;
      var objectToCompare ={
          [premissionName]: true
      }
      store.CurrentUserPremissions.forEach(element => {
          if(JSON.stringify(element) === JSON.stringify(objectToCompare))
          {
              haveThisPremission = true;
          }
      });
      // var premmision = store.CurrentUserPremissions.filter((obj) => obj.name === `${premissionName}`);
      return (haveThisPremission);
  }

  return <div>
      <h2>Subscriptions:</h2>
      <nav style={{display: 'flex', justifyContent: 'left'}}>
        <button onClick={ShowAllMembers}>All Members</button>
        <button onClick={ToAddMember} style={{display: GetPremmisionByPremName("Create_Subscriptions") ? 'block':'none'}}>Add Member</button>
      </nav>

            <Switch>
                <Route path='/Subscriptions/' component = {AllMembers} exact/>
                <Route path='/Subscriptions/addMember' component = {AddMember}/>
                <Route path='/Subscriptions/EditMember/:id' component = {EditMember}/>
            </Switch>
  </div>;
}

export default SubscriptionsPage;
