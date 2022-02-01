import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { LogOut } from '../redux/actions'
import { useHistory } from "react-router-dom";

function TopNavBar() {
    const dispatch = useDispatch();
    const history = useHistory();

    const store = useSelector((state) => state)
    let GretingText = store.CurrentUserID !== 0 ?  `Nice to see you ${store.personalData.FirstName}!` : 'Please log in' ;
    
    const DoLogOut = () => {
        dispatch(LogOut());
        history.push('/');
    }

  return <div>
      <nav style={{ backgroundColor: 'yellow', display: 'flex', justifyContent: 'space-between'}}>
          <div>{GretingText}</div>
          <div style={{display: store.CurrentUserID !== 0 ? "block" : "none"}}><button onClick={DoLogOut}>LogOut</button></div>
      </nav>
  </div>;
}

export default TopNavBar;
