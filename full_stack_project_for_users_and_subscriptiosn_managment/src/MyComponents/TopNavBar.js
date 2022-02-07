import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { LogOut } from '../redux/actions'
import { useHistory, useLocation } from "react-router-dom";

function TopNavBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const store = useSelector((state) => state);

    const [Timer, SetTimer] =  useState(`0h : 0m : 0s`);
    const [LogInTime, SetLogInTime] =  useState(0);

    const LogInTimeRefRef = useRef(LogInTime);
    LogInTimeRefRef.current = LogInTime;

    let GretingText = store.CurrentUserID !== 0 ?  `Nice to see you ${store.personalData.FirstName}!` : 'Please log in' ;
    
    const DoLogOut = () => {
        dispatch(LogOut());
        window.localStorage.setItem('ID', "");
        window.localStorage.setItem('premissions', "");
        window.localStorage.setItem('PersonalInfo', "");
        history.push('/');
    }

    //set timer on log in
    useEffect(() => {
        if(store.CurrentUserID !== 0)
        {
            // console.log(`initializing interval`);
            if(store.personalData.SessionTimeOut !== 0)
            {
                SetLogInTime(new Date().getTime());
                
                var interval = setInterval(() => {
                    updateTime(LogInTimeRefRef.current); 
                }, 1000);
            }
            else{
                SetLogInTime(new Date().getTime());
                SetTimer("No time limit");
            }
        
            return () => { 
                // console.log(`clearing interval`);
                clearInterval(interval);
                SetLogInTime(0);
                SetTimer(`0h : 0m : 0s`);  
            };
        }

    }, [store.CurrentUserID]);

    function updateTime(logintimeref){
        // console.log("log in time: "+ logintimeref);
        if(logintimeref !== 0)
        {
            var TimeToLogOut = (logintimeref + (store.personalData.SessionTimeOut * 60000)) - new Date().getTime();// log out time - current time
            // console.log("TimeToLogOut: "+ TimeToLogOut);
            var hours = Math.floor(TimeToLogOut/3600000);
            var minutes = Math.floor((TimeToLogOut - hours*3600000)/60000);
            var seconds =  Math.floor((TimeToLogOut - hours*3600000 -minutes*60000)/1000);
            SetTimer(`${hours}h : ${minutes}m : ${seconds}s`);
            // console.log("update timer: " + TimeToLogOut);
            if(TimeToLogOut <= 0)
            {
                DoLogOut();
            }
        }

    }

    const ShowMovies = () =>
    {
        history.push('/Movies');
    }

    const ShowSubscriptions = () =>
    {
        history.push('/Subscriptions');
    }

    const ManageUsers = () =>
    {
        history.push('/UsersManagmentPage/');
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
      <nav style={{ backgroundColor: 'yellow', display: 'flex', justifyContent: 'space-between'}}>
          <div>{GretingText}</div>
          <div style={{display: store.CurrentUserID !== 0 ? "block" : "none"}}>Log out in: {Timer} </div>
          <div style={{display: store.CurrentUserID !== 0 ? "block" : "none"}}><button onClick={DoLogOut}>LogOut</button></div>
      </nav>
      <h1>Movies - Subscriptions Web Site</h1>
      <nav style={{ display: 'flex', justifyContent: 'left'}}>
        <button name="movies" onClick={ShowMovies} style={{display: store.CurrentUserID !== 0 && GetPremmisionByPremName('View_Movies')
        ? "block" : "none"}}>Movies</button>
        <button name="subscriptions" onClick={ShowSubscriptions} style={{display: store.CurrentUserID !== 0 && GetPremmisionByPremName('View_Subscriptions')
        ? "block" : "none"}}>Subscriptions</button>
        <button name="Users Managment" onClick={ManageUsers} style={{display: store.CurrentUserID === '61f63e8de4c909954be639fb'
        ? "block" : "none"}}>Users Managment</button>

        {/* <button onClick={GetPremmisionByPremName} style={{display: store.CurrentUserID === '61f63e8de4c909954be639fb'
        ? "block" : "none"}}>debug</button> */}
             
      </nav>
  </div>;
}

export default TopNavBar;
