import React, {useEffect} from 'react';
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from "react-router-dom";

function SubscriptionsPage() {
  const history = useHistory();
  const store = useSelector((state) => state)
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

  return <div>
      <h2>Subscriptions:</h2>
  </div>;
}

export default SubscriptionsPage;
